(() => {
  document.addEventListener('DOMContentLoaded', () => {
    setupHeaderScroll();
    setupMobileNav();
    setupLiveHours();
    setupMenuFilterAndSearch();
    setupHearthPlanner();
  });

  // Header Scroll blur
  function setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scroll-blur');
      } else {
        header.classList.remove('scroll-blur');
      }
    });
  }

  // Mobile navigation drawer
  function setupMobileNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = toggle.classList.toggle('open');
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('open');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Live Hours Checker (Charlotte, NC - Eastern Time)
  function setupLiveHours() {
    const container = document.getElementById('live-status-container');
    if (!container) return;

    const updateStatus = () => {
      // Get current Eastern Time
      const now = new Date();
      const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      
      const day = estTime.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hour = estTime.getHours();
      const min = estTime.getMinutes();
      const timeDecimal = hour + min / 60;

      let isOpen = false;
      let note = "";

      // Hours mapping:
      // Mon (1): Closed
      // Tue (2) - Thu (4): 11 AM - 11 PM (11 to 23)
      // Fri (5): 11 AM - 2 AM (Saturday morning)
      // Sat (6): 5 PM - 2 AM (Sunday morning)
      // Sun (0): 5 PM - 11 PM (17 to 23)
      
      // Note: check late-night hours carry over to next calendar day
      // Saturday 12 AM - 2 AM belongs to Friday night shift
      // Sunday 12 AM - 2 AM belongs to Saturday night shift

      if (day === 1) { // Monday
        // Check if carryover from Sunday night (no carryover since Sunday closes at 11 PM)
        isOpen = false;
        note = "Closed today — reopening Tuesday at 11 AM";
      } else if (day === 2 || day === 3 || day === 4) { // Tue - Thu
        if (timeDecimal >= 11 && timeDecimal < 23) {
          isOpen = true;
          note = "Open until 11:00 PM tonight";
        } else {
          note = "Closed — open Tue-Thu 11:00 AM - 11:00 PM";
        }
      } else if (day === 5) { // Friday
        if (timeDecimal >= 11 || timeDecimal < 2) {
          isOpen = true;
          note = timeDecimal >= 22 || timeDecimal < 2 ? "Open now — Late-night lounge is active!" : "Open until 2:00 AM tonight";
        } else {
          note = "Closed — opening today at 11:00 AM";
        }
      } else if (day === 6) { // Saturday
        // Check carryover from Friday night (12 AM - 2 AM)
        if (timeDecimal < 2) {
          isOpen = true;
          note = "Open now — Late-night lounge is active!";
        } else if (timeDecimal >= 17) {
          isOpen = true;
          note = timeDecimal >= 22 ? "Open now — Late-night lounge is active!" : "Open until 2:00 AM tonight";
        } else {
          note = "Closed — opening today at 5:00 PM";
        }
      } else if (day === 0) { // Sunday
        // Check carryover from Saturday night (12 AM - 2 AM)
        if (timeDecimal < 2) {
          isOpen = true;
          note = "Open now — Late-night lounge is active!";
        } else if (timeDecimal >= 17 && timeDecimal < 23) {
          isOpen = true;
          note = "Open until 11:00 PM tonight";
        } else {
          note = "Closed — opening today at 5:00 PM";
        }
      }

      container.innerHTML = `
        <span class="badge" style="background:${isOpen ? 'rgba(46,125,50,0.15)' : 'rgba(198,40,40,0.15)'}; color:${isOpen ? '#4caf50' : '#f44336'}; border-color:${isOpen ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}; padding: 0.5rem 1.2rem; font-size: 0.85rem;">
          ● ${isOpen ? 'Open Now' : 'Closed'}
        </span>
        <p style="margin-top:0.8rem; color:var(--text-muted); font-size:0.95rem; font-style:italic;">${note}</p>
      `;
    };

    updateStatus();
    setInterval(updateStatus, 30000); // Update every 30s
  }

  // Menu Category Filter and Live Text Search
  function setupMenuFilterAndSearch() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.menu-category');
    const searchInput = document.getElementById('menuSearch');
    const noResults = document.getElementById('menuNoResults');

    if (!categories.length) return;

    // Filter by category tabs
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        categories.forEach(cat => {
          if (filter === 'all' || cat.dataset.category === filter) {
            cat.style.display = '';
          } else {
            cat.style.display = 'none';
          }
        });

        // Reset search field
        if (searchInput) searchInput.value = '';
        resetHighlights();
        if (noResults) noResults.style.display = 'none';
      });
    });

    // Search query listener
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();

        if (query) {
          // Reset filters tab to "All" when search is active
          filterBtns.forEach(b => b.classList.remove('active'));
          filterBtns[0].classList.add('active');
        }

        let totalVisible = 0;

        categories.forEach(cat => {
          cat.style.display = ''; // Reset display to scan items
          const items = cat.querySelectorAll('.menu-item');
          let catVisibleCount = 0;

          items.forEach(item => {
            const nameEl = item.querySelector('h3');
            const descEl = item.querySelector('p');
            const originalName = item.dataset.name || nameEl.textContent;
            const originalDesc = item.dataset.desc || descEl.textContent;

            // Save original text in data attributes for clean highlight reset
            if (!item.dataset.name) item.dataset.name = originalName;
            if (!item.dataset.desc) item.dataset.desc = originalDesc;

            const nameMatch = originalName.toLowerCase().includes(query);
            const descMatch = originalDesc.toLowerCase().includes(query);

            if (nameMatch || descMatch) {
              item.style.display = '';
              catVisibleCount++;
              totalVisible++;

              // Apply highlighting
              if (query) {
                nameEl.innerHTML = highlightText(originalName, query);
                descEl.innerHTML = highlightText(originalDesc, query);
              } else {
                nameEl.textContent = originalName;
                descEl.textContent = originalDesc;
              }
            } else {
              item.style.display = 'none';
            }
          });

          // If no items in category match, hide category
          if (catVisibleCount === 0) {
            cat.style.display = 'none';
          }
        });

        if (noResults) {
          noResults.style.display = totalVisible === 0 ? '' : 'none';
        }
      });
    }

    function highlightText(text, term) {
      const index = text.toLowerCase().indexOf(term);
      if (index === -1) return text;
      return text.substring(0, index) + 
             `<span class="highlight">${text.substring(index, index + term.length)}</span>` + 
             text.substring(index + term.length);
    }

    function resetHighlights() {
      categories.forEach(cat => {
        cat.querySelectorAll('.menu-item').forEach(item => {
          item.style.display = '';
          const nameEl = item.querySelector('h3');
          const descEl = item.querySelector('p');
          if (item.dataset.name) nameEl.textContent = item.dataset.name;
          if (item.dataset.desc) descEl.textContent = item.dataset.desc;
        });
      });
    }
  }

  // Signature Experience Hearth Planner (signature-experience.html)
  function setupHearthPlanner() {
    const buildBtn = document.getElementById('build-plan');
    if (!buildBtn) return;

    const occSelect = document.getElementById('choice-1');
    const paceSelect = document.getElementById('choice-2');
    const dirSelect = document.getElementById('choice-3');
    const summaryText = document.getElementById('summary');
    const resultIcon = document.querySelector('.result-icon');
    const resultHeader = document.querySelector('.result h2');

    // SVG elements
    const outerFlame = document.getElementById('svg-flame-outer');
    const middleFlame = document.getElementById('svg-flame-middle');
    const innerFlame = document.getElementById('svg-flame-inner');
    const particles = document.querySelectorAll('.ember-particle');

    // Custom vector icon outputs
    const icons = {
      everyday: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent);"><path d="M12 2L2 22h20L12 2z"/></svg>`,
      date: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary);"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      group: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    };

    buildBtn.addEventListener('click', () => {
      const occasion = occSelect.value;
      const pace = paceSelect.value;
      const direction = dirSelect.value;

      let experienceTitle = "Amina Culinary Journey";
      let description = "";
      let activeIcon = "everyday";

      // Flame scale and coloring settings
      let outerScale = "scale(0.85)";
      let middleScale = "scale(0.85)";
      let innerScale = "scale(0.85)";

      let outerFill = "#c0392b";  // Deep crimson
      let middleFill = "#d35400"; // Terracotta orange
      let innerFill = "#f39c12";  // Ember gold
      let speed = "2s";            // Particle speed

      // 1. Process Occasion (size of flame)
      if (occasion === "Date night") {
        experienceTitle = "Emberlit Romance";
        outerScale = "scale(0.95)";
        middleScale = "scale(0.9)";
        innerScale = "scale(0.85)";
        outerFill = "#991b1b"; // Velvet rose
        middleFill = "#b91c1c";
        innerFill = "#cf9c52";
        activeIcon = "date";
      } else if (occasion === "Group gathering") {
        experienceTitle = "Wood-Fired Banquet";
        outerScale = "scale(1.2)";
        middleScale = "scale(1.15)";
        innerScale = "scale(1.1)";
        outerFill = "#b45309"; // Bold copper
        middleFill = "#d97706";
        innerFill = "#f59e0b";
        activeIcon = "group";
      } else {
        // Everyday meal
        experienceTitle = "Heritage Gathering";
        outerScale = "scale(0.8)";
        middleScale = "scale(0.75)";
        innerScale = "scale(0.7)";
      }

      // 2. Process Pace (animation velocity & speed)
      if (pace === "Quick") {
        speed = "1.2s";
      } else if (pace === "Celebratory") {
        speed = "0.8s";
        // Brighten up the colors to celebrate!
        innerFill = "#fff";
        middleFill = "#eab308";
        outerFill = "#ea580c";
      } else {
        // Relaxed
        speed = "3s";
      }

      // 3. Process Direction (flame hues)
      if (direction === "Surprising") {
        // Late-night lounge mystery vibe: hint of violet embers
        outerFill = "#581c87"; // Plum purple
        middleFill = "#c2410c";
        innerFill = "#eab308";
      } else if (direction === "Seasonal") {
        // Warm earth greens and coppers
        outerFill = "#78350f";
        middleFill = "#c2410c";
        innerFill = "#fef08a";
      }

      // Build text summary
      description = `Your signature visit is curated as a ${occasion.toLowerCase()} at a ${pace.toLowerCase()} rhythm. We recommend centering your dinner around the ${direction.toLowerCase()} flavors of our wood-fired hearth, beginning with Sambusas and culminating in our signature Branzino or Oxtail Sliders.`;

      // Apply transformations to SVG flames
      if (outerFlame) {
        outerFlame.style.transform = outerScale;
        outerFlame.style.fill = outerFill;
        outerFlame.classList.add('show');
      }
      if (middleFlame) {
        middleFlame.style.transform = middleScale;
        middleFlame.style.fill = middleFill;
        middleFlame.classList.add('show');
      }
      if (innerFlame) {
        innerFlame.style.transform = innerScale;
        innerFlame.style.fill = innerFill;
        innerFlame.classList.add('show');
      }

      // Apply animation speed to particles
      particles.forEach(p => {
        p.style.animationDuration = speed;
        // Introduce small random drift
        p.setAttribute('var', `--ember-drift: ${Math.random() * 40 - 20}px`);
      });

      // Update output elements
      if (resultIcon && icons[activeIcon]) resultIcon.innerHTML = icons[activeIcon];
      if (resultHeader) resultHeader.textContent = experienceTitle;
      summaryText.textContent = description;

      // Toast feedback
      showToast(`Signature Plan Formulated: ${experienceTitle}`);
    });
  }

  // Custom Toast Display
  function showToast(message) {
    const toast = document.querySelector('.demo-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
})();

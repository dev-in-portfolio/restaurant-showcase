(() => {
  document.addEventListener('DOMContentLoaded', () => {
    setupHeaderScroll();
    setupMobileNav();
    setupLiveHours();
    setupMenuFilterAndSearch();
    setupCezvePlanner();
  });

  // Header Scroll
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

  // Mobile navigation
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
      const now = new Date();
      const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      
      const day = estTime.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hour = estTime.getHours();
      const min = estTime.getMinutes();
      const timeDecimal = hour + min / 60;

      let isOpen = false;
      let note = "";

      // Hours mapping:
      // Mon (1): 7:30 AM – 9:00 PM (7.5 to 21)
      // Tue (2): Closed
      // Wed (3) - Thu (4): 7:30 AM – 9:00 PM (7.5 to 21)
      // Fri (5): 7:30 AM – 10:00 PM (7.5 to 22)
      // Sat (6): 9:00 AM – 10:00 PM (9 to 22)
      // Sun (0): 9:00 AM – 9:00 PM (9 to 21)

      if (day === 2) { // Tuesday
        note = "Closed today — reopening Wednesday at 7:30 AM";
      } else if (day === 1 || day === 3 || day === 4) { // Mon, Wed, Thu
        if (timeDecimal >= 7.5 && timeDecimal < 21) {
          isOpen = true;
          note = "Open until 9:00 PM tonight";
        } else {
          note = "Closed — open today 7:30 AM - 9:00 PM";
        }
      } else if (day === 5) { // Friday
        if (timeDecimal >= 7.5 && timeDecimal < 22) {
          isOpen = true;
          note = "Open until 10:00 PM tonight";
        } else {
          note = "Closed — open today 7:30 AM - 10:00 PM";
        }
      } else if (day === 6) { // Saturday
        if (timeDecimal >= 9 && timeDecimal < 22) {
          isOpen = true;
          note = "Open until 10:00 PM tonight";
        } else {
          note = "Closed — open today 9:00 AM - 10:00 PM";
        }
      } else if (day === 0) { // Sunday
        if (timeDecimal >= 9 && timeDecimal < 21) {
          isOpen = true;
          note = "Open until 9:00 PM tonight";
        } else {
          note = "Closed — open today 9:00 AM - 9:00 PM";
        }
      }

      container.innerHTML = `
        <span class="badge" style="background:${isOpen ? 'rgba(46,125,50,0.1)' : 'rgba(198,40,40,0.1)'}; color:${isOpen ? '#2e7d32' : '#c62828'}; border-color:${isOpen ? 'rgba(46,125,50,0.2)' : 'rgba(198,40,40,0.2)'}; padding: 0.4rem 1.1rem; font-size: 0.8rem;">
          ● ${isOpen ? 'Open Now' : 'Closed'}
        </span>
        <p style="margin-top:0.6rem; color:var(--text-muted); font-size:0.92rem; font-style:italic;">${note}</p>
      `;
    };

    updateStatus();
    setInterval(updateStatus, 30000);
  }

  // Menu Category Filter and Live Text Search
  function setupMenuFilterAndSearch() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.menu-category');
    const searchInput = document.getElementById('menuSearch');
    const noResults = document.getElementById('menuNoResults');

    if (!categories.length) return;

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

        if (searchInput) searchInput.value = '';
        resetHighlights();
        if (noResults) noResults.style.display = 'none';
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();

        if (query) {
          filterBtns.forEach(b => b.classList.remove('active'));
          filterBtns[0].classList.add('active');
        }

        let totalVisible = 0;

        categories.forEach(cat => {
          cat.style.display = '';
          const items = cat.querySelectorAll('.menu-item');
          let catVisibleCount = 0;

          items.forEach(item => {
            const nameEl = item.querySelector('h3');
            const descEl = item.querySelector('p');
            const originalName = item.dataset.name || nameEl.textContent;
            const originalDesc = item.dataset.desc || descEl.textContent;

            if (!item.dataset.name) item.dataset.name = originalName;
            if (!item.dataset.desc) item.dataset.desc = originalDesc;

            const nameMatch = originalName.toLowerCase().includes(query);
            const descMatch = originalDesc.toLowerCase().includes(query);

            if (nameMatch || descMatch) {
              item.style.display = '';
              catVisibleCount++;
              totalVisible++;

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

  // Cezve Sand Brewing Visualizer (flavor-guide.html)
  function setupCezvePlanner() {
    const buildBtn = document.getElementById('build-plan');
    if (!buildBtn) return;

    const baseSelect = document.getElementById('choice-1');
    const intensitySelect = document.getElementById('choice-2');
    const balanceSelect = document.getElementById('choice-3');
    const summaryText = document.getElementById('summary');
    const resultIcon = document.querySelector('.result-icon');
    const resultHeader = document.querySelector('.result h2');

    // SVG elements
    const froth = document.getElementById('svg-cezve-froth');
    const steams = document.querySelectorAll('.cezve-steam');

    // Custom vector icon outputs
    const icons = {
      flatbread: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary);"><path d="M12 2A10 10 0 0 0 2 12c0 2 .5 3.9 1.4 5.6L12 2z"/></svg>`,
      grains: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent);"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      mezze: `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary);"><line x1="12" y1="2" x2="12" y2="22"/><rect x="8" y="7" width="8" height="4" rx="1"/><rect x="9" y="14" width="6" height="4" rx="1"/></svg>`
    };

    buildBtn.addEventListener('click', () => {
      const base = baseSelect.value;
      const intensity = intensitySelect.value;
      const balance = balanceSelect.value;

      let guideTitle = "Anatolian Flavor Blend";
      let description = "";
      let icon = "mezze";

      // Froth color/scale depending on choices
      let frothColor = "#6d4c41"; // Classic crema brown
      let scaleY = "scaleY(0.7)";
      let steamDuration = "3s";

      if (base === "Flatbread/Filo") {
        guideTitle = "Borek & Pastry Ritual";
        frothColor = "#8d6e63"; // Lighter cream froth
        icon = "flatbread";
        scaleY = "scaleY(0.6)";
      } else if (base === "Pilav/Grains") {
        guideTitle = "Travertine Grain Hearth";
        frothColor = "#5d4037"; // Rich dark coffee
        icon = "grains";
        scaleY = "scaleY(0.8)";
      } else {
        // Mezze/Skewers
        guideTitle = "Grand Bazaar Platter";
        frothColor = "#3e2723"; // Deep double-brewed espresso
        icon = "mezze";
        scaleY = "scaleY(0.95)";
      }

      if (intensity === "Bold") {
        steamDuration = "1.5s"; // Fast cooking steam
      } else if (intensity === "Layered") {
        steamDuration = "2.2s";
      } else {
        steamDuration = "4s";
      }

      description = `Your Anatolian taste path is formed around ${base.toLowerCase()} with a ${intensity.toLowerCase()} flavor profile. We suggest balancing this with a ${balance.toLowerCase()} touch — perhaps pairing our hand-rolled Borek with warm Turkish Coffee or minty Moroccan Tea.`;

      // Apply SVG updates
      if (froth) {
        froth.style.fill = frothColor;
        froth.style.transform = scaleY;
        froth.classList.add('show');
      }

      steams.forEach(steam => {
        steam.style.animationDuration = steamDuration;
        steam.classList.add('show');
      });

      // Update UI elements
      if (resultIcon && icons[icon]) resultIcon.innerHTML = icons[icon];
      if (resultHeader) resultHeader.textContent = guideTitle;
      summaryText.textContent = description;

      // Toast notice
      showToast(`Coffee Brewed: ${guideTitle}`);
    });
  }

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

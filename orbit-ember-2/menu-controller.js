// Enhanced Menu Controller JavaScript for Orbit & Ember Kitchen + Bar (Level 0 + Menu Experience)

document.addEventListener('DOMContentLoaded', () => {
  let currentMenuKey = 'dinner';
  let activeDietaryFilter = 'ALL';
  let searchQuery = '';

  const menuSelectorNav = document.getElementById('primary-menu-tabs');
  const secondaryNav = document.getElementById('secondary-section-nav');
  const serviceNotice = document.getElementById('menu-service-notice');
  const menuContentContainer = document.getElementById('menu-content-container');
  const dietaryFilterContainer = document.getElementById('dietary-filter-pills');
  const searchInput = document.getElementById('menu-search-input');

  const qrModal = document.getElementById('qr-modal');
  const openQrBtn = document.getElementById('open-qr-btn');
  const closeQrBtn = document.getElementById('close-qr-btn');
  const printMenuBtn = document.getElementById('print-menu-btn');

  // Initialize QR Modal
  if (openQrBtn && qrModal && closeQrBtn) {
    openQrBtn.addEventListener('click', () => {
      qrModal.classList.add('active');
      qrModal.setAttribute('aria-hidden', 'false');
    });
    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.remove('active');
      qrModal.setAttribute('aria-hidden', 'true');
    });
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.remove('active');
        qrModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Print Action
  if (printMenuBtn) {
    printMenuBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Live Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderActiveMenu();
    });
  }

  // Render Primary Menu Selector Tabs
  function renderPrimaryTabs() {
    if (!menuSelectorNav) return;
    menuSelectorNav.innerHTML = '';

    const menuKeys = [
      { key: 'dinner', label: 'Dinner', badge: 'Primary' },
      { key: 'breakfast', label: 'Breakfast', badge: '7am-11am' },
      { key: 'brunch', label: 'Brunch', badge: 'Weekend' },
      { key: 'lunch', label: 'Lunch', badge: '11am-3pm' },
      { key: 'specialty', label: 'Specialty', badge: 'Chef Table' },
      { key: 'drinks', label: 'Drinks', badge: 'Cocktails' },
      { key: 'happyhour', label: 'Happy Hour', badge: '4:30-6:30' },
      { key: 'kids', label: 'Kids', badge: 'Under 12' }
    ];

    menuKeys.forEach(item => {
      const btn = document.createElement('button');
      btn.className = `primary-tab-pill ${item.key === currentMenuKey ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', item.key === currentMenuKey ? 'true' : 'false');
      btn.setAttribute('data-menu', item.key);
      btn.innerHTML = `<span>${item.label}</span>${item.badge ? `<small class="tab-badge-pill">${item.badge}</small>` : ''}`;
      
      btn.addEventListener('click', () => {
        if (currentMenuKey !== item.key) {
          currentMenuKey = item.key;
          activeDietaryFilter = 'ALL';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          renderPrimaryTabs();
          renderDietaryFilters();
          renderActiveMenu();
        }
      });
      menuSelectorNav.appendChild(btn);
    });
  }

  // Render Dietary Filter Pills
  function renderDietaryFilters() {
    if (!dietaryFilterContainer) return;
    dietaryFilterContainer.innerHTML = '';

    const filters = [
      { code: 'ALL', label: 'Show All' },
      { code: 'CF', label: '⭐ Chef Favorites' },
      { code: 'V', label: 'Vegetarian' },
      { code: 'VG', label: 'Vegan' },
      { code: 'GF', label: 'Gluten-Free' },
      { code: 'SP', label: '🌶️ Spicy' },
      { code: 'SE', label: '🌱 Seasonal' }
    ];

    filters.forEach(f => {
      const pill = document.createElement('button');
      pill.className = `filter-pill ${activeDietaryFilter === f.code ? 'active' : ''}`;
      pill.textContent = f.label;
      pill.addEventListener('click', () => {
        activeDietaryFilter = f.code;
        renderDietaryFilters();
        renderActiveMenu();
      });
      dietaryFilterContainer.appendChild(pill);
    });
  }

  // Render Secondary Section Jump Pills
  function renderSecondaryNav(sections) {
    if (!secondaryNav) return;
    secondaryNav.innerHTML = '';

    sections.forEach((sec) => {
      const secId = `section-${sec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const anchor = document.createElement('a');
      anchor.className = 'sec-pill-link';
      anchor.href = `#${secId}`;
      anchor.textContent = sec.name;
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetEl = document.getElementById(secId);
        if (targetEl) {
          const offset = 140;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = targetEl.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
      secondaryNav.appendChild(anchor);
    });
  }

  // Helper for rendering dietary tag pills
  function renderItemMarkers(markers) {
    if (!markers || markers.length === 0) return '';
    return markers.map(m => {
      const info = MENU_DATA.dietaryLegend.find(l => l.code === m);
      const label = info ? info.label : m;
      return `<span class="item-tag tag-${m.toLowerCase()}" title="${label}">${m} • ${label}</span>`;
    }).join(' ');
  }

  // Render Active Menu Page Content
  function renderActiveMenu() {
    const menuObj = MENU_DATA.menus[currentMenuKey];
    if (!menuObj) return;

    if (serviceNotice) {
      serviceNotice.innerHTML = `
        <div class="service-notice-inner">
          <div class="notice-clock-badge">🕒 Service Availability</div>
          <div class="notice-hours-text">${menuObj.hours}</div>
        </div>
      `;
    }

    renderSecondaryNav(menuObj.sections);

    let html = '';

    menuObj.sections.forEach(sec => {
      const secId = `section-${sec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      // Filter by dietary marker & search query
      let filteredItems = sec.items.filter(item => {
        // Dietary filter
        let passesDietary = true;
        if (activeDietaryFilter !== 'ALL') {
          if (activeDietaryFilter === 'CF') {
            passesDietary = item.featured || (item.markers && item.markers.includes('CF'));
          } else {
            passesDietary = item.markers && item.markers.includes(activeDietaryFilter);
          }
        }

        // Search query filter
        let passesSearch = true;
        if (searchQuery) {
          const matchName = item.name.toLowerCase().includes(searchQuery);
          const matchDesc = item.desc.toLowerCase().includes(searchQuery);
          passesSearch = matchName || matchDesc;
        }

        return passesDietary && passesSearch;
      });

      if (filteredItems.length === 0) return;

      html += `
        <section id="${secId}" class="menu-category-section">
          <div class="category-header-row">
            <h2 class="category-name">${sec.name}</h2>
            <div class="category-divider-line"></div>
          </div>
          <div class="menu-cards-grid">
      `;

      filteredItems.forEach(item => {
        const isFeatured = item.featured;
        html += `
          <article class="menu-item-card ${isFeatured ? 'featured-chef-card' : ''}">
            ${isFeatured ? '<div class="chef-featured-label">✨ Chef’s Featured Dish</div>' : ''}
            <div class="card-item-top">
              <h3 class="card-item-title">${item.name}</h3>
              <div class="card-item-price">${item.price}</div>
            </div>
            <p class="card-item-desc">${item.desc}</p>
            <div class="card-item-tags">
              ${renderItemMarkers(item.markers)}
            </div>
          </article>
        `;
      });

      html += `
          </div>
        </section>
      `;
    });

    if (html === '') {
      html = `
        <div class="no-results-box">
          <h3>No matching menu items found</h3>
          <p>Try searching for a different dish name or clearing your dietary filters.</p>
        </div>
      `;
    }

    // Add Add-ons & Substitutions container for food menus
    if (['dinner', 'breakfast', 'brunch', 'lunch'].includes(currentMenuKey)) {
      html += `
        <section class="addons-section-block">
          <div class="category-header-row">
            <h2 class="category-name">Add-ons &amp; Substitutions</h2>
            <div class="category-divider-line"></div>
          </div>
          <div class="addons-cards-row">
            <div class="addon-info-card">
              <h4>Protein Additions</h4>
              <ul class="addon-list">
                ${MENU_DATA.addons.proteins.map(p => `<li><span>${p.name}</span><strong>${p.price}</strong></li>`).join('')}
              </ul>
            </div>
            <div class="addon-info-card">
              <h4>Substitutions &amp; Extras</h4>
              <ul class="addon-list">
                ${MENU_DATA.addons.substitutions.map(s => `<li><span>${s.name}</span><strong>${s.price}</strong></li>`).join('')}
              </ul>
            </div>
          </div>
        </section>
      `;
    }

    if (menuContentContainer) {
      menuContentContainer.innerHTML = html;
    }
  }

  // Initial Render
  renderPrimaryTabs();
  renderDietaryFilters();
  renderActiveMenu();
});

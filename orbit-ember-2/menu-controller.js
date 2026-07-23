// Menu Controller JavaScript for Orbit & Ember Kitchen + Bar (Level 0 + Menu Experience)

document.addEventListener('DOMContentLoaded', () => {
  let currentMenuKey = 'dinner';
  let activeDietaryFilter = 'ALL';

  const menuSelectorNav = document.getElementById('primary-menu-tabs');
  const secondaryNav = document.getElementById('secondary-section-nav');
  const serviceNotice = document.getElementById('menu-service-notice');
  const menuTitleEl = document.getElementById('menu-display-title');
  const menuTaglineEl = document.getElementById('menu-display-tagline');
  const menuContentContainer = document.getElementById('menu-content-container');
  const dietaryFilterContainer = document.getElementById('dietary-filter-pills');
  const qrModal = document.getElementById('qr-modal');
  const openQrBtn = document.getElementById('open-qr-btn');
  const closeQrBtn = document.getElementById('close-qr-btn');
  const printMenuBtn = document.getElementById('print-menu-btn');

  // Initialize QR Code Modal
  if (openQrBtn && qrModal && closeQrBtn) {
    openQrBtn.addEventListener('click', () => {
      qrModal.classList.add('active');
    });
    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.remove('active');
    });
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.remove('active');
      }
    });
  }

  // Print Menu Trigger
  if (printMenuBtn) {
    printMenuBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Render Primary Menu Selector Tabs
  function renderPrimaryTabs() {
    if (!menuSelectorNav) return;
    menuSelectorNav.innerHTML = '';

    const menuKeys = [
      { key: 'dinner', label: 'Dinner', badge: 'Primary' },
      { key: 'breakfast', label: 'Breakfast', badge: '' },
      { key: 'brunch', label: 'Brunch', badge: 'Weekend' },
      { key: 'lunch', label: 'Lunch', badge: '' },
      { key: 'specialty', label: 'Specialty', badge: 'Chef' },
      { key: 'drinks', label: 'Drinks', badge: 'Cocktails' },
      { key: 'happyhour', label: 'Happy Hour', badge: '4:30-6:30' },
      { key: 'kids', label: 'Kids', badge: '' }
    ];

    menuKeys.forEach(item => {
      const btn = document.createElement('button');
      btn.className = `menu-tab-btn ${item.key === currentMenuKey ? 'active' : ''}`;
      btn.setAttribute('data-menu', item.key);
      btn.innerHTML = `<span>${item.label}</span>${item.badge ? `<small class="tab-badge">${item.badge}</small>` : ''}`;
      btn.addEventListener('click', () => {
        if (currentMenuKey !== item.key) {
          currentMenuKey = item.key;
          activeDietaryFilter = 'ALL';
          renderPrimaryTabs();
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
      { code: 'CF', label: 'Chef Favorites' },
      { code: 'V', label: 'Vegetarian' },
      { code: 'VG', label: 'Vegan' },
      { code: 'GF', label: 'Gluten-Free' },
      { code: 'SP', label: 'Spicy' },
      { code: 'SE', label: 'Seasonal' }
    ];

    filters.forEach(f => {
      const pill = document.createElement('button');
      pill.className = `dietary-pill ${activeDietaryFilter === f.code ? 'active' : ''}`;
      pill.textContent = f.label;
      pill.addEventListener('click', () => {
        activeDietaryFilter = f.code;
        renderDietaryFilters();
        renderActiveMenu();
      });
      dietaryFilterContainer.appendChild(pill);
    });
  }

  // Render Secondary Anchored Navigation Pills
  function renderSecondaryNav(sections) {
    if (!secondaryNav) return;
    secondaryNav.innerHTML = '';

    sections.forEach((sec, idx) => {
      const secId = `section-${sec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const anchor = document.createElement('a');
      anchor.className = 'sec-nav-link';
      anchor.href = `#${secId}`;
      anchor.textContent = sec.name;
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetEl = document.getElementById(secId);
        if (targetEl) {
          const offset = 140; // sticky header + sticky menu selector
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

  // Helper to render dietary marker tags
  function renderItemMarkers(markers) {
    if (!markers || markers.length === 0) return '';
    return markers.map(m => {
      const info = MENU_DATA.dietaryLegend.find(l => l.code === m);
      const label = info ? info.label : m;
      return `<span class="item-tag tag-${m.toLowerCase()}" title="${label}">${m} — ${label}</span>`;
    }).join(' ');
  }

  // Render Active Menu Page Content
  function renderActiveMenu() {
    const menuObj = MENU_DATA.menus[currentMenuKey];
    if (!menuObj) return;

    if (menuTitleEl) menuTitleEl.textContent = menuObj.title;
    if (menuTaglineEl) menuTaglineEl.textContent = menuObj.tagline;
    if (serviceNotice) {
      serviceNotice.innerHTML = `
        <div class="service-time-box">
          <span class="clock-icon">🕒</span>
          <div class="time-info">
            <strong>Service Availability:</strong> ${menuObj.hours}
          </div>
        </div>
      `;
    }

    // Secondary navigation for sections
    renderSecondaryNav(menuObj.sections);

    // Build Menu Sections HTML
    let html = '';

    menuObj.sections.forEach(sec => {
      const secId = `section-${sec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      // Filter items based on activeDietaryFilter
      let filteredItems = sec.items;
      if (activeDietaryFilter !== 'ALL') {
        filteredItems = sec.items.filter(item => {
          if (activeDietaryFilter === 'CF') return item.featured || item.markers.includes('CF');
          return item.markers && item.markers.includes(activeDietaryFilter);
        });
      }

      if (filteredItems.length === 0) return; // Skip empty sections when filtering

      html += `
        <section id="${secId}" class="menu-category-block">
          <h2 class="menu-category-title">
            <span>${sec.name}</span>
            <span class="category-line"></span>
          </h2>
          <div class="menu-grid">
      `;

      filteredItems.forEach(item => {
        const isFeatured = item.featured;
        html += `
          <div class="menu-card ${isFeatured ? 'featured-card' : ''}">
            ${isFeatured ? '<div class="featured-badge">⭐ Chef’s Featured Dish</div>' : ''}
            <div class="card-header">
              <h3 class="item-title">${item.name}</h3>
              <span class="item-price">${item.price}</span>
            </div>
            <p class="item-desc">${item.desc}</p>
            <div class="card-tags">
              ${renderItemMarkers(item.markers)}
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </section>
      `;
    });

    // Add Add-ons & Substitutions callout section for food menus
    if (['dinner', 'breakfast', 'brunch', 'lunch'].includes(currentMenuKey)) {
      html += `
        <section class="addons-container">
          <h2 class="menu-category-title">
            <span>Add-ons & Substitutions</span>
            <span class="category-line"></span>
          </h2>
          <div class="addons-grid">
            <div class="addon-card">
              <h3>Protein Additions</h3>
              <ul>
                ${MENU_DATA.addons.proteins.map(p => `<li><span>${p.name}</span><strong>${p.price}</strong></li>`).join('')}
              </ul>
            </div>
            <div class="addon-card">
              <h3>Substitutions & Extras</h3>
              <ul>
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

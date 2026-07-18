/* ========================================
   Gotcha Matcha & Espresso — Scripts
   ======================================== */

(function () {
    'use strict';

    // 1. Mobile Nav Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const open = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', String(open));
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });

        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });
    }

    // 2. Navbar Scroll Effect
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 4. Menu Category Filter (menu.html)
    var filterBtns = document.querySelectorAll('.filter-btn');
    var menuCategories = document.querySelectorAll('.menu-category');

    if (filterBtns.length && menuCategories.length) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filter = this.getAttribute('data-filter');

                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                menuCategories.forEach(function (cat) {
                    if (filter === 'all' || cat.getAttribute('data-category') === filter) {
                        cat.style.display = '';
                    } else {
                        cat.style.display = 'none';
                    }
                });

                // Clear search when changing filter
                var searchInput = document.getElementById('menuSearch');
                if (searchInput) {
                    searchInput.value = '';
                    document.querySelectorAll('.menu-item').forEach(function (item) {
                        item.classList.remove('hidden');
                    });
                }
            });
        });
    }

    // 5. Menu Search
    var menuSearch = document.getElementById('menuSearch');
    if (menuSearch) {
        menuSearch.addEventListener('input', function () {
            var query = this.value.toLowerCase().trim();
            var items = document.querySelectorAll('.menu-item');

            // Reset filter to All when searching
            if (query) {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                var allBtn = document.querySelector('.filter-btn[data-filter="all"]');
                if (allBtn) allBtn.classList.add('active');
                menuCategories.forEach(function (cat) { cat.style.display = ''; });
            }

            items.forEach(function (item) {
                var name = (item.getAttribute('data-name') || '').toLowerCase();
                var text = item.textContent.toLowerCase();
                var match = !query || name.indexOf(query) !== -1 || text.indexOf(query) !== -1;
                item.classList.toggle('hidden', !match);
            });

            // Hide empty categories
            menuCategories.forEach(function (cat) {
                var visibleItems = cat.querySelectorAll('.menu-item:not(.hidden)');
                cat.style.display = visibleItems.length === 0 ? 'none' : '';
            });
        });
    }

    // 6. Matcha Lab Builder (matcha.html)
    const baseSelect = document.getElementById('mt-base');
    const flavorSelect = document.getElementById('mt-flavor');
    const accentSelect = document.getElementById('mt-accent');

    if (baseSelect && flavorSelect && accentSelect) {
      const baseData = {
        uji: { tag: "CEREMONIAL GRADE", name: "Uji Matcha", basePrice: 6.50, label: "double whisk of pure Uji ceremonial grade green tea matcha" },
        hojicha: { tag: "ROASTED GREEN TEA", name: "Roasted Hojicha", basePrice: 6.00, label: "earthy, nutty roasted hojicha green tea powder whisked smooth" },
        duo: { tag: "MATCHA COFFEE DUO", name: "Matcha Espresso Duo", basePrice: 7.00, label: "layered cup of cold brew espresso and pure whisked ceremonial matcha" }
      };

      const flavorData = {
        pandan: { name: "Pandan", label: "swirled with sweet, fragrant pandan blossom syrup", charge: 0.75 },
        ube: { name: "Ube", label: "swirled with a rich creamy sweet purple ube root syrup", charge: 0.75 },
        coconut: { name: "Coconut", label: "blended with sweet organic pressed coconut milk", charge: 0.50 }
      };

      const accentData = {
        none: { label: "", charge: 0.00 },
        waffle: { label: ", finished with a Belgian waffle cone crushed sugar rim", charge: 0.50 },
        boba: { label: ", topped with slow-cooked sweet brown sugar tapioca boba pearls", charge: 0.75 }
      };

      function updateDrink() {
        const baseKey = baseSelect.value;
        const flavorKey = flavorSelect.value;
        const accentKey = accentSelect.value;

        const base = baseData[baseKey];
        const flavor = flavorData[flavorKey];
        const accent = accentData[accentKey];

        const totalPrice = base.basePrice + flavor.charge + accent.charge;

        const tagDisplay = document.getElementById('mt-tag-display');
        const titleDisplay = document.getElementById('mt-title-display');
        const priceDisplay = document.getElementById('mt-price-display');
        const descDisplay = document.getElementById('mt-desc-display');

        if (tagDisplay) tagDisplay.innerText = base.tag;
        if (titleDisplay) titleDisplay.innerText = `${flavor.name} ${base.name}`;
        if (priceDisplay) priceDisplay.innerText = `$${totalPrice.toFixed(2)}`;

        if (descDisplay) {
          let desc = `A premium cup of ${base.label}, ${flavor.label}${accent.label}.`;
          descDisplay.innerText = desc;
        }

        // Update SVG Layers
        const layersToHide = [
          'svg-base-uji', 'svg-base-hojicha', 'svg-base-duo',
          'svg-syrup-pandan', 'svg-syrup-ube', 'svg-syrup-coconut',
          'svg-accent-waffle', 'svg-accent-boba'
        ];
        layersToHide.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('show');
        });

        // Show base
        const baseEl = document.getElementById(`svg-base-${baseKey}`);
        if (baseEl) baseEl.classList.add('show');

        // Show syrup swirl
        const syrupEl = document.getElementById(`svg-syrup-${flavorKey}`);
        if (syrupEl) syrupEl.classList.add('show');

        // Show accent
        if (accentKey !== 'none') {
          const accentEl = document.getElementById(`svg-accent-${accentKey}`);
          if (accentEl) accentEl.classList.add('show');
        }
      }

      baseSelect.addEventListener('change', updateDrink);
      flavorSelect.addEventListener('change', updateDrink);
      accentSelect.addEventListener('change', updateDrink);

      // Initial load
      updateDrink();
    }
})();

(function () {
  'use strict';

  // 1. Interactive Flavor Map Customizer (flavor-guide.html)
  const button = document.getElementById('build-plan');
  const select1 = document.getElementById('choice-1');
  const select2 = document.getElementById('choice-2');
  const select3 = document.getElementById('choice-3');
  const summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateFlavorMap() {
      const foundation = select1.value;
      const intensity = select2.value;
      const balance = select3.value;

      summary.textContent = `Start with ${foundation}; keep the experience ${intensity.toLowerCase()}; finish with ${balance.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      const layers = [
        'svg-base-rice', 'svg-base-noodles', 'svg-base-shared-plates',
        'svg-sauce-gentle', 'svg-sauce-layered', 'svg-sauce-bold',
        'svg-garnish-fresh', 'svg-garnish-savory', 'svg-garnish-warming'
      ];
      layers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      const baseId = `svg-base-${foundation.toLowerCase().replace(/\s+/g, '-')}`;
      const sauceId = `svg-sauce-${intensity.toLowerCase()}`;
      const garnishId = `svg-garnish-${balance.toLowerCase()}`;

      // Show matching layers
      const baseEl = document.getElementById(baseId);
      if (baseEl) baseEl.classList.add('show');

      const sauceEl = document.getElementById(sauceId);
      if (sauceEl) sauceEl.classList.add('show');

      const garnishEl = document.getElementById(garnishId);
      if (garnishEl) garnishEl.classList.add('show');
    }

    button.addEventListener('click', updateFlavorMap);
    updateFlavorMap();
  }

  // 2. Catering Request Form submission handler (catering.html)
  const cateringForm = document.getElementById('catering-form');
  const catSuccessPanel = document.getElementById('success-panel');
  const catSuccessMessage = document.getElementById('success-message');

  if (cateringForm && catSuccessPanel) {
    cateringForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';

      cateringForm.style.display = 'none';
      catSuccessPanel.style.display = 'block';
      if (catSuccessMessage) {
        catSuccessMessage.innerHTML = `Thank you, <strong>${name}</strong>. We have received your catering request. Our event planner will contact you at <strong>${phone}</strong> shortly to finalize the menu.`;
      }
    });
  }

  // 3. Contact Form submission handler (contact.html)
  const contactForm = document.getElementById('contact-form');
  const conSuccessPanel = document.getElementById('success-panel');
  const conSuccessMessage = document.getElementById('success-message');

  if (contactForm && conSuccessPanel) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';

      contactForm.style.display = 'none';
      conSuccessPanel.style.display = 'block';
      if (conSuccessMessage) {
        conSuccessMessage.innerHTML = `Thank you, <strong>${name}</strong>. We have received your message and will respond as soon as possible.`;
      }
    });
  }

  // 4. Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      navList.style.display = expanded ? 'none' : 'flex';
      if (!expanded) {
        navList.style.flexDirection = 'column';
      }
    });
  }

  // 5. Interactive Combo Builder (menu.html)
  const builderWidget = document.querySelector('.builder-widget');
  if (builderWidget) {
    const options = builderWidget.querySelectorAll('.builder-option');
    const totalPriceEl = builderWidget.querySelector('.builder-total-price');
    const qtyValueEl = builderWidget.querySelector('.builder-qty-value');
    const minusBtn = builderWidget.querySelector('.builder-qty-minus');
    const plusBtn = builderWidget.querySelector('.builder-qty-plus');
    const addBtn = builderWidget.querySelector('.builder-add-btn');

    let selections = {
      size: 'Small',
      protein: 'Chicken',
      style: "General Tso's",
      starch: 'Fried Rice',
      appetizer: 'Egg Roll'
    };

    let quantity = 1;

    // Set default active buttons on load
    options.forEach(opt => {
      const group = opt.getAttribute('data-group');
      const val = opt.getAttribute('data-value');
      if (selections[group] === val) {
        opt.classList.add('active');
      }
    });

    // Helper: calculate total price
    function calculatePrice() {
      let base = 8.99;
      if (selections.size === 'Regular') base = 11.99;
      if (selections.size === 'Large') base = 14.99;

      let extra = 0;
      // Protein extras
      if (selections.protein === 'Beef') extra += 1.50;
      if (selections.protein === 'Shrimp') extra += 3.00;
      if (selections.protein === 'Pork') extra += 1.00;

      // Style extras
      if (selections.style === 'Mongolian') extra += 0.50;
      if (selections.style === 'Hunan') extra += 0.50;
      if (selections.style === 'Kung Pao') extra += 0.50;

      // Starch extras
      if (selections.starch === 'Chow Mein') extra += 0.50;

      // Appetizer extras
      if (selections.appetizer === 'Crab Rangoon (2)') extra += 1.00;
      if (selections.appetizer === 'Soup of the Day') extra += 1.50;

      const singlePrice = base + extra;
      const total = singlePrice * quantity;
      totalPriceEl.textContent = `$${total.toFixed(2)}`;
    }

    // Attach click listeners to option buttons
    options.forEach(opt => {
      opt.addEventListener('click', function () {
        const group = opt.getAttribute('data-group');
        const val = opt.getAttribute('data-value');

        // Deactivate siblings
        const siblings = builderWidget.querySelectorAll(`.builder-option[data-group="${group}"]`);
        siblings.forEach(s => s.classList.remove('active'));

        // Activate clicked
        opt.classList.add('active');
        selections[group] = val;

        calculatePrice();
      });
    });

    // Quantity buttons
    if (minusBtn && plusBtn && qtyValueEl) {
      minusBtn.addEventListener('click', function () {
        if (quantity > 1) {
          quantity--;
          qtyValueEl.textContent = quantity;
          calculatePrice();
        }
      });

      plusBtn.addEventListener('click', function () {
        quantity++;
        qtyValueEl.textContent = quantity;
        calculatePrice();
      });
    }

    // Add to order button click
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        alert(`Combo Platter Added!\n- Size: ${selections.size}\n- Protein: ${selections.protein}\n- Style: ${selections.style}\n- Starch: ${selections.starch}\n- Appetizer: ${selections.appetizer}\n- Qty: ${quantity}`);
      });
    }

    // Initial calculation
    calculatePrice();
  }
})();

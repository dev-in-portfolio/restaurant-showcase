(() => {
  'use strict';

  // 1. Mobile navigation toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Pizza Customizer (pizza.html)
  const crustSelect = document.getElementById('pz-crust');
  const sauceSelect = document.getElementById('pz-sauce');
  const toppingsSelect = document.getElementById('pz-toppings');

  if (crustSelect && sauceSelect && toppingsSelect) {
    const crustData = {
      grandma: { tag: "JERSEY SHORE SIGNATURE", name: "Grandma Pizza Pie", basePrice: 20.00, label: "square-cut thin Sicilian style crispy dough" },
      nystyle: { tag: "CLASSIC ROUND PIE", name: "NY-Style Large Pie", basePrice: 18.00, label: "hand-tossed large 18-inch NY-style thin round crust" },
      gf: { tag: "GLUTEN-FRIENDLY CRUST", name: "Personal GF Pizza", basePrice: 14.00, label: "crispy 10-inch personal gluten-free crust" }
    };

    const sauceData = {
      pesto: { name: "Pesto", label: "striped with Grandma pesto sauce and fresh mozzarella", charge: 2.00 },
      classic: { name: "Classic Red", label: "spread with Old World tomato sauce and shredded whole milk mozzarella", charge: 0.00 },
      white: { name: "White Garlic", label: "slathered with white garlic ricotta cheese, dried oregano, and mozzarella", charge: 1.50 }
    };

    const toppingsData = {
      pepperoni: { name: "Pepperoni", label: "and loaded with premium crispy cup-and-char pepperoni slices", charge: 2.00 },
      peppadew: { name: "Peppadew", label: "and sprinkled with tangy sweet South African Peppadew peppers", charge: 1.50 },
      honey: { name: "Hot Honey", label: "and drizzled with fiery, organic hot honey syrup", charge: 1.00 },
      none: { name: "Cheese", label: "with standard cheese finish", charge: 0.00 }
    };

    function updatePizza() {
      const crustKey = crustSelect.value;
      const sauceKey = sauceSelect.value;
      const toppingsKey = toppingsSelect.value;

      const crust = crustData[crustKey];
      const sauce = sauceData[sauceKey];
      const toppings = toppingsData[toppingsKey];

      const totalPrice = crust.basePrice + sauce.charge + toppings.charge;

      const tagDisplay = document.getElementById('pz-tag-display');
      const titleDisplay = document.getElementById('pz-title-display');
      const priceDisplay = document.getElementById('pz-price-display');
      const descDisplay = document.getElementById('pz-desc-display');

      if (tagDisplay) tagDisplay.innerText = crust.tag;
      
      if (titleDisplay) {
        let titleName = toppingsKey === "none" ? `${crust.name}` : `${toppings.name} ${crust.name}`;
        if (toppingsKey === "honey") {
          titleName = `Hot Honey ${crust.name}`;
        }
        titleDisplay.innerText = titleName;
      }
      
      if (priceDisplay) priceDisplay.innerText = `$${totalPrice.toFixed(2)}`;

      if (descDisplay) {
        let desc = `Our signature pizza made on ${crust.label}, ${sauce.label} ${toppings.label}.`;
        descDisplay.innerText = desc;
      }

      // Update SVG Layers
      const layersToHide = [
        'svg-crust-grandma', 'svg-crust-nystyle', 'svg-crust-gf',
        'svg-sauce-pesto', 'svg-sauce-classic', 'svg-sauce-white',
        'svg-topping-pepperoni', 'svg-topping-peppadew', 'svg-topping-honey'
      ];
      layersToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Show crust
      const crustEl = document.getElementById(`svg-crust-${crustKey}`);
      if (crustEl) crustEl.classList.add('show');

      // Show sauce
      const sauceEl = document.getElementById(`svg-sauce-${sauceKey}`);
      if (sauceEl) sauceEl.classList.add('show');

      // Show toppings
      if (toppingsKey !== 'none') {
        const toppingEl = document.getElementById(`svg-topping-${toppingsKey}`);
        if (toppingEl) toppingEl.classList.add('show');
      }
    }

    crustSelect.addEventListener('change', updatePizza);
    sauceSelect.addEventListener('change', updatePizza);
    toppingsSelect.addEventListener('change', updatePizza);

    // Initial trigger
    updatePizza();
  }

  // 3. Pizza Finder Recommendation Widget (uptown.html)
  const finderForm = document.getElementById('finder-form');
  if (finderForm) {
    finderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const style = document.getElementById('personality-style').value;
      const hunger = document.getElementById('personality-hunger').value;
      const resultBox = document.getElementById('personality-result');
      const orderName = document.getElementById('personality-name');
      const orderDesc = document.getElementById('personality-desc');

      if (!style || !hunger) {
        if (resultBox) resultBox.classList.remove('show');
        return;
      }

      let name = "Signature Grandma Pie";
      let desc = "Baked square-thin Sicilian style crust striped with pesto, red sauce, and fresh mozzarella cheese.";

      if (style === 'classic') {
        if (hunger === 'slice') {
          name = "Double Plain Slices & Garlic Knot";
          desc = "Perfect for a quick Uptown lunch. Two traditional NY style cheese slices paired with a fresh-baked garlic knot.";
        } else {
          name = "18\" Large round NY Cheese Pie";
          desc = "Authentic hand-tossed boardwalk crust spread with Old World marinara and whole-milk shredded mozzarella.";
        }
      } else if (style === 'loaded') {
        name = "The Super Special Pie";
        desc = "Topped with premium pepperoni, crumbled sausage, sliced mushrooms, green bell peppers, and fresh onions.";
      } else if (style === 'spicy') {
        name = "The Hot Honey Specialty Pie";
        desc = "Our best seller! Loaded with spicy cup-and-char pepperoni rounds, sweet peppadew peppers, and organic hot honey glaze.";
      } else if (style === 'veggie') {
        name = "The Veggie Garden Pie";
        desc = "A lighter white garlic base loaded with fresh spinach leaves, sliced mushrooms, onions, and diced tomatoes.";
      } else if (style === 'gf') {
        name = "10\" Gluten-Friendly Cauliflower Pie";
        desc = "Personal cauliflower crust baked crispy with your choice of premium toppings.";
      }

      if (hunger === 'combo') {
        name += " + Boardwalk Feast Combo";
        desc += " Paired with hand-tied Garlic Knots and two sweet, chocolate chip filled mini Cannolis for dessert.";
      }

      if (orderName) orderName.textContent = name;
      if (orderDesc) orderDesc.textContent = desc;
      if (resultBox) resultBox.classList.add('show');
    });
  }
})();

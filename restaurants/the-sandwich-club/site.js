// The Sandwich Club - Uptown Charlotte Interactive Showcase Logic
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector(".tsc-mobile-toggle");
  const navLinks = document.querySelector(".tsc-nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 1. Triple-Decker & Melt Custom Builder
  const builderContainer = document.querySelector(".tsc-sandwich-builder");
  if (builderContainer) {
    const state = {
      bread: { name: "Triple-Stacked Toasted Wheat", price: 10.95, cal: 320 },
      protein: { name: "Homemade Tarragon Chicken Salad", price: 0, cal: 280 },
      cheese: { name: "Aged White Cheddar", price: 0, cal: 110 },
      spread: { name: "Herb Garlic Aioli", price: 0, cal: 60 },
      bacon: true,
      avocado: false,
      extraMeat: false
    };

    const updateDisplay = () => {
      let total = state.bread.price;
      let calories = state.bread.cal + state.protein.cal + state.cheese.cal + state.spread.cal;

      if (state.bacon) {
        total += 1.75;
        calories += 140;
      }
      if (state.avocado) {
        total += 1.95;
        calories += 120;
      }
      if (state.extraMeat) {
        total += 3.25;
        calories += 180;
      }

      const priceEl = document.getElementById("tsc-builder-price");
      const calEl = document.getElementById("tsc-builder-calories");
      const summaryEl = document.getElementById("tsc-builder-summary");

      if (priceEl) priceEl.textContent = `$${total.toFixed(2)}`;
      if (calEl) calEl.textContent = `${calories} kcal`;
      if (summaryEl) {
        const addons = [];
        if (state.bacon) addons.push("Hardwood Smoked Bacon");
        if (state.avocado) addons.push("Fresh Avocado Slices");
        if (state.extraMeat) addons.push("Double Deli Portion");
        const addonStr = addons.length > 0 ? ` + ${addons.join(" & ")}` : "";
        summaryEl.textContent = `${state.protein.name} with ${state.cheese.name} and ${state.spread.name} on ${state.bread.name}${addonStr}. Includes kettle chips and crisp deli pickle spear.`;
      }
    };

    // Bread selection
    document.querySelectorAll(".tsc-opt-bread").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tsc-opt-bread").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.bread = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Protein selection
    document.querySelectorAll(".tsc-opt-protein").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tsc-opt-protein").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.protein = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Cheese selection
    document.querySelectorAll(".tsc-opt-cheese").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tsc-opt-cheese").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.cheese = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Spread selection
    document.querySelectorAll(".tsc-opt-spread").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tsc-opt-spread").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.spread = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Toggles
    const baconToggle = document.getElementById("tsc-toggle-bacon");
    if (baconToggle) {
      baconToggle.addEventListener("click", () => {
        state.bacon = !state.bacon;
        baconToggle.classList.toggle("active", state.bacon);
        updateDisplay();
      });
    }

    const avoToggle = document.getElementById("tsc-toggle-avocado");
    if (avoToggle) {
      avoToggle.addEventListener("click", () => {
        state.avocado = !state.avocado;
        avoToggle.classList.toggle("active", state.avocado);
        updateDisplay();
      });
    }

    const meatToggle = document.getElementById("tsc-toggle-meat");
    if (meatToggle) {
      meatToggle.addEventListener("click", () => {
        state.extraMeat = !state.extraMeat;
        meatToggle.classList.toggle("active", state.extraMeat);
        updateDisplay();
      });
    }

    updateDisplay();
  }

  // 2. Breakfast Order Calculator
  const bkQty = document.getElementById("tsc-bk-qty");
  const bkItem = document.getElementById("tsc-bk-item");
  const bkCoffee = document.getElementById("tsc-bk-coffee");
  const bkTotalEl = document.getElementById("tsc-bk-total");
  const bkDescEl = document.getElementById("tsc-bk-desc");

  if (bkQty && bkItem && bkTotalEl) {
    const calcBk = () => {
      const qty = parseInt(bkQty.value, 10) || 1;
      const item = bkItem.value;
      let unitPrice = 5.95; // Buttermilk Biscuit

      if (item === "croissant") unitPrice = 7.25;
      if (item === "burrito") unitPrice = 7.95;

      let total = qty * unitPrice;
      if (bkCoffee && bkCoffee.checked) {
        total += qty * 2.75;
      }

      bkTotalEl.textContent = `$${total.toFixed(2)}`;
      if (bkDescEl) {
        bkDescEl.textContent = `Order includes ${qty} freshly grilled breakfast portions served piping hot from our 7:00 AM weekday kitchen at 435 S Tryon St.`;
      }
    };

    bkQty.addEventListener("input", calcBk);
    bkItem.addEventListener("change", calcBk);
    if (bkCoffee) bkCoffee.addEventListener("change", calcBk);
    calcBk();
  }

  // 3. Corporate Boxed Lunch Calculator
  const catGuests = document.getElementById("tsc-cat-guests");
  const catTier = document.getElementById("tsc-cat-tier");
  const catDrinks = document.getElementById("tsc-cat-drinks");
  const catTotalEl = document.getElementById("tsc-cat-total");
  const catSummaryEl = document.getElementById("tsc-cat-summary");

  if (catGuests && catTier && catTotalEl) {
    const calcCat = () => {
      const count = parseInt(catGuests.value, 10) || 15;
      const tier = catTier.value;
      let perPerson = 14.50; // Classic Box

      if (tier === "deluxe") perPerson = 17.00; // Deluxe with Sweet Girl Cookie & Gourmet Side

      let total = count * perPerson;
      if (catDrinks && catDrinks.checked) {
        total += count * 2.50;
      }

      catTotalEl.textContent = `$${total.toFixed(2)}`;
      if (catSummaryEl) {
        catSummaryEl.textContent = `Includes ${count} individually labeled custom deli boxed lunches with signature sandwiches, gourmet chips, homemade Sweet Girl cookies, dill pickle spears, napkins, and cutlery.`;
      }
    };

    catGuests.addEventListener("input", calcCat);
    catTier.addEventListener("change", calcCat);
    if (catDrinks) catDrinks.addEventListener("change", calcCat);
    calcCat();
  }
});

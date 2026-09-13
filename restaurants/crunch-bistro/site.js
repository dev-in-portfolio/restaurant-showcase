// Crunch Bistro - Uptown Charlotte Interactive Showcase Logic
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector(".crunch-mobile-toggle");
  const navLinks = document.querySelector(".crunch-nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 1. Chopped Salad & Grain Bowl Customizer
  const bowlContainer = document.querySelector(".crunch-bowl-builder");
  if (bowlContainer) {
    const state = {
      base: { name: "Organic Chopped Kale & Romaine", price: 11.50, cal: 110 },
      protein: { name: "Herb-Seared Chicken Breast", price: 0, cal: 180 },
      dressing: { name: "House Creamy Green Goddess", price: 0, cal: 90 },
      crunch: { name: "Spiced Crispy Chickpeas", price: 0, cal: 80 },
      avocado: true,
      goatCheese: false,
      extraProtein: false
    };

    const updateDisplay = () => {
      let total = state.base.price;
      let calories = state.base.cal + state.protein.cal + state.dressing.cal + state.crunch.cal;

      if (state.avocado) {
        total += 2.00;
        calories += 110;
      }
      if (state.goatCheese) {
        total += 1.75;
        calories += 90;
      }
      if (state.extraProtein) {
        total += 3.50;
        calories += 180;
      }

      const priceEl = document.getElementById("crunch-builder-price");
      const calEl = document.getElementById("crunch-builder-calories");
      const summaryEl = document.getElementById("crunch-builder-summary");

      if (priceEl) priceEl.textContent = `$${total.toFixed(2)}`;
      if (calEl) calEl.textContent = `${calories} kcal`;
      if (summaryEl) {
        const addons = [];
        if (state.avocado) addons.push("Fresh Hass Avocado");
        if (state.goatCheese) addons.push("Artisan Goat Cheese");
        if (state.extraProtein) addons.push("Double Protein Portion");
        const addonStr = addons.length > 0 ? ` + ${addons.join(" & ")}` : "";
        summaryEl.textContent = `${state.protein.name} over ${state.base.name} with ${state.dressing.name} and ${state.crunch.name}${addonStr}. Includes artisan multigrain crisps.`;
      }
    };

    // Base selection
    document.querySelectorAll(".crunch-opt-base").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".crunch-opt-base").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.base = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Protein selection
    document.querySelectorAll(".crunch-opt-protein").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".crunch-opt-protein").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.protein = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Dressing selection
    document.querySelectorAll(".crunch-opt-dressing").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".crunch-opt-dressing").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.dressing = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Crunch selection
    document.querySelectorAll(".crunch-opt-crunch").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".crunch-opt-crunch").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.crunch = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Toggles
    const avoToggle = document.getElementById("crunch-toggle-avocado");
    if (avoToggle) {
      avoToggle.addEventListener("click", () => {
        state.avocado = !state.avocado;
        avoToggle.classList.toggle("active", state.avocado);
        updateDisplay();
      });
    }

    const cheeseToggle = document.getElementById("crunch-toggle-cheese");
    if (cheeseToggle) {
      cheeseToggle.addEventListener("click", () => {
        state.goatCheese = !state.goatCheese;
        cheeseToggle.classList.toggle("active", state.goatCheese);
        updateDisplay();
      });
    }

    const proteinToggle = document.getElementById("crunch-toggle-protein");
    if (proteinToggle) {
      proteinToggle.addEventListener("click", () => {
        state.extraProtein = !state.extraProtein;
        proteinToggle.classList.toggle("active", state.extraProtein);
        updateDisplay();
      });
    }

    updateDisplay();
  }

  // 2. Acai Bowl Calculator
  const acaiSize = document.getElementById("crunch-acai-size");
  const acaiDrizzle = document.getElementById("crunch-acai-drizzle");
  const acaiTotalEl = document.getElementById("crunch-acai-total");
  const acaiDescEl = document.getElementById("crunch-acai-desc");

  if (acaiSize && acaiDrizzle && acaiTotalEl) {
    const calcAcai = () => {
      let total = 9.95; // Regular
      if (acaiSize.value === "large") total = 12.50;
      if (acaiDrizzle.value === "almond-butter") total += 1.50;

      acaiTotalEl.textContent = `$${total.toFixed(2)}`;
      if (acaiDescEl) {
        acaiDescEl.textContent = `Pure organic Brazilian açaí puree blended thick with banana, layered with GF coconut granola, fresh strawberries, blueberries, chia seeds, and your choice of superfood drizzle.`;
      }
    };

    acaiSize.addEventListener("change", calcAcai);
    acaiDrizzle.addEventListener("change", calcAcai);
    calcAcai();
  }

  // 3. Corporate Catering Calculator
  const catGuests = document.getElementById("crunch-cat-guests");
  const catTier = document.getElementById("crunch-cat-tier");
  const catAcai = document.getElementById("crunch-cat-acai");
  const catTotalEl = document.getElementById("crunch-cat-total");
  const catSummaryEl = document.getElementById("crunch-cat-summary");

  if (catGuests && catTier && catTotalEl) {
    const calcCat = () => {
      const count = parseInt(catGuests.value, 10) || 15;
      const tier = catTier.value;
      let perPerson = 14.50; // Individual Salad/Wrap Box

      if (tier === "grain-bar") perPerson = 17.50; // Quinoa Grain & Salad Buffet Bar

      let total = count * perPerson;
      if (catAcai && catAcai.checked) {
        total += count * 4.00;
      }

      catTotalEl.textContent = `$${total.toFixed(2)}`;
      if (catSummaryEl) {
        catSummaryEl.textContent = `Includes ${count} wellness-focused customized portions with house-made scratch dressings, fresh multigrain crisps, disposable eco-friendly cutlery, and tower messenger delivery coordination.`;
      }
    };

    catGuests.addEventListener("input", calcCat);
    catTier.addEventListener("change", calcCat);
    if (catAcai) catAcai.addEventListener("change", calcCat);
    calcCat();
  }
});

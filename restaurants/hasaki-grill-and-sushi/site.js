// Hasaki Grill & Sushi - Ally Center Uptown Charlotte Showcase Logic
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector(".hasaki-mobile-toggle");
  const navLinks = document.querySelector(".hasaki-nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 1. Interactive Hibachi & Bento Studio
  const bentoContainer = document.querySelector(".hasaki-bento-builder");
  if (bentoContainer) {
    const state = {
      protein: { name: "Hibachi Teriyaki Chicken", price: 13.95, cal: 380 },
      base: { name: "Teppan Hibachi Fried Rice", price: 0, cal: 260 },
      side: { name: "Pan-Seared Pork Gyoza (3 pcs)", price: 0, cal: 180 },
      sauce: { name: "Signature White Yum Yum Sauce", price: 0, cal: 120 },
      extraShrimp: false,
      extraNoodles: false
    };

    const updateDisplay = () => {
      let total = state.protein.price;
      let calories = state.protein.cal + state.base.cal + state.side.cal + state.sauce.cal;

      if (state.extraShrimp) {
        total += 4.50;
        calories += 140;
      }
      if (state.extraNoodles) {
        total += 3.00;
        calories += 220;
      }

      const priceEl = document.getElementById("hasaki-builder-price");
      const calEl = document.getElementById("hasaki-builder-calories");
      const summaryEl = document.getElementById("hasaki-builder-summary");

      if (priceEl) priceEl.textContent = `$${total.toFixed(2)}`;
      if (calEl) calEl.textContent = `${calories} kcal`;
      if (summaryEl) {
        const addons = [];
        if (state.extraShrimp) addons.push("Add Jumbo Gulf Shrimp (4 pcs)");
        if (state.extraNoodles) addons.push("Add Yakisoba Noodles");
        const addonStr = addons.length > 0 ? ` + ${addons.join(" & ")}` : "";
        summaryEl.textContent = `${state.protein.name} with ${state.base.name}, ${state.side.name}, and ${state.sauce.name}${addonStr}. Includes sweet hibachi zucchini, onions, mushrooms, and house ginger dressing salad.`;
      }
    };

    // Protein selection
    document.querySelectorAll(".hasaki-opt-protein").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".hasaki-opt-protein").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.protein = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Base selection
    document.querySelectorAll(".hasaki-opt-base").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".hasaki-opt-base").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.base = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Side selection
    document.querySelectorAll(".hasaki-opt-side").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".hasaki-opt-side").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.side = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Sauce selection
    document.querySelectorAll(".hasaki-opt-sauce").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".hasaki-opt-sauce").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.sauce = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Toggles
    const shrimpToggle = document.getElementById("hasaki-toggle-shrimp");
    if (shrimpToggle) {
      shrimpToggle.addEventListener("click", () => {
        state.extraShrimp = !state.extraShrimp;
        shrimpToggle.classList.toggle("active", state.extraShrimp);
        updateDisplay();
      });
    }

    const noodleToggle = document.getElementById("hasaki-toggle-noodles");
    if (noodleToggle) {
      noodleToggle.addEventListener("click", () => {
        state.extraNoodles = !state.extraNoodles;
        noodleToggle.classList.toggle("active", state.extraNoodles);
        updateDisplay();
      });
    }

    updateDisplay();
  }

  // 2. Corporate Catering Calculator
  const catGuests = document.getElementById("hasaki-cat-guests");
  const catTier = document.getElementById("hasaki-cat-tier");
  const catGyoza = document.getElementById("hasaki-cat-gyoza");
  const catTotalEl = document.getElementById("hasaki-cat-total");
  const catSummaryEl = document.getElementById("hasaki-cat-summary");

  if (catGuests && catTier && catTotalEl) {
    const calcCat = () => {
      const count = parseInt(catGuests.value, 10) || 15;
      const tier = catTier.value;
      let perPerson = 15.50; // Executive Bento Box

      if (tier === "hibachi-pans") perPerson = 18.00; // Sizzling Hibachi Buffet Pans
      if (tier === "sushi-grand") perPerson = 22.00; // Grand Sushi Platter & Nigiri Combo

      let total = count * perPerson;
      if (catGyoza && catGyoza.checked) {
        total += count * 3.50;
      }

      catTotalEl.textContent = `$${total.toFixed(2)}`;
      if (catSummaryEl) {
        catSummaryEl.textContent = `Corporate catering package for ${count} guests. Includes authentic Japanese presentation, individual chopsticks, soy sauce packets, wasabi, pickled ginger, and Yum Yum sauce bottles.`;
      }
    };

    catGuests.addEventListener("input", calcCat);
    catTier.addEventListener("change", calcCat);
    if (catGyoza) catGyoza.addEventListener("change", calcCat);
    calcCat();
  }
});

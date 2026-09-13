// Nirvana II / Nirvana Indian Fusion - Uptown Charlotte Showcase Logic
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector(".nirvana-mobile-toggle");
  const navLinks = document.querySelector(".nirvana-nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 1. Interactive Thali Lunch Box Builder
  const thaliContainer = document.querySelector(".nirvana-thali-builder");
  if (thaliContainer) {
    const state = {
      curry: { name: "Chicken Tikka Masala", price: 14.50, cal: 520 },
      rice: { name: "Aromatic Basmati Cumin Rice", price: 0, cal: 210 },
      bread: { name: "Butter Garlic Naan", price: 0, cal: 260 },
      side: { name: "Punjabi Samosa (1 pc) & Chutneys", price: 0, cal: 180 },
      drink: false,
      extraGulab: false
    };

    const updateDisplay = () => {
      let total = state.curry.price;
      let calories = state.curry.cal + state.rice.cal + state.bread.cal + state.side.cal;

      if (state.drink) {
        total += 3.95;
        calories += 210;
      }
      if (state.extraGulab) {
        total += 2.50;
        calories += 160;
      }

      const priceEl = document.getElementById("nirvana-thali-price");
      const calEl = document.getElementById("nirvana-thali-calories");
      const summaryEl = document.getElementById("nirvana-thali-summary");

      if (priceEl) priceEl.textContent = `$${total.toFixed(2)}`;
      if (calEl) calEl.textContent = `${calories} kcal`;
      if (summaryEl) {
        const addons = [];
        if (state.drink) addons.push("Chilled Mango Lassi");
        if (state.extraGulab) addons.push("Warm Gulab Jamun (2 pcs)");
        const addonStr = addons.length > 0 ? ` + ${addons.join(" & ")}` : "";
        summaryEl.textContent = `${state.curry.name} served with ${state.rice.name}, ${state.bread.name}, and ${state.side.name}${addonStr}. Includes cooling cucumber raita.`;
      }
    };

    // Curry selection
    document.querySelectorAll(".nirvana-opt-curry").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nirvana-opt-curry").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.curry = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Rice selection
    document.querySelectorAll(".nirvana-opt-rice").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nirvana-opt-rice").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.rice = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Bread selection
    document.querySelectorAll(".nirvana-opt-bread").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nirvana-opt-bread").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.bread = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Side selection
    document.querySelectorAll(".nirvana-opt-side").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nirvana-opt-side").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.side = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Toggles
    const lassiToggle = document.getElementById("nirvana-toggle-lassi");
    if (lassiToggle) {
      lassiToggle.addEventListener("click", () => {
        state.drink = !state.drink;
        lassiToggle.classList.toggle("active", state.drink);
        updateDisplay();
      });
    }

    const gulabToggle = document.getElementById("nirvana-toggle-gulab");
    if (gulabToggle) {
      gulabToggle.addEventListener("click", () => {
        state.extraGulab = !state.extraGulab;
        gulabToggle.classList.toggle("active", state.extraGulab);
        updateDisplay();
      });
    }

    updateDisplay();
  }

  // 2. Biryani Feast Calculator
  const biryaniQty = document.getElementById("nirvana-biryani-qty");
  const biryaniType = document.getElementById("nirvana-biryani-type");
  const biryaniTotalEl = document.getElementById("nirvana-biryani-total");
  const biryaniDescEl = document.getElementById("nirvana-biryani-desc");

  if (biryaniQty && biryaniType && biryaniTotalEl) {
    const calcBiryani = () => {
      const qty = parseInt(biryaniQty.value, 10) || 1;
      const type = biryaniType.value;
      let unitPrice = 13.95; // Veg

      if (type === "chicken") unitPrice = 15.50;
      if (type === "goat-lamb") unitPrice = 17.50;

      const subtotal = qty * unitPrice;
      biryaniTotalEl.textContent = `$${subtotal.toFixed(2)}`;
      if (biryaniDescEl) {
        biryaniDescEl.textContent = `Order includes ${qty} x Dum Biryani portions layered with aged saffron basmati, caramelized onions, whole spices, homemade cooling raita, and spicy Mirchi Ka Salan gravy.`;
      }
    };

    biryaniQty.addEventListener("input", calcBiryani);
    biryaniType.addEventListener("change", calcBiryani);
    calcBiryani();
  }

  // 3. Corporate Catering Calculator
  const catGuests = document.getElementById("nirvana-cat-guests");
  const catTier = document.getElementById("nirvana-cat-tier");
  const catDrink = document.getElementById("nirvana-cat-drink");
  const catTotalEl = document.getElementById("nirvana-cat-total");
  const catSummaryEl = document.getElementById("nirvana-cat-summary");

  if (catGuests && catTier && catTotalEl) {
    const calcCat = () => {
      const count = parseInt(catGuests.value, 10) || 15;
      const tier = catTier.value;
      let perPerson = 15.00; // Express Thali Box

      if (tier === "buffet-silver") perPerson = 18.50;
      if (tier === "buffet-gold") perPerson = 22.00;

      let total = count * perPerson;
      if (catDrink && catDrink.checked) {
        total += count * 3.50;
      }

      catTotalEl.textContent = `$${total.toFixed(2)}`;
      if (catSummaryEl) {
        catSummaryEl.textContent = `Estimated catering package for ${count} guests. Includes warm chaffing setups or individual labeled bento containers, fresh baked naan, rice, chutneys, and disposable cutlery.`;
      }
    };

    catGuests.addEventListener("input", calcCat);
    catTier.addEventListener("change", calcCat);
    if (catDrink) catDrink.addEventListener("change", calcCat);
    calcCat();
  }
});

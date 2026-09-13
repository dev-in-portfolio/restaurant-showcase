// Johnny Burrito - Uptown Charlotte Interactive Showcase Logic
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector(".jb-mobile-toggle");
  const navLinks = document.querySelector(".jb-nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 1. Walk-The-Line Burrito & Bowl Builder
  const builderContainer = document.querySelector(".jb-builder-container");
  if (builderContainer) {
    const state = {
      format: { name: "Regular Burrito (12-inch)", price: 9.75, cal: 580 },
      tortilla: { name: "Warm Flour Tortilla", price: 0, cal: 210 },
      protein: { name: "Citrus-Grilled Chicken", price: 0, cal: 180 },
      base: { name: "Johnny Rice & Black Beans", price: 0, cal: 220 },
      salsa: { name: "Medium Salsa Verde", price: 0, cal: 25 },
      guac: false,
      queso: false,
      extraMeat: false
    };

    const updateDisplay = () => {
      let total = state.format.price;
      let calories = state.format.cal + state.tortilla.cal + state.protein.cal + state.base.cal + state.salsa.cal;

      if (state.guac) {
        total += 2.25;
        calories += 150;
      }
      if (state.queso) {
        total += 2.00;
        calories += 160;
      }
      if (state.extraMeat) {
        total += 3.50;
        calories += 160;
      }

      const cashDiscountPrice = total * 0.95; // 5% Cash-Eesh savings

      const priceEl = document.getElementById("jb-builder-price");
      const cashEl = document.getElementById("jb-builder-cash-price");
      const calEl = document.getElementById("jb-builder-calories");
      const summaryTextEl = document.getElementById("jb-builder-summary-text");

      if (priceEl) priceEl.textContent = `$${total.toFixed(2)}`;
      if (cashEl) cashEl.textContent = `$${cashDiscountPrice.toFixed(2)}`;
      if (calEl) calEl.textContent = `${calories} kcal`;
      if (summaryTextEl) {
        const addons = [];
        if (state.guac) addons.push("Fresh Guacamole");
        if (state.queso) addons.push("Concourse Queso");
        if (state.extraMeat) addons.push("Double Protein");
        const addonStr = addons.length > 0 ? ` + ${addons.join(" & ")}` : "";
        summaryTextEl.textContent = `${state.format.name} on ${state.tortilla.name} with ${state.protein.name}, ${state.base.name}, ${state.salsa.name}${addonStr}.`;
      }
    };

    // Format selection
    document.querySelectorAll(".jb-opt-format").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".jb-opt-format").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.format = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Tortilla selection
    document.querySelectorAll(".jb-opt-tortilla").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".jb-opt-tortilla").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.tortilla = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Protein selection
    document.querySelectorAll(".jb-opt-protein").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".jb-opt-protein").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.protein = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Base selection
    document.querySelectorAll(".jb-opt-base").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".jb-opt-base").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.base = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Salsa selection
    document.querySelectorAll(".jb-opt-salsa").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".jb-opt-salsa").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.salsa = {
          name: btn.dataset.name,
          price: 0,
          cal: parseInt(btn.dataset.cal, 10)
        };
        updateDisplay();
      });
    });

    // Toggle add-ons
    const guacToggle = document.getElementById("jb-toggle-guac");
    if (guacToggle) {
      guacToggle.addEventListener("click", () => {
        state.guac = !state.guac;
        guacToggle.classList.toggle("active", state.guac);
        updateDisplay();
      });
    }

    const quesoToggle = document.getElementById("jb-toggle-queso");
    if (quesoToggle) {
      quesoToggle.addEventListener("click", () => {
        state.queso = !state.queso;
        quesoToggle.classList.toggle("active", state.queso);
        updateDisplay();
      });
    }

    const meatToggle = document.getElementById("jb-toggle-meat");
    if (meatToggle) {
      meatToggle.addEventListener("click", () => {
        state.extraMeat = !state.extraMeat;
        meatToggle.classList.toggle("active", state.extraMeat);
        updateDisplay();
      });
    }

    updateDisplay();
  }

  // 2. Tuesday / Friday Tamale Counter & Reserve Calculator
  const tamaleQty = document.getElementById("jb-tamale-qty");
  const tamaleFlavor = document.getElementById("jb-tamale-flavor");
  const tamaleOutput = document.getElementById("jb-tamale-output");
  const tamalePriceEl = document.getElementById("jb-tamale-price");

  if (tamaleQty && tamaleFlavor && tamaleOutput && tamalePriceEl) {
    const calcTamales = () => {
      const qty = parseInt(tamaleQty.value, 10) || 1;
      const flavor = tamaleFlavor.value;
      const unitPrice = 3.95;
      const dozenDiscount = qty >= 12 ? 0.90 : 1.00;
      const subtotal = qty * unitPrice * dozenDiscount;
      const cashSubtotal = subtotal * 0.95;

      tamalePriceEl.textContent = `$${subtotal.toFixed(2)} (Cash-Eesh: $${cashSubtotal.toFixed(2)})`;
      tamaleOutput.textContent = `Reservation estimation for ${qty} x ${flavor} Scratch Tamales. Steamed fresh Tuesday & Friday mornings in Two Wells Fargo Concourse.`;
    };

    tamaleQty.addEventListener("input", calcTamales);
    tamaleFlavor.addEventListener("change", calcTamales);
    calcTamales();
  }

  // 3. Salsa Heat Profile Explorer
  const salsaCards = document.querySelectorAll(".jb-salsa-card");
  const heatDetail = document.getElementById("jb-heat-detail-box");
  if (salsaCards.length > 0 && heatDetail) {
    salsaCards.forEach(card => {
      card.addEventListener("click", () => {
        salsaCards.forEach(c => c.style.borderColor = "var(--jb-border)");
        card.style.borderColor = "var(--jb-terracotta)";
        const name = card.dataset.name;
        const heat = card.dataset.heat;
        const scoville = card.dataset.scoville;
        const notes = card.dataset.notes;
        heatDetail.innerHTML = `
          <h4 style="font-family: var(--jb-font-display); color: var(--jb-terracotta); font-size: 1.25rem; margin-bottom: 6px;">${name} (Heat Level: ${heat}/5)</h4>
          <p style="font-size: 0.95rem; color: var(--jb-text-muted); margin-bottom: 6px;"><strong>Estimated Scoville:</strong> ${scoville}</p>
          <p style="font-size: 0.95rem; color: var(--jb-slate); line-height: 1.5;">${notes}</p>
        `;
      });
    });
  }

  // 4. Corporate Concourse Catering Calculator
  const cateringGuests = document.getElementById("jb-cat-guests");
  const cateringType = document.getElementById("jb-cat-type");
  const cateringSlushies = document.getElementById("jb-cat-slushies");
  const cateringTotalEl = document.getElementById("jb-cat-total");
  const cateringCashEl = document.getElementById("jb-cat-cash");
  const cateringBreakdownEl = document.getElementById("jb-cat-breakdown");

  if (cateringGuests && cateringType && cateringTotalEl) {
    const calcCatering = () => {
      const guests = parseInt(cateringGuests.value, 10) || 10;
      const type = cateringType.value;
      let perPerson = 13.50; // default burrito box

      if (type === "fiesta-bar") perPerson = 15.75;
      if (type === "tamale-fiesta") perPerson = 16.50;

      let total = guests * perPerson;
      if (cateringSlushies && cateringSlushies.checked) {
        total += guests * 3.00;
      }

      const cashTotal = total * 0.95;

      cateringTotalEl.textContent = `$${total.toFixed(2)}`;
      if (cateringCashEl) cateringCashEl.textContent = `$${cashTotal.toFixed(2)}`;
      if (cateringBreakdownEl) {
        cateringBreakdownEl.textContent = `Includes ${guests} customized portions, fresh tortilla chips, house salsa bar sampler, jalapeños, napkins, and serving utensils. Ready for express pick-up or Uptown tower messenger coordination.`;
      }
    };

    cateringGuests.addEventListener("input", calcCatering);
    cateringType.addEventListener("change", calcCatering);
    if (cateringSlushies) cateringSlushies.addEventListener("change", calcCatering);
    calcCatering();
  }
});

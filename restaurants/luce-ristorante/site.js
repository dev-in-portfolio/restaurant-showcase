// Luce Ristorante e Bar - Truist Center Plaza Interactive Showcase Logic
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector(".luce-mobile-toggle");
  const navLinks = document.querySelector(".luce-nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 1. Interactive Tuscan Tasting Menu Builder
  const tastingContainer = document.querySelector(".luce-tasting-builder");
  if (tastingContainer) {
    const state = {
      antipasti: { name: "Burrata Pugliese con Prosciutto di Parma", price: 18.00 },
      primi: { name: "Pappardelle al Cinghiale (Wild Boar Ragù)", price: 28.00 },
      secondi: { name: "Ossobuco di Vitello alla Milanese", price: 44.00 },
      winePairing: 0,
      wineTier: "No Wine Pairing Selected",
      dolci: true
    };

    const updateDisplay = () => {
      let total = state.antipasti.price + state.primi.price + state.secondi.price + state.winePairing;
      if (state.dolci) {
        total += 12.00; // Artisan Tiramisu / Panna Cotta
      }

      const priceEl = document.getElementById("luce-builder-price");
      const summaryEl = document.getElementById("luce-builder-summary");

      if (priceEl) priceEl.textContent = `$${total.toFixed(2)}`;
      if (summaryEl) {
        const dolciStr = state.dolci ? " + Espresso Tiramisù Tradizionale" : "";
        summaryEl.textContent = `${state.antipasti.name} followed by ${state.primi.name} and ${state.secondi.name}${dolciStr}. [Pairing: ${state.wineTier}]. Served with warm Tuscan focaccia and Sicilian olive oil.`;
      }
    };

    // Antipasti selection
    document.querySelectorAll(".luce-opt-antipasti").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".luce-opt-antipasti").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.antipasti = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price)
        };
        updateDisplay();
      });
    });

    // Primi selection
    document.querySelectorAll(".luce-opt-primi").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".luce-opt-primi").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.primi = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price)
        };
        updateDisplay();
      });
    });

    // Secondi selection
    document.querySelectorAll(".luce-opt-secondi").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".luce-opt-secondi").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.secondi = {
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price)
        };
        updateDisplay();
      });
    });

    // Wine pairing selection
    document.querySelectorAll(".luce-opt-wine").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".luce-opt-wine").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.winePairing = parseFloat(btn.dataset.price);
        state.wineTier = btn.dataset.name;
        updateDisplay();
      });
    });

    // Dolci toggle
    const dolciToggle = document.getElementById("luce-toggle-dolci");
    if (dolciToggle) {
      dolciToggle.addEventListener("click", () => {
        state.dolci = !state.dolci;
        dolciToggle.classList.toggle("active", state.dolci);
        updateDisplay();
      });
    }

    updateDisplay();
  }

  // 2. Private Dining Estimator
  const eventGuests = document.getElementById("luce-event-guests");
  const eventRoom = document.getElementById("luce-event-room");
  const eventMenu = document.getElementById("luce-event-menu");
  const eventTotalEl = document.getElementById("luce-event-total");
  const eventSummaryEl = document.getElementById("luce-event-summary");

  if (eventGuests && eventRoom && eventMenu && eventTotalEl) {
    const calcEvent = () => {
      const count = parseInt(eventGuests.value, 10) || 12;
      const menu = eventMenu.value;
      let perPerson = 85.00; // 3-course classic

      if (menu === "tuscan-feast") perPerson = 115.00;
      if (menu === "sommelier-grand") perPerson = 160.00;

      const total = count * perPerson;
      eventTotalEl.textContent = `$${total.toFixed(2)}`;
      if (eventSummaryEl) {
        eventSummaryEl.textContent = `Private event proposal for ${count} guests in the ${eventRoom.options[eventRoom.selectedIndex].text}. Includes personalized printed menu cards, dedicated Italian service staff, sommelier wine service, and 2-hour validated parking in Truist Center deck.`;
      }
    };

    eventGuests.addEventListener("input", calcEvent);
    eventRoom.addEventListener("change", calcEvent);
    eventMenu.addEventListener("change", calcEvent);
    calcEvent();
  }
});

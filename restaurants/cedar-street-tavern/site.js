/* ==========================================================================
   Cedar Street Tavern - Interactive Client Script (site.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.cst-mobile-toggle');
  const navLinks = document.querySelector('.cst-nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const tabBtns = document.querySelectorAll('.cst-tab-btn');
  const menuSections = document.querySelectorAll('.cst-menu-section');

  if (tabBtns.length > 0 && menuSections.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        menuSections.forEach(section => {
          if (category === 'all' || section.getAttribute('data-category') === category) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });
  }

  // Interactive Party Platter & Game Day Calculator
  const partySizeSelect = document.getElementById('cstPartySize');
  const platterTypeSelect = document.getElementById('cstPlatterType');
  const drinkPackageSelect = document.getElementById('cstDrinkPkg');
  const calcTotalDisplay = document.getElementById('cstCalcTotal');
  const calcBreakdownDisplay = document.getElementById('cstCalcBreakdown');

  function calculatePartyEstimate() {
    if (!partySizeSelect || !platterTypeSelect || !drinkPackageSelect || !calcTotalDisplay) return;

    const guestCount = parseInt(partySizeSelect.value, 10) || 10;
    const platterPricePerPerson = parseFloat(platterTypeSelect.value) || 16;
    const drinkPricePerPerson = parseFloat(drinkPackageSelect.value) || 12;

    const foodCost = guestCount * platterPricePerPerson;
    const drinkCost = guestCount * drinkPricePerPerson;
    const subtotal = foodCost + drinkCost;
    const serviceFee = subtotal * 0.15;
    const estimatedTotal = Math.round(subtotal + serviceFee);

    calcTotalDisplay.textContent = '$' + estimatedTotal;
    if (calcBreakdownDisplay) {
      calcBreakdownDisplay.textContent = guestCount + ' Guests | Food: $' + foodCost + ' | Drinks: $' + drinkCost + ' | Svc & Tax est: $' + Math.round(serviceFee);
    }
  }

  if (partySizeSelect && platterTypeSelect && drinkPackageSelect) {
    partySizeSelect.addEventListener('change', calculatePartyEstimate);
    platterTypeSelect.addEventListener('change', calculatePartyEstimate);
    drinkPackageSelect.addEventListener('change', calculatePartyEstimate);
    calculatePartyEstimate();
  }

  // Interactive Wing Heat Index Selector
  const sauceCards = document.querySelectorAll('.cst-sauce-card');
  const sauceDisplay = document.getElementById('cstSauceDetail');

  if (sauceCards.length > 0 && sauceDisplay) {
    sauceCards.forEach(card => {
      card.addEventListener('click', () => {
        sauceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const name = card.getAttribute('data-name');
        const heat = card.getAttribute('data-heat');
        const pairing = card.getAttribute('data-pairing');
        const notes = card.getAttribute('data-notes');

        sauceDisplay.innerHTML = '<strong>' + name + '</strong> (' + heat + ') &bull; Pairing: <em>' + pairing + '</em><br><span style="color:#5e6962; font-size:0.88rem;">' + notes + '</span>';
      });
    });
  }

  // Craft Flight Builder
  const flightSelects = document.querySelectorAll('.cst-flight-tap');
  const flightSummary = document.getElementById('cstFlightSummary');

  function updateFlightSummary() {
    if (!flightSummary || flightSelects.length === 0) return;
    const selectedBeers = [];
    flightSelects.forEach((select, index) => {
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption && selectedOption.value) {
        selectedBeers.push('Tap ' + (index + 1) + ': ' + selectedOption.text);
      }
    });

    if (selectedBeers.length === 4) {
      flightSummary.innerHTML = '<strong>Your Custom 4-Pour Flight ($14.00):</strong><br>' + selectedBeers.join(' &bull; ');
    } else {
      flightSummary.innerHTML = '<em>Select all 4 taps to finalize your flight combination.</em>';
    }
  }

  if (flightSelects.length > 0) {
    flightSelects.forEach(sel => sel.addEventListener('change', updateFlightSummary));
    updateFlightSummary();
  }
});

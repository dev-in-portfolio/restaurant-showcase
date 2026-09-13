/* ==========================================================================
   Cowbell Burger & Whiskey Bar - Interactive Client Script (site.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.cwb-mobile-toggle');
  const navLinks = document.querySelector('.cwb-nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const tabBtns = document.querySelectorAll('.cwb-tab-btn');
  const menuSections = document.querySelectorAll('.cwb-menu-section');

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

  // Interactive 3-Pour Whiskey Flight Composer
  const flightSelects = document.querySelectorAll('.cwb-flight-pour');
  const flightSummary = document.getElementById('cwbFlightSummary');

  function updateFlightSummary() {
    if (!flightSummary || flightSelects.length === 0) return;
    const selectedWhiskeys = [];
    flightSelects.forEach((select, index) => {
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption && selectedOption.value) {
        selectedWhiskeys.push('Pour ' + (index + 1) + ': ' + selectedOption.text);
      }
    });

    if (selectedWhiskeys.length === 3) {
      flightSummary.innerHTML = '<strong>Custom 3-Pour Whiskey Flight ($22.00):</strong><br>' + selectedWhiskeys.join(' &bull; ');
    } else {
      flightSummary.innerHTML = '<em>Select all 3 whiskey pours to compose your flight.</em>';
    }
  }

  if (flightSelects.length > 0) {
    flightSelects.forEach(sel => sel.addEventListener('change', updateFlightSummary));
    updateFlightSummary();
  }

  // Interactive Late Night & Party Platter Calculator
  const guestCountSelect = document.getElementById('cwbGuestCount');
  const sliderTierSelect = document.getElementById('cwbSliderTier');
  const drinkPkgSelect = document.getElementById('cwbDrinkPkg');
  const calcTotalDisplay = document.getElementById('cwbCalcTotal');
  const calcBreakdownDisplay = document.getElementById('cwbCalcBreakdown');

  function calculatePartyEstimate() {
    if (!guestCountSelect || !sliderTierSelect || !drinkPkgSelect || !calcTotalDisplay) return;

    const guestCount = parseInt(guestCountSelect.value, 10) || 8;
    const foodPrice = parseFloat(sliderTierSelect.value) || 16;
    const drinkPrice = parseFloat(drinkPkgSelect.value) || 15;

    const foodTotal = guestCount * foodPrice;
    const drinkTotal = guestCount * drinkPrice;
    const subtotal = foodTotal + drinkTotal;
    const gratuity = subtotal * 0.18;
    const total = Math.round(subtotal + gratuity);

    calcTotalDisplay.textContent = '$' + total;
    if (calcBreakdownDisplay) {
      calcBreakdownDisplay.textContent = guestCount + ' Guests | Sliders & Sides: $' + foodTotal + ' | Drinks: $' + drinkTotal + ' | Gratuity est: $' + Math.round(gratuity);
    }
  }

  if (guestCountSelect && sliderTierSelect && drinkPkgSelect) {
    guestCountSelect.addEventListener('change', calculatePartyEstimate);
    sliderTierSelect.addEventListener('change', calculatePartyEstimate);
    drinkPkgSelect.addEventListener('change', calculatePartyEstimate);
    calculatePartyEstimate();
  }
});

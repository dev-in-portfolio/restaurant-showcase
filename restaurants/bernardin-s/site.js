/* ==========================================================================
   Bernardin's Restaurant - Interactive Client Script (site.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.ber-mobile-toggle');
  const navLinks = document.querySelector('.ber-nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const tabBtns = document.querySelectorAll('.ber-tab-btn');
  const menuSections = document.querySelectorAll('.ber-menu-section');

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

  // Interactive Tasting Menu & Wine Pairing Composer
  const courseCountSelect = document.getElementById('berCourseCount');
  const wineTierSelect = document.getElementById('berWineTier');
  const guestCountSelect = document.getElementById('berGuestCount');
  const calcTotalDisplay = document.getElementById('berCalcTotal');
  const calcBreakdownDisplay = document.getElementById('berCalcBreakdown');

  function calculateTastingEstimate() {
    if (!courseCountSelect || !wineTierSelect || !guestCountSelect || !calcTotalDisplay) return;

    const guestCount = parseInt(guestCountSelect.value, 10) || 2;
    const foodPricePerPerson = parseFloat(courseCountSelect.value) || 85;
    const winePricePerPerson = parseFloat(wineTierSelect.value) || 45;

    const foodCost = guestCount * foodPricePerPerson;
    const wineCost = guestCount * winePricePerPerson;
    const subtotal = foodCost + wineCost;
    const taxAndGratuity = subtotal * 0.22;
    const estimatedTotal = Math.round(subtotal + taxAndGratuity);

    calcTotalDisplay.textContent = '$' + estimatedTotal;
    if (calcBreakdownDisplay) {
      calcBreakdownDisplay.textContent = guestCount + ' Guests | Dinner: $' + foodCost + ' | Wine Pairings: $' + wineCost + ' | Tax & Gratuity est: $' + Math.round(taxAndGratuity);
    }
  }

  if (courseCountSelect && wineTierSelect && guestCountSelect) {
    courseCountSelect.addEventListener('change', calculateTastingEstimate);
    wineTierSelect.addEventListener('change', calculateTastingEstimate);
    guestCountSelect.addEventListener('change', calculateTastingEstimate);
    calculateTastingEstimate();
  }

  // Interactive Sommelier Pairing Matrix
  const pairingCards = document.querySelectorAll('.ber-pairing-card');
  const pairingDisplay = document.getElementById('berPairingDetail');

  if (pairingCards.length > 0 && pairingDisplay) {
    pairingCards.forEach(card => {
      card.addEventListener('click', () => {
        pairingCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const dish = card.getAttribute('data-dish');
        const wine = card.getAttribute('data-wine');
        const notes = card.getAttribute('data-notes');

        pairingDisplay.innerHTML = '<strong>' + dish + '</strong> &bull; Sommelier Selection: <em>' + wine + '</em><br><span style="color:#5c6470; font-size:0.88rem;">' + notes + '</span>';
      });
    });
  }
});

// Halfpenny's Cafe - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const mobileToggle = document.querySelector('.halfpenny-mobile-toggle');
  const navLinks = document.getElementById('main-nav');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('show');
    });
  }

  // Menu Category Filtering
  const filterButtons = document.querySelectorAll('.halfpenny-filter-btn');
  const menuCards = document.querySelectorAll('.halfpenny-menu-item');

  if (filterButtons.length > 0 && menuCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        menuCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Morning Meeting & Catering Calculator
  const calcGroupSize = document.getElementById('hp-calc-guests');
  const calcPackageType = document.getElementById('hp-calc-type');
  const calcOutput = document.getElementById('hp-calc-output');

  if (calcGroupSize && calcPackageType && calcOutput) {
    function updateHalfpennyEstimate() {
      const guests = parseInt(calcGroupSize.value, 10) || 10;
      const type = calcPackageType.value;

      let carafes = Math.ceil(guests / 8);
      let biscuits = guests;
      let estPrice = guests * 14.5;

      let detailText = '';
      if (type === 'breakfast') {
        detailText = `${biscuits} Made-to-Order Hot Buttermilk Biscuit Sandwiches (Bacon, Sausage & Egg Cheese), ${carafes} Box(es) of 96oz Fresh Drip Coffee, and Crispy Hashbrowns. Estimated Total: ~$${estPrice}`;
      } else if (type === 'deli') {
        detailText = `${guests} Executive Deli Box Lunches (Triple Decker Clubs, Tarragon Chicken Salad, Turkey Avocado) with Kettle Chips & Deli Pickles. Estimated Total: ~$${guests * 15.5}`;
      } else {
        detailText = `Full Morning Boardroom Buffet with Custom Omelet Trays, Fruit Bowls, Bagels, and ${carafes} Coffee Travelers. Estimated Total: ~$${guests * 17}`;
      }

      calcOutput.innerHTML = `<strong>Curated Concourse Catering for ${guests} Guests:</strong><br>${detailText}<br><small style="color:#64748b; display:block; margin-top:6px;">Call (704) 342-9697 to schedule pickup or tower delivery.</small>`;
    }

    calcGroupSize.addEventListener('change', updateHalfpennyEstimate);
    calcPackageType.addEventListener('change', updateHalfpennyEstimate);
    updateHalfpennyEstimate();
  }
});

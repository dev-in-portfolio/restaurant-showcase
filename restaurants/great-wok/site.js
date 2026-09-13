// Great Wok - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const mobileToggle = document.querySelector('.gw-mobile-toggle');
  const navLinks = document.getElementById('main-nav');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('show');
    });
  }

  // Menu Category Filtering
  const filterButtons = document.querySelectorAll('.gw-filter-btn');
  const menuCards = document.querySelectorAll('.gw-menu-item');

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

  // Family Feast & Catering Estimator
  const calcGroupSize = document.getElementById('gw-calc-guests');
  const calcPackageType = document.getElementById('gw-calc-type');
  const calcOutput = document.getElementById('gw-calc-output');

  if (calcGroupSize && calcPackageType && calcOutput) {
    function updateGreatWokEstimate() {
      const guests = parseInt(calcGroupSize.value, 10) || 10;
      const type = calcPackageType.value;

      let eggRolls = guests;
      let pans = Math.ceil(guests / 6);
      let estPrice = guests * 14;

      let detailText = '';
      if (type === 'family') {
        detailText = `${eggRolls} Egg Rolls & Crab Rangoons, ${pans} Large Pans of General Tso's Chicken, ${pans} Pans of House Lo Mein, and Steamed Pork Fried Rice. Estimated Total: ~$${estPrice}`;
      } else if (type === 'office') {
        detailText = `${guests} Individual Combination Bento Boxes (Entree + Pork Fried Rice + Egg Roll) + Drink. Estimated Total: ~$${guests * 13.5}`;
      } else {
        detailText = `Deluxe Party Buffet with ${pans} Pans of Honey Walnut Shrimp, Sesame Chicken, Singapore Mei Fun, and Steamed Dumplings. Estimated Total: ~$${guests * 17}`;
      }

      calcOutput.innerHTML = `<strong>Curated Chinese Feast for ${guests} Guests:</strong><br>${detailText}<br><small style="color:#64748b; display:block; margin-top:6px;">Call (704) 333-0080 to place pickup or catering orders.</small>`;
    }

    calcGroupSize.addEventListener('change', updateGreatWokEstimate);
    calcPackageType.addEventListener('change', updateGreatWokEstimate);
    updateGreatWokEstimate();
  }
});

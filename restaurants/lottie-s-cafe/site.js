// Lottie's Cafe - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const mobileToggle = document.querySelector('.lottie-mobile-toggle');
  const navLinks = document.getElementById('main-nav');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('show');
    });
  }

  // Menu Category Filtering
  const filterButtons = document.querySelectorAll('.lottie-filter-btn');
  const menuCards = document.querySelectorAll('.lottie-menu-item');

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
  const calcGroupSize = document.getElementById('lottie-calc-guests');
  const calcPackageType = document.getElementById('lottie-calc-type');
  const calcOutput = document.getElementById('lottie-calc-output');

  if (calcGroupSize && calcPackageType && calcOutput) {
    function updateLottiesEstimate() {
      const guests = parseInt(calcGroupSize.value, 10) || 10;
      const type = calcPackageType.value;

      let carafes = Math.ceil(guests / 8);
      let sandwiches = guests;
      let estPrice = guests * 15;

      let detailText = '';
      if (type === 'breakfast') {
        detailText = `${sandwiches} Assorted Breakfast Brioche Sandwiches & Beattie's Bagels, ${carafes} Box(es) of 96oz Fresh Drip Coffee with cream/sugar, and Fresh Fruit Bowl. Estimated Total: ~$${estPrice}`;
      } else if (type === 'pastry') {
        detailText = `${Math.ceil(guests * 1.5)} Fresh Baked French Croissants, Scones & Danishes, with ${carafes} 96oz Coffee Box(es). Estimated Total: ~$${guests * 11}`;
      } else {
        detailText = `${sandwiches} Artisan Lunch Paninis (Turkey Avocado, Caprese, Roast Beef), Individual Kettle Chips, and Cold Brew Jugs. Estimated Total: ~$${guests * 16.5}`;
      }

      calcOutput.innerHTML = `<strong>Curated Morning Package for ${guests} Guests:</strong><br>${detailText}<br><small style="color:#78716c; display:block; margin-top:6px;">Call (704) 789-3135 to coordinate exact delivery or pickup timing.</small>`;
    }

    calcGroupSize.addEventListener('change', updateLottiesEstimate);
    calcPackageType.addEventListener('change', updateLottiesEstimate);
    updateLottiesEstimate();
  }
});

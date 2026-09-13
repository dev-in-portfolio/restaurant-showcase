// Basil Thai Cuisine - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const mobileToggle = document.querySelector('.basil-mobile-toggle');
  const navLinks = document.getElementById('main-nav');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('show');
    });
  }

  // Menu Category Filtering
  const filterButtons = document.querySelectorAll('.basil-filter-btn');
  const menuCards = document.querySelectorAll('.basil-menu-item');

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

  // Executive Lunch & Catering Calculator
  const calcGroupSize = document.getElementById('basil-calc-guests');
  const calcPackageType = document.getElementById('basil-calc-type');
  const calcOutput = document.getElementById('basil-calc-output');

  if (calcGroupSize && calcPackageType && calcOutput) {
    function updateBasilEstimate() {
      const guests = parseInt(calcGroupSize.value, 10) || 10;
      const type = calcPackageType.value;

      let rolls = guests * 2;
      let entrees = Math.ceil(guests * 0.9);
      let curries = Math.ceil(guests / 5);
      let estPrice = guests * 18;

      let detailText = '';
      if (type === 'executive') {
        detailText = `${guests} Executive Thai Bento Sets (choice of Basil Duck, Pad Thai, or Green Curry + Basil Roll & Jasmine Rice). Estimated Total: ~$${guests * 19}`;
      } else if (type === 'buffet') {
        detailText = `${rolls} Fresh Basil Rolls, ${Math.ceil(guests / 6)} Large Trays of Pad Thai, ${curries} Half-Pans of Masaman Curry with Jasmine Rice. Estimated Total: ~$${estPrice}`;
      } else {
        detailText = `Chef Specialty Platter featuring Crispy Chilean Sea Bass, Duck Medallions, Pad See Eu, and Thai Tea. Estimated Total: ~$${guests * 26}`;
      }

      calcOutput.innerHTML = `<strong>Curated Thai Feast for ${guests} Guests:</strong><br>${detailText}<br><small style="color:#64748b; display:block; margin-top:6px;">Call (704) 332-7212 to confirm timing and dietary customizations.</small>`;
    }

    calcGroupSize.addEventListener('change', updateBasilEstimate);
    calcPackageType.addEventListener('change', updateBasilEstimate);
    updateBasilEstimate();
  }
});

// Cheers Mate Bar & Lounge - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const mobileToggle = document.querySelector('.cm-mobile-toggle');
  const navLinks = document.getElementById('main-nav');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('show');
    });
  }

  // Menu Category Filtering
  const filterButtons = document.querySelectorAll('.cm-filter-btn');
  const menuCards = document.querySelectorAll('.cm-menu-item');

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

  // Gameday & Party Calculator
  const calcGroupSize = document.getElementById('cm-calc-guests');
  const calcPackageType = document.getElementById('cm-calc-type');
  const calcOutput = document.getElementById('cm-calc-output');

  if (calcGroupSize && calcPackageType && calcOutput) {
    function updateCheersMateEstimate() {
      const guests = parseInt(calcGroupSize.value, 10) || 10;
      const type = calcPackageType.value;

      let sliders = guests * 2;
      let wings = Math.ceil(guests * 3);
      let friesTrays = Math.ceil(guests / 6);
      let estPrice = guests * 17;

      let detailText = '';
      if (type === 'gameday') {
        detailText = `${sliders} Assorted Sliders (2AM & Crispy Chicken), ${wings} Jumbo Wings (Lemon Pepper & Buffalo), ${friesTrays} Loaded Truffle Fries Trays. Estimated Total: ~$${estPrice}`;
      } else if (type === 'brunch') {
        detailText = `${guests} Chicken & Waffles Platters, Breakfast Taco Boxes, and Mimosa Carafes. Estimated Total: ~$${guests * 20}`;
      } else {
        detailText = `VIP Booth Lounge Access with ${sliders} Sliders, ${wings} Wings, and Dedicated Cocktail Pitchers. Estimated Total: ~$${guests * 25}`;
      }

      calcOutput.innerHTML = `<strong>Recommended Package for ${guests} Guests:</strong><br>${detailText}<br><small style="color:#64748b; display:block; margin-top:6px;">Call (980) 299-9000 to reserve your party section or place takeout orders.</small>`;
    }

    calcGroupSize.addEventListener('change', updateCheersMateEstimate);
    calcPackageType.addEventListener('change', updateCheersMateEstimate);
    updateCheersMateEstimate();
  }
});

// French Quarter Restaurant - Interactive Functionality

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const mobileToggle = document.querySelector('.fq-mobile-toggle');
  const navLinks = document.getElementById('main-nav');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('show');
    });
  }

  // Menu Category Filtering
  const filterButtons = document.querySelectorAll('.fq-filter-btn');
  const menuCards = document.querySelectorAll('.fq-menu-item');

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

  // Tailgate & Catering Calculator
  const calcGroupSize = document.getElementById('fq-calc-guests');
  const calcOccasion = document.getElementById('fq-calc-type');
  const calcResultBox = document.getElementById('fq-calc-output');

  if (calcGroupSize && calcOccasion && calcResultBox) {
    function updateCateringEstimate() {
      const guests = parseInt(calcGroupSize.value, 10) || 10;
      const type = calcOccasion.value;

      let wings = Math.ceil(guests * 3.5);
      let sliders = guests * 2;
      let gumboPans = Math.ceil(guests / 12);
      let estPrice = guests * 16;

      let detailText = '';
      if (type === 'tailgate') {
        detailText = `${wings} Salt & Pepper Wings, ${sliders} French Dip & Monte Cristo Sliders, and ${gumboPans} Pan(s) of Cajun Rice & Gumbo. Estimated Package: ~$${estPrice}`;
      } else if (type === 'office') {
        detailText = `${sliders} Assorted Po'boy Sliders, ${Math.ceil(guests / 8)} Large Bowls of Cajun Chicken Pasta, and Mixed House Salad. Estimated Package: ~$${estPrice - (guests * 2)}`;
      } else {
        detailText = `${Math.ceil(guests / 10)} Gumbo & Jambalaya Pots, ${wings} Wings, and French Bread Baskets. Estimated Package: ~$${estPrice + 20}`;
      }

      calcResultBox.innerHTML = `<strong>Recommended Party Spread (${guests} Guests):</strong><br>${detailText}<br><small style="color:#6b7280; display:block; margin-top:6px;">Call (704) 377-1715 to place your customized catering or tailgate pickup order.</small>`;
    }

    calcGroupSize.addEventListener('change', updateCateringEstimate);
    calcOccasion.addEventListener('change', updateCateringEstimate);
    updateCateringEstimate();
  }
});

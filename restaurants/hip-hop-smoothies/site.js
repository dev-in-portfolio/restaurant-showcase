// Hip Hop Smoothies - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.hhs-nav-toggle');
  const navList = document.querySelector('.hhs-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.hhs-filter-btn');
  const menuItems = document.querySelectorAll('.hhs-menu-item');
  if (filterBtns.length > 0 && menuItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');

        menuItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Interactive Mobile Pop-Up & Event Catering Estimator
  const guestSlider = document.getElementById('hhs-guest-count');
  const guestDisplay = document.getElementById('hhs-guest-display');
  const styleSelect = document.getElementById('hhs-platter-style');
  const smoothieTotal = document.getElementById('hhs-smoothie-total');
  const bowlTotal = document.getElementById('hhs-bowl-total');
  const boostTotal = document.getElementById('hhs-boost-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' People';

    const isBowlFocus = styleSelect && styleSelect.value === 'bowls';
    const smoothies = isBowlFocus ? Math.ceil(guests * 0.5) : guests;
    const bowls = isBowlFocus ? guests : Math.ceil(guests * 0.4);
    const boosts = guests;

    if (smoothieTotal) smoothieTotal.textContent = smoothies + ' 16oz Smoothies';
    if (bowlTotal) bowlTotal.textContent = bowls + ' Acai / Pitaya Bowls';
    if (boostTotal) boostTotal.textContent = boosts + ' Superfood Boosts';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

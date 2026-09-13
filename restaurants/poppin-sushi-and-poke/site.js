// Poppin Sushi & Poke - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.poppin-nav-toggle');
  const navList = document.querySelector('.poppin-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.poppin-filter-btn');
  const menuItems = document.querySelectorAll('.poppin-menu-item');
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

  // Interactive Poke & Sushi Catering Estimator
  const guestSlider = document.getElementById('poppin-guest-count');
  const guestDisplay = document.getElementById('poppin-guest-display');
  const styleSelect = document.getElementById('poppin-platter-style');
  const rollTotal = document.getElementById('poppin-roll-total');
  const pokeTotal = document.getElementById('poppin-poke-total');
  const gyozaTotal = document.getElementById('poppin-gyoza-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' Guests';

    const isRollFocused = styleSelect && styleSelect.value === 'rolls';
    const rolls = isRollFocused ? guests * 10 : Math.ceil(guests * 6);
    const pokeBowls = isRollFocused ? Math.ceil(guests * 0.3) : Math.ceil(guests * 0.7);
    const gyozaCount = guests * 2;

    if (rollTotal) rollTotal.textContent = rolls + ' Specialty Roll Pieces';
    if (pokeTotal) pokeTotal.textContent = pokeBowls + ' Mini Poke Bowls';
    if (gyozaTotal) gyozaTotal.textContent = gyozaCount + ' Pan-Seared Gyoza';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

// La Cocina Mexicana - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.cocina-nav-toggle');
  const navList = document.querySelector('.cocina-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.cocina-filter-btn');
  const menuItems = document.querySelectorAll('.cocina-menu-item');
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

  // Interactive Catering / Party Platter Estimator
  const guestSlider = document.getElementById('cocina-guest-count');
  const guestDisplay = document.getElementById('cocina-guest-display');
  const styleSelect = document.getElementById('cocina-platter-style');
  const tacoTotal = document.getElementById('cocina-taco-total');
  const sideTotal = document.getElementById('cocina-side-total');
  const salsaTotal = document.getElementById('cocina-salsa-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' Guests';

    const multiplier = styleSelect && styleSelect.value === 'hearty' ? 4 : 3;
    const tacos = guests * multiplier;
    const sidePounds = (guests * 0.35).toFixed(1);
    const salsaPints = Math.max(1, Math.ceil(guests / 8));

    if (tacoTotal) tacoTotal.textContent = tacos + ' Tacos';
    if (sideTotal) sideTotal.textContent = sidePounds + ' lbs (Rice & Beans)';
    if (salsaTotal) salsaTotal.textContent = salsaPints + ' Pints Salsa & Chips';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

// Jamile’s Cuisine International - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.jamile-nav-toggle');
  const navList = document.querySelector('.jamile-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.jamile-filter-btn');
  const menuItems = document.querySelectorAll('.jamile-menu-item');
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

  // Interactive Communal Feast & Catering Estimator
  const guestSlider = document.getElementById('jamile-guest-count');
  const guestDisplay = document.getElementById('jamile-guest-display');
  const styleSelect = document.getElementById('jamile-platter-style');
  const meatTotal = document.getElementById('jamile-meat-total');
  const riceTotal = document.getElementById('jamile-rice-total');
  const sambusaTotal = document.getElementById('jamile-sambusa-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' Guests';

    const isFeast = styleSelect && styleSelect.value === 'grand-feast';
    const meatLbs = isFeast ? (guests * 0.85).toFixed(1) : (guests * 0.6).toFixed(1);
    const riceLbs = (guests * 0.5).toFixed(1);
    const sambusas = guests * 2;

    if (meatTotal) meatTotal.textContent = meatLbs + ' lbs Spiced Goat & Beef';
    if (riceTotal) riceTotal.textContent = riceLbs + ' lbs Bariis Iskukaris';
    if (sambusaTotal) sambusaTotal.textContent = sambusas + ' Golden Sambusas';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

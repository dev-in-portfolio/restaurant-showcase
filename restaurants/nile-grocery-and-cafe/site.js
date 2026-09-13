// Nile Grocery & Cafe - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nile-nav-toggle');
  const navList = document.querySelector('.nile-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.nile-filter-btn');
  const menuItems = document.querySelectorAll('.nile-menu-item');
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

  // Interactive Messob Feast & Event Estimator
  const guestSlider = document.getElementById('nile-guest-count');
  const guestDisplay = document.getElementById('nile-guest-display');
  const styleSelect = document.getElementById('nile-platter-style');
  const injeraTotal = document.getElementById('nile-injera-total');
  const watTotal = document.getElementById('nile-wat-total');
  const coffeeTotal = document.getElementById('nile-coffee-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' People';

    const isVegan = styleSelect && styleSelect.value === 'vegan-only';
    const injeraRolls = guests * 3;
    const watPounds = (guests * 0.7).toFixed(1);
    const coffeePots = Math.max(1, Math.ceil(guests / 6));

    if (injeraTotal) injeraTotal.textContent = injeraRolls + ' Fresh Teff Injera Rolls';
    if (watTotal) watTotal.textContent = watPounds + ' lbs ' + (isVegan ? 'Vegan Beyaynetu' : 'Mixed Wats & Tibs');
    if (coffeeTotal) coffeeTotal.textContent = coffeePots + ' Jebena Coffee Pots';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

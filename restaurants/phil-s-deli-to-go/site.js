// Phil’s Deli To Go - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.pdeli-nav-toggle');
  const navList = document.querySelector('.pdeli-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.pdeli-filter-btn');
  const menuItems = document.querySelectorAll('.pdeli-menu-item');
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

  // Interactive Catering & Office Box Lunch Estimator
  const guestSlider = document.getElementById('pdeli-guest-count');
  const guestDisplay = document.getElementById('pdeli-guest-display');
  const styleSelect = document.getElementById('pdeli-platter-style');
  const sandwichTotal = document.getElementById('pdeli-sandwich-total');
  const sideTotal = document.getElementById('pdeli-side-total');
  const pickleTotal = document.getElementById('pdeli-pickle-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' People';

    const isBoxed = styleSelect && styleSelect.value === 'boxed';
    const sandwiches = isBoxed ? guests : Math.ceil(guests * 1.25);
    const sidePounds = (guests * 0.4).toFixed(1);
    const pickles = guests;

    if (sandwichTotal) sandwichTotal.textContent = sandwiches + ' Sandwiches';
    if (sideTotal) sideTotal.textContent = sidePounds + ' lbs (Potato / Slaw)';
    if (pickleTotal) pickleTotal.textContent = pickles + ' Kosher Spear Halves';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

// Kilimanjaro Kitchen - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.kili-nav-toggle');
  const navList = document.querySelector('.kili-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.kili-filter-btn');
  const menuItems = document.querySelectorAll('.kili-menu-item');
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

  // Interactive Communal Banquet Estimator
  const guestSlider = document.getElementById('kili-guest-count');
  const guestDisplay = document.getElementById('kili-guest-display');
  const styleSelect = document.getElementById('kili-platter-style');
  const meatTotal = document.getElementById('kili-meat-total');
  const riceTotal = document.getElementById('kili-rice-total');
  const breadTotal = document.getElementById('kili-bread-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' Diners';

    const isGrand = styleSelect && styleSelect.value === 'grand';
    const meatLbs = isGrand ? (guests * 0.9).toFixed(1) : (guests * 0.65).toFixed(1);
    const riceLbs = (guests * 0.55).toFixed(1);
    const breadCount = guests;

    if (meatTotal) meatTotal.textContent = meatLbs + ' lbs Lamb Shank & Goat';
    if (riceTotal) riceTotal.textContent = riceLbs + ' lbs Spiced Basmati Rice';
    if (breadTotal) breadTotal.textContent = breadCount + ' Fresh Chapati / Malawax';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

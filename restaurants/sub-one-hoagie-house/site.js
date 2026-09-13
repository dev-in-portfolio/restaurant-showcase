// Sub One Hoagie House - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.subone-nav-toggle');
  const navList = document.querySelector('.subone-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.subone-filter-btn');
  const menuItems = document.querySelectorAll('.subone-menu-item');
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

  // Interactive Catering & Party Box Estimator
  const guestSlider = document.getElementById('subone-guest-count');
  const guestDisplay = document.getElementById('subone-guest-display');
  const styleSelect = document.getElementById('subone-platter-style');
  const subTotal = document.getElementById('subone-sub-total');
  const chipTotal = document.getElementById('subone-chip-total');
  const teaTotal = document.getElementById('subone-tea-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' People';

    const isParty = styleSelect && styleSelect.value === 'party';
    const wholeSubs = isParty ? Math.ceil(guests * 0.75) : guests;
    const chipsBags = guests;
    const teaGallons = Math.max(1, Math.ceil(guests / 10));

    if (subTotal) subTotal.textContent = wholeSubs + ' Whole Hoagies (Cut & Boxed)';
    if (chipTotal) chipTotal.textContent = chipsBags + ' Bags Kettle Chips';
    if (teaTotal) teaTotal.textContent = teaGallons + ' Gallons Sweet Tea';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

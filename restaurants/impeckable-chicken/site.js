// Impeckable Chicken - Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.impeck-nav-toggle');
  const navList = document.querySelector('.impeck-nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      const expanded = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Interactive Menu Category Filter
  const filterBtns = document.querySelectorAll('.impeck-filter-btn');
  const menuItems = document.querySelectorAll('.impeck-menu-item');
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

  // Interactive Office & Party Tender Estimator
  const guestSlider = document.getElementById('impeck-guest-count');
  const guestDisplay = document.getElementById('impeck-guest-display');
  const styleSelect = document.getElementById('impeck-platter-style');
  const tenderTotal = document.getElementById('impeck-tender-total');
  const fryTotal = document.getElementById('impeck-fry-total');
  const sauceTotal = document.getElementById('impeck-sauce-total');

  function updateCateringEstimates() {
    if (!guestSlider || !guestDisplay) return;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.textContent = guests + ' People';

    const isParty = styleSelect && styleSelect.value === 'tenders-wings';
    const tenders = isParty ? guests * 3 : guests * 4;
    const friesPounds = (guests * 0.35).toFixed(1);
    const sauces = guests * 2;

    if (tenderTotal) tenderTotal.textContent = tenders + ' Crispy Tenders';
    if (fryTotal) fryTotal.textContent = friesPounds + ' lbs Seasoned Waffle Fries';
    if (sauceTotal) sauceTotal.textContent = sauces + ' Dipping Sauce Cups';
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', updateCateringEstimates);
  }
  if (styleSelect) {
    styleSelect.addEventListener('change', updateCateringEstimates);
  }
});

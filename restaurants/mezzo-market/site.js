// Mezzo Market - Interactive Client Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mzo-mobile-toggle');
  const navMenu = document.querySelector('.mzo-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Interactive Menu Filter
  const filterBtns = document.querySelectorAll('.mzo-filter-btn');
  const menuItems = document.querySelectorAll('.mzo-menu-item');
  if (filterBtns.length > 0 && menuItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        menuItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Mezze Board & Picnic Basket Calculator
  const guestSelect = document.getElementById('mzo-calc-guests');
  const packageSelect = document.getElementById('mzo-calc-package');
  const addOns = document.querySelectorAll('.mzo-calc-addon');
  const totalDisplay = document.getElementById('mzo-calc-total');

  function calculateEstimate() {
    if (!totalDisplay || !packageSelect || !guestSelect) return;
    
    let basePrice = 0;
    const pkg = packageSelect.value;
    const guests = parseInt(guestSelect.value, 10) || 4;

    if (pkg === 'picnic') {
      basePrice = guests * 24;
    } else if (pkg === 'mezze-board') {
      basePrice = guests * 28;
    } else if (pkg === 'pizza-feast') {
      basePrice = Math.max(85, guests * 22);
    } else if (pkg === 'grand-market') {
      basePrice = guests * 42;
    }

    let addOnTotal = 0;
    addOns.forEach(cb => {
      if (cb.checked) {
        addOnTotal += parseFloat(cb.value) || 0;
      }
    });

    const total = basePrice + addOnTotal;
    totalDisplay.textContent = '$' + total.toLocaleString('en-US');
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateEstimate);
  if (packageSelect) packageSelect.addEventListener('change', calculateEstimate);
  if (addOns.length > 0) {
    addOns.forEach(cb => cb.addEventListener('change', calculateEstimate));
  }
  calculateEstimate();
});

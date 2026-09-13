// Guatelinda - Interactive Client Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.gtl-mobile-toggle');
  const navMenu = document.querySelector('.gtl-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Interactive Menu Filter
  const filterBtns = document.querySelectorAll('.gtl-filter-btn');
  const menuItems = document.querySelectorAll('.gtl-menu-item');
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

  // Bakery & Event Calculator
  const guestSelect = document.getElementById('gtl-calc-guests');
  const pkgSelect = document.getElementById('gtl-calc-package');
  const addOns = document.querySelectorAll('.gtl-calc-addon');
  const totalDisplay = document.getElementById('gtl-calc-total');

  function calculateEstimate() {
    if (!totalDisplay || !pkgSelect || !guestSelect) return;
    
    let basePrice = 0;
    const pkg = pkgSelect.value;
    const guests = parseInt(guestSelect.value, 10) || 6;

    if (pkg === 'pan-dulce-box') {
      basePrice = Math.max(24, guests * 4);
    } else if (pkg === 'tamales-pan-pack') {
      basePrice = Math.max(48, guests * 8);
    } else if (pkg === 'pepian-banquet') {
      basePrice = Math.max(90, guests * 15);
    } else if (pkg === 'fiesta-guatemalteca') {
      basePrice = Math.max(150, guests * 24);
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
  if (pkgSelect) pkgSelect.addEventListener('change', calculateEstimate);
  if (addOns.length > 0) {
    addOns.forEach(cb => cb.addEventListener('change', calculateEstimate));
  }
  calculateEstimate();
});

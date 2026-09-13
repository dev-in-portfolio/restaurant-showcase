// China Bowl - Interactive Client Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.cbw-mobile-toggle');
  const navMenu = document.querySelector('.cbw-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Interactive Menu Filter
  const filterBtns = document.querySelectorAll('.cbw-filter-btn');
  const menuItems = document.querySelectorAll('.cbw-menu-item');
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

  // Family Feast & Party Tray Calculator
  const guestSelect = document.getElementById('cbw-calc-guests');
  const feastSelect = document.getElementById('cbw-calc-feast');
  const addOns = document.querySelectorAll('.cbw-calc-addon');
  const totalDisplay = document.getElementById('cbw-calc-total');

  function calculateEstimate() {
    if (!totalDisplay || !feastSelect || !guestSelect) return;
    
    let basePrice = 0;
    const feast = feastSelect.value;
    const guests = parseInt(guestSelect.value, 10) || 4;

    if (feast === 'family-dinner-a') {
      basePrice = Math.max(48, guests * 12);
    } else if (feast === 'family-dinner-b') {
      basePrice = Math.max(64, guests * 16);
    } else if (feast === 'dragon-banquet') {
      basePrice = Math.max(88, guests * 22);
    } else if (feast === 'catering-party-trays') {
      basePrice = Math.max(120, guests * 28);
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
  if (feastSelect) feastSelect.addEventListener('change', calculateEstimate);
  if (addOns.length > 0) {
    addOns.forEach(cb => cb.addEventListener('change', calculateEstimate));
  }
  calculateEstimate();
});

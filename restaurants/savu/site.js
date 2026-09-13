// SAVU Charlotte - Interactive Client Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.savu-mobile-toggle');
  const navMenu = document.querySelector('.savu-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Interactive Menu Filter
  const filterBtns = document.querySelectorAll('.savu-filter-btn');
  const menuItems = document.querySelectorAll('.savu-menu-item');
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

  // VIP Party & Bottle Service Calculator
  const guestSelect = document.getElementById('savu-calc-guests');
  const tierSelect = document.getElementById('savu-calc-tier');
  const addOns = document.querySelectorAll('.savu-calc-addon');
  const totalDisplay = document.getElementById('savu-calc-total');

  function calculateEstimate() {
    if (!totalDisplay || !tierSelect || !guestSelect) return;
    
    let basePrice = 0;
    const tier = tierSelect.value;
    const guests = parseInt(guestSelect.value, 10) || 4;

    if (tier === 'dinner') {
      basePrice = guests * 85;
    } else if (tier === 'vip-lounge') {
      basePrice = Math.max(500, guests * 110);
    } else if (tier === 'mezzanine-bottle') {
      basePrice = Math.max(950, guests * 140);
    } else if (tier === 'celebration-supreme') {
      basePrice = Math.max(1600, guests * 190);
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
  if (tierSelect) tierSelect.addEventListener('change', calculateEstimate);
  if (addOns.length > 0) {
    addOns.forEach(cb => cb.addEventListener('change', calculateEstimate));
  }
  calculateEstimate();
});

// Akahana Asian Bistro - Interactive Client Script
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.akh-mobile-toggle');
  const navMenu = document.querySelector('.akh-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Interactive Menu Filter
  const filterBtns = document.querySelectorAll('.akh-filter-btn');
  const menuItems = document.querySelectorAll('.akh-menu-item');
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

  // Sushi Platter & Catering Calculator
  const guestSelect = document.getElementById('akh-calc-guests');
  const platterSelect = document.getElementById('akh-calc-platter');
  const addOns = document.querySelectorAll('.akh-calc-addon');
  const totalDisplay = document.getElementById('akh-calc-total');

  function calculateEstimate() {
    if (!totalDisplay || !platterSelect || !guestSelect) return;
    
    let basePrice = 0;
    const platter = platterSelect.value;
    const guests = parseInt(guestSelect.value, 10) || 4;

    if (platter === 'maki-sampler') {
      basePrice = Math.max(55, guests * 14);
    } else if (platter === 'sushi-sashimi-deluxe') {
      basePrice = Math.max(95, guests * 24);
    } else if (platter === 'chef-omakase-boat') {
      basePrice = Math.max(140, guests * 35);
    } else if (platter === 'bistro-party-spread') {
      basePrice = Math.max(180, guests * 45);
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
  if (platterSelect) platterSelect.addEventListener('change', calculateEstimate);
  if (addOns.length > 0) {
    addOns.forEach(cb => cb.addEventListener('change', calculateEstimate));
  }
  calculateEstimate();
});

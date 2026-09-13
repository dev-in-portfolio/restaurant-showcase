// Nica Chapin Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.nicachapin-mobile-toggle');
  const navLinks = document.querySelector('.nicachapin-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Filter Tabs
  const tabButtons = document.querySelectorAll('.nicachapin-tab-btn');
  const menuGroups = document.querySelectorAll('.nicachapin-menu-group');
  if (tabButtons.length > 0 && menuGroups.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        tabButtons.forEach(b => b.classList.remove('active'));
        menuGroups.forEach(g => g.classList.remove('active'));
        
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetGroup = document.getElementById(targetId);
        if (targetGroup) {
          targetGroup.classList.add('active');
        }
      });
    });
  }

  // Accordion Toggles
  const accordionHeaders = document.querySelectorAll('.nicachapin-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.nicachapin-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.nicachapin-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.nicachapin-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Central American Feast & Platter Calculator
  const guestsSlider = document.getElementById('calc-guests');
  const guestsDisplay = document.getElementById('calc-guests-val');
  const specialtySelect = document.getElementById('calc-specialty');
  const sidesSelect = document.getElementById('calc-sides');
  const priceDisplay = document.getElementById('calc-total-price');
  const nacatamalDisplay = document.getElementById('calc-nacatamal-count');
  const galloPintoDisplay = document.getElementById('calc-pinto-pans');

  function updateCalculator() {
    if (!guestsSlider || !specialtySelect || !sidesSelect || !priceDisplay) return;
    
    const guests = parseInt(guestsSlider.value, 10);
    if (guestsDisplay) {
      guestsDisplay.textContent = guests + ' Guests';
    }

    const specialtyRate = parseFloat(specialtySelect.value);
    const sideRate = parseFloat(sidesSelect.value);

    // Nacatamal calculation: 1 hearty nacatamal per guest
    const nacatamales = guests;
    // Gallo Pinto pans: ~15 guests per medium catering pan
    const pintoPans = Math.ceil(guests / 15);

    const total = (guests * specialtyRate) + (guests * sideRate);

    if (nacatamalDisplay) {
      nacatamalDisplay.textContent = nacatamales + ' Fresh Steamed Nacatamales';
    }
    if (galloPintoDisplay) {
      galloPintoDisplay.textContent = pintoPans + ' Pan(s) of Gallo Pinto / Rice';
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (guestsSlider) {
    guestsSlider.addEventListener('input', updateCalculator);
  }
  if (specialtySelect) {
    specialtySelect.addEventListener('change', updateCalculator);
  }
  if (sidesSelect) {
    sidesSelect.addEventListener('change', updateCalculator);
  }
  updateCalculator();
});

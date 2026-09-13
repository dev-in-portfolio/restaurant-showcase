// La Caridad Cocina Latina Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.caridad-mobile-toggle');
  const navLinks = document.querySelector('.caridad-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Filter Tabs
  const tabButtons = document.querySelectorAll('.caridad-tab-btn');
  const menuGroups = document.querySelectorAll('.caridad-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.caridad-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.caridad-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.caridad-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.caridad-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Catering & Family Platter Calculator
  const guestsSlider = document.getElementById('calc-guests');
  const guestsDisplay = document.getElementById('calc-guests-val');
  const proteinSelect = document.getElementById('calc-protein');
  const sideSelect = document.getElementById('calc-side');
  const priceDisplay = document.getElementById('calc-total-price');
  const pansDisplay = document.getElementById('calc-pans');
  const sidesDisplay = document.getElementById('calc-sides-pans');

  function updateCalculator() {
    if (!guestsSlider || !proteinSelect || !sideSelect || !priceDisplay) return;
    
    const guests = parseInt(guestsSlider.value, 10);
    if (guestsDisplay) {
      guestsDisplay.textContent = guests + ' Guests';
    }

    const proteinRate = parseFloat(proteinSelect.value);
    const sideRate = parseFloat(sideSelect.value);

    // Estimate pans needed: ~10 guests per small pan, ~20 per large pan
    const largePans = Math.ceil(guests / 20);
    const sidePans = Math.ceil(guests / 15);

    const totalEstimate = Math.round((guests * (proteinRate + sideRate)) * 100) / 100;

    if (pansDisplay) {
      pansDisplay.textContent = largePans + ' Large Tray(s)';
    }
    if (sidesDisplay) {
      sidesDisplay.textContent = sidePans + ' Medium Pan(s)';
    }
    priceDisplay.textContent = '$' + totalEstimate.toFixed(2);
  }

  if (guestsSlider) {
    guestsSlider.addEventListener('input', updateCalculator);
  }
  if (proteinSelect) {
    proteinSelect.addEventListener('change', updateCalculator);
  }
  if (sideSelect) {
    sideSelect.addEventListener('change', updateCalculator);
  }
  updateCalculator();
});

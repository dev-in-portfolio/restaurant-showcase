// Valhalla Pub & Eatery Interactive Script
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.valhalla-mobile-toggle');
  const navLinks = document.querySelector('.valhalla-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Tabs
  const tabButtons = document.querySelectorAll('.valhalla-tab-btn');
  const menuGroups = document.querySelectorAll('.valhalla-menu-group');
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

  // Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.valhalla-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.valhalla-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.valhalla-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.valhalla-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Feast & Tailgate Estimator
  const partySlider = document.getElementById('calc-party-size');
  const partyDisplay = document.getElementById('calc-party-size-val');
  const tierSelect = document.getElementById('calc-feast-tier');
  const drinkSelect = document.getElementById('calc-drink-addon');
  const priceDisplay = document.getElementById('calc-total-price');
  const foodDisplay = document.getElementById('calc-food-details');
  const sidesDisplay = document.getElementById('calc-sides-details');

  function updateFeastCalculator() {
    if (!partySlider || !tierSelect || !drinkSelect || !priceDisplay) return;

    const count = parseInt(partySlider.value, 10);
    if (partyDisplay) {
      partyDisplay.textContent = count + ' Vikings / Guests';
    }

    const tierRate = parseFloat(tierSelect.value);
    const drinkRate = parseFloat(drinkSelect.value);

    const total = count * (tierRate + drinkRate);

    const meatballs = count * 3;
    const wings = count * 3;

    if (foodDisplay) {
      foodDisplay.textContent = 'Feeds ' + count + ' Guests: Includes ~' + meatballs + ' Norwegian Meatballs, ' + wings + ' Smoked Wings & Hearty Pub Sliders';
    }
    if (sidesDisplay) {
      sidesDisplay.textContent = 'Includes Large Pans of Yukon Mashed Potatoes, Lingonberry Jam, Cream Gravy & Pub Fries';
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (partySlider) {
    partySlider.addEventListener('input', updateFeastCalculator);
  }
  if (tierSelect) {
    tierSelect.addEventListener('change', updateFeastCalculator);
  }
  if (drinkSelect) {
    drinkSelect.addEventListener('change', updateFeastCalculator);
  }
  updateFeastCalculator();
});

// Red Ginger Interactive Script
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.redginger-mobile-toggle');
  const navLinks = document.querySelector('.redginger-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Tabs
  const tabButtons = document.querySelectorAll('.redginger-tab-btn');
  const menuGroups = document.querySelectorAll('.redginger-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.redginger-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.redginger-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.redginger-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.redginger-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Private Dining & Event Estimator
  const partySlider = document.getElementById('calc-party-size');
  const partyDisplay = document.getElementById('calc-party-size-val');
  const tierSelect = document.getElementById('calc-dining-tier');
  const loungeSelect = document.getElementById('calc-lounge-addon');
  const priceDisplay = document.getElementById('calc-total-price');
  const tablesDisplay = document.getElementById('calc-tables-info');
  const coursesDisplay = document.getElementById('calc-courses-info');

  function updateEventCalculator() {
    if (!partySlider || !tierSelect || !loungeSelect || !priceDisplay) return;

    const count = parseInt(partySlider.value, 10);
    if (partyDisplay) {
      partyDisplay.textContent = count + ' Guests';
    }

    const tierRate = parseFloat(tierSelect.value);
    const loungeRate = parseFloat(loungeSelect.value);

    const total = count * (tierRate + loungeRate);

    // 8-10 guests per teppan grill table
    const tables = Math.ceil(count / 8);

    if (tablesDisplay) {
      tablesDisplay.textContent = 'Accommodates in ' + tables + ' Dedicated Teppanyaki Chef Table(s) / Private Lounge Area';
    }
    if (coursesDisplay) {
      coursesDisplay.textContent = 'Includes Soup, House Salad, Hibachi Vegetables, Fried Rice, Noodles, and Sorbet';
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (partySlider) {
    partySlider.addEventListener('input', updateEventCalculator);
  }
  if (tierSelect) {
    tierSelect.addEventListener('change', updateEventCalculator);
  }
  if (loungeSelect) {
    loungeSelect.addEventListener('change', updateEventCalculator);
  }
  updateEventCalculator();
});

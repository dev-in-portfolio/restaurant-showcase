// Las Megas Tortas Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.megas-mobile-toggle');
  const navLinks = document.querySelector('.megas-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Filter Tabs
  const tabButtons = document.querySelectorAll('.megas-tab-btn');
  const menuGroups = document.querySelectorAll('.megas-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.megas-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.megas-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.megas-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.megas-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Torta & Party Box Calculator
  const sandwichesSlider = document.getElementById('calc-sandwiches');
  const sandwichesDisplay = document.getElementById('calc-sandwiches-val');
  const tortaTypeSelect = document.getElementById('calc-torta-type');
  const sidesSelect = document.getElementById('calc-sides');
  const priceDisplay = document.getElementById('calc-total-price');
  const feedDisplay = document.getElementById('calc-feed-count');
  const aguasDisplay = document.getElementById('calc-aguas-count');

  function updateCalculator() {
    if (!sandwichesSlider || !tortaTypeSelect || !sidesSelect || !priceDisplay) return;
    
    const count = parseInt(sandwichesSlider.value, 10);
    if (sandwichesDisplay) {
      sandwichesDisplay.textContent = count + ' Mega Tortas';
    }

    const tortaPrice = parseFloat(tortaTypeSelect.value);
    const sidePrice = parseFloat(sidesSelect.value);

    // Each giant torta easily feeds 1.5 - 2 adults
    const estimatedPeople = Math.round(count * 1.6);
    const jugsAguas = Math.ceil(count / 4);

    const total = (count * tortaPrice) + (count * sidePrice);

    if (feedDisplay) {
      feedDisplay.textContent = 'Feeds ~' + estimatedPeople + ' Hungry People';
    }
    if (aguasDisplay) {
      aguasDisplay.textContent = jugsAguas + ' Gal Vitrolero Jug(s)';
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (sandwichesSlider) {
    sandwichesSlider.addEventListener('input', updateCalculator);
  }
  if (tortaTypeSelect) {
    tortaTypeSelect.addEventListener('change', updateCalculator);
  }
  if (sidesSelect) {
    sidesSelect.addEventListener('change', updateCalculator);
  }
  updateCalculator();
});

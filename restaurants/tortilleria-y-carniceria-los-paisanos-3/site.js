// Tortilleria Y Carnicer?a Los Paisanos 3 Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.paisanos3-mobile-toggle');
  const navLinks = document.querySelector('.paisanos3-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Filter Tabs
  const tabButtons = document.querySelectorAll('.paisanos3-tab-btn');
  const menuGroups = document.querySelectorAll('.paisanos3-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.paisanos3-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.paisanos3-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.paisanos3-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.paisanos3-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Carnitas & Fiesta Calculator
  const poundsSlider = document.getElementById('calc-pounds');
  const poundsDisplay = document.getElementById('calc-pounds-val');
  const meatSelect = document.getElementById('calc-meat');
  const packageSelect = document.getElementById('calc-pkg');
  const priceDisplay = document.getElementById('calc-total-price');
  const peopleDisplay = document.getElementById('calc-people-count');
  const tortillasDisplay = document.getElementById('calc-tortilla-count');

  function updateCalculator() {
    if (!poundsSlider || !meatSelect || !packageSelect || !priceDisplay) return;
    
    const lbs = parseInt(poundsSlider.value, 10);
    if (poundsDisplay) {
      poundsDisplay.textContent = lbs + ' Lbs of Meat';
    }

    const meatRate = parseFloat(meatSelect.value);
    const pkgRate = parseFloat(packageSelect.value);

    // Rule of thumb: ~0.5 lb of carnitas/meat per person
    const people = Math.round(lbs * 2);
    // ~1.5 lbs of fresh tortillas per 2 lbs of meat
    const tortillaKilos = Math.ceil((lbs * 0.75) * 10) / 10;

    const total = (lbs * meatRate) + (lbs * pkgRate);

    if (peopleDisplay) {
      peopleDisplay.textContent = 'Feeds ~' + people + ' Guests (3-4 tacos each)';
    }
    if (tortillasDisplay) {
      tortillasDisplay.textContent = tortillaKilos + ' Lbs of Hot Nixtamal Tortillas';
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (poundsSlider) {
    poundsSlider.addEventListener('input', updateCalculator);
  }
  if (meatSelect) {
    meatSelect.addEventListener('change', updateCalculator);
  }
  if (packageSelect) {
    packageSelect.addEventListener('change', updateCalculator);
  }
  updateCalculator();
});

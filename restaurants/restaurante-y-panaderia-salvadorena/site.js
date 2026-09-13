// Restaurante Y Panaderia Salvadore?a Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.salvadorena-mobile-toggle');
  const navLinks = document.querySelector('.salvadorena-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Filter Tabs
  const tabButtons = document.querySelectorAll('.salvadorena-tab-btn');
  const menuGroups = document.querySelectorAll('.salvadorena-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.salvadorena-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.salvadorena-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.salvadorena-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.salvadorena-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Pupusa & Bakery Party Calculator
  const pupusasSlider = document.getElementById('calc-pupusas');
  const pupusasDisplay = document.getElementById('calc-pupusas-val');
  const pupusaSelect = document.getElementById('calc-pupusa-type');
  const bakerySelect = document.getElementById('calc-bakery');
  const priceDisplay = document.getElementById('calc-total-price');
  const curtidoDisplay = document.getElementById('calc-curtido-jars');
  const feedsDisplay = document.getElementById('calc-feeds-count');

  function updateCalculator() {
    if (!pupusasSlider || !pupusaSelect || !bakerySelect || !priceDisplay) return;
    
    const count = parseInt(pupusasSlider.value, 10);
    if (pupusasDisplay) {
      pupusasDisplay.textContent = count + ' Handcrafted Pupusas';
    }

    const pupusaRate = parseFloat(pupusaSelect.value);
    const bakeryRate = parseFloat(bakerySelect.value);

    // 3 pupusas per hungry adult
    const people = Math.round(count / 3);
    const curtidoQuarts = Math.ceil(count / 12);

    const total = (count * pupusaRate) + (count * bakeryRate);

    if (feedsDisplay) {
      feedsDisplay.textContent = 'Feeds ~' + people + ' Guests (3 pupusas each)';
    }
    if (curtidoDisplay) {
      curtidoDisplay.textContent = curtidoQuarts + ' Quart Jar(s) of Tangy Curtido & Salsa';
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (pupusasSlider) {
    pupusasSlider.addEventListener('input', updateCalculator);
  }
  if (pupusaSelect) {
    pupusaSelect.addEventListener('change', updateCalculator);
  }
  if (bakerySelect) {
    bakerySelect.addEventListener('change', updateCalculator);
  }
  updateCalculator();
});

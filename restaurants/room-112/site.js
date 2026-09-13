// Room 112 Interactive Script
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.room112-mobile-toggle');
  const navLinks = document.querySelector('.room112-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Tabs
  const tabButtons = document.querySelectorAll('.room112-tab-btn');
  const menuGroups = document.querySelectorAll('.room112-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.room112-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.room112-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.room112-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.room112-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Catering & Platter Estimator
  const partySlider = document.getElementById('calc-party-size');
  const partyDisplay = document.getElementById('calc-party-size-val');
  const tierSelect = document.getElementById('calc-platter-tier');
  const dimsumSelect = document.getElementById('calc-dimsum-addon');
  const priceDisplay = document.getElementById('calc-total-price');
  const pieceDisplay = document.getElementById('calc-piece-info');
  const sidesDisplay = document.getElementById('calc-sides-info');

  function updateCateringCalculator() {
    if (!partySlider || !tierSelect || !dimsumSelect || !priceDisplay) return;

    const count = parseInt(partySlider.value, 10);
    if (partyDisplay) {
      partyDisplay.textContent = count + ' Guests / Colleagues';
    }

    const tierRate = parseFloat(tierSelect.value);
    const dimsumRate = parseFloat(dimsumSelect.value);

    const total = count * (tierRate + dimsumRate);

    // 5 pieces per guest
    const totalPieces = count * 5;
    const trays = Math.ceil(totalPieces / 36);

    if (pieceDisplay) {
      pieceDisplay.textContent = 'Approx. ' + totalPieces + ' Handcrafted Pieces (~' + trays + ' Room 112 Signature Trays)';
    }
    if (sidesDisplay) {
      sidesDisplay.textContent = 'Includes House Aged Soy, Wasabi, Pickled Ginger & Chopstick Sets for ' + count;
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (partySlider) {
    partySlider.addEventListener('input', updateCateringCalculator);
  }
  if (tierSelect) {
    tierSelect.addEventListener('change', updateCateringCalculator);
  }
  if (dimsumSelect) {
    dimsumSelect.addEventListener('change', updateCateringCalculator);
  }
  updateCateringCalculator();
});

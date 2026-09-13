// K.O. Sushi Interactive Script
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.kosushi-mobile-toggle');
  const navLinks = document.querySelector('.kosushi-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Tabs
  const tabButtons = document.querySelectorAll('.kosushi-tab-btn');
  const menuGroups = document.querySelectorAll('.kosushi-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.kosushi-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.kosushi-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.kosushi-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.kosushi-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Corporate Catering & Platter Estimator
  const peopleSlider = document.getElementById('calc-people');
  const peopleDisplay = document.getElementById('calc-people-val');
  const tierSelect = document.getElementById('calc-platter-tier');
  const hotSelect = document.getElementById('calc-hot-addon');
  const priceDisplay = document.getElementById('calc-total-price');
  const pieceDisplay = document.getElementById('calc-piece-count');
  const sidesDisplay = document.getElementById('calc-catering-sides');

  function updateCateringCalculator() {
    if (!peopleSlider || !tierSelect || !hotSelect || !priceDisplay) return;

    const count = parseInt(peopleSlider.value, 10);
    if (peopleDisplay) {
      peopleDisplay.textContent = count + ' Guests / Colleagues';
    }

    const tierRate = parseFloat(tierSelect.value);
    const hotRate = parseFloat(hotSelect.value);

    const total = count * (tierRate + hotRate);

    // 4-5 sushi pieces per person
    const totalPieces = count * 5;
    const platters = Math.ceil(totalPieces / 38);

    if (pieceDisplay) {
      pieceDisplay.textContent = 'Approx. ' + totalPieces + ' Handcrafted Pieces (~' + platters + ' Party Platter Trays)';
    }
    if (sidesDisplay) {
      sidesDisplay.textContent = 'Includes Pickled Ginger, Real Wasabi, Low-Sodium Soy & Chopsticks for ' + count;
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (peopleSlider) {
    peopleSlider.addEventListener('input', updateCateringCalculator);
  }
  if (tierSelect) {
    tierSelect.addEventListener('change', updateCateringCalculator);
  }
  if (hotSelect) {
    hotSelect.addEventListener('change', updateCateringCalculator);
  }
  updateCateringCalculator();
});

// K’s Asian Xpress Interactive Script
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.ksasian-mobile-toggle');
  const navLinks = document.querySelector('.ksasian-nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      const isExpanded = navLinks.classList.contains('show');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Menu Category Tabs
  const tabButtons = document.querySelectorAll('.ksasian-tab-btn');
  const menuGroups = document.querySelectorAll('.ksasian-menu-group');
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
  const accordionHeaders = document.querySelectorAll('.ksasian-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');
      
      document.querySelectorAll('.ksasian-accordion').forEach(acc => {
        acc.classList.remove('open');
        const icon = acc.querySelector('.ksasian-accordion-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isOpen) {
        parent.classList.add('open');
        const icon = header.querySelector('.ksasian-accordion-icon');
        if (icon) icon.textContent = '-';
      }
    });
  });

  // Catering & Party Combo Estimator
  const guestsSlider = document.getElementById('calc-guests');
  const guestsDisplay = document.getElementById('calc-guests-val');
  const packageSelect = document.getElementById('calc-package-type');
  const dimsumSelect = document.getElementById('calc-dimsum-addon');
  const priceDisplay = document.getElementById('calc-total-price');
  const sidesDisplay = document.getElementById('calc-sides-info');
  const feedsDisplay = document.getElementById('calc-feeds-count');

  function updateCateringCalculator() {
    if (!guestsSlider || !packageSelect || !dimsumSelect || !priceDisplay) return;

    const count = parseInt(guestsSlider.value, 10);
    if (guestsDisplay) {
      guestsDisplay.textContent = count + ' Guests';
    }

    const packageRate = parseFloat(packageSelect.value);
    const addonRate = parseFloat(dimsumSelect.value);

    const total = count * (packageRate + addonRate);

    // Rice & Yum Yum sauce calculation
    const friedRicePans = Math.ceil(count / 10);
    const yumYumPints = Math.ceil(count / 8);

    if (feedsDisplay) {
      feedsDisplay.textContent = 'Serves ' + count + ' Hungry Guests with Generous Entree Portions';
    }
    if (sidesDisplay) {
      sidesDisplay.textContent = 'Includes ' + friedRicePans + ' Large Pan(s) of Fried Rice/Noodles + ' + yumYumPints + ' Pint(s) of Yum Yum Sauce';
    }
    priceDisplay.textContent = '$' + total.toFixed(2);
  }

  if (guestsSlider) {
    guestsSlider.addEventListener('input', updateCateringCalculator);
  }
  if (packageSelect) {
    packageSelect.addEventListener('change', updateCateringCalculator);
  }
  if (dimsumSelect) {
    dimsumSelect.addEventListener('change', updateCateringCalculator);
  }
  updateCateringCalculator();
});

// Barley & Burger Smashed - Showcase Interactive JS (.bnb-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const mobileToggle = document.querySelector('.bnb-mobile-toggle');
  const drawer = document.querySelector('.bnb-drawer');
  const drawerOverlay = document.querySelector('.bnb-drawer-overlay');
  const drawerClose = document.querySelector('.bnb-drawer-close');

  function toggleDrawer(open) {
    if (drawer && drawerOverlay) {
      if (open) {
        drawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', () => toggleDrawer(true));
  if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
  if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleDrawer(false);
  });

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.bnb-filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // FAQ Accordion
  const accordionBtns = document.querySelectorAll('.bnb-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.bnb-accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.bnb-accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Corporate Lunch & Slider Box Calculator
  const calcBoxes = document.getElementById('calc-boxes');
  const calcMealTier = document.getElementById('calc-meal-tier');
  const calcShakes = document.getElementById('calc-shakes');
  const calcPlatters = document.getElementById('calc-platters');
  const calcDelivery = document.getElementById('calc-delivery');

  const outBoxes = document.getElementById('out-boxes');
  const outMealCost = document.getElementById('out-meal-cost');
  const outShakeCost = document.getElementById('out-shake-cost');
  const outPlatterCost = document.getElementById('out-platter-cost');
  const outDeliveryCost = document.getElementById('out-delivery-cost');
  const outSubtotal = document.getElementById('out-subtotal');
  const outGratuity = document.getElementById('out-gratuity');
  const outGrandTotal = document.getElementById('out-grand-total');
  const quoteBtn = document.getElementById('btn-request-catering');

  function calculateCatering() {
    if (!calcBoxes || !calcMealTier) return;

    const boxes = parseInt(calcBoxes.value, 10) || 15;
    const pricePerBox = parseFloat(calcMealTier.value) || 16.50;
    const numShakes = parseInt(calcShakes ? calcShakes.value : 0, 10) || 0;
    const numPlatters = parseInt(calcPlatters ? calcPlatters.value : 0, 10) || 0;
    const deliveryFee = parseFloat(calcDelivery ? calcDelivery.value : 0) || 0;

    const mealCost = boxes * pricePerBox;
    const shakeCost = numShakes * 7.00;
    const platterCost = numPlatters * 45.00;
    const subtotal = mealCost + shakeCost + platterCost + deliveryFee;
    const gratuity = subtotal * 0.15;
    const grandTotal = subtotal + gratuity;

    if (outBoxes) outBoxes.textContent = boxes.toString();
    if (outMealCost) outMealCost.textContent = '$' + mealCost.toFixed(2);
    if (outShakeCost) outShakeCost.textContent = '$' + shakeCost.toFixed(2);
    if (outPlatterCost) outPlatterCost.textContent = '$' + platterCost.toFixed(2);
    if (outDeliveryCost) outDeliveryCost.textContent = '$' + deliveryFee.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outGratuity) outGratuity.textContent = '$' + gratuity.toFixed(2);
    if (outGrandTotal) outGrandTotal.textContent = '$' + grandTotal.toFixed(2);

    if (quoteBtn) {
      const tierName = calcMealTier.options[calcMealTier.selectedIndex].text;
      const subject = encodeURIComponent('Barley & Burger Catering Order: ' + boxes + ' Box Lunches');
      const body = encodeURIComponent(
        'Hello Barley & Burger Catering Team,\n\n' +
        'I would like to place an office catering order with the following specifications:\n\n' +
        '- Box Count: ' + boxes + ' individual boxes\n' +
        '- Meal Tier: ' + tierName + ' ($' + mealCost.toFixed(2) + ')\n' +
        '- Hand-Spun Milkshakes: ' + numShakes + ' ($' + shakeCost.toFixed(2) + ')\n' +
        '- Party Side Platters: ' + numPlatters + ' ($' + platterCost.toFixed(2) + ')\n' +
        '- Delivery Option: $' + deliveryFee.toFixed(2) + '\n' +
        '- Estimated Subtotal: $' + subtotal.toFixed(2) + '\n' +
        '- Total with 15% Catering Gratuity: $' + grandTotal.toFixed(2) + '\n\n' +
        'Delivery Location: Monarch Market / Uptown Charlotte\n' +
        'Please confirm order availability and schedule.'
      );
      quoteBtn.href = 'mailto:catering@barleyandburger.com?subject=' + subject + '&body=' + body;
    }
  }

  [calcBoxes, calcMealTier, calcShakes, calcPlatters, calcDelivery].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateCatering);
      el.addEventListener('change', calculateCatering);
    }
  });

  calculateCatering();
});

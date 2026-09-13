// Arbol Eatery - Showcase Interactive JS (.arb-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const mobileToggle = document.querySelector('.arb-mobile-toggle');
  const drawer = document.querySelector('.arb-drawer');
  const drawerOverlay = document.querySelector('.arb-drawer-overlay');
  const drawerClose = document.querySelector('.arb-drawer-close');

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
  const filterBtns = document.querySelectorAll('.arb-filter-btn');
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
  const accordionBtns = document.querySelectorAll('.arb-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.arb-accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.arb-accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Corporate Catering Calculator
  const calcCount = document.getElementById('calc-catering-count');
  const calcTier = document.getElementById('calc-catering-tier');
  const calcCoffee = document.getElementById('calc-coffee-cambros');
  const calcPastries = document.getElementById('calc-pastry-platters');
  const calcDelivery = document.getElementById('calc-delivery-type');

  const outCount = document.getElementById('out-catering-count');
  const outFoodCost = document.getElementById('out-food-cost');
  const outCoffeeCost = document.getElementById('out-coffee-cost');
  const outPastryCost = document.getElementById('out-pastry-cost');
  const outDeliveryCost = document.getElementById('out-delivery-cost');
  const outSubtotal = document.getElementById('out-subtotal');
  const outGratuity = document.getElementById('out-gratuity');
  const outGrandTotal = document.getElementById('out-grand-total');
  const quoteBtn = document.getElementById('btn-request-catering');

  function calculateCatering() {
    if (!calcCount || !calcTier) return;

    const count = parseInt(calcCount.value, 10) || 15;
    const pricePerPerson = parseFloat(calcTier.value) || 17.50;
    const numCoffee = parseInt(calcCoffee ? calcCoffee.value : 0, 10) || 0;
    const numPastries = parseInt(calcPastries ? calcPastries.value : 0, 10) || 0;
    const deliveryFee = parseFloat(calcDelivery ? calcDelivery.value : 0) || 0;

    const foodCost = count * pricePerPerson;
    const coffeeCost = numCoffee * 35.00;
    const pastryCost = numPastries * 40.00;
    const subtotal = foodCost + coffeeCost + pastryCost + deliveryFee;
    const gratuity = subtotal * 0.15;
    const grandTotal = subtotal + gratuity;

    if (outCount) outCount.textContent = count.toString();
    if (outFoodCost) outFoodCost.textContent = '$' + foodCost.toFixed(2);
    if (outCoffeeCost) outCoffeeCost.textContent = '$' + coffeeCost.toFixed(2);
    if (outPastryCost) outPastryCost.textContent = '$' + pastryCost.toFixed(2);
    if (outDeliveryCost) outDeliveryCost.textContent = '$' + deliveryFee.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outGratuity) outGratuity.textContent = '$' + gratuity.toFixed(2);
    if (outGrandTotal) outGrandTotal.textContent = '$' + grandTotal.toFixed(2);

    if (quoteBtn) {
      const tierName = calcTier.options[calcTier.selectedIndex].text;
      const subject = encodeURIComponent('Arbol Eatery Catering Request: ' + count + ' Guests');
      const body = encodeURIComponent(
        'Hello Arbol Eatery Catering Team,\n\n' +
        'I would like to request catering for our upcoming event with the following estimate:\n\n' +
        '- Guest / Box Count: ' + count + ' guests\n' +
        '- Meal Package: ' + tierName + ' ($' + foodCost.toFixed(2) + ')\n' +
        '- 96oz Coffee Cambros: ' + numCoffee + ' ($' + coffeeCost.toFixed(2) + ')\n' +
        '- Pastry & Cookie Platters: ' + numPastries + ' ($' + pastryCost.toFixed(2) + ')\n' +
        '- Delivery Option: $' + deliveryFee.toFixed(2) + '\n' +
        '- Estimated Subtotal: $' + subtotal.toFixed(2) + '\n' +
        '- Total with 15% Catering Service Fee: $' + grandTotal.toFixed(2) + '\n\n' +
        'Delivery Location: Uptown Charlotte (227 W Trade St / Carillon Tower Area)\n' +
        'Please let me know your availability and payment confirmation.'
      );
      quoteBtn.href = 'mailto:catering@arboleatery.com?subject=' + subject + '&body=' + body;
    }
  }

  [calcCount, calcTier, calcCoffee, calcPastries, calcDelivery].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateCatering);
      el.addEventListener('change', calculateCatering);
    }
  });

  calculateCatering();
});

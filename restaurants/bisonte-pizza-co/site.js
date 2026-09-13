// Bisonte Pizza Co. - Showcase Interactive JS (.bis-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const mobileToggle = document.querySelector('.bis-mobile-toggle');
  const drawer = document.querySelector('.bis-drawer');
  const drawerOverlay = document.querySelector('.bis-drawer-overlay');
  const drawerClose = document.querySelector('.bis-drawer-close');

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
  const filterBtns = document.querySelectorAll('.bis-filter-btn');
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
  const accordionBtns = document.querySelectorAll('.bis-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.bis-accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.bis-accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Game Day Tailgate & Catering Calculator
  const calcGuests = document.getElementById('calc-guests');
  const calcPackage = document.getElementById('calc-package');
  const calcExtraSheet = document.getElementById('calc-extra-sheet');
  const calcWingBucket = document.getElementById('calc-wing-bucket');
  const calcDelivery = document.getElementById('calc-delivery');

  const outGuests = document.getElementById('out-guests');
  const outPkgCost = document.getElementById('out-pkg-cost');
  const outSheetCost = document.getElementById('out-sheet-cost');
  const outWingCost = document.getElementById('out-wing-cost');
  const outDeliveryCost = document.getElementById('out-delivery-cost');
  const outSubtotal = document.getElementById('out-subtotal');
  const outGratuity = document.getElementById('out-gratuity');
  const outGrandTotal = document.getElementById('out-grand-total');
  const quoteBtn = document.getElementById('btn-request-tailgate');

  function calculateTailgate() {
    if (!calcGuests || !calcPackage) return;

    const guests = parseInt(calcGuests.value, 10) || 20;
    const pricePerPerson = parseFloat(calcPackage.value) || 18.00;
    const numSheets = parseInt(calcExtraSheet ? calcExtraSheet.value : 0, 10) || 0;
    const numBuckets = parseInt(calcWingBucket ? calcWingBucket.value : 0, 10) || 0;
    const deliveryFee = parseFloat(calcDelivery ? calcDelivery.value : 0) || 0;

    const pkgCost = guests * pricePerPerson;
    const sheetCost = numSheets * 38.00;
    const wingCost = numBuckets * 65.00;
    const subtotal = pkgCost + sheetCost + wingCost + deliveryFee;
    const gratuity = subtotal * 0.15;
    const grandTotal = subtotal + gratuity;

    if (outGuests) outGuests.textContent = guests.toString();
    if (outPkgCost) outPkgCost.textContent = '$' + pkgCost.toFixed(2);
    if (outSheetCost) outSheetCost.textContent = '$' + sheetCost.toFixed(2);
    if (outWingCost) outWingCost.textContent = '$' + wingCost.toFixed(2);
    if (outDeliveryCost) outDeliveryCost.textContent = '$' + deliveryFee.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outGratuity) outGratuity.textContent = '$' + gratuity.toFixed(2);
    if (outGrandTotal) outGrandTotal.textContent = '$' + grandTotal.toFixed(2);

    if (quoteBtn) {
      const pkgName = calcPackage.options[calcPackage.selectedIndex].text;
      const subject = encodeURIComponent('Bisonte Game Day Catering Inquiry: ' + guests + ' Guests');
      const body = encodeURIComponent(
        'Hello Bisonte Pizza Catering Team,\n\n' +
        'I would like to order Game Day / Event catering with the following details:\n\n' +
        '- Headcount: ' + guests + ' guests\n' +
        '- Catering Tier: ' + pkgName + ' ($' + pkgCost.toFixed(2) + ')\n' +
        '- Additional Full Sheet Pizzas: ' + numSheets + ' ($' + sheetCost.toFixed(2) + ')\n' +
        '- Additional 50-Wing Buckets: ' + numBuckets + ' ($' + wingCost.toFixed(2) + ')\n' +
        '- Service Selection: $' + deliveryFee.toFixed(2) + '\n' +
        '- Estimated Subtotal: $' + subtotal.toFixed(2) + '\n' +
        '- Total with 15% Gratuity: $' + grandTotal.toFixed(2) + '\n\n' +
        'Preferred Location: Uptown Charlotte (715 S Cedar St) or Matthews (1381 E John St)\n' +
        'Please confirm availability for our event date.'
      );
      quoteBtn.href = 'mailto:catering@bisontepizza.com?subject=' + subject + '&body=' + body;
    }
  }

  [calcGuests, calcPackage, calcExtraSheet, calcWingBucket, calcDelivery].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateTailgate);
      el.addEventListener('change', calculateTailgate);
    }
  });

  calculateTailgate();
});

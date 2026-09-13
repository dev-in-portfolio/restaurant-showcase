// Fonda Las Tarascas Interactive JS (.flt-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const mobileToggle = document.querySelector('.flt-mobile-toggle');
  const drawer = document.querySelector('.flt-drawer');
  const drawerOverlay = document.querySelector('.flt-drawer-overlay');
  const drawerClose = document.querySelector('.flt-drawer-close');

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
  const filterBtns = document.querySelectorAll('.flt-filter-btn');
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
  const accordionBtns = document.querySelectorAll('.flt-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.flt-accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.flt-accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Fiesta Taquiza & Catering Calculator
  const calcGuests = document.getElementById('calc-guests');
  const calcPackage = document.getElementById('calc-package');
  const calcExtraCarnitas = document.getElementById('calc-extra-carnitas');
  const calcExtraBirria = document.getElementById('calc-extra-birria');
  const calcAguasBarrel = document.getElementById('calc-aguas-barrel');

  const outGuests = document.getElementById('out-guests');
  const outPkgCost = document.getElementById('out-pkg-cost');
  const outCarnitasCost = document.getElementById('out-carnitas-cost');
  const outBirriaCost = document.getElementById('out-birria-cost');
  const outAguasCost = document.getElementById('out-aguas-cost');
  const outSubtotal = document.getElementById('out-subtotal');
  const outTaxTip = document.getElementById('out-tax-tip');
  const outGrandTotal = document.getElementById('out-grand-total');
  const quoteBtn = document.getElementById('btn-request-taquiza');

  function calculateFiesta() {
    if (!calcGuests || !calcPackage) return;

    const guests = parseInt(calcGuests.value, 10) || 20;
    const pricePerPerson = parseFloat(calcPackage.value) || 16.00;
    const extraCarnitasLbs = parseInt(calcExtraCarnitas ? calcExtraCarnitas.value : 0, 10) || 0;
    const extraBirriaLbs = parseInt(calcExtraBirria ? calcExtraBirria.value : 0, 10) || 0;
    const numAguas = parseInt(calcAguasBarrel ? calcAguasBarrel.value : 0, 10) || 0;

    const pkgCost = guests * pricePerPerson;
    const carnitasCost = extraCarnitasLbs * 22.00;
    const birriaCost = extraBirriaLbs * 24.00;
    const aguasCost = numAguas * 45.00;
    const subtotal = pkgCost + carnitasCost + birriaCost + aguasCost;
    const taxTip = subtotal * 0.15; // 15% catering setup & service
    const grandTotal = subtotal + taxTip;

    if (outGuests) outGuests.textContent = guests.toString();
    if (outPkgCost) outPkgCost.textContent = '$' + pkgCost.toFixed(2);
    if (outCarnitasCost) outCarnitasCost.textContent = '$' + carnitasCost.toFixed(2);
    if (outBirriaCost) outBirriaCost.textContent = '$' + birriaCost.toFixed(2);
    if (outAguasCost) outAguasCost.textContent = '$' + aguasCost.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outTaxTip) outTaxTip.textContent = '$' + taxTip.toFixed(2);
    if (outGrandTotal) outGrandTotal.textContent = '$' + grandTotal.toFixed(2);

    if (quoteBtn) {
      const pkgName = calcPackage.options[calcPackage.selectedIndex].text;
      const subject = encodeURIComponent('Fonda Las Tarascas Catering Inquiry: ' + guests + ' Guests');
      const body = encodeURIComponent(
        'Hola Fonda Las Tarascas Catering Team,\n\n' +
        'I would like to request catering for our event with the following details:\n\n' +
        '- Number of Guests: ' + guests + ' people\n' +
        '- Catering Package: ' + pkgName + ' ($' + pkgCost.toFixed(2) + ')\n' +
        '- Additional Carnitas: ' + extraCarnitasLbs + ' lbs ($' + carnitasCost.toFixed(2) + ')\n' +
        '- Additional Birria de Res: ' + extraBirriaLbs + ' lbs ($' + birriaCost.toFixed(2) + ')\n' +
        '- Aguas Frescas Barrels (5 Gallons): ' + numAguas + ' ($' + aguasCost.toFixed(2) + ')\n' +
        '- Estimated Food Subtotal: $' + subtotal.toFixed(2) + '\n' +
        '- Total with 15% Service/Setup: $' + grandTotal.toFixed(2) + '\n\n' +
        'Location: 6308 The Plaza, Charlotte, NC 28215\n' +
        'Requested Event Date & Time:\n' +
        'Please confirm order availability and pickup/delivery options.'
      );
      quoteBtn.href = 'mailto:catering@fondalastarascas.com?subject=' + subject + '&body=' + body;
    }
  }

  [calcGuests, calcPackage, calcExtraCarnitas, calcExtraBirria, calcAguasBarrel].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateFiesta);
      el.addEventListener('change', calculateFiesta);
    }
  });

  calculateFiesta();
});
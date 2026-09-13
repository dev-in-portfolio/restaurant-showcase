// Tima African Restaurant Interactive JS (.tim-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const mobileToggle = document.querySelector('.tim-mobile-toggle');
  const drawer = document.querySelector('.tim-drawer');
  const drawerOverlay = document.querySelector('.tim-drawer-overlay');
  const drawerClose = document.querySelector('.tim-drawer-close');

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
  const filterBtns = document.querySelectorAll('.tim-filter-btn');
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
  const accordionBtns = document.querySelectorAll('.tim-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.tim-accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.tim-accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // West African Feast & Event Calculator
  const calcGuests = document.getElementById('calc-guests');
  const calcPackage = document.getElementById('calc-package');
  const calcExtraDibi = document.getElementById('calc-extra-dibi');
  const calcExtraJollof = document.getElementById('calc-extra-jollof');
  const calcBissapBarrel = document.getElementById('calc-bissap-barrel');

  const outGuests = document.getElementById('out-guests');
  const outPkgCost = document.getElementById('out-pkg-cost');
  const outDibiCost = document.getElementById('out-dibi-cost');
  const outJollofCost = document.getElementById('out-jollof-cost');
  const outBissapCost = document.getElementById('out-bissap-cost');
  const outSubtotal = document.getElementById('out-subtotal');
  const outServiceFee = document.getElementById('out-service-fee');
  const outGrandTotal = document.getElementById('out-grand-total');
  const quoteBtn = document.getElementById('btn-request-feast');

  function calculateFeast() {
    if (!calcGuests || !calcPackage) return;

    const guests = parseInt(calcGuests.value, 10) || 20;
    const pricePerPerson = parseFloat(calcPackage.value) || 18.00;
    const extraDibiLbs = parseInt(calcExtraDibi ? calcExtraDibi.value : 0, 10) || 0;
    const extraJollofTrays = parseInt(calcExtraJollof ? calcExtraJollof.value : 0, 10) || 0;
    const numBarrels = parseInt(calcBissapBarrel ? calcBissapBarrel.value : 0, 10) || 0;

    const pkgCost = guests * pricePerPerson;
    const dibiCost = extraDibiLbs * 25.00;
    const jollofCost = extraJollofTrays * 45.00;
    const bissapCost = numBarrels * 50.00;
    const subtotal = pkgCost + dibiCost + jollofCost + bissapCost;
    const serviceFee = subtotal * 0.15; // 15% packaging & staff service
    const grandTotal = subtotal + serviceFee;

    if (outGuests) outGuests.textContent = guests.toString();
    if (outPkgCost) outPkgCost.textContent = '$' + pkgCost.toFixed(2);
    if (outDibiCost) outDibiCost.textContent = '$' + dibiCost.toFixed(2);
    if (outJollofCost) outJollofCost.textContent = '$' + jollofCost.toFixed(2);
    if (outBissapCost) outBissapCost.textContent = '$' + bissapCost.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outServiceFee) outServiceFee.textContent = '$' + serviceFee.toFixed(2);
    if (outGrandTotal) outGrandTotal.textContent = '$' + grandTotal.toFixed(2);

    if (quoteBtn) {
      const pkgName = calcPackage.options[calcPackage.selectedIndex].text;
      const subject = encodeURIComponent('Tima African Restaurant Catering Inquiry: ' + guests + ' Guests');
      const body = encodeURIComponent(
        'Hello Tima African Restaurant Catering Team,\n\n' +
        'I would like to request catering for an upcoming event with the following details:\n\n' +
        '- Number of Guests: ' + guests + ' people\n' +
        '- Catering Package: ' + pkgName + ' ($' + pkgCost.toFixed(2) + ')\n' +
        '- Additional Grilled Dibi Lamb: ' + extraDibiLbs + ' lbs ($' + dibiCost.toFixed(2) + ')\n' +
        '- Additional Jollof Rice Trays: ' + extraJollofTrays + ' ($' + jollofCost.toFixed(2) + ')\n' +
        '- 5-Gallon Juice Barrels: ' + numBarrels + ' ($' + bissapCost.toFixed(2) + ')\n' +
        '- Estimated Subtotal: $' + subtotal.toFixed(2) + '\n' +
        '- Total with 15% Catering Service: $' + grandTotal.toFixed(2) + '\n\n' +
        'Location: 4438 The Plaza, Charlotte, NC 28215\n' +
        'Requested Event Date & Time:\n' +
        'Please confirm order availability and pickup details.'
      );
      quoteBtn.href = 'mailto:catering@timaafricanclt.com?subject=' + subject + '&body=' + body;
    }
  }

  [calcGuests, calcPackage, calcExtraDibi, calcExtraJollof, calcBissapBarrel].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateFeast);
      el.addEventListener('change', calculateFeast);
    }
  });

  calculateFeast();
});
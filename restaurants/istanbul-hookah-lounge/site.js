// Istanbul Hookah Lounge Interactive JS (.ihl-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer
  const mobileToggle = document.querySelector('.ihl-mobile-toggle');
  const drawer = document.querySelector('.ihl-drawer');
  const drawerOverlay = document.querySelector('.ihl-drawer-overlay');
  const drawerClose = document.querySelector('.ihl-drawer-close');

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
  const filterBtns = document.querySelectorAll('.ihl-filter-btn');
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
  const accordionBtns = document.querySelectorAll('.ihl-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.ihl-accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.ihl-accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // VIP Table & Shisha Experience Calculator
  const calcGuests = document.getElementById('calc-guests');
  const calcTier = document.getElementById('calc-tier');
  const calcFruitHeads = document.getElementById('calc-fruit-heads');
  const calcIceTips = document.getElementById('calc-ice-tips');
  const calcTeaService = document.getElementById('calc-tea-service');

  const outGuests = document.getElementById('out-guests');
  const outTierCost = document.getElementById('out-tier-cost');
  const outFruitCost = document.getElementById('out-fruit-cost');
  const outIceCost = document.getElementById('out-ice-cost');
  const outTeaCost = document.getElementById('out-tea-cost');
  const outSubtotal = document.getElementById('out-subtotal');
  const outServiceFee = document.getElementById('out-service-fee');
  const outGrandTotal = document.getElementById('out-grand-total');
  const reserveBtn = document.getElementById('btn-reserve-vip');

  function calculateVIP() {
    if (!calcGuests || !calcTier) return;

    const guests = parseInt(calcGuests.value, 10) || 4;
    const pricePerPerson = parseFloat(calcTier.value) || 35.00;
    const numFruitHeads = parseInt(calcFruitHeads ? calcFruitHeads.value : 0, 10) || 0;
    const numIceTips = parseInt(calcIceTips ? calcIceTips.value : 0, 10) || 0;
    const teaServiceFee = parseFloat(calcTeaService ? calcTeaService.value : 0) || 0;

    const tierCost = guests * pricePerPerson;
    const fruitCost = numFruitHeads * 15.00;
    const iceCost = numIceTips * 5.00;
    const teaCost = teaServiceFee;
    const subtotal = tierCost + fruitCost + iceCost + teaCost;
    const serviceFee = subtotal * 0.20; // 20% charcoal management & dedicated server
    const grandTotal = subtotal + serviceFee;

    if (outGuests) outGuests.textContent = guests.toString();
    if (outTierCost) outTierCost.textContent = '$' + tierCost.toFixed(2);
    if (outFruitCost) outFruitCost.textContent = '$' + fruitCost.toFixed(2);
    if (outIceCost) outIceCost.textContent = '$' + iceCost.toFixed(2);
    if (outTeaCost) outTeaCost.textContent = '$' + teaCost.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outServiceFee) outServiceFee.textContent = '$' + serviceFee.toFixed(2);
    if (outGrandTotal) outGrandTotal.textContent = '$' + grandTotal.toFixed(2);

    if (reserveBtn) {
      const tierName = calcTier.options[calcTier.selectedIndex].text;
      const subject = encodeURIComponent('Istanbul Hookah VIP Reservation: ' + guests + ' Guests');
      const body = encodeURIComponent(
        'Hello Istanbul Hookah Lounge VIP Host,\n\n' +
        'I would like to reserve a VIP Table experience with the following details:\n\n' +
        '- Party Size: ' + guests + ' guests\n' +
        '- Experience Tier: ' + tierName + ' ($' + tierCost.toFixed(2) + ')\n' +
        '- Carved Fresh Fruit Bowls: ' + numFruitHeads + ' ($' + fruitCost.toFixed(2) + ')\n' +
        '- Frozen Ice Tips: ' + numIceTips + ' ($' + iceCost.toFixed(2) + ')\n' +
        '- Turkish Tea / Coffee Service: $' + teaCost.toFixed(2) + '\n' +
        '- Estimated Subtotal: $' + subtotal.toFixed(2) + '\n' +
        '- Total with 20% Service & Charcoal Fee: $' + grandTotal.toFixed(2) + '\n\n' +
        'Preferred Date & Arrival Time:\n' +
        'Location: 138 Brevard Ct, Charlotte, NC 28202 (French Quarter)\n' +
        'Please confirm table availability.'
      );
      reserveBtn.href = 'mailto:reservations@istanbulhookahclt.com?subject=' + subject + '&body=' + body;
    }
  }

  [calcGuests, calcTier, calcFruitHeads, calcIceTips, calcTeaService].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateVIP);
      el.addEventListener('change', calculateVIP);
    }
  });

  calculateVIP();
});
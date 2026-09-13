// Hippin' Hops Brewstillery - Showcase Interactive JS (.hhp-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.hhp-mobile-toggle');
  const drawer = document.querySelector('.hhp-drawer');
  const drawerOverlay = document.querySelector('.hhp-drawer-overlay');
  const drawerClose = document.querySelector('.hhp-drawer-close');

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

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleDrawer(true));
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', () => toggleDrawer(false));
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => toggleDrawer(false));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleDrawer(false);
  });

  // Filter Buttons for Menu & Brews
  const filterBtns = document.querySelectorAll('.hhp-filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // FAQ Accordion
  const accordionBtns = document.querySelectorAll('.hhp-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.hhp-accordion-item');
      const isOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.hhp-accordion-item').forEach(i => i.classList.remove('open'));
      
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Interactive Taproom Party & Oyster Feast Calculator
  const calcGuests = document.getElementById('calc-guests');
  const calcDrinkPkg = document.getElementById('calc-drink-pkg');
  const calcOysterDozens = document.getElementById('calc-oyster-dozens');
  const calcSeafoodPlatters = document.getElementById('calc-seafood-platters');
  const calcPrivateSpace = document.getElementById('calc-private-space');

  // Outputs
  const outGuests = document.getElementById('out-guests');
  const outDrinkCost = document.getElementById('out-drink-cost');
  const outOysterCost = document.getElementById('out-oyster-cost');
  const outSeafoodCost = document.getElementById('out-seafood-cost');
  const outSpaceCost = document.getElementById('out-space-cost');
  const outSubtotal = document.getElementById('out-subtotal');
  const outGratuity = document.getElementById('out-gratuity');
  const outGrandTotal = document.getElementById('out-grand-total');
  const quoteBtn = document.getElementById('btn-request-quote');

  function calculateParty() {
    if (!calcGuests || !calcDrinkPkg) return;

    const guests = parseInt(calcGuests.value, 10) || 20;
    const drinkPerPerson = parseFloat(calcDrinkPkg.value) || 0;
    const oysterDozens = parseInt(calcOysterDozens ? calcOysterDozens.value : 0, 10) || 0;
    const seafoodPlatters = parseInt(calcSeafoodPlatters ? calcSeafoodPlatters.value : 0, 10) || 0;
    const spaceFee = parseFloat(calcPrivateSpace ? calcPrivateSpace.value : 0) || 0;

    const drinkCost = guests * drinkPerPerson;
    const oysterCost = oysterDozens * 32.00;
    const seafoodCost = seafoodPlatters * 85.00;
    const subtotal = drinkCost + oysterCost + seafoodCost + spaceFee;
    const gratuity = subtotal * 0.20;
    const grandTotal = subtotal + gratuity;

    if (outGuests) outGuests.textContent = guests.toString();
    if (outDrinkCost) outDrinkCost.textContent = '$' + drinkCost.toFixed(2);
    if (outOysterCost) outOysterCost.textContent = '$' + oysterCost.toFixed(2);
    if (outSeafoodCost) outSeafoodCost.textContent = '$' + seafoodCost.toFixed(2);
    if (outSpaceCost) outSpaceCost.textContent = '$' + spaceFee.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outGratuity) outGratuity.textContent = '$' + gratuity.toFixed(2);
    if (outGrandTotal) outGrandTotal.textContent = '$' + grandTotal.toFixed(2);

    if (quoteBtn) {
      const pkgName = calcDrinkPkg.options[calcDrinkPkg.selectedIndex].text;
      const subject = encodeURIComponent('Taproom Event Inquiry: ' + guests + ' Guests - Hippin\' Hops Charlotte');
      const body = encodeURIComponent(
        'Hello Hippin\' Hops Events Team,\n\n' +
        'I would like to inquire about hosting an event at your Charlotte Brewstillery with the following preliminary estimate:\n\n' +
        '- Guest Count: ' + guests + ' guests\n' +
        '- Drink Package: ' + pkgName + ' ($' + drinkCost.toFixed(2) + ')\n' +
        '- Artisan Baked Oyster Dozens: ' + oysterDozens + ' dozens ($' + oysterCost.toFixed(2) + ')\n' +
        '- Cajun Seafood Party Platters: ' + seafoodPlatters + ' platters ($' + seafoodCost.toFixed(2) + ')\n' +
        '- Space Tier: $' + spaceFee.toFixed(2) + '\n' +
        '- Estimated Subtotal: $' + subtotal.toFixed(2) + '\n' +
        '- Estimated Total (incl. 20% gratuity): $' + grandTotal.toFixed(2) + '\n\n' +
        'Please contact me regarding available dates and venue booking details.'
      );
      quoteBtn.href = 'mailto:events@hippinhopsbrewery.com?subject=' + subject + '&body=' + body;
    }
  }

  [calcGuests, calcDrinkPkg, calcOysterDozens, calcSeafoodPlatters, calcPrivateSpace].forEach(el => {
    if (el) {
      el.addEventListener('input', calculateParty);
      el.addEventListener('change', calculateParty);
    }
  });

  calculateParty();
});

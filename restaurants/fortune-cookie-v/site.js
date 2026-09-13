// Fortune Cookie V JavaScript (.fcv-*)
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.fcv-mobile-toggle');
  const drawer = document.querySelector('.fcv-drawer');
  const overlay = document.querySelector('.fcv-drawer-overlay');
  const drawerClose = document.querySelector('.fcv-drawer-close');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Category Filter on Menu Page
  const filterBtns = document.querySelectorAll('.fcv-filter-btn');
  const menuCards = document.querySelectorAll('.fcv-menu-card');

  if (filterBtns.length > 0 && menuCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        menuCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // FAQ Accordion
  const accordionBtns = document.querySelectorAll('.fcv-accordion-btn');
  if (accordionBtns.length > 0) {
    accordionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.fcv-accordion-item');
        if (item) {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.fcv-accordion-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        }
      });
    });
  }

  // Catering & Party Calculator
  const guestInput = document.getElementById('fcv-guests');
  const packageSelect = document.getElementById('fcv-package');
  const extraLomeinCheck = document.getElementById('fcv-extra-lomein');
  const extraWingsCheck = document.getElementById('fcv-extra-wings');
  const extraRangoonCheck = document.getElementById('fcv-extra-rangoon');
  const calcBtn = document.getElementById('fcv-calc-btn');

  const outGuests = document.getElementById('fcv-out-guests');
  const outPackageName = document.getElementById('fcv-out-pkg-name');
  const outPackageCost = document.getElementById('fcv-out-pkg-cost');
  const outAddonsCost = document.getElementById('fcv-out-addons-cost');
  const outSubtotal = document.getElementById('fcv-out-subtotal');
  const outTax = document.getElementById('fcv-out-tax');
  const outTotal = document.getElementById('fcv-out-total');
  const outPansSummary = document.getElementById('fcv-out-pans-summary');
  const emailLink = document.getElementById('fcv-email-order');

  function calculateCatering() {
    if (!guestInput || !packageSelect || !outTotal) return;

    let guests = parseInt(guestInput.value, 10);
    if (isNaN(guests) || guests < 10) guests = 10;
    if (guests > 300) guests = 300;
    guestInput.value = guests;

    const pkgVal = packageSelect.value;
    let pricePerPerson = 12.50;
    let pkgTitle = 'Classic Takeout Buffet';
    let pansDesc = '';

    if (pkgVal === 'classic') {
      pricePerPerson = 12.50;
      pkgTitle = 'Classic Takeout Buffet (.50/person)';
      const entreesPans = Math.ceil(guests / 15);
      const ricePans = Math.ceil(guests / 20);
      pansDesc = entreesPans + ' Entree Pans (General Tso & Sweet-Sour Chicken), ' + ricePans + ' Pans Pork Fried Rice, Egg Rolls (' + guests + ' pcs)';
    } else if (pkgVal === 'wokmaster') {
      pricePerPerson = 16.50;
      pkgTitle = 'Wok Master Feast (.50/person)';
      const entreesPans = Math.ceil(guests / 12);
      const carbPans = Math.ceil(guests / 16);
      pansDesc = entreesPans + ' Entree Pans (Beef Broccoli, General Tso, Honey Garlic Wings), ' + carbPans + ' Pans Lo Mein & Fried Rice, Crab Rangoon (' + (guests * 2) + ' pcs)';
    } else if (pkgVal === 'imperial') {
      pricePerPerson = 21.00;
      pkgTitle = 'Imperial Dragon Banquet (.00/person)';
      const entreesPans = Math.ceil(guests / 10);
      const carbPans = Math.ceil(guests / 12);
      pansDesc = entreesPans + ' Premium Pans (Crispy Sesame Beef, Triple Delight, Honey Wings), ' + carbPans + ' Pans House Special Lo Mein & Singapore Mei Fun, Dumplings & Rangoon (' + (guests * 3) + ' pcs)';
    }

    const baseCost = guests * pricePerPerson;
    let addonsCost = 0;
    const addonDetails = [];

    if (extraLomeinCheck && extraLomeinCheck.checked) {
      addonsCost += 45;
      addonDetails.push('1 Full Pan House Lo Mein ()');
    }
    if (extraWingsCheck && extraWingsCheck.checked) {
      addonsCost += 65;
      addonDetails.push('1 Full Pan Honey Garlic Wings 50pcs ()');
    }
    if (extraRangoonCheck && extraRangoonCheck.checked) {
      addonsCost += 35;
      addonDetails.push('1 Platter Crab Rangoon 40pcs ()');
    }

    const subtotal = baseCost + addonsCost;
    const tax = subtotal * 0.0725;
    const total = subtotal + tax;

    if (outGuests) outGuests.textContent = guests + ' Guests';
    if (outPackageName) outPackageName.textContent = pkgTitle;
    if (outPackageCost) outPackageCost.textContent = '$' + baseCost.toFixed(2);
    if (outAddonsCost) outAddonsCost.textContent = '$' + addonsCost.toFixed(2);
    if (outSubtotal) outSubtotal.textContent = '$' + subtotal.toFixed(2);
    if (outTax) outTax.textContent = '$' + tax.toFixed(2);
    if (outTotal) outTotal.textContent = '$' + total.toFixed(2);
    if (outPansSummary) {
      let fullText = pansDesc;
      if (addonDetails.length > 0) {
        fullText += ' + Add-ons: ' + addonDetails.join(', ');
      }
      outPansSummary.textContent = fullText;
    }

    if (emailLink) {
      const subject = encodeURIComponent('Catering Order Request - Fortune Cookie V (' + guests + ' Guests)');
      const body = encodeURIComponent(
        'Hello Fortune Cookie V Team,\n\nI would like to request a catering order with the following details:\n\n' +
        'Headcount: ' + guests + ' guests\n' +
        'Package: ' + pkgTitle + '\n' +
        'Estimated Base: $' + baseCost.toFixed(2) + '\n' +
        'Add-ons: ' + (addonDetails.length > 0 ? addonDetails.join(', ') : 'None') + ' ($' + addonsCost.toFixed(2) + ')\n' +
        'Estimated Total (with NC 7.25% tax): $' + total.toFixed(2) + '\n\n' +
        'Pickup Location: 7320 The Plaza Ste A, Charlotte, NC 28215\n' +
        'Preferred Pickup Date/Time: [Please specify]\n' +
        'Contact Name: \n' +
        'Contact Phone: \n\nThank you!'
      );
      emailLink.href = 'mailto:fortunecookievclt@gmail.com?subject=' + subject + '&body=' + body;
    }
  }

  if (calcBtn) calcBtn.addEventListener('click', calculateCatering);
  if (guestInput) guestInput.addEventListener('input', calculateCatering);
  if (packageSelect) packageSelect.addEventListener('change', calculateCatering);
  if (extraLomeinCheck) extraLomeinCheck.addEventListener('change', calculateCatering);
  if (extraWingsCheck) extraWingsCheck.addEventListener('change', calculateCatering);
  if (extraRangoonCheck) extraRangoonCheck.addEventListener('change', calculateCatering);

  if (guestInput && packageSelect) {
    calculateCatering();
  }
});

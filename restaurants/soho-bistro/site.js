/* Soho Bistro - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('shoMenuToggle');
  const mobileMenu = document.getElementById('shoMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.sho-filter-btn');
  const menuItems = document.querySelectorAll('.sho-menu-item');

  if (filterBtns.length > 0 && menuItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        menuItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Corporate Catering Calculator
  const guestSelect = document.getElementById('shoCalcGuests');
  const packageSelect = document.getElementById('shoCalcPackage');
  const appCheckboxes = document.querySelectorAll('.sho-app-check');
  const drinkCheckboxes = document.querySelectorAll('.sho-drink-check');

  const guestDisplay = document.getElementById('shoCalcGuestDisplay');
  const entreePanDisplay = document.getElementById('shoCalcEntreePans');
  const ricePanDisplay = document.getElementById('shoCalcRicePans');
  const totalCostDisplay = document.getElementById('shoCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('shoCalcDetails');
  const mailQuoteLink = document.getElementById('shoMailQuoteLink');
  const copyQuoteBtn = document.getElementById('shoCopyQuoteBtn');

  function calculateCorporateCatering() {
    if (!guestSelect || !packageSelect || !totalCostDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 20;
    const pkgType = packageSelect.value; // 'express-bento', 'bistro-buffet', 'executive-banquet'

    let pricePerPerson = 15.50;
    let packageName = 'Executive Bento Box Lunches';
    let entreesIncluded = 'Sesame Chicken & Beef Chow Fun';

    if (pkgType === 'bistro-buffet') {
      pricePerPerson = 19.50;
      packageName = 'Uptown Bistro Wok Buffet';
      entreesIncluded = 'Crispy Sesame Chicken, Honey Walnut Shrimp & Mongolian Beef';
    } else if (pkgType === 'executive-banquet') {
      pricePerPerson = 25.00;
      packageName = 'Grand Pan-Asian Executive Banquet';
      entreesIncluded = 'Tangerine Beef, Honey Walnut Shrimp, General Tso\'s & Singapore Noodles';
    }

    const entreePans = Math.ceil(guests / 18);
    const ricePans = Math.ceil(guests / 20);

    let selectedApps = [];
    let extraAppCost = 0;
    appCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        extraAppCost += cost;
        selectedApps.push(cb.value);
      }
    });

    let selectedDrinks = [];
    let drinksCost = 0;
    drinkCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        drinksCost += cost * guests;
        selectedDrinks.push(cb.value);
      }
    });

    const baseCost = guests * pricePerPerson;
    const totalEstimate = baseCost + extraAppCost + drinksCost;

    if (guestDisplay) guestDisplay.textContent = guests + ' Guests';
    if (entreePanDisplay) entreePanDisplay.textContent = entreePans + ' Full Entree Pan(s)';
    if (ricePanDisplay) ricePanDisplay.textContent = ricePans + ' Rice Pan(s)';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${packageName} for ${guests} guests. Entrees: ${entreesIncluded}. Appetizer Add-ons: ${selectedApps.join(', ') || 'Spring Rolls Included'}. Beverages: ${selectedDrinks.join(', ') || 'None'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Corporate Catering Inquiry: ${packageName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Soho Bistro Catering Team,\n\nI would like to request corporate office catering:\n\n` +
        `- Event Date: [Please specify date & requested delivery time]\n` +
        `- Company Name & Suite: [Please specify Uptown address]\n` +
        `- Guest Count: ${guests}\n` +
        `- Catering Package: ${packageName} ($${pricePerPerson.toFixed(2)}/person)\n` +
        `- Entrees: ${entreesIncluded}\n` +
        `- Appetizer Add-ons: ${selectedApps.join(', ') || 'Standard Spring Rolls'}\n` +
        `- Beverages: ${selectedDrinks.join(', ') || 'None'}\n` +
        `- Estimated Cost: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to confirm availability and schedule delivery.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:info@sohobistroclt.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateCorporateCatering);
  if (packageSelect) packageSelect.addEventListener('change', calculateCorporateCatering);
  appCheckboxes.forEach(cb => cb.addEventListener('change', calculateCorporateCatering));
  drinkCheckboxes.forEach(cb => cb.addEventListener('change', calculateCorporateCatering));

  // Initial calculation
  calculateCorporateCatering();

  if (copyQuoteBtn && summaryDetailsDisplay && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Soho Bistro Corporate Catering Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${totalCostDisplay.textContent}\nCall (704) 333-5189 to confirm order!`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const orig = copyQuoteBtn.textContent;
        copyQuoteBtn.textContent = 'Quote Copied!';
        setTimeout(() => {
          copyQuoteBtn.textContent = orig;
        }, 2500);
      });
    });
  }
});

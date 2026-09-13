/* Kicks Deli - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('kckMenuToggle');
  const mobileMenu = document.getElementById('kckMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.kck-filter-btn');
  const menuItems = document.querySelectorAll('.kck-menu-item');

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

  // Corporate Catering & Box Lunch Calculator
  const guestSelect = document.getElementById('kckCalcGuests');
  const packageSelect = document.getElementById('kckCalcPackage');
  const breadSelect = document.getElementById('kckCalcBread');
  const sideCheckboxes = document.querySelectorAll('.kck-side-check');
  const drinkCheckboxes = document.querySelectorAll('.kck-drink-check');

  const guestDisplay = document.getElementById('kckCalcGuestDisplay');
  const boxCountDisplay = document.getElementById('kckCalcBoxCount');
  const platterCountDisplay = document.getElementById('kckCalcPlatterCount');
  const totalCostDisplay = document.getElementById('kckCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('kckCalcDetails');
  const mailQuoteLink = document.getElementById('kckMailQuoteLink');
  const copyQuoteBtn = document.getElementById('kckCopyQuoteBtn');

  function calculateDeliCatering() {
    if (!guestSelect || !packageSelect || !totalCostDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 20;
    const pkgType = packageSelect.value; // 'executive-boxed-lunch', 'grail-sandwich-platter', 'vip-boardroom-spread'
    const breadChoice = breadSelect ? breadSelect.value : 'Dutch Crunch & Seeded Hoagie Mix';

    let pricePerPerson = 16.50;
    let packageName = 'Executive Individually Boxed Lunches';
    let foodIncluded = 'Gourmet Sub on Dutch Crunch, Kettle Chips, Pickle Spear & Chocolate Chip Cookie';

    if (pkgType === 'grail-sandwich-platter') {
      pricePerPerson = 14.50;
      packageName = 'Grail Mini Hoagie Party Platters';
      foodIncluded = 'Assorted Half-Sandwich Platters (The One, Sky High, Chicken Salad, Caprese) + Large Chip Bowls';
    } else if (pkgType === 'vip-boardroom-spread') {
      pricePerPerson = 21.00;
      packageName = 'VIP Boardroom Deli Buffet';
      foodIncluded = 'Custom Dutch Crunch Sandwiches, Gourmet Pasta Salads, Fruit Platters, Cookies & Premium Drinks';
    }

    const plattersCount = Math.ceil(guests / 12);

    let selectedSides = [];
    let sidesCost = 0;
    sideCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        sidesCost += cost;
        selectedSides.push(cb.value);
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
    const totalEstimate = baseCost + sidesCost + drinksCost;

    if (guestDisplay) guestDisplay.textContent = guests + ' Guests';
    if (boxCountDisplay) boxCountDisplay.textContent = guests + ' Boxed Meals';
    if (platterCountDisplay) platterCountDisplay.textContent = plattersCount + ' Large Party Platter(s)';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${packageName} for ${guests} guests. Bread Style: ${breadChoice}. Includes: ${foodIncluded}. Extra Deli Trays: ${selectedSides.join(', ') || 'Standard Chips/Pickles'}. Beverage Add-ons: ${selectedDrinks.join(', ') || 'None'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Catering Inquiry: ${packageName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Kicks Deli Catering Team,\n\nI would like to order corporate catering / boxed lunches:\n\n` +
        `- Event Date & Time: [Please specify requested delivery or pickup time]\n` +
        `- Company Name & Delivery Address: [Please specify Uptown Charlotte building]\n` +
        `- Guest Count: ${guests} guests\n` +
        `- Package Selected: ${packageName} ($${pricePerPerson.toFixed(2)}/person)\n` +
        `- Bread Preference: ${breadChoice}\n` +
        `- Inclusions: ${foodIncluded}\n` +
        `- Side Add-Ons: ${selectedSides.join(', ') || 'Standard Included Sides'}\n` +
        `- Beverage Add-Ons: ${selectedDrinks.join(', ') || 'None'}\n` +
        `- Estimated Cost: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to confirm our office order.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:kicksdeli@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateDeliCatering);
  if (packageSelect) packageSelect.addEventListener('change', calculateDeliCatering);
  if (breadSelect) breadSelect.addEventListener('change', calculateDeliCatering);
  sideCheckboxes.forEach(cb => cb.addEventListener('change', calculateDeliCatering));
  drinkCheckboxes.forEach(cb => cb.addEventListener('change', calculateDeliCatering));

  // Initial calculation
  calculateDeliCatering();

  if (copyQuoteBtn && summaryDetailsDisplay && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Kicks Deli Catering Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${totalCostDisplay.textContent}\nCall (704) 910-6143 or email kicksdeli@gmail.com to order!`;
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

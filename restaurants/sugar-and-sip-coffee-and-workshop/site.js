/* Sugar & Sip Coffee and Workshop - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('snsMenuToggle');
  const mobileMenu = document.getElementById('snsMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.sns-filter-btn');
  const menuItems = document.querySelectorAll('.sns-menu-item');

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

  // Coffee Cart & Workshop Party Calculator
  const guestSelect = document.getElementById('snsCalcGuests');
  const durationSelect = document.getElementById('snsCalcDuration');
  const packageSelect = document.getElementById('snsCalcPackage');
  const pastryCheckboxes = document.querySelectorAll('.sns-pastry-check');
  const addonCheckboxes = document.querySelectorAll('.sns-addon-check');

  const guestDisplay = document.getElementById('snsCalcGuestDisplay');
  const drinkCountDisplay = document.getElementById('snsCalcDrinksEstimated');
  const baristaDisplay = document.getElementById('snsCalcBaristas');
  const totalCostDisplay = document.getElementById('snsCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('snsCalcDetails');
  const mailQuoteLink = document.getElementById('snsMailQuoteLink');
  const copyQuoteBtn = document.getElementById('snsCopyQuoteBtn');

  function calculateCoffeeCart() {
    if (!guestSelect || !packageSelect || !totalCostDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 30;
    const hours = parseInt(durationSelect ? durationSelect.value : 2, 10) || 2;
    const pkgType = packageSelect.value; // 'espresso-classic', 'signature-specialty', 'full-loft-workshop'

    let baseHourlyRate = 220; // 2 baristas, unlimited classic espresso
    let packageName = 'Classic Espresso & Brew Bar';
    let packagePerPerson = 6.00;

    if (pkgType === 'signature-specialty') {
      baseHourlyRate = 290;
      packageName = 'Signature Specialty Latte & Matcha Cart';
      packagePerPerson = 9.50;
    } else if (pkgType === 'full-loft-workshop') {
      baseHourlyRate = 380;
      packageName = 'Private Loft Workshop & Unlimited Espresso Bar';
      packagePerPerson = 14.00;
    }

    const estimatedDrinks = Math.round(guests * 1.8);
    const baristas = guests > 60 ? 3 : 2;

    let selectedPastries = [];
    let pastryCost = 0;
    pastryCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        pastryCost += cost;
        selectedPastries.push(cb.value);
      }
    });

    let selectedAddons = [];
    let addonsCost = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        addonsCost += cost * guests;
        selectedAddons.push(cb.value);
      }
    });

    const timeCost = baseHourlyRate * hours;
    const perPersonCost = guests * packagePerPerson;
    const totalEstimate = timeCost + perPersonCost + pastryCost + addonsCost;

    if (guestDisplay) guestDisplay.textContent = guests + ' Guests';
    if (drinkCountDisplay) drinkCountDisplay.textContent = '~' + estimatedDrinks + ' Handcrafted Drinks';
    if (baristaDisplay) baristaDisplay.textContent = baristas + ' Dedicated Baristas (' + hours + ' hrs)';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${packageName} for ${guests} guests over ${hours} hours. Pastries: ${selectedPastries.join(', ') || 'None'}. Upgrades: ${selectedAddons.join(', ') || 'Standard Whole/Oat Milk & Syrups'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Coffee Cart / Event Inquiry: ${packageName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Sugar & Sip Team,\n\nI would like to book a mobile espresso cart / workshop event:\n\n` +
        `- Event Date & Time: [Please specify event date & requested setup time]\n` +
        `- Event Location / Venue: [Please specify Charlotte location]\n` +
        `- Guest Count: ${guests} guests\n` +
        `- Service Duration: ${hours} hours\n` +
        `- Package Selected: ${packageName}\n` +
        `- Pastry Platters: ${selectedPastries.join(', ') || 'None'}\n` +
        `- Upgrades: ${selectedAddons.join(', ') || 'Standard Inclusions'}\n` +
        `- Estimated Budget: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to verify cart availability and finalize booking details.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:hello@sugarandsipclt.org?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateCoffeeCart);
  if (durationSelect) durationSelect.addEventListener('change', calculateCoffeeCart);
  if (packageSelect) packageSelect.addEventListener('change', calculateCoffeeCart);
  pastryCheckboxes.forEach(cb => cb.addEventListener('change', calculateCoffeeCart));
  addonCheckboxes.forEach(cb => cb.addEventListener('change', calculateCoffeeCart));

  // Initial calculation
  calculateCoffeeCart();

  if (copyQuoteBtn && summaryDetailsDisplay && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Sugar & Sip Coffee & Workshop Cart Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${totalCostDisplay.textContent}\nContact hello@sugarandsipclt.org or call (704) 919-0143 to reserve!`;
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

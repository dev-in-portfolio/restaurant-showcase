/* Ten58 Sports Bar & Lounge - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('t58MenuToggle');
  const mobileMenu = document.getElementById('t58MobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.t58-filter-btn');
  const menuItems = document.querySelectorAll('.t58-menu-item');

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

  // Gameday Tailgate & VIP Calculator
  const guestSelect = document.getElementById('t58CalcGuests');
  const packageSelect = document.getElementById('t58CalcPackage');
  const appCheckboxes = document.querySelectorAll('.t58-app-check');
  const drinkCheckboxes = document.querySelectorAll('.t58-drink-check');

  const guestDisplay = document.getElementById('t58CalcGuestDisplay');
  const wingPlatterDisplay = document.getElementById('t58CalcWingPlatters');
  const sliderPlatterDisplay = document.getElementById('t58CalcSliderPlatters');
  const totalCostDisplay = document.getElementById('t58CalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('t58CalcDetails');
  const mailQuoteLink = document.getElementById('t58MailQuoteLink');
  const copyQuoteBtn = document.getElementById('t58CopyQuoteBtn');

  function calculateTailgateParty() {
    if (!guestSelect || !packageSelect || !totalCostDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 16;
    const pkgType = packageSelect.value; // 'touchdown-buffet', 'vip-lounge-package', 'hall-of-fame-banquet'

    let pricePerPerson = 28.00;
    let packageName = 'Touchdown Gameday Buffet';
    let foodIncluded = 'TD Wings (50 ct), Smash Burger Sliders & Nacho Bar';

    if (pkgType === 'vip-lounge-package') {
      pricePerPerson = 42.00;
      packageName = 'All-Pro VIP Lounge Package';
      foodIncluded = 'TD Wings (75 ct), Collard Green Dip, Tackling Tacos & Sliders';
    } else if (pkgType === 'hall-of-fame-banquet') {
      pricePerPerson = 58.00;
      packageName = 'Hall of Fame Championship Spread';
      foodIncluded = 'TD Wings (100 ct), Lump Crab Cakes, Crawfish Dip, Sliders & Rib Tips';
    }

    const wingPlatters = Math.ceil(guests / 12);
    const sliderPlatters = Math.ceil(guests / 10);

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
    if (wingPlatterDisplay) wingPlatterDisplay.textContent = wingPlatters + ' Jumbo Wing Platter(s)';
    if (sliderPlatterDisplay) sliderPlatterDisplay.textContent = sliderPlatters + ' Slider / Taco Tray(s)';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${packageName} for ${guests} guests. Inclusions: ${foodIncluded}. Extra Platters: ${selectedApps.join(', ') || 'None'}. Beverage Add-ons: ${selectedDrinks.join(', ') || 'Standard Cash Bar'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`VIP Event / Tailgate Inquiry: ${packageName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Ten58 Events Team,\n\nI would like to reserve a VIP party / tailgate package:\n\n` +
        `- Event Date & Game/Match: [Specify game date & time]\n` +
        `- Host Name / Company: [Specify contact details]\n` +
        `- Guest Count: ${guests}\n` +
        `- Package Selected: ${packageName} ($${pricePerPerson.toFixed(2)}/person)\n` +
        `- Platters Included: ${foodIncluded}\n` +
        `- Extra Add-Ons: ${selectedApps.join(', ') || 'None'}\n` +
        `- Beverage Package: ${selectedDrinks.join(', ') || 'Standard Cash Bar'}\n` +
        `- Estimated Cost: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to confirm booth availability and lock in the reservation.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:events@ten58clt.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateTailgateParty);
  if (packageSelect) packageSelect.addEventListener('change', calculateTailgateParty);
  appCheckboxes.forEach(cb => cb.addEventListener('change', calculateTailgateParty));
  drinkCheckboxes.forEach(cb => cb.addEventListener('change', calculateTailgateParty));

  // Initial calculation
  calculateTailgateParty();

  if (copyQuoteBtn && summaryDetailsDisplay && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Ten58 Sports Bar & Lounge Tailgate / VIP Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${totalCostDisplay.textContent}\nCall (980) 207-1058 or email events@ten58clt.com to book!`;
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

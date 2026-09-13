/* Island Flavors II - Main Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('islMenuToggle');
  const mobileMenu = document.getElementById('islMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.isl-filter-btn');
  const menuItems = document.querySelectorAll('.isl-menu-item');

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

  // Caribbean Catering Calculator
  const guestSelect = document.getElementById('islCalcGuests');
  const packageSelect = document.getElementById('islCalcPackage');
  const sideCheckboxes = document.querySelectorAll('.isl-side-check');
  const drinkCheckboxes = document.querySelectorAll('.isl-drink-check');

  const countDisplay = document.getElementById('islCalcGuestCountDisplay');
  const entreePanDisplay = document.getElementById('islCalcEntreePans');
  const sidePanDisplay = document.getElementById('islCalcSidePans');
  const drinkGallonDisplay = document.getElementById('islCalcDrinkGallons');
  const costEstimateDisplay = document.getElementById('islCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('islCalcDetails');
  const copyQuoteBtn = document.getElementById('islCopyQuoteBtn');
  const mailQuoteLink = document.getElementById('islMailQuoteLink');

  function calculateCatering() {
    if (!guestSelect || !packageSelect || !costEstimateDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 20;
    const pkgType = packageSelect.value; // 'yardie', 'reggae', 'caribbean-royale'

    let pricePerPerson = 16.50;
    let packageName = 'Yardie Classic Feast';
    let entreesIncluded = 'Pit-Smoked Jerk Chicken & Brown Stew Chicken';

    if (pkgType === 'reggae') {
      pricePerPerson = 21.00;
      packageName = 'Reggae Island Trio';
      entreesIncluded = 'Pit Jerk Chicken, Braised Oxtails & Curry Goat';
    } else if (pkgType === 'caribbean-royale') {
      pricePerPerson = 26.50;
      packageName = 'Caribbean Royale Feast';
      entreesIncluded = 'Braised Oxtails, Jerk Salmon Rasta Pasta & Pit Jerk Chicken';
    }

    // Pans calculation: 1 full pan feeds ~20-25 people
    const entreePans = Math.ceil(guests / 20);
    const sidePans = Math.ceil(guests / 18);

    // Sides selected count
    let extraSidesCost = 0;
    let selectedSides = [];
    sideCheckboxes.forEach(cb => {
      if (cb.checked) {
        selectedSides.push(cb.value);
      }
    });

    // Default package includes 2 sides; additional sides are $3/person
    if (selectedSides.length > 2) {
      extraSidesCost = (selectedSides.length - 2) * 3.00 * guests;
    }

    // Drinks calculation: 1 gallon feeds ~10-12 servings ($18/gallon)
    let selectedDrinks = [];
    drinkCheckboxes.forEach(cb => {
      if (cb.checked) {
        selectedDrinks.push(cb.value);
      }
    });

    const drinkGallons = selectedDrinks.length > 0 ? Math.ceil(guests / 10) * selectedDrinks.length : 0;
    const drinksCost = drinkGallons * 18.00;

    const baseFoodCost = guests * pricePerPerson;
    const totalEstimate = baseFoodCost + extraSidesCost + drinksCost;

    if (countDisplay) countDisplay.textContent = guests + ' Guests';
    if (entreePanDisplay) entreePanDisplay.textContent = entreePans + ' Full Pan(s)';
    if (sidePanDisplay) sidePanDisplay.textContent = sidePans + ' Full Pan(s)';
    if (drinkGallonDisplay) drinkGallonDisplay.textContent = drinkGallons + ' Gallon(s)';
    if (costEstimateDisplay) costEstimateDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${packageName} for ${guests} guests. Entrees: ${entreesIncluded}. Sides: ${selectedSides.join(', ') || 'Rice & Peas, Cabbage'}. Drinks: ${selectedDrinks.join(', ') || 'None'}.`;
    }

    // Prepare mailto link
    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Catering Inquiry: ${packageName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Island Flavors II Team,\n\nI would like to inquire about catering for an upcoming event:\n` +
        `- Event Date: [Please specify date]\n` +
        `- Guest Count: ${guests}\n` +
        `- Package: ${packageName} ($${pricePerPerson.toFixed(2)}/person)\n` +
        `- Entrees: ${entreesIncluded}\n` +
        `- Selected Sides: ${selectedSides.join(', ') || 'Standard Rice & Peas + Cabbage'}\n` +
        `- Selected Beverages: ${selectedDrinks.join(', ') || 'None'}\n` +
        `- Estimated Cost: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me at your earliest convenience to confirm availability.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:islandflavors.clt@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateCatering);
  if (packageSelect) packageSelect.addEventListener('change', calculateCatering);
  sideCheckboxes.forEach(cb => cb.addEventListener('change', calculateCatering));
  drinkCheckboxes.forEach(cb => cb.addEventListener('change', calculateCatering));

  // Initial calculation
  calculateCatering();

  if (copyQuoteBtn && summaryDetailsDisplay && costEstimateDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Island Flavors II Catering Quote Summary:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${costEstimateDisplay.textContent}\nCall (980) 225-7071 to confirm your date!`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyQuoteBtn.textContent;
        copyQuoteBtn.textContent = 'Quote Copied to Clipboard!';
        setTimeout(() => {
          copyQuoteBtn.textContent = originalText;
        }, 2500);
      });
    });
  }
});

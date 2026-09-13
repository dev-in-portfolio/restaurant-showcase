/* Freshwaters Southern New Orleans - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const toggleBtn = document.getElementById('fshMenuToggle');
  const mobileMenu = document.getElementById('fshMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.fsh-filter-btn');
  const menuItems = document.querySelectorAll('.fsh-menu-item');

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

  // Freshwaters Bayou Feast & Catering Calculator
  const guestSelect = document.getElementById('fshCalcGuests');
  const packageSelect = document.getElementById('fshCalcPackage');
  const sideCheckboxes = document.querySelectorAll('.fsh-side-check');
  const dessertCheckboxes = document.querySelectorAll('.fsh-dessert-check');

  const guestDisplay = document.getElementById('fshCalcGuestDisplay');
  const entreePanDisplay = document.getElementById('fshCalcEntreePans');
  const sidePanDisplay = document.getElementById('fshCalcSidePans');
  const dessertPanDisplay = document.getElementById('fshCalcDessertPans');
  const totalCostDisplay = document.getElementById('fshCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('fshCalcDetails');
  const mailQuoteLink = document.getElementById('fshMailQuoteLink');
  const copyQuoteBtn = document.getElementById('fshCopyQuoteBtn');

  function calculateBayouCatering() {
    if (!guestSelect || !packageSelect || !totalCostDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 20;
    const pkgType = packageSelect.value; // 'french-quarter', 'crescent-city', 'bayou-royale'

    let pricePerPerson = 18.50;
    let packageName = 'French Quarter Comfort Feast';
    let entreesIncluded = 'Golden Fried Chicken & BBQ Ribs';

    if (pkgType === 'crescent-city') {
      pricePerPerson = 23.00;
      packageName = 'Crescent City Seafood Special';
      entreesIncluded = 'Crispy "New Orleans" Catfish with Shrimp Gravy & Fried Chicken';
    } else if (pkgType === 'bayou-royale') {
      pricePerPerson = 28.50;
      packageName = 'Bayou Royale Grand Feast';
      entreesIncluded = '"New Orleans" Catfish, Crawfish Étouffée, BBQ Ribs & Fried Chicken';
    }

    const entreePans = Math.ceil(guests / 20);
    const sidePans = Math.ceil(guests / 18);

    let selectedSides = [];
    sideCheckboxes.forEach(cb => {
      if (cb.checked) {
        selectedSides.push(cb.value);
      }
    });

    let extraSidesCost = 0;
    if (selectedSides.length > 2) {
      extraSidesCost = (selectedSides.length - 2) * 3.50 * guests;
    }

    let selectedDesserts = [];
    dessertCheckboxes.forEach(cb => {
      if (cb.checked) {
        selectedDesserts.push(cb.value);
      }
    });

    const dessertPans = selectedDesserts.length > 0 ? Math.ceil(guests / 20) * selectedDesserts.length : 0;
    const dessertCost = dessertPans * 45.00;

    const baseCost = guests * pricePerPerson;
    const totalEstimate = baseCost + extraSidesCost + dessertCost;

    if (guestDisplay) guestDisplay.textContent = guests + ' Guests';
    if (entreePanDisplay) entreePanDisplay.textContent = entreePans + ' Full Pan(s)';
    if (sidePanDisplay) sidePanDisplay.textContent = sidePans + ' Full Pan(s)';
    if (dessertPanDisplay) dessertPanDisplay.textContent = dessertPans > 0 ? dessertPans + ' Pan(s)' : 'None';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${packageName} for ${guests} guests. Entrees: ${entreesIncluded}. Sides: ${selectedSides.join(', ') || 'Collard Greens, Mac & Cheese'}. Dessert/Drinks: ${selectedDesserts.join(', ') || 'Standard Southern Sweet Tea'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Catering Request: ${packageName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Freshwaters Team,\n\nI would like to request catering for an upcoming gathering:\n\n` +
        `- Event Date: [Please specify preferred date]\n` +
        `- Guest Count: ${guests}\n` +
        `- Catering Package: ${packageName} ($${pricePerPerson.toFixed(2)}/person)\n` +
        `- Entrees: ${entreesIncluded}\n` +
        `- Chosen Sides: ${selectedSides.join(', ') || 'Collard Greens, Mac & Cheese'}\n` +
        `- Dessert Add-ons: ${selectedDesserts.join(', ') || 'None'}\n` +
        `- Estimated Cost: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to confirm availability and discuss pickup/delivery details.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:freshwatersclt@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateBayouCatering);
  if (packageSelect) packageSelect.addEventListener('change', calculateBayouCatering);
  sideCheckboxes.forEach(cb => cb.addEventListener('change', calculateBayouCatering));
  dessertCheckboxes.forEach(cb => cb.addEventListener('change', calculateBayouCatering));

  // Initial calculation
  calculateBayouCatering();

  if (copyQuoteBtn && summaryDetailsDisplay && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Freshwaters Catering Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${totalCostDisplay.textContent}\nCall (704) 503-9629 to reserve your date!`;
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

/* Energy Cafe - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('nrgMenuToggle');
  const mobileMenu = document.getElementById('nrgMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.nrg-filter-btn');
  const menuItems = document.querySelectorAll('.nrg-menu-item');

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

  // Corporate Catering & Wellness Calculator
  const guestSelect = document.getElementById('nrgCalcGuests');
  const packageSelect = document.getElementById('nrgCalcPackage');
  const smoothieCheckboxes = document.querySelectorAll('.nrg-smoothie-check');
  const sideCheckboxes = document.querySelectorAll('.nrg-side-check');

  const guestDisplay = document.getElementById('nrgCalcGuestDisplay');
  const boxCountDisplay = document.getElementById('nrgCalcBoxCount');
  const saladPlatterDisplay = document.getElementById('nrgCalcSaladPlatters');
  const totalCostDisplay = document.getElementById('nrgCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('nrgCalcDetails');
  const mailQuoteLink = document.getElementById('nrgMailQuoteLink');
  const copyQuoteBtn = document.getElementById('nrgCopyQuoteBtn');

  function calculateWellnessCatering() {
    if (!guestSelect || !packageSelect || !totalCostDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 20;
    const pkgType = packageSelect.value; // 'executive-wrap-box', 'power-bowl-buffet', 'vip-wellness-banquet'

    let pricePerPerson = 15.75;
    let packageName = 'Executive Healthy Wrap Box Lunches';
    let foodIncluded = 'Signature Popeye or Turkey Avocado Wrap, Organic Quinoa Salad Cup, Apple & House Energy Bar';

    if (pkgType === 'power-bowl-buffet') {
      pricePerPerson = 17.50;
      packageName = 'Custom Superfood Grain Bowl Buffet';
      foodIncluded = 'Rotisserie Chicken & Falafel Bowls, Roasted Sweet Potatoes, Tri-Color Quinoa, Greens & Scratch Dressings';
    } else if (pkgType === 'vip-wellness-banquet') {
      pricePerPerson = 23.00;
      packageName = 'All-Inclusive Executive Wellness Feast';
      foodIncluded = 'Custom Wraps, Grain Bowls, Superfood Açai Cups, Protein Fuel Bars & Fresh Fruit Carafes';
    }

    const saladPlatters = Math.ceil(guests / 10);

    let selectedSmoothies = [];
    let smoothieCost = 0;
    smoothieCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        smoothieCost += cost * guests;
        selectedSmoothies.push(cb.value);
      }
    });

    let selectedSides = [];
    let sidesCost = 0;
    sideCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        sidesCost += cost;
        selectedSides.push(cb.value);
      }
    });

    const baseCost = guests * pricePerPerson;
    const totalEstimate = baseCost + smoothieCost + sidesCost;

    if (guestDisplay) guestDisplay.textContent = guests + ' Guests';
    if (boxCountDisplay) boxCountDisplay.textContent = guests + ' Boxed Meals';
    if (saladPlatterDisplay) saladPlatterDisplay.textContent = saladPlatters + ' Large Salad/Grain Platter(s)';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${packageName} for ${guests} guests. Includes: ${foodIncluded}. Smoothie Flights: ${selectedSmoothies.join(', ') || 'None'}. Side Trays: ${selectedSides.join(', ') || 'Standard Included Sides'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Corporate Healthy Catering Inquiry: ${packageName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Energy Cafe Catering Team,\n\nI would like to order healthy corporate office catering:\n\n` +
        `- Delivery Date & Time: [Please specify requested date & delivery time]\n` +
        `- Building & Suite: [Please specify Uptown Charlotte address: BOA Plaza or Duke Energy]\n` +
        `- Guest Count: ${guests} guests\n` +
        `- Catering Package: ${packageName} ($${pricePerPerson.toFixed(2)}/person)\n` +
        `- Inclusions: ${foodIncluded}\n` +
        `- Smoothie Add-Ons: ${selectedSmoothies.join(', ') || 'None'}\n` +
        `- Extra Platters: ${selectedSides.join(', ') || 'Standard Sides'}\n` +
        `- Estimated Cost: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to confirm our office order.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:catering@energycafecharlotte.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateWellnessCatering);
  if (packageSelect) packageSelect.addEventListener('change', calculateWellnessCatering);
  smoothieCheckboxes.forEach(cb => cb.addEventListener('change', calculateWellnessCatering));
  sideCheckboxes.forEach(cb => cb.addEventListener('change', calculateWellnessCatering));

  // Initial calculation
  calculateWellnessCatering();

  if (copyQuoteBtn && summaryDetailsDisplay && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Energy Cafe Healthy Catering Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${totalCostDisplay.textContent}\nCall (704) 910-1094 or email catering@energycafecharlotte.com to confirm!`;
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

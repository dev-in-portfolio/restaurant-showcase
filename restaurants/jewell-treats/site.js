/* Jewell Treats - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('jwtMenuToggle');
  const mobileMenu = document.getElementById('jwtMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.jwt-filter-btn');
  const menuItems = document.querySelectorAll('.jwt-menu-item');

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

  // Cupcake Tower & Event Dessert Calculator
  const guestSelect = document.getElementById('jwtCalcGuests');
  const formatSelect = document.getElementById('jwtCalcFormat');
  const flavorCheckboxes = document.querySelectorAll('.jwt-flavor-check');
  const addOnCheckboxes = document.querySelectorAll('.jwt-addon-check');

  const countDisplay = document.getElementById('jwtCalcGuestCountDisplay');
  const cupcakesDisplay = document.getElementById('jwtCalcTotalCupcakes');
  const towerTierDisplay = document.getElementById('jwtCalcTowerTiers');
  const costEstimateDisplay = document.getElementById('jwtCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('jwtCalcDetails');
  const mailQuoteLink = document.getElementById('jwtMailQuoteLink');
  const copyQuoteBtn = document.getElementById('jwtCopyQuoteBtn');

  function calculateDessertOrder() {
    if (!guestSelect || !formatSelect || !costEstimateDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 50;
    const formatType = formatSelect.value; // 'standard-tower', 'individual-boxes', 'luxury-gold'

    let pricePerCupcake = 4.25;
    let formatName = 'Tiered Clear Acrylic Dessert Tower';
    let tiersRequired = '4-Tier Display Tower';

    if (formatType === 'individual-boxes') {
      pricePerCupcake = 4.95;
      formatName = 'Individual Ribbon-Tied Gift Favor Boxes';
      tiersRequired = 'Individually Packaged Favors';
    } else if (formatType === 'luxury-gold') {
      pricePerCupcake = 5.50;
      formatName = 'Luxury Gold Mirror Stand Display with Cutting Cake Top';
      tiersRequired = '5-Tier Gold Tower + 6-inch Top Cake';
    }

    // Recommended count: 1.25 cupcakes per guest for mixed displays
    const totalCupcakes = Math.ceil(guests * 1.25);

    let selectedFlavors = [];
    flavorCheckboxes.forEach(cb => {
      if (cb.checked) {
        selectedFlavors.push(cb.value);
      }
    });

    let addOnCost = 0;
    let selectedAddOns = [];
    addOnCheckboxes.forEach(cb => {
      if (cb.checked) {
        const price = parseFloat(cb.getAttribute('data-price')) || 0;
        addOnCost += price;
        selectedAddOns.push(cb.value);
      }
    });

    const baseCost = totalCupcakes * pricePerCupcake;
    const totalEstimate = baseCost + addOnCost;

    if (countDisplay) countDisplay.textContent = guests + ' Guests';
    if (cupcakesDisplay) cupcakesDisplay.textContent = totalCupcakes + ' Cupcakes';
    if (towerTierDisplay) towerTierDisplay.textContent = tiersRequired;
    if (costEstimateDisplay) costEstimateDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${formatName} for ${guests} guests (${totalCupcakes} handcrafted cupcakes). Flavors: ${selectedFlavors.join(', ') || 'Ruby Red Velvet, Strawberry Sapphire, 14 Karat Cake'}. Enhancements: ${selectedAddOns.join(', ') || 'None'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Dessert Catering Inquiry: ${formatName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Jewell Treats Pastry Team,\n\nI would like to request an event dessert quote:\n\n` +
        `- Event Date: [Please specify event date]\n` +
        `- Guest Count: ${guests}\n` +
        `- Total Cupcakes Calculated: ${totalCupcakes}\n` +
        `- Display Format: ${formatName}\n` +
        `- Selected Gemstone Flavors: ${selectedFlavors.join(', ') || 'Ruby Red Velvet, Strawberry Sapphire, 14 Karat Cake'}\n` +
        `- Add-On Services: ${selectedAddOns.join(', ') || 'None'}\n` +
        `- Estimated Cost: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to confirm availability and discuss pickup or delivery in Charlotte.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:jewelltreats@yahoo.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculateDessertOrder);
  if (formatSelect) formatSelect.addEventListener('change', calculateDessertOrder);
  flavorCheckboxes.forEach(cb => cb.addEventListener('change', calculateDessertOrder));
  addOnCheckboxes.forEach(cb => cb.addEventListener('change', calculateDessertOrder));

  // Initial calculation
  calculateDessertOrder();

  if (copyQuoteBtn && summaryDetailsDisplay && costEstimateDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Jewell Treats Event Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${costEstimateDisplay.textContent}\nCall (980) 202-2530 to book!`;
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

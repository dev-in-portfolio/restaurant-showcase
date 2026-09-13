/* It's Poppin! Gourmet Kettle Korn - Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('popMenuToggle');
  const mobileMenu = document.getElementById('popMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Flavor Category Filtering
  const filterBtns = document.querySelectorAll('.pop-filter-btn');
  const menuItems = document.querySelectorAll('.pop-menu-item');

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

  // Event & Popcorn Bar Calculator
  const guestSelect = document.getElementById('popCalcGuests');
  const styleSelect = document.getElementById('popCalcStyle');
  const flavorCheckboxes = document.querySelectorAll('.pop-flavor-check');
  const addOnCheckboxes = document.querySelectorAll('.pop-addon-check');

  const guestDisplay = document.getElementById('popCalcGuestDisplay');
  const bagsDisplay = document.getElementById('popCalcBagsDisplay');
  const gallonsDisplay = document.getElementById('popCalcGallonsDisplay');
  const totalCostDisplay = document.getElementById('popCalcTotalCost');
  const summaryDetailsDisplay = document.getElementById('popCalcDetails');
  const mailQuoteLink = document.getElementById('popMailQuoteLink');
  const copyQuoteBtn = document.getElementById('popCopyQuoteBtn');

  function calculatePopcornEvent() {
    if (!guestSelect || !styleSelect || !totalCostDisplay) return;

    const guests = parseInt(guestSelect.value, 10) || 50;
    const styleType = styleSelect.value; // 'party-bags', 'popcorn-bar', 'gift-tins'

    let pricePerGuest = 4.50;
    let styleName = 'Individual Sealed Favor Bags';

    if (styleType === 'popcorn-bar') {
      pricePerGuest = 5.75;
      styleName = 'Full Popcorn Bar Buffet (Scoops & Tubs Included)';
    } else if (styleType === 'gift-tins') {
      pricePerGuest = 9.50;
      styleName = 'Custom 1-Gallon Designer Gift Tins';
    }

    // Selected flavors
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
        addOnCost += price * (cb.getAttribute('data-per-guest') === 'true' ? guests : 1);
        selectedAddOns.push(cb.value);
      }
    });

    const baseCost = guests * pricePerGuest;
    const totalEstimate = baseCost + addOnCost;
    const bulkGallons = Math.ceil(guests / 8);

    if (guestDisplay) guestDisplay.textContent = guests + ' Guests';
    if (bagsDisplay) bagsDisplay.textContent = guests + ' Favor Units';
    if (gallonsDisplay) gallonsDisplay.textContent = bulkGallons + ' Gallons Total';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + totalEstimate.toFixed(2);

    if (summaryDetailsDisplay) {
      summaryDetailsDisplay.textContent = `${styleName} for ${guests} guests. Flavors: ${selectedFlavors.join(', ') || 'Fried Chicken, Cookies & Cream, Caramel'}. Enhancements: ${selectedAddOns.join(', ') || 'Standard Packaging'}.`;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`Popcorn Event Inquiry: ${styleName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello It's Poppin! Team,\n\nI would like to request an event quote:\n\n` +
        `- Event Date: [Please specify event date]\n` +
        `- Estimated Guest Count: ${guests}\n` +
        `- Packaging Style: ${styleName} ($${pricePerGuest.toFixed(2)}/guest)\n` +
        `- Selected Flavors: ${selectedFlavors.join(', ') || 'Fried Chicken, Cookies & Cream, Caramel'}\n` +
        `- Add-Ons: ${selectedAddOns.join(', ') || 'None'}\n` +
        `- Estimated Total: $${totalEstimate.toFixed(2)}\n\n` +
        `Please contact me to confirm availability and discuss custom branding details.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:info@itspoppingourmetkettlekorn.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestSelect) guestSelect.addEventListener('change', calculatePopcornEvent);
  if (styleSelect) styleSelect.addEventListener('change', calculatePopcornEvent);
  flavorCheckboxes.forEach(cb => cb.addEventListener('change', calculatePopcornEvent));
  addOnCheckboxes.forEach(cb => cb.addEventListener('change', calculatePopcornEvent));

  // Initial calculation
  calculatePopcornEvent();

  if (copyQuoteBtn && summaryDetailsDisplay && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `It's Poppin! Event Quote:\n${summaryDetailsDisplay.textContent}\nEstimated Total: ${totalCostDisplay.textContent}\nCall (704) 327-6044 to reserve your popcorn bar!`;
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

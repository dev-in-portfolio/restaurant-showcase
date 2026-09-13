/* Don's Restaurant - Interactive Experience Script */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Navigation Toggle
  const toggleBtn = document.getElementById('donMenuToggle');
  const mobileMenu = document.getElementById('donMobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const filterBtns = document.querySelectorAll('.don-filter-btn');
  const menuItems = document.querySelectorAll('.don-menu-item');

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

  // VIP Dining & Lounge Experience Planner
  const guestsSelect = document.getElementById('donVipGuests');
  const tierSelect = document.getElementById('donVipTier');
  const occasionSelect = document.getElementById('donVipOccasion');
  const bottleChecks = document.querySelectorAll('.don-bottle-check');

  const guestDisplay = document.getElementById('donDisplayGuests');
  const seatingDisplay = document.getElementById('donDisplaySeating');
  const packageDisplay = document.getElementById('donDisplayPackage');
  const bottleDisplay = document.getElementById('donDisplayBottles');
  const totalCostDisplay = document.getElementById('donTotalCost');
  const depositDisplay = document.getElementById('donDepositAmount');
  const summaryDetails = document.getElementById('donVipSummaryText');
  const mailQuoteLink = document.getElementById('donMailQuoteLink');
  const copyQuoteBtn = document.getElementById('donCopyQuoteBtn');

  function calculateVipQuote() {
    if (!guestsSelect || !tierSelect || !totalCostDisplay) return;

    const guests = parseInt(guestsSelect.value, 10) || 4;
    const tier = tierSelect.value; // 'prime-table', 'executive-booth', 'velvet-lounge'
    const occasion = occasionSelect ? occasionSelect.value : 'Evening Dinner & Cocktails';

    let basePerPerson = 75.00;
    let tierName = 'Prime Dining Table';
    let tableType = 'Main Dining Room Booth';

    if (tier === 'executive-booth') {
      basePerPerson = 110.00;
      tierName = 'Executive Velvet Booth';
      tableType = 'Dedicated Elevated Booth & Sommelier';
    } else if (tier === 'velvet-lounge') {
      basePerPerson = 160.00;
      tierName = 'Ultra-VIP Lounge Suite';
      tableType = 'Private Lounge Section with Dedicated Host';
    }

    let bottleCost = 0;
    let selectedBottles = [];
    bottleChecks.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price')) || 0;
        bottleCost += cost;
        selectedBottles.push(cb.value);
      }
    });

    const diningTotal = guests * basePerPerson;
    const grandTotal = diningTotal + bottleCost;
    const depositRequired = Math.round(grandTotal * 0.30);

    if (guestDisplay) guestDisplay.textContent = guests + ' Guests';
    if (seatingDisplay) seatingDisplay.textContent = tableType;
    if (packageDisplay) packageDisplay.textContent = `${tierName} ($${basePerPerson.toFixed(2)}/person)`;
    if (bottleDisplay) bottleDisplay.textContent = selectedBottles.length > 0 ? selectedBottles.join(', ') : 'None Selected';
    if (totalCostDisplay) totalCostDisplay.textContent = '$' + grandTotal.toFixed(2);
    if (depositDisplay) depositDisplay.textContent = '$' + depositRequired.toFixed(2);

    const summaryText = `VIP Reservation Inquiry: ${tierName} for ${guests} guests. Occasion: ${occasion}. Seating: ${tableType}. Enhancements: ${selectedBottles.join(', ') || 'Standard Experience'}. Estimated Total: $${grandTotal.toFixed(2)} (Deposit: $${depositRequired.toFixed(2)}).`;

    if (summaryDetails) {
      summaryDetails.textContent = summaryText;
    }

    if (mailQuoteLink) {
      const subject = encodeURIComponent(`VIP Reservation Request: ${tierName} for ${guests} Guests`);
      const body = encodeURIComponent(
        `Hello Don's Restaurant VIP Concierge,\n\nI would like to reserve a VIP Experience with the following specifications:\n\n` +
        `- Guest Count: ${guests}\n` +
        `- Experience Tier: ${tierName} ($${basePerPerson.toFixed(2)}/person)\n` +
        `- Occasion: ${occasion}\n` +
        `- Seating Location: ${tableType}\n` +
        `- Bottle / Cocktail Add-ons: ${selectedBottles.join(', ') || 'None'}\n` +
        `- Estimated Cost: $${grandTotal.toFixed(2)}\n` +
        `- Required Hold Deposit: $${depositRequired.toFixed(2)}\n` +
        `- Desired Date & Time: [Please Specify Date & Preferred Time]\n\n` +
        `Please contact me at your earliest convenience to finalize our reservation.\n\nThank you!`
      );
      mailQuoteLink.href = `mailto:info@donscharlotte.com?subject=${subject}&body=${body}`;
    }
  }

  if (guestsSelect) guestsSelect.addEventListener('change', calculateVipQuote);
  if (tierSelect) tierSelect.addEventListener('change', calculateVipQuote);
  if (occasionSelect) occasionSelect.addEventListener('change', calculateVipQuote);
  bottleChecks.forEach(cb => cb.addEventListener('change', calculateVipQuote));

  // Initial calculation
  calculateVipQuote();

  if (copyQuoteBtn && summaryDetails && totalCostDisplay) {
    copyQuoteBtn.addEventListener('click', () => {
      const textToCopy = `Don's Restaurant VIP Quote:\n${summaryDetails.textContent}\nCall (704) 376-2909 to confirm reservation!`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const prev = copyQuoteBtn.textContent;
        copyQuoteBtn.textContent = 'Quote Copied!';
        setTimeout(() => {
          copyQuoteBtn.textContent = prev;
        }, 2500);
      });
    });
  }
});

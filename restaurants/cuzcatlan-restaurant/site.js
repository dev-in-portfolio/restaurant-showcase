/* ==========================================================================
   Cuzcatlan Restaurant - Interactive Client Script (site.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.cuz-mobile-toggle');
  const navLinks = document.querySelector('.cuz-nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Menu Category Filtering
  const tabBtns = document.querySelectorAll('.cuz-tab-btn');
  const menuSections = document.querySelectorAll('.cuz-menu-section');

  if (tabBtns.length > 0 && menuSections.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        menuSections.forEach(section => {
          if (category === 'all' || section.getAttribute('data-category') === category) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });
  }

  // Interactive Pupusa Box & Catering Calculator
  const boxSizeSelect = document.getElementById('cuzBoxSize');
  const masaSelect = document.getElementById('cuzMasaType');
  const drinkSelect = document.getElementById('cuzDrinkTier');
  const calcTotalDisplay = document.getElementById('cuzCalcTotal');
  const calcBreakdownDisplay = document.getElementById('cuzCalcBreakdown');

  function calculatePupusaBox() {
    if (!boxSizeSelect || !masaSelect || !drinkSelect || !calcTotalDisplay) return;

    const count = parseInt(boxSizeSelect.value, 10) || 12;
    const basePricePerPupusa = 3.50;
    const masaMultiplier = parseFloat(masaSelect.value) || 1.0; // rice flour adds small premium
    const drinkPriceTotal = parseFloat(drinkSelect.value) || 0;

    const pupusaSubtotal = count * basePricePerPupusa * masaMultiplier;
    const total = Math.round(pupusaSubtotal + drinkPriceTotal);

    calcTotalDisplay.textContent = '$' + total.toFixed(2);
    if (calcBreakdownDisplay) {
      const curtidoJars = Math.max(1, Math.floor(count / 6));
      calcBreakdownDisplay.textContent = count + ' Pupusas (' + (masaMultiplier > 1 ? 'Arroz' : 'Maiz') + ') | ' + curtidoJars + ' Curtido & Salsa Packs Included';
    }
  }

  if (boxSizeSelect && masaSelect && drinkSelect) {
    boxSizeSelect.addEventListener('change', calculatePupusaBox);
    masaSelect.addEventListener('change', calculatePupusaBox);
    drinkSelect.addEventListener('change', calculatePupusaBox);
    calculatePupusaBox();
  }

  // Interactive Flavor & Masa Explorer
  const flavorCards = document.querySelectorAll('.cuz-flavor-card');
  const flavorDisplay = document.getElementById('cuzFlavorDetail');

  if (flavorCards.length > 0 && flavorDisplay) {
    flavorCards.forEach(card => {
      card.addEventListener('click', () => {
        flavorCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const name = card.getAttribute('data-name');
        const ingredients = card.getAttribute('data-ingredients');
        const notes = card.getAttribute('data-notes');

        flavorDisplay.innerHTML = '<strong>' + name + '</strong>: ' + ingredients + '<br><span style="color:#615a52; font-size:0.88rem;">' + notes + '</span>';
      });
    });
  }
});

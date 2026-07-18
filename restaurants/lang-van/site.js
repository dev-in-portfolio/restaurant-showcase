(function () {
  'use strict';

  // 1. Interactive Flavor Map (flavor-guide.html)
  const button = document.getElementById('build-plan');
  const select1 = document.getElementById('choice-1');
  const select2 = document.getElementById('choice-2');
  const select3 = document.getElementById('choice-3');
  const summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateFlavorMap() {
      const foundation = select1.value;
      const intensity = select2.value;
      const balance = select3.value;

      summary.textContent = `Start with ${foundation}; keep the experience ${intensity.toLowerCase()}; finish with ${balance.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      const layers = [
        'svg-base-rice', 'svg-base-noodles', 'svg-base-shared-plates',
        'svg-sauce-gentle', 'svg-sauce-layered', 'svg-sauce-bold',
        'svg-garnish-fresh', 'svg-garnish-savory', 'svg-garnish-warming'
      ];
      layers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      const baseId = `svg-base-${foundation.toLowerCase().replace(/\s+/g, '-')}`;
      const sauceId = `svg-sauce-${intensity.toLowerCase()}`;
      const garnishId = `svg-garnish-${balance.toLowerCase()}`;

      // Show matching layers
      const baseEl = document.getElementById(baseId);
      if (baseEl) baseEl.classList.add('show');

      const sauceEl = document.getElementById(sauceId);
      if (sauceEl) sauceEl.classList.add('show');

      const garnishEl = document.getElementById(garnishId);
      if (garnishEl) garnishEl.classList.add('show');
    }

    button.addEventListener('click', updateFlavorMap);
    updateFlavorMap();
  }

  // 2. Catering Request Form submission handler (services.html)
  const cateringForm = document.getElementById('catering-form');
  const catSuccessPanel = document.getElementById('success-panel');
  const catSuccessMessage = document.getElementById('success-message');

  if (cateringForm && catSuccessPanel) {
    cateringForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';

      cateringForm.style.display = 'none';
      catSuccessPanel.style.display = 'block';
      if (catSuccessMessage) {
        catSuccessMessage.innerHTML = `Thank you, <strong>${name}</strong>. We have received your catering request. Our event coordinator will contact you at <strong>${phone}</strong> shortly.`;
      }
    });
  }

  // 3. Contact Form submission handler (contact.html)
  const contactForm = document.getElementById('contact-form');
  const conSuccessPanel = document.getElementById('success-panel');
  const conSuccessMessage = document.getElementById('success-message');

  if (contactForm && conSuccessPanel) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';

      contactForm.style.display = 'none';
      conSuccessPanel.style.display = 'block';
      if (conSuccessMessage) {
        conSuccessMessage.innerHTML = `Thank you, <strong>${name}</strong>. We have received your message and will respond as soon as possible.`;
      }
    });
  }
})();

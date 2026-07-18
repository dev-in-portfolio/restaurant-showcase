document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Interactive Skillet & Soda Customizer SVG layers (flavor-table.html)
  var button = document.getElementById('build-plan');
  var select1 = document.getElementById('choice-1');
  var select2 = document.getElementById('choice-2');
  var select3 = document.getElementById('choice-3');
  var summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateSkilletCustomizer() {
      var val1 = select1.value;
      var val2 = select2.value;
      var val3 = select3.value;

      summary.textContent = `Start with ${val1}; keep the experience ${val2.toLowerCase()}; finish with ${val3.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      var layers = [
        'svg-base-street-style', 'svg-base-family-table', 'svg-base-celebration',
        'svg-sauce-bright', 'svg-sauce-deep-&-savory', 'svg-sauce-spicy',
        'svg-garnish-individual-plates', 'svg-garnish-pass-around', 'svg-garnish-mixed-tasting'
      ];
      layers.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      var baseId = 'svg-base-' + val1.toLowerCase().replace(/\s+/g, '-');
      var sauceId = 'svg-sauce-' + val2.toLowerCase().replace(/\s+/g, '-');
      var garnishId = 'svg-garnish-' + val3.toLowerCase().replace(/\s+/g, '-');

      // Show matching elements
      var el1 = document.getElementById(baseId);
      if (el1) el1.classList.add('show');

      var el2 = document.getElementById(sauceId);
      if (el2) el2.classList.add('show');

      var el3 = document.getElementById(garnishId);
      if (el3) el3.classList.add('show');
    }

    button.addEventListener('click', updateSkilletCustomizer);
    updateSkilletCustomizer();
  }

  // 2. Contact Message Form (contact.html)
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }

  // 3. Pickup Order Reservation Form (contact.html)
  const resForm = document.getElementById('reservation-form');
  const resSuccessPanel = document.getElementById('success-panel');
  const resSuccessMsg = document.getElementById('success-message');
  if (resForm && resSuccessPanel) {
    resForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
      const time = document.getElementById('pickup-time') ? document.getElementById('pickup-time').value : '12:00';

      resForm.style.display = 'none';
      resSuccessPanel.style.display = 'block';
      if (resSuccessMsg) {
        resSuccessMsg.innerHTML = `Order logged, <strong>${name}</strong>! We will have it ready for counter pickup at <strong>${time} today</strong>. If we have questions, we'll call you at <strong>${phone}</strong>. Pay at the register!`;
      }
    });
  }

  // 4. Catering Inquiry Form (services.html)
  const cateringForm = document.getElementById('catering-form');
  const catSuccessPanel = document.getElementById('success-panel');
  const catSuccessMsg = document.getElementById('success-message');
  if (cateringForm && catSuccessPanel) {
    cateringForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';

      cateringForm.style.display = 'none';
      catSuccessPanel.style.display = 'block';
      if (catSuccessMsg) {
        catSuccessMsg.innerHTML = `Gracias, <strong>${name}</strong>. Your catering request has been sent to the kitchen. We will call you at <strong>${phone}</strong> shortly to confirm your order details.`;
      }
    });
  }
});

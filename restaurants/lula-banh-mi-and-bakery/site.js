document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile navigation menu toggle (optional if there's a toggle button)
  var toggle = document.querySelector('.toggle');
  var links = document.querySelector('.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var opened = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', opened);
    });
  }

  // 2. Interactive Coffee & Bakery customizer SVG layers (flavor-guide.html)
  var button = document.getElementById('build-plan');
  var select1 = document.getElementById('choice-1');
  var select2 = document.getElementById('choice-2');
  var select3 = document.getElementById('choice-3');
  var summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateBakeryCustomizer() {
      var val1 = select1.value;
      var val2 = select2.value;
      var val3 = select3.value;

      summary.textContent = `Start with ${val1}; keep the experience ${val2.toLowerCase()}; finish with ${val3.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      var layers = [
        'svg-base-rice', 'svg-base-noodles', 'svg-base-shared-plates',
        'svg-sauce-gentle', 'svg-sauce-layered', 'svg-sauce-bold',
        'svg-garnish-fresh', 'svg-garnish-savory', 'svg-garnish-warming'
      ];
      layers.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      var baseId = 'svg-base-' + val1.toLowerCase().replace(/\s+/g, '-');
      var sauceId = 'svg-sauce-' + val2.toLowerCase();
      var garnishId = 'svg-garnish-' + val3.toLowerCase();

      // Show matching elements
      var el1 = document.getElementById(baseId);
      if (el1) el1.classList.add('show');

      var el2 = document.getElementById(sauceId);
      if (el2) el2.classList.add('show');

      var el3 = document.getElementById(garnishId);
      if (el3) el3.classList.add('show');
    }

    button.addEventListener('click', updateBakeryCustomizer);
    updateBakeryCustomizer();
  }

  // 3. Catering Request Form submission handler (events.html)
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
        catSuccessMessage.innerHTML = `Thank you, <strong>${name}</strong>. We have received your catering request. Our events coordinator will contact you at <strong>${phone}</strong> shortly.`;
      }
    });
  }

  // 4. Contact Form submission handler (contact.html)
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
});

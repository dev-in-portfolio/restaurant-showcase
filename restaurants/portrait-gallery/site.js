document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile menu toggle (if needed - placeholder/ready)
  var toggle = document.querySelector('.toggle');
  var links = document.querySelector('.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var opened = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', opened);
    });
  }

  // 2. Interactive Picture Frame & Cocktail customizer SVG layers (flight-planner.html)
  var button = document.getElementById('build-plan');
  var select1 = document.getElementById('choice-1');
  var select2 = document.getElementById('choice-2');
  var select3 = document.getElementById('choice-3');
  var summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateCocktailCustomizer() {
      var val1 = select1.value;
      var val2 = select2.value;
      var val3 = select3.value;

      summary.textContent = `Start with ${val1}; keep the experience ${val2.toLowerCase()}; finish with ${val3.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      var layers = [
        'svg-pour1-crisp', 'svg-pour1-mellow', 'svg-pour1-fruit-forward',
        'svg-pour2-roasty', 'svg-pour2-hoppy', 'svg-pour2-spiced',
        'svg-pour3-bold', 'svg-pour3-rare', 'svg-pour3-dessert-like'
      ];
      layers.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      var id1 = 'svg-pour1-' + val1.toLowerCase();
      var id2 = 'svg-pour2-' + val2.toLowerCase();
      var id3 = 'svg-pour3-' + val3.toLowerCase().replace(/\s+/g, '-');

      // Show matching elements
      var el1 = document.getElementById(id1);
      if (el1) el1.classList.add('show');

      var el2 = document.getElementById(id2);
      if (el2) el2.classList.add('show');

      var el3 = document.getElementById(id3);
      if (el3) el3.classList.add('show');
    }

    button.addEventListener('click', updateCocktailCustomizer);
    updateCocktailCustomizer();
  }

  // 3. Contact Message Form (contact.html)
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }

  // 4. Table Reservation Form (contact.html)
  const resForm = document.getElementById('reservation-form');
  const resSuccessPanel = document.getElementById('success-panel');
  const resSuccessMsg = document.getElementById('success-message');
  if (resForm && resSuccessPanel) {
    resForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const email = document.getElementById('email') ? document.getElementById('email').value : '';
      const date = document.getElementById('date') ? document.getElementById('date').value : '';
      const time = document.getElementById('time') ? document.getElementById('time').value : '5:00';
      const guests = document.getElementById('guests') ? document.getElementById('guests').value : '2';

      resForm.style.display = 'none';
      resSuccessPanel.style.display = 'block';
      if (resSuccessMsg) {
        resSuccessMsg.innerHTML = `Salutations, <strong>${name}</strong>. Your requested table for <strong>${guests} guests</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been logged. Check <strong>${email}</strong> for your invitation details shortly.`;
      }
    });
  }

  // 5. Curation Event Inquiry Form (services.html)
  const inquiryForm = document.getElementById('inquiry-form');
  const inqSuccessPanel = document.getElementById('success-panel');
  const inqSuccessMsg = document.getElementById('success-message');
  if (inquiryForm && inqSuccessPanel) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const email = document.getElementById('email') ? document.getElementById('email').value : '';

      inquiryForm.style.display = 'none';
      inqSuccessPanel.style.display = 'block';
      if (inqSuccessMsg) {
        inqSuccessMsg.innerHTML = `Thank you, <strong>${name}</strong>. Your inquiry has been routed to our event planner. We will contact you at <strong>${email}</strong> soon.`;
      }
    });
  }
});

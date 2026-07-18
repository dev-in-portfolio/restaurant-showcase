document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile menu toggle (if needed)
  var toggle = document.querySelector('.toggle');
  var links = document.querySelector('.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var opened = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', opened);
    });
  }

  // 2. Category filters (menu.html)
  var filterBtns = [...document.querySelectorAll('[data-f]')];
  var cards = [...document.querySelectorAll('[data-g]')];
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (x) { x.classList.remove('on'); });
        btn.classList.add('on');
        var fVal = btn.getAttribute('data-f');
        cards.forEach(function (c) {
          c.hidden = (fVal !== 'all' && c.getAttribute('data-g') !== fVal);
        });
      });
    });
  }

  // 3. Interactive Comfort Plate SVG layers (comfort-plate.html)
  var button = document.getElementById('build-plan');
  var select1 = document.getElementById('choice-1');
  var select2 = document.getElementById('choice-2');
  var select3 = document.getElementById('choice-3');
  var summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updatePlateCustomizer() {
      var val1 = select1.value;
      var val2 = select2.value;
      var val3 = select3.value;

      summary.textContent = `Start with ${val1}; keep the experience ${val2.toLowerCase()}; finish with ${val3.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      var layers = [
        'svg-meal-breakfast', 'svg-meal-lunch', 'svg-meal-dinner',
        'svg-mood-classic', 'svg-mood-lighter', 'svg-mood-extra-comforting',
        'svg-style-quick-stop', 'svg-style-family-meal', 'svg-style-weekend-gathering'
      ];
      layers.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      var mealId = 'svg-meal-' + val1.toLowerCase();
      var moodId = 'svg-mood-' + val2.toLowerCase().replace(/\s+/g, '-');
      var styleId = 'svg-style-' + val3.toLowerCase().replace(/\s+/g, '-');

      // Show matching elements
      var el1 = document.getElementById(mealId);
      if (el1) el1.classList.add('show');

      var el2 = document.getElementById(moodId);
      if (el2) el2.classList.add('show');

      var el3 = document.getElementById(styleId);
      if (el3) el3.classList.add('show');
    }

    button.addEventListener('click', updatePlateCustomizer);
    updatePlateCustomizer();
  }

  // 4. Contact Message Form (contact.html)
  const contactForm = document.querySelector('[data-demo-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const parent = contactForm.parentNode;
      parent.innerHTML = `
        <div class="success-panel" style="display: block; text-align: center; padding: 2rem 0;">
          <div class="success-icon" style="font-size: 3rem; color: var(--gold); margin-bottom: 1rem;">✉</div>
          <h3 class="success-title" style="font-family: Fraunces, serif; font-size: 1.5rem; margin-bottom: 0.5rem;">Message Sent!</h3>
          <p class="success-msg" style="color: var(--muted); font-size: 0.95rem;">Thank you. Harper's Cafe staff has logged your inquiry and will contact you via email shortly.</p>
        </div>
      `;
    });
  }
});

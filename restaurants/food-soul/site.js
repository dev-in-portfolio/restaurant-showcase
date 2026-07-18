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

  // 3. Banquet Calculator (services.html)
  var guestSlider = document.getElementById('guests-count');
  var guestVal = document.getElementById('guests-val');
  var guestInput = document.getElementById('guests-count-input');
  var bowlsCount = document.getElementById('bowls-count');
  var macPans = document.getElementById('mac-pans');
  var puddingQuarts = document.getElementById('pudding-quarts');
  var feastCost = document.getElementById('feast-cost');
  var feastSummary = document.getElementById('feast-summary');

  function calculateFeast() {
    if (!guestSlider) return;
    var guests = parseInt(guestSlider.value, 10);
    if (guestVal) guestVal.textContent = guests;
    if (guestInput) guestInput.value = guests;

    var bowls = guests;
    var mac = Math.ceil(guests / 15);
    var pudding = Math.ceil(guests / 8);
    var totalCost = (bowls * 14) + (mac * 60) + (pudding * 20);

    if (bowlsCount) bowlsCount.textContent = bowls + ' ' + (bowls === 1 ? 'Bowl' : 'Bowls');
    if (macPans) macPans.textContent = mac + ' ' + (mac === 1 ? 'Pan' : 'Pans');
    if (puddingQuarts) puddingQuarts.textContent = pudding + ' ' + (pudding === 1 ? 'Quart' : 'Quarts');
    if (feastCost) feastCost.textContent = '$' + totalCost.toFixed(2);
    if (feastSummary) {
      feastSummary.textContent = 'Includes ' + bowls + ' loaded Cornbread Bowls, ' +
        mac + ' Mac & Cheese ' + (mac === 1 ? 'pan' : 'pans') + ', and ' +
        pudding + ' Banana Pudding ' + (pudding === 1 ? 'quart' : 'quarts') + '.';
    }
  }

  if (guestSlider) {
    guestSlider.addEventListener('input', calculateFeast);
    calculateFeast();
  }

  // 4. Interactive Comfort Plate SVG layers (comfort-plate.html)
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

  // 5. Contact Message Form (contact.html)
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }

  // 6. Table Reservation / Order Request Form (contact.html)
  const resForm = document.getElementById('reservation-form');
  const resSuccessPanel = document.getElementById('success-panel');
  const resSuccessMsg = document.getElementById('success-message');
  if (resForm && resSuccessPanel) {
    resForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
      const date = document.getElementById('date') ? document.getElementById('date').value : '';
      const time = document.getElementById('time') ? document.getElementById('time').value : '12:00 PM';

      resForm.style.display = 'none';
      resSuccessPanel.style.display = 'block';
      if (resSuccessMsg) {
        resSuccessMsg.innerHTML = `Welcome to the family, <strong>${name}</strong>! We have received your pickup request for <strong>${date}</strong> at <strong>${time}</strong>. If there are any delays, we will contact you at <strong>${phone}</strong>. Grab it hot at City Kitch counters!`;
      }
    });
  }

  // 7. Catering Request Form (services.html)
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
        catSuccessMsg.innerHTML = `Gracias, <strong>${name}</strong>. Your soul food catering request has been logged. Our coordinator will call you at <strong>${phone}</strong> shortly to arrange options and schedule pickup at City Kitch.`;
      }
    });
  }
});

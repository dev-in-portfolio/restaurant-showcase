document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile menu toggle
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

  // 3. Guest range slider (catering.html)
  var r = document.getElementById('range');
  var n = document.getElementById('count');
  var p = document.getElementById('plan');
  var c = document.getElementById('copy');

  function updateRange() {
    if (!r) return;
    var v = parseInt(r.value, 10);
    if (n) n.textContent = v + ' guests';
    
    var planText = 'Custom high-volume conversation';
    if (v < 12) {
      planText = 'Compact request';
    } else if (v < 40) {
      planText = 'Focused group request';
    } else if (v < 90) {
      planText = 'Planned large gathering';
    }
    if (p) p.textContent = planText;

    if (c) {
      c.textContent = 'For ' + v + ' guests, collect date, preferences and requirements before a real handoff to Picadeli\'s Pub-In-Deli.';
    }
  }

  if (r) {
    r.addEventListener('input', updateRange);
    updateRange();
  }

  // 4. Form demo toast
  var toast = document.querySelector('.toast');
  document.querySelectorAll('[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (toast) {
        toast.textContent = 'Demo complete — nothing was sent to Picadeli\'s Pub-In-Deli.';
        toast.classList.add('show');
        setTimeout(function () {
          toast.classList.remove('show');
        }, 4000);
      }
    });
  });

  // 5. Beer flight customizer SVG layers (flight-planner.html)
  var button = document.getElementById('build-plan');
  var select1 = document.getElementById('choice-1');
  var select2 = document.getElementById('choice-2');
  var select3 = document.getElementById('choice-3');
  var summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateFlightCustomizer() {
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

      // Map values to element IDs
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

    button.addEventListener('click', updateFlightCustomizer);
    updateFlightCustomizer();
  }
});
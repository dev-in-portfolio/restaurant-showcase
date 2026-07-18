document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile navigation menu toggle
  var toggle = document.querySelector('.toggle');
  var links = document.querySelector('.links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var opened = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', opened);
    });
  }

  // 2. Menu filtering logic (menu.html)
  var filterButtons = [...document.querySelectorAll('[data-f]')];
  var menuCards = [...document.querySelectorAll('[data-g]')];
  if (filterButtons.length && menuCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (x) { x.classList.remove('on'); });
        btn.classList.add('on');
        var filterVal = btn.getAttribute('data-f');
        menuCards.forEach(function (card) {
          card.hidden = (filterVal !== 'all' && card.getAttribute('data-g') !== filterVal);
        });
      });
    });
  }

  // 3. Range slider logic (orders.html)
  var r = document.getElementById('range');
  var n = document.getElementById('count');
  var p = document.getElementById('plan');
  var c = document.getElementById('copy');

  function updateOrderRange() {
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
      c.textContent = 'For ' + v + ' guests, collect date, preferences and requirements before a real handoff to Le’s Sandwiches & Café.';
    }
  }

  if (r) {
    r.addEventListener('input', updateOrderRange);
    updateOrderRange();
  }

  // 4. Form submission demo toast
  var toast = document.querySelector('.toast');
  document.querySelectorAll('[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (toast) {
        toast.textContent = 'Demo complete — nothing was sent to Le’s Sandwiches & Café.';
        toast.classList.add('show');
        setTimeout(function () {
          toast.classList.remove('show');
        }, 4000);
      }
    });
  });

  // 5. Bánh Mì customizer SVG transitions (flavor-guide.html)
  var button = document.getElementById('build-plan');
  var select1 = document.getElementById('choice-1');
  var select2 = document.getElementById('choice-2');
  var select3 = document.getElementById('choice-3');
  var summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateBanhMiCustomizer() {
      var val1 = select1.value;
      var val2 = select2.value;
      var val3 = select3.value;

      summary.textContent = `Start with ${val1}; keep the experience ${val2.toLowerCase()}; finish with ${val3.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all SVG layers
      var layers = [
        'svg-base-rice', 'svg-base-noodles', 'svg-base-shared-plates',
        'svg-sauce-gentle', 'svg-sauce-layered', 'svg-sauce-bold',
        'svg-garnish-fresh', 'svg-garnish-savory', 'svg-garnish-warming'
      ];
      layers.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Map choice values to element IDs
      var baseId = 'svg-base-' + val1.toLowerCase().replace(/\s+/g, '-');
      var sauceId = 'svg-sauce-' + val2.toLowerCase();
      var garnishId = 'svg-garnish-' + val3.toLowerCase();

      // Show the matching elements
      var el1 = document.getElementById(baseId);
      if (el1) el1.classList.add('show');

      var el2 = document.getElementById(sauceId);
      if (el2) el2.classList.add('show');

      var el3 = document.getElementById(garnishId);
      if (el3) el3.classList.add('show');
    }

    button.addEventListener('click', updateBanimMiCustomizer);
    // Bind to button click and run once initially
    updateBanhMiCustomizer();
  }
});
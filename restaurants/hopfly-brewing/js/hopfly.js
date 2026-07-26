/* ============================================
   HopFly Brewing — Site-specific interactions
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     1. Mobile Navigation Toggle
     ------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ------------------------------------------
     2. Location Toggle (Tab panel)
     ------------------------------------------ */
  var locBtns = document.querySelectorAll('.loc-btn');
  var locPanels = {
    clt: document.getElementById('panel-clt'),
    rm: document.getElementById('panel-rm')
  };

  function activateLocation(id) {
    Object.keys(locPanels).forEach(function (key) {
      var panel = locPanels[key];
      if (panel) {
        panel.classList.toggle('active', key === id);
      }
    });
    Array.prototype.forEach.call(locBtns, function (btn) {
      var isActive = btn.getAttribute('data-location') === id;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
  }

  Array.prototype.forEach.call(locBtns, function (btn) {
    btn.addEventListener('click', function () {
      var loc = btn.getAttribute('data-location');
      if (loc) activateLocation(loc);
    });
  });

  /* ------------------------------------------
     3. Beer Flight Builder
     ------------------------------------------ */

  var MAX_FLIGHT = 4;
  var selected = [];

  var selectorEl = document.getElementById('flight-selector');
  var trayEl = document.getElementById('flight-tray');
  var statusEl = document.getElementById('flight-status');
  var submitBtn = document.getElementById('flight-submit');

  if (selectorEl && trayEl && statusEl && submitBtn) {
    var traySlots = trayEl.querySelectorAll('.tray-slot');

    function updateFlight() {
      // Clear tray
      Array.prototype.forEach.call(traySlots, function (slot) {
        slot.classList.remove('filled');
        slot.textContent = '\u002B';
      });

      // Reset all options
      var allOptions = selectorEl.querySelectorAll('.flight-option');
      Array.prototype.forEach.call(allOptions, function (opt) {
        opt.classList.remove('selected', 'in-tray');
      });

      // Fill tray with selected beers
      selected.forEach(function (beer, i) {
        if (traySlots[i]) {
          traySlots[i].classList.add('filled');
          traySlots[i].textContent = beer.name;
        }
        // Mark option as selected and in-tray
        var optEl = selectorEl.querySelector('.flight-option[data-beer-id="' + beer.id + '"]');
        if (optEl) {
          optEl.classList.add('selected', 'in-tray');
        }
      });

      // Mark remaining unselected options
      var allOptions2 = selectorEl.querySelectorAll('.flight-option');
      Array.prototype.forEach.call(allOptions2, function (opt) {
        var id = opt.getAttribute('data-beer-id');
        if (!selected.some(function (s) { return s.id === id; })) {
          opt.classList.remove('selected', 'in-tray');
        }
      });

      // Update status
      var remaining = MAX_FLIGHT - selected.length;
      if (remaining > 0) {
        statusEl.textContent = 'Select ' + remaining + ' more beer' + (remaining > 1 ? 's' : '') + ' to build your flight';
        submitBtn.disabled = true;
      } else {
        statusEl.textContent = 'Your flight is ready! 4 beers selected.';
        submitBtn.disabled = false;
      }
    }

    // Click on a beer option to toggle selection
    selectorEl.addEventListener('click', function (e) {
      var target = e.target.closest('.flight-option');
      if (!target) return;

      var id = target.getAttribute('data-beer-id');
      var name = target.getAttribute('data-beer-name');

      if (!id || !name) return;

      var idx = selected.findIndex(function (s) { return s.id === id; });

      if (idx > -1) {
        // Remove
        selected.splice(idx, 1);
      } else if (selected.length < MAX_FLIGHT) {
        // Add
        selected.push({ id: id, name: name });
      }

      updateFlight();
    });

    // Submit button
    submitBtn.addEventListener('click', function () {
      if (selected.length === MAX_FLIGHT) {
        var names = selected.map(function (s) { return s.name; }).join(', ');
        alert('Demo flight order placed! Your flight: ' + names);
      }
    });
  }

})();

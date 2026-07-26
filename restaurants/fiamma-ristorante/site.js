/* ============================================
   Fiamma Ristorante — Site JavaScript
   ============================================ */

(function () {
  'use strict';

  // ── Mobile Navigation ──────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // ── Header Scroll Effect ───────────────────
  var header = document.getElementById('site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 16px rgba(26, 18, 8, 0.1)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = currentScroll;
    });
  }

  // ── Menu Category Filter ───────────────────
  var menuFilters = document.getElementById('menu-filters');
  var menuGrid = document.getElementById('menu-grid');
  var menuNoResults = document.getElementById('menu-no-results');
  var menuSearchInput = document.getElementById('menu-search');

  if (menuFilters && menuGrid) {
    var filterButtons = menuFilters.querySelectorAll('.menu-filter');
    var menuItems = menuGrid.querySelectorAll('.menu-item');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active state
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var category = btn.getAttribute('data-category');
        filterMenuItems(category);
      });
    });
  }

  // ── Menu Search ────────────────────────────
  if (menuSearchInput && menuGrid) {
    menuSearchInput.addEventListener('input', function () {
      var searchTerm = menuSearchInput.value.toLowerCase().trim();
      var activeFilter = menuFilters
        ? menuFilters.querySelector('.menu-filter.active')
        : null;
      var currentCategory = activeFilter
        ? activeFilter.getAttribute('data-category')
        : 'all';

      filterMenuItems(currentCategory, searchTerm);
    });
  }

  function filterMenuItems(category, searchTerm) {
    if (!menuGrid) return;

    var items = menuGrid.querySelectorAll('.menu-item');
    var visibleCount = 0;

    items.forEach(function (item) {
      var itemCategory = item.getAttribute('data-category');
      var itemName = (item.getAttribute('data-name') || '').toLowerCase();
      var itemText = item.textContent.toLowerCase();

      var matchesCategory = (category === 'all') || (itemCategory === category);
      var matchesSearch = !searchTerm ||
        itemName.indexOf(searchTerm) !== -1 ||
        itemText.indexOf(searchTerm) !== -1;

      if (matchesCategory && matchesSearch) {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    // Show/hide no results message
    if (menuNoResults) {
      menuNoResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // ── Smooth Scroll for Anchor Links ─────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

})();

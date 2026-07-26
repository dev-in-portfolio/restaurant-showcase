/* ===================================
   FLOWER CHILD — site.js
   =================================== */

document.addEventListener('DOMContentLoaded', function () {

  // === MOBILE NAV TOGGLE ===
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // === NAVBAR SCROLL EFFECT ===
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // === MENU CATEGORY FILTER ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  const noResults = document.getElementById('noResults');

  function filterMenu() {
    var activeBtn = document.querySelector('.filter-btn.active');
    var category = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
    var searchInput = document.getElementById('menuSearch');
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var visibleCount = 0;

    menuItems.forEach(function (item) {
      var itemCat = item.getAttribute('data-category');
      var itemName = item.getAttribute('data-name') || '';
      var itemText = item.textContent.toLowerCase();
      var matchesCategory = category === 'all' || itemCat === category;
      var matchesSearch = !query || itemName.indexOf(query) !== -1 || itemText.indexOf(query) !== -1;

      if (matchesCategory && matchesSearch) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filterMenu();
    });
  });

  // === MENU SEARCH ===
  var menuSearch = document.getElementById('menuSearch');
  if (menuSearch) {
    var searchTimeout;
    menuSearch.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filterMenu, 200);
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});

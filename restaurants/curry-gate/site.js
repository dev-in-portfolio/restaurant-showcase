// === CURRY GATE: Site JavaScript ===
(function(){
  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(toggle && navLinks){
    toggle.addEventListener('click',()=>{
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
  }

  // Location tabs (locations.html)
  const locTabs = document.querySelectorAll('.loc-tab');
  if (locTabs.length) {
    locTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        locTabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        var target = tab.getAttribute('data-loc');
        document.querySelectorAll('.loc-panel').forEach(function (p) {
          p.hidden = p.id !== 'loc-' + target;
        });
      });
    });
  }

  // Menu filter + search (menu.html)
  const menuBtns = document.querySelectorAll('.menu-controls button');
  const menuSections = document.querySelectorAll('.menu-section');
  const menuSearch = document.getElementById('menu-search-input');
  const menuEmpty = document.getElementById('menu-empty');
  if (menuBtns.length && menuSections.length) {
    var activeFilter = 'all';
    menuBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        menuBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        applyMenuFilter();
      });
    });
    if (menuSearch) {
      menuSearch.addEventListener('input', applyMenuFilter);
    }
    function applyMenuFilter() {
      var q = (menuSearch ? menuSearch.value : '').toLowerCase().trim();
      var anyVisible = false;
      menuSections.forEach(function (sec) {
        var cat = sec.getAttribute('data-category');
        var catMatch = activeFilter === 'all' || cat === activeFilter;
        var items = sec.querySelectorAll('.menu-row');
        var secVisible = false;
        items.forEach(function (row) {
          var text = row.textContent.toLowerCase();
          var show = catMatch && (!q || text.indexOf(q) !== -1);
          row.style.display = show ? 'flex' : 'none';
          if (show) secVisible = true;
        });
        sec.style.display = secVisible ? 'block' : 'none';
        if (secVisible) anyVisible = true;
      });
      if (menuEmpty) menuEmpty.hidden = anyVisible;
    }
  }
})();

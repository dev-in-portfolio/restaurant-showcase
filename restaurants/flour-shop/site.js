document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });

    // Close on link click
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // 2. Menu category filter (menu.html)
  const pills = document.querySelectorAll('.pill');
  const categories = document.querySelectorAll('.menu-category');
  const searchInput = document.getElementById('menu-search');
  const emptyMsg = document.querySelector('.menu-empty');

  function filterMenu() {
    var activePill = document.querySelector('.pill.active');
    var category = activePill ? activePill.getAttribute('data-category') : 'all';
    var search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var anyVisible = false;

    categories.forEach(function (cat) {
      var catKey = cat.getAttribute('data-category');
      var items = cat.querySelectorAll('.menu-row'); // Support row element layout
      var catVisible = false;

      if (category !== 'all' && catKey !== category) {
        cat.style.display = 'none';
        return;
      }

      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        var match = !search || text.indexOf(search) !== -1;
        item.style.display = match ? '' : 'none';
        if (match) catVisible = true;
      });

      cat.style.display = catVisible ? '' : 'none';
      if (catVisible) anyVisible = true;
    });

    if (emptyMsg) {
      emptyMsg.style.display = anyVisible ? 'none' : 'block';
    }
  }

  if (pills.length && categories.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        filterMenu();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', filterMenu);
    }
  }

  // 3. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. Pasta Pairing Builder (pasta-pairing.html)
  const buildPlanBtn = document.getElementById('build-plan');
  const choice1Select = document.getElementById('choice-1');
  const choice2Select = document.getElementById('choice-2');
  const choice3Select = document.getElementById('choice-3');

  if (choice1Select && choice2Select && choice3Select) {
    const summary = document.getElementById('summary');

    function updatePastaSVG() {
      const sauce = choice1Select.value.toLowerCase();
      const texture = choice2Select.value.toLowerCase();
      const finish = choice3Select.value.toLowerCase();

      // Hide all dynamic elements first
      const elementsToHide = [
        'svg-noodle-silky', 'svg-noodle-rustic', 'svg-noodle-baked',
        'svg-sauce-tomato', 'svg-sauce-creamy', 'svg-sauce-oil',
        'svg-finish-herbal', 'svg-finish-cheesy', 'svg-finish-peppery'
      ];
      elementsToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Show selected noodle
      let noodleId = 'svg-noodle-silky';
      if (texture === 'rustic') noodleId = 'svg-noodle-rustic';
      else if (texture === 'baked') noodleId = 'svg-noodle-baked';
      const noodleEl = document.getElementById(noodleId);
      if (noodleEl) noodleEl.classList.add('show');

      // Show selected sauce
      let sauceId = 'svg-sauce-tomato';
      if (sauce === 'creamy') sauceId = 'svg-sauce-creamy';
      else if (sauce === 'olive oil') sauceId = 'svg-sauce-oil';
      const sauceEl = document.getElementById(sauceId);
      if (sauceEl) sauceEl.classList.add('show');

      // Show selected finish
      let finishId = 'svg-finish-herbal';
      if (finish === 'cheesy') finishId = 'svg-finish-cheesy';
      else if (finish === 'peppery') finishId = 'svg-finish-peppery';
      const finishEl = document.getElementById(finishId);
      if (finishEl) finishEl.classList.add('show');
    }

    choice1Select.addEventListener('change', updatePastaSVG);
    choice2Select.addEventListener('change', updatePastaSVG);
    choice3Select.addEventListener('change', updatePastaSVG);

    if (buildPlanBtn) {
      buildPlanBtn.addEventListener('click', () => {
        const v1 = choice1Select.value;
        const v2 = choice2Select.value;
        const v3 = choice3Select.value;
        summary.textContent = `Start with ${v1} sauce; keep the experience ${v2.toLowerCase()}; finish with a ${v3.toLowerCase()} touch. Use this as a conversation starter with your server.`;
        updatePastaSVG();
      });
    }

    // Initial load
    updatePastaSVG();
  }
});

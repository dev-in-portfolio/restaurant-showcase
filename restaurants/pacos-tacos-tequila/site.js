(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const dishes = [...document.querySelectorAll('[data-category]')];
  if (filterButtons.length && dishes.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const wanted = button.dataset.filter;
        filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        dishes.forEach(d => {
          d.hidden = wanted !== 'all' && d.dataset.category !== wanted;
        });
      });
    });
  }

  const planner = document.querySelector('[data-planner]');
  if (planner) {
    const occasion = planner.querySelector('[data-occasion]');
    const count = planner.querySelector('[data-count]');
    const timing = planner.querySelector('[data-timing]');
    const title = planner.querySelector('[data-plan-title]');
    const summary = planner.querySelector('[data-plan-summary]');
    const list = planner.querySelector('[data-plan-list]');
    const plans = {
      'Business Dinner': [
        'Reserve La Caja for 12–24 guests',
        'Pre-select shared fajita & taco spreads',
        'Arrange tequila flight pairing for the table',
        'Confirm A/V needs for presentations'
      ],
      'Birthday Celebration': [
        'Book Main Dining Room for 30–70 guests',
        'Add a custom margarita or paloma to the menu',
        'Coordinate dessert timing with candles',
        'Request patio access for cocktail hour'
      ],
      'Family Gathering': [
        'Choose family-style enchilada & taco platters',
        'Include kids\' quesadilla & chicken tender options',
        'Reserve earlier seating (5–6pm) for comfort',
        'Ask about high chairs & booster availability'
      ],
      'Rehearsal Dinner': [
        'Full Main Room buyout available Fri/Sat',
        'Curate a signature welcome cocktail',
        'Design a printed menu with couple\'s names',
        'Coordinate with FS Food Group events team'
      ]
    };
    const update = () => {
      const n = Math.max(1, Number(count.value) || 1);
      title.textContent = occasion.value;
      summary.textContent = `${n} ${n === 1 ? 'guest' : 'guests'} · ${timing.value.toLowerCase()}.`;
      list.innerHTML = plans[occasion.value].map(item => `<li>${item}</li>`).join('');
    };
    [occasion, count, timing].forEach(el => el.addEventListener('input', update));
    update();
  }

  const calc = document.querySelector('[data-catering-calc]');
  if (calc) {
    const guestInput = calc.querySelector('[data-guests]');
    const tierSelect = calc.querySelector('[data-tier]');
    const output = calc.querySelector('[data-estimate]');
    const tiers = { 'Fiesta Buffet': 28, 'Signature Spread': 38, 'Premium Experience': 52 };
    const compute = () => {
      const guests = Math.max(10, Math.min(200, Number(guestInput.value) || 10));
      const perPerson = tiers[tierSelect.value] || 28;
      const subtotal = guests * perPerson;
      const service = Math.round(subtotal * 0.18);
      const total = subtotal + service;
      output.innerHTML = `
        <dl class="estimate-breakdown">
          <div><dt>${guests} guests</dt><dd>× $${perPerson}/person</dd></div>
          <div><dt>Food subtotal</dt><dd>$${subtotal.toLocaleString()}</dd></div>
          <div><dt>Service (18%)</dt><dd>$${service.toLocaleString()}</dd></div>
          <div class="estimate-total"><dt>Estimated total</dt><dd>$${total.toLocaleString()}</dd></div>
        </dl>
        <p class="estimate-note">*Final pricing confirmed by events team. Minimum 10 guests. Tax not included.</p>
      `;
    };
    [guestInput, tierSelect].forEach(el => el.addEventListener('input', compute));
    compute();
  }
})();
(function () {
  'use strict';

  // 1. Mobile menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  // 2. Interactive Visit Customizer SVG Layer toggles (signature-experience.html)
  const button = document.getElementById('build-plan');
  const select1 = document.getElementById('choice-1');
  const select2 = document.getElementById('choice-2');
  const select3 = document.getElementById('choice-3');
  const summary = document.getElementById('summary');

  if (button && select1 && select2 && select3 && summary) {
    function updateVisitExperience() {
      const occasion = select1.value;
      const pace = select2.value;
      const direction = select3.value;

      summary.textContent = `Start with ${occasion}; keep the experience ${pace.toLowerCase()}; finish with ${direction.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      const layers = [
        'svg-occ-everyday', 'svg-occ-date', 'svg-occ-group',
        'svg-pace-quick', 'svg-pace-relaxed', 'svg-pace-celebratory',
        'svg-dir-familiar', 'svg-dir-seasonal', 'svg-dir-surprising'
      ];
      layers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      const occId = `svg-occ-${occasion.toLowerCase().split(' ')[0]}`;
      const paceId = `svg-pace-${pace.toLowerCase()}`;
      const dirId = `svg-dir-${direction.toLowerCase()}`;

      // Show matching layers
      const occEl = document.getElementById(occId);
      if (occEl) occEl.classList.add('show');

      const paceEl = document.getElementById(paceId);
      if (paceEl) paceEl.classList.add('show');

      const dirEl = document.getElementById(dirId);
      if (dirEl) dirEl.classList.add('show');
    }

    button.addEventListener('click', updateVisitExperience);
    updateVisitExperience();
  }

  // 3. Catering Request Form submission handler (catering.html)
  const cateringForm = document.getElementById('catering-form');
  const catSuccess = document.getElementById('catering-success');

  if (cateringForm && catSuccess) {
    cateringForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
      const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';

      cateringForm.style.display = 'none';
      catSuccess.style.display = 'block';
      const successMsg = catSuccess.querySelector('.success-message');
      if (successMsg) {
        successMsg.innerHTML = `Thank you, <strong>${name}</strong>. We have received your catering request. Our event team will contact you at <strong>${phone}</strong> shortly to review options.`;
      }
    });
  }

  // 4. Contact Form submission handler (contact.html)
  const contactForm = document.getElementById('contact-form');
  const conSuccess = document.getElementById('contact-success');

  if (contactForm && conSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';

      contactForm.style.display = 'none';
      conSuccess.style.display = 'block';
      const successMsg = conSuccess.querySelector('.success-message');
      if (successMsg) {
        successMsg.innerHTML = `Thank you, <strong>${name}</strong>. Your greeting has been successfully submitted to the Laurel Market team.`;
      }
    });
  }
})();

(function () {
  'use strict';

  // 1. Interactive Comfort Plate (comfort-plate.html)
  const button = document.getElementById('build-plan');
  const mealSelect = document.getElementById('choice-1');
  const moodSelect = document.getElementById('choice-2');
  const styleSelect = document.getElementById('choice-3');
  const summary = document.getElementById('summary');

  if (button && mealSelect && moodSelect && styleSelect && summary) {
    function updateComfortPlate() {
      const meal = mealSelect.value;
      const mood = moodSelect.value;
      const style = styleSelect.value;

      summary.textContent = `Start with ${meal}; keep the experience ${mood.toLowerCase()}; finish with ${style.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      const layers = [
        'svg-main-breakfast', 'svg-main-lunch', 'svg-main-dinner',
        'svg-side-classic', 'svg-side-lighter', 'svg-side-comforting',
        'svg-table-quick', 'svg-table-family', 'svg-table-weekend'
      ];
      layers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      const mainId = `svg-main-${meal.toLowerCase().replace(/\s+/g, '-')}`;
      const sideId = `svg-side-${mood.toLowerCase().includes('lighter') ? 'lighter' : mood.toLowerCase().includes('comforting') ? 'comforting' : 'classic'}`;
      const tableId = `svg-table-${style.toLowerCase().includes('quick') ? 'quick' : style.toLowerCase().includes('family') ? 'family' : 'weekend'}`;

      const mainEl = document.getElementById(mainId);
      if (mainEl) mainEl.classList.add('show');

      const sideEl = document.getElementById(sideId);
      if (sideEl) sideEl.classList.add('show');

      const tableEl = document.getElementById(tableId);
      if (tableEl) tableEl.classList.add('show');
    }

    button.addEventListener('click', updateComfortPlate);
    updateComfortPlate();
  }

  // 2. Catering Form Handler (services.html)
  const cateringForm = document.getElementById('catering-form');
  const successPanel = document.getElementById('success-panel');
  const successMsg = document.getElementById('success-message');

  if (cateringForm && successPanel && successMsg) {
    cateringForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      cateringForm.style.display = 'none';
      successPanel.style.display = 'block';
      successMsg.innerHTML = `Thank you, <strong>${name}</strong>. We have received your country catering details. Our kitchen manager will contact you at <strong>${phone}</strong> shortly to verify quantities and pickup time.`;
    });
  }

  // 3. Contact Greeting Form Handler (contact.html)
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }

  // 4. Hot Pickup Order Form Handler (contact.html)
  const reservationForm = document.getElementById('reservation-form');
  const resSuccessPanel = document.getElementById('success-panel');
  const resSuccessMsg = document.getElementById('success-message');

  if (reservationForm && resSuccessPanel && resSuccessMsg) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const time = document.getElementById('pickup-time').value;

      reservationForm.style.display = 'none';
      resSuccessPanel.style.display = 'block';
      resSuccessMsg.innerHTML = `Welcome to the family, <strong>${name}</strong>! We have received your request for pickup at <strong>${time}</strong>. If there are any delays, we will contact you at <strong>${phone}</strong>. Grab it hot at the drive-thru or lobby counter!`;
    });
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // 1. Mobile navigation menu toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  // 2. Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 3. FAQ answer accordion toggle
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      var answer = this.nextElementSibling;
      if (answer) {
        answer.classList.toggle('open');
      }
    });
  });

  // 4. Tasting Flight Planner SVG Layer updates (flight-planner.html)
  const button = document.getElementById('build-plan');
  const pour1 = document.getElementById('choice-1');
  const pour2 = document.getElementById('choice-2');
  const pour3 = document.getElementById('choice-3');
  const summary = document.getElementById('summary');

  if (button && pour1 && pour2 && pour3 && summary) {
    function updateTastingFlight() {
      const p1 = pour1.value;
      const p2 = pour2.value;
      const p3 = pour3.value;

      summary.textContent = `Start with ${p1}; keep the experience ${p2.toLowerCase()}; finish with ${p3.toLowerCase()}. Use this as a conversation starter, then confirm the restaurant's current offerings.`;

      // Hide all layers
      const layers = [
        'svg-flight-crisp', 'svg-flight-mellow', 'svg-flight-fruit-forward',
        'svg-flight-roasty', 'svg-flight-hoppy', 'svg-flight-spiced',
        'svg-flight-bold', 'svg-flight-rare', 'svg-flight-dessert-like'
      ];
      layers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
      });

      // Match values to element IDs
      const firstId = `svg-flight-${p1.toLowerCase().replace(/\s+/g, '-')}`;
      const secondId = `svg-flight-${p2.toLowerCase().replace(/\s+/g, '-')}`;
      const thirdId = `svg-flight-${p3.toLowerCase().replace(/\s+/g, '-')}`;

      // Show matching layers
      const el1 = document.getElementById(firstId);
      if (el1) el1.classList.add('show');

      const el2 = document.getElementById(secondId);
      if (el2) el2.classList.add('show');

      const el3 = document.getElementById(thirdId);
      if (el3) el3.classList.add('show');
    }

    button.addEventListener('click', updateTastingFlight);
    updateTastingFlight();
  }

  // 5. Beer Mood recommendation engine (beer.html)
  var moodForm = document.getElementById('beerMoodForm');
  var moodResult = document.getElementById('moodResult');
  if (moodForm && moodResult) {
    var moodRadios = moodForm.querySelectorAll('input[name="mood"]');
    var vibeRadios = moodForm.querySelectorAll('input[name="vibe"]');

    var recommendations = {
      'hoppy,new': {
        name: 'Citra Haze IPA',
        desc: 'A juicy, hazy IPA bursting with citrus and tropical fruit notes. Smooth bitterness with a pillowy mouthfeel.',
        style: 'New England IPA'
      },
      'hoppy,classic': {
        name: 'West Coast IPA',
        desc: 'Piney, resinous, and boldly bitter. A crisp, clear IPA with a long, satisfying finish.',
        style: 'American IPA'
      },
      'hoppy,food': {
        name: 'Session IPA',
        desc: 'All the hop character at a lower ABV. Bright citrus and floral notes make it a versatile food companion.',
        style: 'Session IPA'
      },
      'malty,new': {
        name: 'Honey Amber Ale',
        desc: 'A smooth amber ale with local honey sweetness, toasted malt backbone, and a clean finish.',
        style: 'Amber Ale'
      },
      'malty,classic': {
        name: 'English Brown Ale',
        desc: 'Nutty, toasty, and gently sweet. A traditional brown ale with caramel undertones and a crisp finish.',
        style: 'Brown Ale'
      },
      'malty,food': {
        name: 'Altbier',
        desc: 'A German-style copper ale with bready malt character, moderate bitterness, and remarkable food versatility.',
        style: 'Altbier'
      },
      'dark,new': {
        name: 'Coffee Milk Stout',
        desc: 'Rich and velvety with cold-brew coffee from a local roaster. Lactose adds a silky sweetness.',
        style: 'Milk Stout'
      },
      'dark,classic': {
        name: 'Irish Dry Stout',
        desc: 'Roasty, dry, and eminently sessionable. Notes of dark chocolate and coffee with a bone-dry finish.',
        style: 'Dry Stout'
      },
      'dark,food': {
        name: 'Foreign Extra Stout',
        desc: 'Bigger and bolder than a dry stout. Dark fruit, molasses, and roasted malt — a powerhouse with grilled meats.',
        style: 'Foreign Extra Stout'
      },
      'crisp,new': {
        name: 'Key Lime Gose',
        desc: 'A tart, refreshing gose with key lime, sea salt, and a touch of coriander. Bright and crushable.',
        style: 'Fruited Gose'
      },
      'crisp,classic': {
        name: 'German Pilsner',
        desc: 'Crisp, clean, and beautifully bitter. Noble hops and a tight bubble make this the gold standard of refreshing beer.',
        style: 'German Pilsner'
      },
      'crisp,food': {
        name: 'Belgian Witbier',
        desc: 'Cloudy and aromatic with orange peel and coriander. Light-bodied and effervescent — ideal with seafood and salads.',
        style: 'Witbier'
      },
      'sour,new': {
        name: 'Mixed Berry Sour',
        desc: 'A kettle sour aged on raspberries, blackberries, and blueberries. Tart, fruity, and brilliantly fuchsia.',
        style: 'Fruit Sour'
      },
      'sour,classic': {
        name: 'Berliner Weisse',
        desc: 'A German-style sour with a clean lactic tang. Light, low-ABV, and incredibly refreshing. Prost!',
        style: 'Berliner Weisse'
      },
      'sour,food': {
        name: 'Flanders Red Ale',
        desc: 'A complex, oak-aged sour ale with cherry and dark fruit notes. The acidity cuts through rich dishes beautifully.',
        style: 'Flanders Red'
      },
      'boozy,new': {
        name: 'Triple IPA',
        desc: 'An aggressive hop bomb with massive citrus and pine character. Deceptively smooth for its elevated ABV.',
        style: 'Triple IPA'
      },
      'boozy,classic': {
        name: 'Belgian Tripel',
        desc: 'Golden, complex, and dangerously drinkable. Spicy phenolics, fruity esters, and a dry finish.',
        style: 'Belgian Tripel'
      },
      'boozy,food': {
        name: 'Barleywine',
        desc: 'A sipper. Rich, sweet, and intense with dark fruit, toffee, and warm alcohol. Perfect with cheese or dessert.',
        style: 'American Barleywine'
      }
    };

    function updateMoodSuggestion() {
      var mood = null;
      var vibe = null;
      moodRadios.forEach(function (r) { if (r.checked) mood = r.value; });
      vibeRadios.forEach(function (r) { if (r.checked) vibe = r.value; });

      if (mood && vibe) {
        var key = mood + ',' + vibe;
        var rec = recommendations[key];
        if (rec) {
          moodResult.innerHTML =
            '<h4>Your Perfect Pour</h4>' +
            '<span class="beer-name">' + rec.name + '</span>' +
            '<p class="beer-desc">' + rec.desc + '</p>' +
            '<span class="beer-style">' + rec.style + '</span>' +
            '<br><button class="btn btn-primary" style="margin-top:1rem" data-demo-form>Ask a Cicerone About This Beer</button>';
        }
      } else {
        moodResult.innerHTML = '<p style="color:var(--text-muted);margin:0">Select your mood and vibe to get a personalized recommendation.</p>';
      }
    }

    moodRadios.forEach(function (r) { r.addEventListener('change', updateMoodSuggestion); });
    vibeRadios.forEach(function (r) { r.addEventListener('change', updateMoodSuggestion); });
  }
});

/* === Fenian's Keep — site.js === */
(() => {
  'use strict';

  // 1. Mobile Navigation Toggle
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Drinks Page: Tab switcher
  const tabButtons = document.querySelectorAll('.tab-bar button');
  const drinkSections = document.querySelectorAll('.drink-section');
  if (tabButtons.length && drinkSections.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetPanel = btn.getAttribute('data-toggle');
        drinkSections.forEach(sec => {
          if (sec.getAttribute('data-panel') === targetPanel) {
            sec.classList.remove('hidden');
          } else {
            sec.classList.add('hidden');
          }
        });
      });
    });
  }

  // 3. Drinks Page: Perfect Pint Quiz
  const pintBtn = document.getElementById('pint-btn');
  if (pintBtn) {
    pintBtn.addEventListener('click', () => {
      const mood = document.getElementById('mood-pint').value;
      const result = document.getElementById('pint-result');
      const name = document.getElementById('pint-name');
      const desc = document.getElementById('pint-desc');
      const picks = {
        classic: {
          name: 'Guinness Draught',
          desc: 'The one and only. Smooth, creamy, perfectly poured — you can’t go wrong with the classic Irish dry stout.'
        },
        bold: {
          name: 'Jameson Black Barrel Neat',
          desc: 'Bold, rich and double-charred — a whiskey that stands up to any conversation. Served neat or on a single large cube.'
        },
        light: {
          name: 'Harp Lager',
          desc: 'Crisp, refreshing and easygoing. A clean Irish lager that goes down easy on any night.'
        },
        adventurous: {
          name: 'The Fenian — House Signature',
          desc: 'Powers Irish whiskey, Guinness syrup, bitters and lemon — our bartender’s own creation. Bold, sweet and unmistakably Irish.'
        }
      };
      if (!mood) {
        result.classList.remove('show');
        return;
      }
      const pick = picks[mood];
      if (pick) {
        name.textContent = pick.name;
        desc.textContent = pick.desc;
        result.classList.add('show');
      }
    });
  }

  // 4. Events Page: Pub Night Planner Quiz
  const nightBtn = document.getElementById('night-btn');
  if (nightBtn) {
    nightBtn.addEventListener('click', () => {
      const vibe = document.getElementById('vibe').value;
      const result = document.getElementById('night-result');
      const name = document.getElementById('night-name');
      const desc = document.getElementById('night-desc');
      const picks = {
        music: {
          name: 'Friday Night Live Folk',
          desc: 'Live acoustic or Irish folk music starting at 9:00 PM — no cover, great vibes, and $5.00 Guinness pints until 8:00 PM.'
        },
        sports: {
          name: 'Saturday Match Days',
          desc: 'Premier League, college football, or UFC on the screens. Open early at 2:00 PM — come for the match, stay for the pints.'
        },
        trivia: {
          name: 'Thursday Team Trivia',
          desc: '7:00 PM start time, free to play, and teams of up to 6. Winning team gets a round on the house. Fresh weekly themes.'
        },
        chill: {
          name: 'Sunday Lazy Sessions',
          desc: '$5.00 Bloody Marys, $6.00 mimosas, NFL on the screens, and zero pressure. The perfect way to ease back into the week.'
        }
      };
      if (!vibe) {
        result.classList.remove('show');
        return;
      }
      const pick = picks[vibe];
      if (pick) {
        name.textContent = pick.name;
        desc.textContent = pick.desc;
        result.classList.add('show');
      }
    });
  }

  // 5. Flight Planner: SVG Visualizer
  const buildPlanBtn = document.getElementById('build-plan');
  const choice1Select = document.getElementById('choice-1');
  const choice2Select = document.getElementById('choice-2');
  const choice3Select = document.getElementById('choice-3');

  if (buildPlanBtn && choice1Select && choice2Select && choice3Select) {
    const summary = document.getElementById('summary');

    function updateFlightSVG() {
      const c1 = choice1Select.value;
      const c2 = choice2Select.value;
      const c3 = choice3Select.value;

      // Color maps matching selected whiskey characteristics
      const c1Colors = {
        'Crisp': '#f8ebb4',         // Pale straw gold
        'Mellow': '#f5c66c',        // Golden amber honey
        'Fruit-forward': '#e09834'  // Dark honey-orange
      };
      const c2Colors = {
        'Roasty': '#582b12',        // Deep stout-chestnut
        'Hoppy': '#ecb84b',         // Bright pilsner amber
        'Spiced': '#c66c1b'         // Rich copper orange
      };
      const c3Colors = {
        'Bold': '#4d1c16',          // Dark copper mahogany
        'Rare': '#8c251d',          // Glowing ruby reserve
        'Dessert-like': '#2a1a0f'   // Deep syrupy dark chocolate
      };

      const f1 = document.getElementById('fluid-1');
      const f2 = document.getElementById('fluid-2');
      const f3 = document.getElementById('fluid-3');

      if (f1) f1.setAttribute('fill', c1Colors[c1] || '#f8ebb4');
      if (f2) f2.setAttribute('fill', c2Colors[c2] || '#ecb84b');
      if (f3) f3.setAttribute('fill', c3Colors[c3] || '#4d1c16');

      // Update label texts below each glass
      const lbl1 = document.getElementById('label-pour-1');
      const lbl2 = document.getElementById('label-pour-2');
      const lbl3 = document.getElementById('label-pour-3');

      if (lbl1) lbl1.textContent = c1;
      if (lbl2) lbl2.textContent = c2;
      if (lbl3) lbl3.textContent = c3;
    }

    // Bind event listeners to dropdown changes
    choice1Select.addEventListener('change', updateFlightSVG);
    choice2Select.addEventListener('change', updateFlightSVG);
    choice3Select.addEventListener('change', updateFlightSVG);

    buildPlanBtn.addEventListener('click', () => {
      const v1 = choice1Select.value;
      const v2 = choice2Select.value;
      const v3 = choice3Select.value;
      summary.textContent = `Start with ${v1}; keep the experience ${v2.toLowerCase()}; finish with ${v3.toLowerCase()}. Use this as a conversation starter, then confirm the pub's current offerings.`;
      updateFlightSVG();
    });

    // Run once on load to render the default selection
    updateFlightSVG();
  }
})();

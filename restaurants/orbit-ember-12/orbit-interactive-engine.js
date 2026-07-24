/**
 * ORBIT & EMBER — CINEMATIC AMBIENT STORYTELLING ENGINE
 * Features full-bleed crossfading media loops, Web Audio soundscape, and 10 deterministic result families.
 */

(function () {
  'use strict';

  class OrbitCinematicEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');

      this.audioContext = null;
      this.isAudioPlaying = false;
      this.particles = [];
      this.mouseX = window.innerWidth / 2;
      this.mouseY = window.innerHeight / 2;

      this.resize();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });

      this.initParticles();
      this.animate();
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    initParticles() {
      this.particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 12), 80);

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2.8 + 1.0,
          speedY: Math.random() * 0.6 + 0.2,
          speedX: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.75 + 0.15,
          pulse: Math.random() * 0.015 + 0.005
        });
      }
    }

    setAtmosphere(theme) {
      const bgLayer = document.getElementById('cinematic-bg-layer');
      if (!bgLayer) return;

      let imgUrl = "url('images/lounge-ambiance.jpg')";
      if (theme === 'golden-hour') imgUrl = "url('images/cosmic-cocktail.jpg')";
      else if (theme === 'by-the-fire') imgUrl = "url('images/wood-fired-hearth.jpg')";
      else if (theme === 'at-the-bar') imgUrl = "url('images/featured-steak.jpg')";
      else if (theme === 'brighter-brunch') imgUrl = "url('images/featured-flatbread.jpg')";

      bgLayer.style.backgroundImage = `linear-gradient(180deg, rgba(8, 7, 6, 0.65) 0%, rgba(8, 7, 6, 0.92) 100%), ${imgUrl}`;
    }

    toggleAudio() {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioCtx();

        // White noise generator for hearth fire crackle & room acoustics
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 550;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0.07;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        whiteNoise.start();
        this.isAudioPlaying = true;
        return true;
      } else {
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
          this.isAudioPlaying = true;
          return true;
        } else {
          this.audioContext.suspend();
          this.isAudioPlaying = false;
          return false;
        }
      }
    }

    animate() {
      if (!this.canvas || !this.ctx) return;
      const w = this.canvas.width;
      const h = this.canvas.height;

      this.ctx.clearRect(0, 0, w, h);

      const parallaxX = (this.mouseX - w / 2) * 0.02;
      const parallaxY = (this.mouseY - h / 2) * 0.02;

      this.particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += p.pulse;
        if (p.alpha > 0.85 || p.alpha < 0.1) p.pulse = -p.pulse;

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }

        this.ctx.beginPath();
        this.ctx.arc(p.x + parallaxX, p.y + parallaxY, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(224, 168, 104, ' + p.alpha + ')';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(224, 168, 104, 0.8)';
        this.ctx.fill();
      });

      requestAnimationFrame(() => this.animate());
    }
  }

  // Scoring Engine & Result Data
  const ORBIT_RESULTS = {
    candlelit: {
      id: "candlelit",
      name: "The Candlelit Orbit",
      eyebrow: "A Slow Evening Near the Fire",
      intro: "Warm light, a measured pace, and a dinner that leaves room for one more course around the hearth.",
      beginWith: "Copper Moon (Cocktail) & Hearth Bread",
      bringToTable: "Charred Carrots & Black Garlic Short Rib",
      finishWith: "Burnt Honey Cheesecake",
      zeroProof: "Lunar Bloom (Wild Blackberry & Lime)",
      collection: "Signature Orbit & Ember",
      primaryCta: "Reserve a Table for Two",
      primaryUrl: "reserve.html"
    },
    fire: {
      id: "fire",
      name: "Around the Fire",
      eyebrow: "Built Around Flame and Char",
      intro: "Start with plates made to move around the table, then follow the fire into the main course.",
      beginWith: "Fire-Roasted Oysters & Smoked Pepper Flatbread",
      bringToTable: "Ember-Roasted Chicken & Wood-Fired Mushrooms",
      finishWith: "Wood-Fired Peach Dessert",
      zeroProof: "Bright Ash (Smoked Tea & Ginger)",
      collection: "Around the Fire Collection",
      primaryCta: "View Fire-Cooked Dishes",
      primaryUrl: "menu.html"
    },
    bar: {
      id: "bar",
      name: "The Bar Orbit",
      eyebrow: "Start with the Glass",
      intro: "Begin at the bar with a drink and a few smaller hearth plates, then decide whether the evening wants to stay there.",
      beginWith: "Solar Flare & Crispy Potatoes",
      bringToTable: "Wood-Fired Mushrooms & Smoked Flatbread",
      finishWith: "Event Horizon Espresso Martini",
      zeroProof: "Ember Tonic (Charred Citrus)",
      collection: "Cocktails After Dark",
      primaryCta: "Explore Cocktail Menu",
      primaryUrl: "menu.html"
    },
    golden: {
      id: "golden",
      name: "Golden Hour at Orbit & Ember",
      eyebrow: "A Brighter Beginning",
      intro: "Citrus, herbs, a little daylight, and a table that can move naturally into dinner.",
      beginWith: "First Light Spritz & Charred Carrots",
      bringToTable: "Ember-Roasted Half Chicken & Dressed Greens",
      finishWith: "Seasonal Fruit Crumble",
      zeroProof: "Garden Orbit (Cucumber & Basil)",
      collection: "The Current Season",
      primaryCta: "Reserve a Table",
      primaryUrl: "reserve.html"
    },
    shared: {
      id: "shared",
      name: "The Shared Table",
      eyebrow: "More Plates, Fewer Boundaries",
      intro: "Build the evening across several shared plates and let the table decide what comes next.",
      beginWith: "Hearth Bread, Oysters & Charred Carrots",
      bringToTable: "Black Garlic Short Rib & Half Chicken",
      finishWith: "Burnt Honey Cheesecake & Dark Chocolate Torte",
      zeroProof: "Lunar Bloom Spritz",
      collection: "Made for Sharing",
      primaryCta: "Build a Shared Table",
      primaryUrl: "menu.html"
    },
    brunch: {
      id: "brunch",
      name: "A Brighter Brunch",
      eyebrow: "Coffee First, Then Everything Else",
      intro: "Brunch moves at a different speed: something warm, something bright, and enough time to decide between sweet and savory.",
      beginWith: "House Specialty Coffee & First Light Spritz",
      bringToTable: "Ember Benedict & Short Rib Hash",
      finishWith: "Wood-Fired Peach French Toast",
      zeroProof: "House Citrus Soda",
      collection: "Weekend Brunch Collection",
      primaryCta: "Reserve for Brunch",
      primaryUrl: "reserve.html"
    },
    occasion: {
      id: "occasion",
      name: "The Occasion",
      eyebrow: "Give the Evening a Reason",
      intro: "A gathering with a little more shape: a first drink, a table built to share, and a finish worth staying for.",
      beginWith: "Welcome Champagne Toast & Oysters",
      bringToTable: "Oak-Grilled Ribeye & Short Rib",
      finishWith: "Celebration Dessert Board",
      zeroProof: "Lunar Bloom (Zero-Proof)",
      collection: "Private Dining & Events",
      primaryCta: "Explore Private Events",
      primaryUrl: "experience.html"
    },
    focused: {
      id: "focused",
      name: "The Focused Table",
      eyebrow: "Clear, Considered, and Unhurried",
      intro: "A more direct path through the menu, with enough room for conversation.",
      beginWith: "Garden Orbit Zero-Proof & Shared Flatbread",
      bringToTable: "Ember-Roasted Half Chicken",
      finishWith: "Specialty Coffee & Dark Chocolate Torte",
      zeroProof: "Garden Orbit",
      collection: "Signature Collection",
      primaryCta: "Reserve a Table",
      primaryUrl: "reserve.html"
    },
    spiritfree: {
      id: "spiritfree",
      name: "The Spirit-Free Orbit",
      eyebrow: "A Complete Evening Without Spirits",
      intro: "Bright acidity, herbs, tea, fruit, bitterness, and texture carry the evening without alcohol.",
      beginWith: "Lunar Bloom & Charred Carrots",
      bringToTable: "Wood-Fired Mushrooms & Crispy Potatoes",
      finishWith: "Burnt Honey Cheesecake",
      zeroProof: "Ember Tonic & Bright Ash",
      collection: "Zero-Proof Collection",
      primaryCta: "Explore Zero-Proof Menu",
      primaryUrl: "menu.html"
    },
    dessert: {
      id: "dessert",
      name: "Save Room",
      eyebrow: "The Evening Is Not Over Yet",
      intro: "Begin wherever you like, but leave the final part of the night open for dark chocolate, burnt honey, coffee, and warm spice.",
      beginWith: "Event Horizon Espresso Martini",
      bringToTable: "Burnt Honey Cheesecake & Dark Chocolate Torte",
      finishWith: "Wood-Fired Fruit & Affogato",
      zeroProof: "House Citrus Soda",
      collection: "Save Room for Dessert",
      primaryCta: "Explore Dessert Menu",
      primaryUrl: "menu.html"
    }
  };

  function calculateOrbitResult(choices) {
    const { atmosphere, pace, flavor, table } = choices;

    if (atmosphere === 'brighter-brunch') return ORBIT_RESULTS.brunch;
    if (flavor === 'fresh-zero-proof') return ORBIT_RESULTS.spiritfree;
    if (flavor === 'sweet-finish') return ORBIT_RESULTS.dessert;
    if (table === 'celebration' || pace === 'occasion') return ORBIT_RESULTS.occasion;
    if (table === 'business' || pace === 'focused') return ORBIT_RESULTS.focused;
    if (atmosphere === 'at-the-bar' || pace === 'drinks-first') return ORBIT_RESULTS.bar;
    if (atmosphere === 'by-the-fire' || flavor === 'smoky-charred') return ORBIT_RESULTS.fire;
    if (pace === 'shared' || table === 'friends' || table === 'group') return ORBIT_RESULTS.shared;
    if (atmosphere === 'golden-hour' || flavor === 'bright-herbal') return ORBIT_RESULTS.golden;

    return ORBIT_RESULTS.candlelit;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cinematic-ember-canvas')) {
      window.cinematicOrbitEngine = new OrbitCinematicEngine('cinematic-ember-canvas');
    }
  });

  window.calculateOrbitResult = calculateOrbitResult;
})();

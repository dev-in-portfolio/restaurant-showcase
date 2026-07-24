// The Orbit Experience — Ultra-Premium 3D Canvas & Scoring Engine

class OrbitCanvas3DEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.tableScale = 1.0;
    this.lightingTheme = 'candlelight';
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;

    this.heatWaves = [];
    this.time = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX;
      this.targetMouseY = e.clientY;
    });

    this.initScene();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initScene() {
    this.particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 9), 120);

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 600 + 40,
        size: Math.random() * 3.8 + 1.2,
        speedY: Math.random() * 0.9 + 0.3,
        speedX: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.85 + 0.15,
        pulse: Math.random() * 0.02 + 0.008,
        colorType: Math.random() > 0.3 ? 'brand' : (Math.random() > 0.5 ? 'gold' : 'amber')
      });
    }

    this.heatWaves = [
      { r: 20, maxR: 300, alpha: 0.5, speed: 1.6 },
      { r: 110, maxR: 300, alpha: 0.35, speed: 1.6 },
      { r: 200, maxR: 300, alpha: 0.2, speed: 1.6 }
    ];
  }

  setAtmosphere(theme) {
    this.lightingTheme = theme;
  }

  setTableScale(scale) {
    this.tableScale = scale;
  }

  getThemeColors() {
    switch (this.lightingTheme) {
      case 'golden-hour':
        return {
          glow: 'rgba(234, 179, 8, 0.4)',
          particles: { brand: 'rgba(234, 179, 8, ', gold: 'rgba(253, 224, 71, ', amber: 'rgba(245, 158, 11, ' },
          bgGrad: ['#22170f', '#332316', '#090807']
        };
      case 'by-the-fire':
        return {
          glow: 'rgba(239, 68, 68, 0.5)',
          particles: { brand: 'rgba(239, 68, 68, ', gold: 'rgba(252, 165, 165, ', amber: 'rgba(220, 38, 38, ' },
          bgGrad: ['#320e09', '#4a140d', '#090807']
        };
      case 'at-the-bar':
        return {
          glow: 'rgba(168, 85, 247, 0.4)',
          particles: { brand: 'rgba(168, 85, 247, ', gold: 'rgba(216, 180, 254, ', amber: 'rgba(147, 51, 234, ' },
          bgGrad: ['#161129', '#241a45', '#090807']
        };
      case 'brighter-brunch':
        return {
          glow: 'rgba(251, 191, 36, 0.4)',
          particles: { brand: 'rgba(251, 191, 36, ', gold: 'rgba(254, 240, 138, ', amber: 'rgba(217, 119, 6, ' },
          bgGrad: ['#2b2218', '#423424', '#090807']
        };
      case 'candlelight':
      default:
        return {
          glow: 'rgba(194, 122, 74, 0.45)',
          particles: { brand: 'rgba(194, 122, 74, ', gold: 'rgba(240, 186, 149, ', amber: 'rgba(180, 83, 9, ' },
          bgGrad: ['#1d1613', '#31231c', '#090807']
        };
    }
  }

  animate() {
    if (!this.canvas || !this.ctx) return;
    this.time += 0.015;

    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const theme = this.getThemeColors();

    const parallaxX = (this.mouseX - width / 2) * 0.045;
    const parallaxY = (this.mouseY - height / 2) * 0.045;

    // Background Radial Gradient
    const bgGrad = this.ctx.createRadialGradient(width / 2 + parallaxX, height / 2 - 120 + parallaxY, 100, width / 2, height / 2, width);
    bgGrad.addColorStop(0, theme.bgGrad[1]);
    bgGrad.addColorStop(0.55, theme.bgGrad[0]);
    bgGrad.addColorStop(1, theme.bgGrad[2]);
    this.ctx.fillStyle = bgGrad;
    this.ctx.fillRect(0, 0, width, height);

    // Heat Waves
    const cx = width / 2 + parallaxX;
    const cy = height * 0.62 + parallaxY;
    const baseR = Math.min(width, height) * 0.28 * this.tableScale;

    this.heatWaves.forEach(w => {
      w.r += w.speed;
      if (w.r > w.maxR) w.r = 10;
      const alpha = Math.max(0, (1 - w.r / w.maxR) * 0.35);

      this.ctx.beginPath();
      this.ctx.arc(cx, cy, w.r, 0, Math.PI * 2);
      this.ctx.strokeStyle = theme.glow.replace(/[\d\.]+\)$/, alpha + ')');
      this.ctx.lineWidth = 2.5;
      this.ctx.stroke();
    });

    // 3D Table Surface
    const hearthGlow = this.ctx.createRadialGradient(cx, cy, 10, cx, cy, baseR * 2.0);
    hearthGlow.addColorStop(0, theme.glow);
    hearthGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = hearthGlow;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, baseR * 2.0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, baseR * 1.45, baseR * 0.58, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(24, 19, 16, 0.9)';
    this.ctx.strokeStyle = 'rgba(194, 122, 74, 0.5)';
    this.ctx.lineWidth = 3.5;
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, baseR * 1.3, baseR * 0.5, 0, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(240, 186, 149, 0.4)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    // Floating Ember Particles
    this.particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX + Math.sin(this.time + p.z) * 0.35;
      p.alpha += p.pulse;
      if (p.alpha > 0.95 || p.alpha < 0.15) p.pulse = -p.pulse;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      const pScale = 320 / p.z;
      const drawX = p.x + parallaxX * (pScale * 0.2);
      const drawY = p.y + parallaxY * (pScale * 0.2);
      const drawSize = p.size * pScale;
      const colorStr = theme.particles[p.colorType] || theme.particles.brand;

      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, Math.max(drawSize, 1.2), 0, Math.PI * 2);
      this.ctx.fillStyle = colorStr + p.alpha + ')';
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = colorStr + '0.95)';
      this.ctx.fill();
    });

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

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

window.OrbitCanvas3DEngine = OrbitCanvas3DEngine;
window.calculateOrbitResult = calculateOrbitResult;

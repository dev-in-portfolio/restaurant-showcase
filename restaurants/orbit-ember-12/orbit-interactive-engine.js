// The Orbit Experience — Immersive Canvas 3D Environment, Particle Shader & Scoring Engine

class OrbitCanvas3DEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.tableScale = 1.0;
    this.cameraZoom = 1.0;
    this.lightingTheme = 'candlelight';
    this.flavorShimmer = 'none';
    this.animId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
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
    const count = Math.min(Math.floor(window.innerWidth / 12), 90);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 500 + 50,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * 0.02 + 0.005
      });
    }
  }

  setAtmosphere(theme) {
    this.lightingTheme = theme;
  }

  setFlavor(flavor) {
    this.flavorShimmer = flavor;
  }

  setTableScale(scale) {
    this.tableScale = scale;
  }

  getThemeColors() {
    switch (this.lightingTheme) {
      case 'golden-hour':
        return {
          glow: 'rgba(234, 179, 8, 0.25)',
          particles: 'rgba(250, 204, 21, ',
          bgGrad: ['#1c140e', '#2e2016', '#0d0c0b']
        };
      case 'by-the-fire':
        return {
          glow: 'rgba(239, 68, 68, 0.35)',
          particles: 'rgba(248, 113, 113, ',
          bgGrad: ['#280d09', '#3e130c', '#0d0c0b']
        };
      case 'at-the-bar':
        return {
          glow: 'rgba(168, 85, 247, 0.25)',
          particles: 'rgba(192, 132, 252, ',
          bgGrad: ['#120e24', '#1e163a', '#0d0c0b']
        };
      case 'brighter-brunch':
        return {
          glow: 'rgba(251, 191, 36, 0.25)',
          particles: 'rgba(253, 224, 71, ',
          bgGrad: ['#241f17', '#383023', '#0d0c0b']
        };
      case 'candlelight':
      default:
        return {
          glow: 'rgba(194, 122, 74, 0.3)',
          particles: 'rgba(224, 150, 99, ',
          bgGrad: ['#181412', '#28201a', '#0d0c0b']
        };
    }
  }

  animate() {
    if (!this.canvas || !this.ctx) return;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const theme = this.getThemeColors();

    // 1. Draw Atmospheric Radial Background Gradient
    const bgGrad = this.ctx.createRadialGradient(width / 2, height / 2 - 100, 100, width / 2, height / 2, width);
    bgGrad.addColorStop(0, theme.bgGrad[1]);
    bgGrad.addColorStop(0.5, theme.bgGrad[0]);
    bgGrad.addColorStop(1, theme.bgGrad[2]);
    this.ctx.fillStyle = bgGrad;
    this.ctx.fillRect(0, 0, width, height);

    // 2. Draw Simulated 3D Central Wood-Fired Hearth & Table Glow
    const cx = width / 2;
    const cy = height * 0.65;
    const tableRadius = Math.min(width, height) * 0.28 * this.tableScale;

    // Outer Hearth Radial Glow
    const hearthGlow = this.ctx.createRadialGradient(cx, cy, 10, cx, cy, tableRadius * 1.8);
    hearthGlow.addColorStop(0, theme.glow);
    hearthGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = hearthGlow;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, tableRadius * 1.8, 0, Math.PI * 2);
    this.ctx.fill();

    // Perspective Elliptical Table Surface
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, tableRadius * 1.4, tableRadius * 0.55, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(25, 20, 17, 0.85)';
    this.ctx.strokeStyle = 'rgba(194, 122, 74, 0.4)';
    this.ctx.lineWidth = 3;
    this.ctx.fill();
    this.ctx.stroke();

    // Table Rim Copper Accent Ring
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, tableRadius * 1.25, tableRadius * 0.48, 0, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(224, 150, 99, 0.3)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    // 3. Render Floating Ember Particles with 3D Depth Shift
    this.particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += p.pulse;
      if (p.alpha > 0.95 || p.alpha < 0.2) p.pulse = -p.pulse;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      const perspectiveScale = 300 / p.z;
      const drawSize = p.size * perspectiveScale;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(drawSize, 1), 0, Math.PI * 2);
      this.ctx.fillStyle = theme.particles + p.alpha + ')';
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = theme.particles + '0.9)';
      this.ctx.fill();
    });

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

// 10 Deterministic Result Families & Scoring System
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

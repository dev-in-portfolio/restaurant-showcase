// The Orbit Experience — Canvas Particle Shader & Scoring Engine

class OrbitParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.colorTheme = 'candlelight';
    this.animId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
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
    const count = Math.min(Math.floor(window.innerWidth / 15), 60);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.5 + 0.8,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        pulse: Math.random() * 0.02 + 0.005
      });
    }
  }

  setTheme(theme) {
    this.colorTheme = theme;
  }

  getColors() {
    switch (this.colorTheme) {
      case 'golden-hour':
        return { bg: 'rgba(28, 20, 14, 0.4)', particle: 'rgba(234, 179, 8, ' };
      case 'by-the-fire':
        return { bg: 'rgba(30, 12, 8, 0.4)', particle: 'rgba(239, 68, 68, ' };
      case 'at-the-bar':
        return { bg: 'rgba(14, 16, 24, 0.4)', particle: 'rgba(168, 85, 247, ' };
      case 'brighter-brunch':
        return { bg: 'rgba(35, 30, 24, 0.4)', particle: 'rgba(250, 204, 21, ' };
      case 'candlelight':
      default:
        return { bg: 'rgba(20, 16, 14, 0.4)', particle: 'rgba(194, 122, 74, ' };
    }
  }

  animate() {
    if (!this.canvas || !this.ctx) return;
    const colors = this.getColors();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += p.pulse;
      if (p.alpha > 0.9 || p.alpha < 0.2) p.pulse = -p.pulse;

      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = colors.particle + p.alpha + ')';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = colors.particle + '0.8)';
      this.ctx.fill();
    });

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

// 10 Deterministic Result Families & Scoring Algorithm
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

window.OrbitParticleCanvas = OrbitParticleCanvas;
window.calculateOrbitResult = calculateOrbitResult;

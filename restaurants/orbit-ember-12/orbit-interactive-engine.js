/**
 * ORBIT & EMBER — UNIFIED 3D WEBGL GRAPHICS ENGINE
 * Renders full 3D restaurant environment, hearth fire, table, plates & glassware with dynamic camera transitions.
 */

(function () {
  'use strict';

  class Orbit3DEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.activeAtmosphere = 'candlelight';
      this.cameraStep = 'entry';
      this.tableScale = 1.0;

      this.camPos = { x: 0, y: 2.4, z: 7.2 };
      this.targetCamPos = { x: 0, y: 2.4, z: 7.2 };
      this.camTarget = { x: 0, y: 1.1, z: 0 };
      this.targetCamTarget = { x: 0, y: 1.1, z: 0 };

      this.mouseX = 0;
      this.mouseY = 0;
      this.targetMouseX = 0;
      this.targetMouseY = 0;

      this.initThreeOrNative();
      this.bindEvents();
      this.animate();
    }

    initThreeOrNative() {
      if (typeof THREE !== 'undefined') {
        this.initThreeJS();
      } else {
        this.initNativeWebGL();
      }
      this.initEmbers();
    }

    initThreeJS() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.3;

      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x080605, 0.038);

      this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
      this.clock = new THREE.Clock();

      // Lighting
      this.ambientLight = new THREE.AmbientLight(0x2d211a, 1.4);
      this.scene.add(this.ambientLight);

      this.hearthLight = new THREE.PointLight(0xff5500, 5.8, 22);
      this.hearthLight.position.set(0, 2.2, -4.5);
      this.scene.add(this.hearthLight);

      this.pendantLight1 = new THREE.PointLight(0xf5b975, 3.6, 14);
      this.pendantLight1.position.set(-1.2, 3.9, 0.5);
      this.scene.add(this.pendantLight1);

      this.pendantLight2 = new THREE.PointLight(0xf5b975, 3.6, 14);
      this.pendantLight2.position.set(1.2, 3.9, 0.5);
      this.scene.add(this.pendantLight2);

      // Floor & Wall
      const floorGeo = new THREE.PlaneGeometry(32, 32);
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x080605, roughness: 0.18 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      this.scene.add(floor);

      const wallGeo = new THREE.PlaneGeometry(32, 16);
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x100d0b, roughness: 0.88 });
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(0, 8, -6);
      this.scene.add(wall);

      // Steel Oven & Flame
      const ovenGeo = new THREE.BoxGeometry(5.4, 3.9, 1.4);
      const ovenMat = new THREE.MeshStandardMaterial({ color: 0x161311, roughness: 0.45, metalness: 0.55 });
      const oven = new THREE.Mesh(ovenGeo, ovenMat);
      oven.position.set(0, 1.95, -5.4);
      this.scene.add(oven);

      // Table Group
      this.tableGroup = new THREE.Group();
      const topGeo = new THREE.BoxGeometry(3.9, 0.14, 1.95);
      const topMat = new THREE.MeshStandardMaterial({ color: 0x1c130f, roughness: 0.28 });
      this.tableTop = new THREE.Mesh(topGeo, topMat);
      this.tableTop.position.set(0, 0.85, 0);
      this.tableGroup.add(this.tableTop);

      const legGeo = new THREE.BoxGeometry(0.16, 0.85, 1.5);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x0a0807, metalness: 0.88 });
      const leg1 = new THREE.Mesh(legGeo, legMat); leg1.position.set(-1.55, 0.425, 0); this.tableGroup.add(leg1);
      const leg2 = new THREE.Mesh(legGeo, legMat); leg2.position.set(1.55, 0.425, 0); this.tableGroup.add(leg2);

      this.placeSettingsGroup = new THREE.Group();
      this.tableGroup.add(this.placeSettingsGroup);
      this.scene.add(this.tableGroup);

      this.updateTableSettings('two');
    }

    initNativeWebGL() {
      this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    initEmbers() {
      this.embers = [];
      for (let i = 0; i < 140; i++) {
        this.embers.push({
          x: (Math.random() - 0.5) * 3.6,
          y: Math.random() * 3.5,
          z: -5.0 + (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3.5 + 1.2,
          speedY: Math.random() * 0.015 + 0.005,
          alpha: Math.random() * 0.8 + 0.2
        });
      }
    }

    setAtmosphere(theme) {
      this.activeAtmosphere = theme;
      if (!this.scene) return;

      if (theme === 'golden-hour') {
        this.scene.fog.color.setHex(0x1a130c);
        this.ambientLight.color.setHex(0x3e2b1a);
        this.hearthLight.intensity = 2.4;
        this.pendantLight1.color.setHex(0xfde047);
        this.pendantLight2.color.setHex(0xfde047);
      } else if (theme === 'by-the-fire') {
        this.scene.fog.color.setHex(0x1d0a07);
        this.ambientLight.color.setHex(0x340e08);
        this.hearthLight.intensity = 7.5;
        this.hearthLight.color.setHex(0xff3300);
      } else if (theme === 'at-the-bar') {
        this.scene.fog.color.setHex(0x0e0b1c);
        this.ambientLight.color.setHex(0x1c1236);
        this.hearthLight.intensity = 3.5;
        this.pendantLight1.color.setHex(0xa855f7);
        this.pendantLight2.color.setHex(0xa855f7);
      } else if (theme === 'brighter-brunch') {
        this.scene.fog.color.setHex(0x281f17);
        this.ambientLight.color.setHex(0x4e3d2c);
        this.hearthLight.intensity = 1.8;
        this.pendantLight1.color.setHex(0xfff8ee);
        this.pendantLight2.color.setHex(0xfff8ee);
      } else {
        this.scene.fog.color.setHex(0x060504);
        this.ambientLight.color.setHex(0x2d211a);
        this.hearthLight.intensity = 5.8;
        this.hearthLight.color.setHex(0xff5500);
        this.pendantLight1.color.setHex(0xf5b975);
        this.pendantLight2.color.setHex(0xf5b975);
      }
    }

    setCameraStep(stepKey) {
      this.cameraStep = stepKey;
      const presets = {
        entry: { pos: { x: 0, y: 3.4, z: 9.2 }, target: { x: 0, y: 1.15, z: 0 } },
        step1: { pos: { x: -2.4, y: 2.2, z: 6.4 }, target: { x: 0.4, y: 1.1, z: 0 } },
        step2: { pos: { x: 2.2, y: 2.0, z: 5.5 }, target: { x: -0.3, y: 1.0, z: 0 } },
        step3: { pos: { x: 0, y: 1.45, z: 2.85 }, target: { x: 0, y: 0.9, z: 0.1 } },
        step4: { pos: { x: 0, y: 4.4, z: 6.8 }, target: { x: 0, y: 0.55, z: 0 } },
        result: { pos: { x: -1.5, y: 2.4, z: 5.2 }, target: { x: 0, y: 1.05, z: 0 } }
      };

      const p = presets[stepKey] || presets.entry;
      this.targetCamPos = p.pos;
      this.targetCamTarget = p.target;
    }

    updateTableSettings(tableType) {
      if (!this.placeSettingsGroup) return;

      while (this.placeSettingsGroup.children.length > 0) {
        this.placeSettingsGroup.remove(this.placeSettingsGroup.children[0]);
      }

      let count = 2;
      let scaleX = 3.9;

      if (tableType === 'solo') { count = 1; scaleX = 2.6; }
      else if (tableType === 'two') { count = 2; scaleX = 3.9; }
      else if (tableType === 'friends') { count = 4; scaleX = 4.9; }
      else if (tableType === 'group' || tableType === 'celebration') { count = 6; scaleX = 6.2; }
      else if (tableType === 'business') { count = 4; scaleX = 4.5; }

      this.tableTop.scale.set(scaleX / 3.9, 1, 1);

      const plateMat = new THREE.MeshStandardMaterial({ color: 0xf6f1eb, roughness: 0.15 });
      const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.52, roughness: 0.03 });

      const plateGeo = new THREE.CylinderGeometry(0.35, 0.31, 0.04, 32);
      const glassGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.4, 24);

      const positions = [];
      if (count === 1) positions.push({ x: 0, z: 0.3 });
      else if (count === 2) positions.push({ x: -1.0, z: 0.3 }, { x: 1.0, z: 0.3 });
      else if (count === 4) positions.push({ x: -1.35, z: 0.4 }, { x: 1.35, z: 0.4 }, { x: -1.35, z: -0.4 }, { x: 1.35, z: -0.4 });
      else positions.push({ x: -2.0, z: 0.4 }, { x: 0, z: 0.4 }, { x: 2.0, z: 0.4 }, { x: -2.0, z: -0.4 }, { x: 0, z: -0.4 }, { x: 2.0, z: -0.4 });

      positions.forEach(pos => {
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.set(pos.x, 0.94, pos.z);
        this.placeSettingsGroup.add(plate);

        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(pos.x + 0.33, 1.14, pos.z - 0.15);
        this.placeSettingsGroup.add(glass);
      });
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.renderer && this.camera) {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
      });

      window.addEventListener('mousemove', (e) => {
        this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
        this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      this.camPos.x += (this.targetCamPos.x - this.camPos.x) * 0.05;
      this.camPos.y += (this.targetCamPos.y - this.camPos.y) * 0.05;
      this.camPos.z += (this.targetCamPos.z - this.camPos.z) * 0.05;

      this.camTarget.x += (this.targetCamTarget.x - this.camTarget.x) * 0.05;
      this.camTarget.y += (this.targetCamTarget.y - this.camTarget.y) * 0.05;
      this.camTarget.z += (this.targetCamTarget.z - this.camTarget.z) * 0.05;

      if (this.renderer && this.scene && this.camera) {
        this.camera.position.set(this.camPos.x + this.mouseX, this.camPos.y - this.mouseY, this.camPos.z);
        this.camera.lookAt(new THREE.Vector3(this.camTarget.x, this.camTarget.y, this.camTarget.z));
        this.renderer.render(this.scene, this.camera);
      } else {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = '#080605';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.embers.forEach(e => {
          e.y += e.speedY;
          if (e.y > 3.5) e.y = 0;
          ctx.beginPath();
          ctx.arc(e.x * 180 + this.canvas.width / 2, this.canvas.height - e.y * 140, e.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 185, 117, ' + e.alpha + ')';
          ctx.fill();
        });
      }
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
    if (document.getElementById('orbit-webgl-canvas')) {
      window.orbitEngine = new Orbit3DEngine('orbit-webgl-canvas');
    }
  });

  window.calculateOrbitResult = calculateOrbitResult;
})();

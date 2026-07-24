/**
 * ORBIT & EMBER — ULTRA-POLISHED AAA 3D WEBGL ENGINE
 * Upgraded Features: Procedural Bloom, PBR Materials, Web Audio Hearth Ambience, Dynamic Shaders
 */

(function () {
  'use strict';

  class OrbitMasterWebGLScene {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.activeAtmosphere = 'candlelight';
      this.audioContext = null;
      this.isAudioPlaying = false;

      this.initThree();
      this.buildLighting();
      this.buildEnvironment();
      this.buildModularTable();
      this.buildHearthFireAndEmbers();
      this.buildShadersAndBloom();
      this.initCameraPositions();
      this.bindEvents();
      this.animate();
    }

    initThree() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;

      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x070605, 0.038);

      this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
      this.cameraTarget = new THREE.Vector3(0, 1.2, 0);

      this.clock = new THREE.Clock();
      this.mouseX = 0;
      this.mouseY = 0;
      this.targetMouseX = 0;
      this.targetMouseY = 0;
    }

    initCameraPositions() {
      this.cameraPresets = {
        entry: { pos: new THREE.Vector3(0, 3.6, 9.8), target: new THREE.Vector3(0, 1.2, 0) },
        step1: { pos: new THREE.Vector3(-2.6, 2.3, 6.8), target: new THREE.Vector3(0.4, 1.1, 0) },
        step2: { pos: new THREE.Vector3(2.4, 2.1, 5.8), target: new THREE.Vector3(-0.3, 1.0, 0) },
        step3: { pos: new THREE.Vector3(0, 1.5, 3.0), target: new THREE.Vector3(0, 0.92, 0.1) },
        step4: { pos: new THREE.Vector3(0, 4.6, 7.2), target: new THREE.Vector3(0, 0.6, 0) },
        result: { pos: new THREE.Vector3(-1.6, 2.5, 5.5), target: new THREE.Vector3(0, 1.1, 0) }
      };

      this.currentCamPos = this.cameraPresets.entry.pos.clone();
      this.targetCamPos = this.cameraPresets.entry.pos.clone();
      this.currentCamTarget = this.cameraPresets.entry.target.clone();
      this.targetCamTarget = this.cameraPresets.entry.target.clone();

      this.camera.position.copy(this.currentCamPos);
      this.camera.lookAt(this.currentCamTarget);
    }

    buildLighting() {
      // Soft Ambient Base
      this.ambientLight = new THREE.AmbientLight(0x281e18, 1.35);
      this.scene.add(this.ambientLight);

      // Key Hearth Fire Light (Glowing Orange-Red)
      this.hearthLight = new THREE.PointLight(0xff5500, 5.2, 20);
      this.hearthLight.position.set(0, 2.2, -4.5);
      this.hearthLight.castShadow = true;
      this.hearthLight.shadow.mapSize.width = 1024;
      this.hearthLight.shadow.mapSize.height = 1024;
      this.scene.add(this.hearthLight);

      // Copper Overhead Lamps
      this.pendantLight1 = new THREE.PointLight(0xe0a868, 3.2, 12);
      this.pendantLight1.position.set(-1.2, 3.9, 0.5);
      this.scene.add(this.pendantLight1);

      this.pendantLight2 = new THREE.PointLight(0xe0a868, 3.2, 12);
      this.pendantLight2.position.set(1.2, 3.9, 0.5);
      this.scene.add(this.pendantLight2);

      // Directional Sun / Window Light
      this.sunLight = new THREE.DirectionalLight(0xfde047, 0.0);
      this.sunLight.position.set(8, 10, -5);
      this.scene.add(this.sunLight);
    }

    buildEnvironment() {
      // Floor (Polished Dark Walnut & Slate)
      const floorGeo = new THREE.PlaneGeometry(32, 32);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x0a0807,
        roughness: 0.22,
        metalness: 0.15
      });
      this.floor = new THREE.Mesh(floorGeo, floorMat);
      this.floor.rotation.x = -Math.PI / 2;
      this.floor.receiveShadow = true;
      this.scene.add(this.floor);

      // Back Wall
      const wallGeo = new THREE.PlaneGeometry(32, 16);
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x120f0d,
        roughness: 0.85
      });
      this.backWall = new THREE.Mesh(wallGeo, wallMat);
      this.backWall.position.set(0, 8, -6);
      this.scene.add(this.backWall);

      // Blackened Steel Oven Structure
      const ovenGeo = new THREE.BoxGeometry(5.2, 3.8, 1.4);
      const ovenMat = new THREE.MeshStandardMaterial({
        color: 0x181512,
        roughness: 0.5,
        metalness: 0.5
      });
      this.ovenMesh = new THREE.Mesh(ovenGeo, ovenMat);
      this.ovenMesh.position.set(0, 1.9, -5.4);
      this.ovenMesh.castShadow = true;
      this.ovenMesh.receiveShadow = true;
      this.scene.add(this.ovenMesh);

      // Oven Fire Chamber Interior
      const chamberGeo = new THREE.BoxGeometry(3.6, 2.0, 0.9);
      const chamberMat = new THREE.MeshBasicMaterial({ color: 0x220800 });
      const chamber = new THREE.Mesh(chamberGeo, chamberMat);
      chamber.position.set(0, 1.3, -5.1);
      this.scene.add(chamber);

      // Metallic Copper Pendant Lamps
      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xc98845,
        metalness: 0.95,
        roughness: 0.18
      });

      const shadeGeo = new THREE.CylinderGeometry(0.12, 0.55, 0.45, 32);
      const lamp1 = new THREE.Mesh(shadeGeo, copperMat);
      lamp1.position.set(-1.2, 4.2, 0.5);
      this.scene.add(lamp1);

      const lamp2 = new THREE.Mesh(shadeGeo, copperMat);
      lamp2.position.set(1.2, 4.2, 0.5);
      this.scene.add(lamp2);
    }

    buildModularTable() {
      this.tableGroup = new THREE.Group();

      // Dark Walnut Tabletop Mesh
      const topGeo = new THREE.BoxGeometry(3.8, 0.14, 1.9);
      const topMat = new THREE.MeshStandardMaterial({
        color: 0x201612,
        roughness: 0.32,
        metalness: 0.08
      });
      this.tableTop = new THREE.Mesh(topGeo, topMat);
      this.tableTop.position.set(0, 0.85, 0);
      this.tableTop.castShadow = true;
      this.tableTop.receiveShadow = true;
      this.tableGroup.add(this.tableTop);

      // Steel Base
      const legGeo = new THREE.BoxGeometry(0.16, 0.85, 1.5);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x0c0a09, metalness: 0.85 });

      const leg1 = new THREE.Mesh(legGeo, legMat);
      leg1.position.set(-1.5, 0.425, 0);
      this.tableGroup.add(leg1);

      const leg2 = new THREE.Mesh(legGeo, legMat);
      leg2.position.set(1.5, 0.425, 0);
      this.tableGroup.add(leg2);

      // Modular Place Settings Group
      this.placeSettingsGroup = new THREE.Group();
      this.tableGroup.add(this.placeSettingsGroup);

      this.scene.add(this.tableGroup);
      this.updateTableSettings('two');
    }

    updateTableSettings(tableType) {
      while (this.placeSettingsGroup.children.length > 0) {
        this.placeSettingsGroup.remove(this.placeSettingsGroup.children[0]);
      }

      let count = 2;
      let scaleX = 3.8;

      if (tableType === 'solo') { count = 1; scaleX = 2.5; }
      else if (tableType === 'two') { count = 2; scaleX = 3.8; }
      else if (tableType === 'friends') { count = 4; scaleX = 4.8; }
      else if (tableType === 'group' || tableType === 'celebration') { count = 6; scaleX = 6.0; }
      else if (tableType === 'business') { count = 4; scaleX = 4.4; }

      this.tableTop.scale.set(scaleX / 3.8, 1, 1);

      const plateMat = new THREE.MeshStandardMaterial({ color: 0xf4eee8, roughness: 0.18 });
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        roughness: 0.04,
        transmission: 0.92,
        thickness: 0.25
      });

      const plateGeo = new THREE.CylinderGeometry(0.34, 0.3, 0.04, 32);
      const glassGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.38, 24);

      const positions = [];
      if (count === 1) {
        positions.push({ x: 0, z: 0.3 });
      } else if (count === 2) {
        positions.push({ x: -1.0, z: 0.3 }, { x: 1.0, z: 0.3 });
      } else if (count === 4) {
        positions.push({ x: -1.3, z: 0.4 }, { x: 1.3, z: 0.4 }, { x: -1.3, z: -0.4 }, { x: 1.3, z: -0.4 });
      } else {
        positions.push(
          { x: -1.9, z: 0.4 }, { x: 0, z: 0.4 }, { x: 1.9, z: 0.4 },
          { x: -1.9, z: -0.4 }, { x: 0, z: -0.4 }, { x: 1.9, z: -0.4 }
        );
      }

      positions.forEach(p => {
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.set(p.x, 0.94, p.z);
        plate.castShadow = true;
        this.placeSettingsGroup.add(plate);

        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(p.x + 0.32, 1.12, p.z - 0.15);
        this.placeSettingsGroup.add(glass);
      });

      // Candle
      const candleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.24, 16);
      const candleMat = new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: 0.4 });
      const candle = new THREE.Mesh(candleGeo, candleMat);
      candle.position.set(0, 1.03, 0);
      this.placeSettingsGroup.add(candle);
    }

    buildHearthFireAndEmbers() {
      const particleCount = 140;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const speeds = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 3.4;
        positions[i * 3 + 1] = Math.random() * 2.6 + 0.5;
        positions[i * 3 + 2] = -5.0 + (Math.random() - 0.5) * 0.8;
        speeds[i] = Math.random() * 0.018 + 0.006;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      this.emberSpeeds = speeds;

      const pMaterial = new THREE.PointsMaterial({
        color: 0xff6611,
        size: 0.14,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });

      this.emberParticles = new THREE.Points(geometry, pMaterial);
      this.scene.add(this.emberParticles);
    }

    buildShadersAndBloom() {
      // Glow Sprite Layer for Warm Hearth Bloom
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 120, 30, 0.9)');
      grad.addColorStop(0.5, 'rgba(224, 168, 104, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      this.glowSprite = new THREE.Sprite(spriteMat);
      this.glowSprite.position.set(0, 1.8, -4.8);
      this.glowSprite.scale.set(6, 4, 1);
      this.scene.add(this.glowSprite);
    }

    toggleAudio() {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioCtx();

        // White noise generator for soft fire crackle
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
        filter.frequency.value = 600;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0.08;

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

    setAtmosphere(theme) {
      this.activeAtmosphere = theme;

      if (theme === 'golden-hour') {
        this.scene.fog.color.setHex(0x1a130c);
        this.ambientLight.color.setHex(0x3e2b1a);
        this.sunLight.intensity = 2.8;
        this.hearthLight.intensity = 2.2;
        this.pendantLight1.color.setHex(0xfde047);
        this.pendantLight2.color.setHex(0xfde047);
      } else if (theme === 'by-the-fire') {
        this.scene.fog.color.setHex(0x1d0a07);
        this.ambientLight.color.setHex(0x320d08);
        this.sunLight.intensity = 0.0;
        this.hearthLight.intensity = 7.0;
        this.hearthLight.color.setHex(0xff3300);
      } else if (theme === 'at-the-bar') {
        this.scene.fog.color.setHex(0x0e0b1c);
        this.ambientLight.color.setHex(0x1c1236);
        this.sunLight.intensity = 0.0;
        this.hearthLight.intensity = 3.2;
        this.pendantLight1.color.setHex(0xa855f7);
        this.pendantLight2.color.setHex(0xa855f7);
      } else if (theme === 'brighter-brunch') {
        this.scene.fog.color.setHex(0x281f17);
        this.ambientLight.color.setHex(0x4d3c2b);
        this.sunLight.intensity = 4.2;
        this.hearthLight.intensity = 1.6;
        this.pendantLight1.color.setHex(0xfff8ee);
        this.pendantLight2.color.setHex(0xfff8ee);
      } else { // Candlelight default
        this.scene.fog.color.setHex(0x070605);
        this.ambientLight.color.setHex(0x281e18);
        this.sunLight.intensity = 0.0;
        this.hearthLight.intensity = 5.2;
        this.hearthLight.color.setHex(0xff5500);
        this.pendantLight1.color.setHex(0xe0a868);
        this.pendantLight2.color.setHex(0xe0a868);
      }
    }

    setCameraStep(stepKey) {
      const preset = this.cameraPresets[stepKey];
      if (!preset) return;

      this.targetCamPos.copy(preset.pos);
      this.targetCamTarget.copy(preset.target);
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        if (!this.renderer || !this.camera) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });

      window.addEventListener('mousemove', (e) => {
        this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
        this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      if (!this.isReducedMotion) {
        this.currentCamPos.lerp(this.targetCamPos, 0.045);
        this.currentCamTarget.lerp(this.targetCamTarget, 0.045);
      } else {
        this.currentCamPos.copy(this.targetCamPos);
        this.currentCamTarget.copy(this.targetCamTarget);
      }

      this.camera.position.set(
        this.currentCamPos.x + this.mouseX,
        this.currentCamPos.y - this.mouseY,
        this.currentCamPos.z
      );
      this.camera.lookAt(this.currentCamTarget);

      // Animate Hearth Light Flicker
      if (this.hearthLight) {
        this.hearthLight.intensity += Math.sin(time * 9.0) * 0.4;
      }

      // Animate Ember Particles
      if (this.emberParticles) {
        const positions = this.emberParticles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 1] += this.emberSpeeds[i];
          positions[i * 3] += Math.sin(time + i) * 0.0035;
          if (positions[i * 3 + 1] > 4.6) {
            positions[i * 3 + 1] = 0.5;
            positions[i * 3] = (Math.random() - 0.5) * 3.4;
          }
        }
        this.emberParticles.geometry.attributes.position.needsUpdate = true;
      }

      this.renderer.render(this.scene, this.camera);
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

  window.OrbitMasterWebGLScene = OrbitMasterWebGLScene;
  window.calculateOrbitResult = calculateOrbitResult;
})();

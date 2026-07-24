/**
 * ORBIT & EMBER — ZERO-DEPENDENCY NATIVE WEBGL 3D GRAPHICS ENGINE
 * Renders a full 3D restaurant scene, 3D hearth fire, 3D table, lighting & camera transitions without external CDNs.
 */

(function () {
  'use strict';

  class NativeOrbit3DEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      this.useFallback2D = !this.gl;

      this.activeAtmosphere = 'candlelight';
      this.cameraStep = 'entry';
      this.tableScale = 1.0;

      this.camPos = { x: 0, y: 2.2, z: 6.5 };
      this.targetCamPos = { x: 0, y: 2.2, z: 6.5 };
      this.camTarget = { x: 0, y: 1.0, z: 0 };
      this.targetCamTarget = { x: 0, y: 1.0, z: 0 };

      this.mouseX = 0;
      this.mouseY = 0;
      this.targetMouseX = 0;
      this.targetMouseY = 0;

      this.resize();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
        this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
      });

      if (this.gl) {
        this.initWebGL();
      }

      this.initEmbers();
      this.animate();
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      if (this.gl) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    initWebGL() {
      const gl = this.gl;

      // Vertex Shader
      const vsSource = `
        attribute vec3 aPosition;
        attribute vec3 aNormal;
        attribute vec3 aColor;

        uniform mat4 uProjection;
        uniform mat4 uView;
        uniform mat4 uModel;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vColor;

        void main() {
          vec4 worldPos = uModel * vec4(aPosition, 1.0);
          vPosition = worldPos.xyz;
          vNormal = mat3(uModel) * aNormal;
          vColor = aColor;
          gl_Position = uProjection * uView * worldPos;
        }
      `;

      // Fragment Shader with PBR Lighting and Fog
      const fsSource = `
        precision mediump float;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vColor;

        uniform vec3 uLightPos;
        uniform vec3 uLightColor;
        uniform vec3 uAmbientColor;
        uniform vec3 uFogColor;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 L = normalize(uLightPos - vPosition);
          float diff = max(dot(N, L), 0.0);

          vec3 lighting = uAmbientColor + uLightColor * diff;
          vec3 finalColor = vColor * lighting;

          // Depth Fog
          float dist = length(vPosition);
          float fogFactor = clamp((dist - 3.0) / 12.0, 0.0, 0.85);

          gl_FragColor = vec4(mix(finalColor, uFogColor, fogFactor), 1.0);
        }
      `;

      const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
      const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource);

      this.program = gl.createProgram();
      gl.attachShader(this.program, vs);
      gl.attachShader(this.program, fs);
      gl.linkProgram(this.program);

      gl.useProgram(this.program);

      this.aPosition = gl.getAttribLocation(this.program, 'aPosition');
      this.aNormal = gl.getAttribLocation(this.program, 'aNormal');
      this.aColor = gl.getAttribLocation(this.program, 'aColor');

      this.uProjection = gl.getUniformLocation(this.program, 'uProjection');
      this.uView = gl.getUniformLocation(this.program, 'uView');
      this.uModel = gl.getUniformLocation(this.program, 'uModel');
      this.uLightPos = gl.getUniformLocation(this.program, 'uLightPos');
      this.uLightColor = gl.getUniformLocation(this.program, 'uLightColor');
      this.uAmbientColor = gl.getUniformLocation(this.program, 'uAmbientColor');
      this.uFogColor = gl.getUniformLocation(this.program, 'uFogColor');

      this.build3DSceneBuffers();
    }

    compileShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    build3DSceneBuffers() {
      const gl = this.gl;

      // 3D Geometry: Floor, Back Oven Wall, Tabletop, Legs, Ceramics
      const vertices = [];
      const normals = [];
      const colors = [];

      function addCube(x, y, z, sx, sy, sz, r, g, b) {
        const hx = sx / 2, hy = sy / 2, hz = sz / 2;
        const faces = [
          // Front
          { pos: [-hx, -hy, hz,  hx, -hy, hz,  hx, hy, hz, -hx, hy, hz], norm: [0, 0, 1] },
          // Back
          { pos: [hx, -hy, -hz, -hx, -hy, -hz, -hx, hy, -hz,  hx, hy, -hz], norm: [0, 0, -1] },
          // Top
          { pos: [-hx, hy, hz,  hx, hy, hz,  hx, hy, -hz, -hx, hy, -hz], norm: [0, 1, 0] },
          // Bottom
          { pos: [-hx, -hy, -hz,  hx, -hy, -hz,  hx, -hy, hz, -hx, -hy, hz], norm: [0, -1, 0] },
          // Right
          { pos: [hx, -hy, hz,  hx, -hy, -hz,  hx, hy, -hz,  hx, hy, hz], norm: [1, 0, 0] },
          // Left
          { pos: [-hx, -hy, -hz, -hx, -hy, hz, -hx, hy, hz, -hx, hy, -hz], norm: [-1, 0, 0] }
        ];

        faces.forEach(f => {
          const p = f.pos;
          const idxs = [0, 1, 2, 0, 2, 3];
          idxs.forEach(i => {
            vertices.push(p[i * 3] + x, p[i * 3 + 1] + y, p[i * 3 + 2] + z);
            normals.push(f.norm[0], f.norm[1], f.norm[2]);
            colors.push(r, g, b);
          });
        });
      }

      // Floor (Polished Dark Slate)
      addCube(0, -0.05, 0, 20, 0.1, 20, 0.05, 0.04, 0.03);

      // Back Wall & Oven
      addCube(0, 4, -6, 20, 8, 0.2, 0.08, 0.06, 0.05);
      addCube(0, 1.8, -5.4, 4.8, 3.6, 1.2, 0.12, 0.09, 0.08);

      // Tabletop (Dark Walnut)
      addCube(0, 0.85, 0, 3.8, 0.12, 1.8, 0.16, 0.10, 0.07);

      // Table Legs
      addCube(-1.5, 0.42, 0, 0.15, 0.84, 1.4, 0.04, 0.04, 0.04);
      addCube(1.5, 0.42, 0, 0.15, 0.84, 1.4, 0.04, 0.04, 0.04);

      // Place Settings (Plates)
      addCube(-0.9, 0.93, 0.3, 0.6, 0.04, 0.6, 0.85, 0.82, 0.78);
      addCube(0.9, 0.93, 0.3, 0.6, 0.04, 0.6, 0.85, 0.82, 0.78);

      // Candle Centerpiece
      addCube(0, 1.02, 0, 0.16, 0.22, 0.16, 0.95, 0.90, 0.82);

      this.numVertices = vertices.length / 3;

      this.vBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      this.nBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

      this.cBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.cBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    }

    initEmbers() {
      this.embers = [];
      const count = 120;
      for (let i = 0; i < count; i++) {
        this.embers.push({
          x: (Math.random() - 0.5) * 4.0,
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
    }

    setCameraStep(stepKey) {
      this.cameraStep = stepKey;
      if (stepKey === 'entry') {
        this.targetCamPos = { x: 0, y: 2.2, z: 6.5 };
        this.targetCamTarget = { x: 0, y: 1.0, z: 0 };
      } else if (stepKey === 'step1') {
        this.targetCamPos = { x: -1.8, y: 1.8, z: 4.8 };
        this.targetCamTarget = { x: 0.3, y: 0.9, z: 0 };
      } else if (stepKey === 'step2') {
        this.targetCamPos = { x: 1.8, y: 1.7, z: 4.2 };
        this.targetCamTarget = { x: -0.2, y: 0.9, z: 0 };
      } else if (stepKey === 'step3') {
        this.targetCamPos = { x: 0, y: 1.3, z: 2.2 };
        this.targetCamTarget = { x: 0, y: 0.85, z: 0.2 };
      } else if (stepKey === 'step4') {
        this.targetCamPos = { x: 0, y: 3.5, z: 5.2 };
        this.targetCamTarget = { x: 0, y: 0.5, z: 0 };
      } else if (stepKey === 'result') {
        this.targetCamPos = { x: -1.2, y: 1.9, z: 4.2 };
        this.targetCamTarget = { x: 0, y: 0.9, z: 0 };
      }
    }

    updateTableSettings(tableType) {
      if (tableType === 'solo') this.tableScale = 0.7;
      else if (tableType === 'two') this.tableScale = 1.0;
      else if (tableType === 'friends') this.tableScale = 1.3;
      else if (tableType === 'group' || tableType === 'celebration') this.tableScale = 1.6;
      else if (tableType === 'business') this.tableScale = 1.2;
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      // Smooth lerp camera
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      this.camPos.x += (this.targetCamPos.x - this.camPos.x) * 0.05;
      this.camPos.y += (this.targetCamPos.y - this.camPos.y) * 0.05;
      this.camPos.z += (this.targetCamPos.z - this.camPos.z) * 0.05;

      this.camTarget.x += (this.targetCamTarget.x - this.camTarget.x) * 0.05;
      this.camTarget.y += (this.targetCamTarget.y - this.camTarget.y) * 0.05;
      this.camTarget.z += (this.targetCamTarget.z - this.camTarget.z) * 0.05;

      if (this.gl) {
        this.renderWebGL();
      } else {
        this.renderCanvas2D();
      }
    }

    renderWebGL() {
      const gl = this.gl;
      gl.enable(gl.DEPTH_TEST);
      gl.clearColor(0.04, 0.03, 0.02, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(this.program);

      // Matrices Setup
      const aspect = this.canvas.width / this.canvas.height;
      const proj = this.perspective(40 * Math.PI / 180, aspect, 0.1, 100);
      const view = this.lookAt(
        [this.camPos.x + this.mouseX, this.camPos.y - this.mouseY, this.camPos.z],
        [this.camTarget.x, this.camTarget.y, this.camTarget.z],
        [0, 1, 0]
      );
      const model = this.identity();

      gl.uniformMatrix4fv(this.uProjection, false, proj);
      gl.uniformMatrix4fv(this.uView, false, view);
      gl.uniformMatrix4fv(this.uModel, false, model);

      // Lighting Dynamics per Atmosphere
      let ambient = [0.12, 0.09, 0.07];
      let lightColor = [1.0, 0.45, 0.1];
      let fogColor = [0.04, 0.03, 0.02];

      if (this.activeAtmosphere === 'golden-hour') {
        ambient = [0.22, 0.16, 0.1];
        lightColor = [1.0, 0.8, 0.3];
      } else if (this.activeAtmosphere === 'by-the-fire') {
        ambient = [0.2, 0.05, 0.03];
        lightColor = [1.0, 0.2, 0.0];
      } else if (this.activeAtmosphere === 'at-the-bar') {
        ambient = [0.1, 0.06, 0.18];
        lightColor = [0.7, 0.3, 0.9];
      } else if (this.activeAtmosphere === 'brighter-brunch') {
        ambient = [0.3, 0.25, 0.2];
        lightColor = [1.0, 0.95, 0.8];
      }

      gl.uniform3fv(this.uLightPos, [0, 2.2, -4.5]);
      gl.uniform3fv(this.uLightColor, lightColor);
      gl.uniform3fv(this.uAmbientColor, ambient);
      gl.uniform3fv(this.uFogColor, fogColor);

      // Bind Attributes & Draw
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
      gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.aPosition);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
      gl.vertexAttribPointer(this.aNormal, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.aNormal);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.cBuffer);
      gl.vertexAttribPointer(this.aColor, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.aColor);

      gl.drawArrays(gl.TRIANGLES, 0, this.numVertices);
    }

    renderCanvas2D() {
      const ctx = this.canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      ctx.fillStyle = '#080605';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Render 2D Canvas Fallback Glow & Embers
      this.embers.forEach(e => {
        e.y += e.speedY;
        if (e.y > this.canvas.height) e.y = 0;
        ctx.beginPath();
        ctx.arc(e.x * 200 + this.canvas.width / 2, this.canvas.height - e.y * 150, e.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 185, 117, ' + e.alpha + ')';
        ctx.fill();
      });
    }

    // 3D Matrix Helpers
    identity() {
      return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]);
    }

    perspective(fovy, aspect, near, far) {
      const f = 1.0 / Math.tan(fovy / 2);
      const nf = 1 / (near - far);
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, (2 * far * near) * nf, 0
      ]);
    }

    lookAt(eye, center, up) {
      let z0 = eye[0] - center[0], z1 = eye[1] - center[1], z2 = eye[2] - center[2];
      let len = 1 / (Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2) || 1);
      z0 *= len; z1 *= len; z2 *= len;

      let x0 = up[1] * z2 - up[2] * z1, x1 = up[2] * z0 - up[0] * z2, x2 = up[0] * z1 - up[1] * z0;
      len = 1 / (Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2) || 1);
      x0 *= len; x1 *= len; x2 *= len;

      let y0 = z1 * x2 - z2 * x1, y1 = z2 * x0 - z0 * x2, y2 = z0 * x1 - z1 * x0;

      return new Float32Array([
        x0, y0, z0, 0,
        x1, y1, z1, 0,
        x2, y2, z2, 0,
        -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]),
        -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]),
        -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]),
        1
      ]);
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

  // Initialize Native Engine
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('orbit-webgl-canvas')) {
      window.nativeOrbitEngine = new NativeOrbit3DEngine('orbit-webgl-canvas');
    }
  });

  window.calculateOrbitResult = calculateOrbitResult;
})();

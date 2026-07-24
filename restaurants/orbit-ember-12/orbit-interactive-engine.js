// The Orbit Hearth Explorer — Live-Fire Temperature, Wood & Pairing Engine

class OrbitHearthEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.flameIntensity = 1.0; // 1.0 = High Oak Sear, 0.7 = Embers, 0.4 = Low Smoke
    this.heatColor = 'rgba(239, 68, 68, ';

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
    const count = Math.min(Math.floor(window.innerWidth / 8), 130);

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 500 + 40,
        size: Math.random() * 4.0 + 1.2,
        speedY: Math.random() * 1.2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.9 + 0.1,
        pulse: Math.random() * 0.02 + 0.008
      });
    }
  }

  setHeatProfile(profile) {
    if (profile === 'oak-sear') {
      this.flameIntensity = 1.3;
      this.heatColor = 'rgba(239, 68, 68, ';
    } else if (profile === 'ember-roast') {
      this.flameIntensity = 0.9;
      this.heatColor = 'rgba(234, 179, 8, ';
    } else if (profile === 'slow-smoke') {
      this.flameIntensity = 0.5;
      this.heatColor = 'rgba(168, 85, 247, ';
    }
  }

  animate() {
    if (!this.canvas || !this.ctx) return;
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.ctx.clearRect(0, 0, width, height);

    // Render Flame & Spark Particles
    this.particles.forEach(p => {
      p.y -= p.speedY * this.flameIntensity;
      p.x += p.speedX;
      p.alpha += p.pulse;
      if (p.alpha > 0.95 || p.alpha < 0.15) p.pulse = -p.pulse;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.heatColor + p.alpha + ')';
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = this.heatColor + '0.9)';
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

window.OrbitHearthEngine = OrbitHearthEngine;

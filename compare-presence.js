document.addEventListener("DOMContentLoaded", () => {
  const isBefore = window.location.pathname.includes("/orbit-ember-before");
  
  // Create styles
  const style = document.createElement("style");
  style.textContent = `
    .compare-toggle-bar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(18, 18, 22, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 100px;
      padding: 6px 18px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      color: #fff;
      user-select: none;
      animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    
    @keyframes slideUp {
      from { transform: translate(-50%, 40px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    .compare-toggle-title {
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.6);
      border-right: 1px solid rgba(255, 255, 255, 0.15);
      padding-right: 16px;
      font-size: 11px;
    }
    
    .compare-toggle-options {
      display: flex;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 100px;
      padding: 3px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .compare-toggle-btn {
      padding: 6px 14px;
      border-radius: 100px;
      text-decoration: none !important;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 500;
      transition: all 0.25s ease;
      cursor: pointer;
      border: none;
      background: transparent;
      font-size: 12px;
      display: inline-block;
    }
    
    .compare-toggle-btn:hover {
      color: #fff;
    }
    
    .compare-toggle-btn.active {
      background: #ff7a00;
      color: #fff;
      font-weight: 600;
      box-shadow: 0 2px 10px rgba(255, 122, 0, 0.4);
    }
    
    .compare-toggle-btn.active.before-active {
      background: #8e8e93;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(style);
  
  // Create toggle HTML
  const bar = document.createElement("div");
  bar.className = "compare-toggle-bar";
  
  const title = document.createElement("span");
  title.className = "compare-toggle-title";
  title.textContent = "Orbit & Ember Review";
  
  const options = document.createElement("div");
  options.className = "compare-toggle-options";
  
  const beforeBtn = document.createElement("a");
  beforeBtn.className = `compare-toggle-btn ${isBefore ? "active before-active" : ""}`;
  beforeBtn.textContent = "Before (Legacy)";
  beforeBtn.href = "/restaurants/orbit-ember-before/index.html";
  
  const afterBtn = document.createElement("a");
  afterBtn.className = `compare-toggle-btn ${!isBefore ? "active" : ""}`;
  afterBtn.textContent = "After (Redesign)";
  afterBtn.href = "/restaurants/orbit-ember/index.html";
  
  options.appendChild(beforeBtn);
  options.appendChild(afterBtn);
  
  bar.appendChild(title);
  bar.appendChild(options);
  document.body.appendChild(bar);
});

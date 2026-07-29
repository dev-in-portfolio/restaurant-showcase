// Reusable Floating Comparison Button Component
// This script runs on page load, fetches the restaurant's metadata (restaurant.json),
// and injects a premium floating compare pill referencing the restaurant's current online presence.

document.addEventListener("DOMContentLoaded", () => {
  // Fetch metadata relative to current page directory
  fetch("restaurant.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Metadata file (restaurant.json) not found in the current folder");
      }
      return response.json();
    })
    .then(metadata => {
      const url = metadata.currentWebsiteUrl;
      if (!url || url.trim() === "") {
        return; // Hide itself when no valid current public URL exists
      }

      const restaurantName = metadata.name || "Current Site";
      const labelText = `Compare with ${restaurantName}`;

      // Inject Styles for Floating Compare Pill
      const style = document.createElement("style");
      style.id = "current-site-comparison-styles";
      style.innerHTML = `
        #current-site-comparison-btn-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        .current-site-comparison-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(15, 15, 17, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 9999px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          box-shadow: 0 10px 32px 0 rgba(0, 0, 0, 0.45);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .current-site-comparison-btn:hover {
          background: #ffffff;
          color: #0f0f11;
          border-color: rgba(255, 255, 255, 0.9);
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 16px 40px 0 rgba(0, 0, 0, 0.55), 0 0 20px rgba(245, 158, 11, 0.25);
        }

        .current-site-comparison-btn:hover .bolt-icon {
          color: #d97706;
          transform: scale(1.15) rotate(-8deg);
        }

        .current-site-comparison-btn:hover .arrow-icon {
          transform: translate(3px, -3px);
        }

        .current-site-comparison-btn:focus-visible {
          outline: 3px solid #f59e0b;
          outline-offset: 3px;
        }

        .current-site-comparison-btn .bolt-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #f59e0b;
          font-size: 16px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .current-site-comparison-btn .arrow-icon {
          display: inline-block;
          font-size: 15px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .current-site-comparison-btn:hover .arrow-icon {
          color: #0f0f11;
        }

        /* Responsive placement & touch scaling */
        @media (max-width: 768px) {
          #current-site-comparison-btn-container {
            bottom: calc(18px + env(safe-area-inset-bottom, 0px));
            right: 16px;
            left: auto;
          }
          .current-site-comparison-btn {
            padding: 10px 18px;
            font-size: 13px;
            gap: 8px;
          }
        }
      `;
      document.head.appendChild(style);

      // Create Container
      const container = document.createElement("div");
      container.id = "current-site-comparison-btn-container";

      // Create Pill Link Button
      const button = document.createElement("a");
      button.className = "current-site-comparison-btn";
      button.href = url;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      button.setAttribute("aria-label", `${labelText} (opens in a new tab)`);
      button.innerHTML = `
        <span class="bolt-icon" aria-hidden="true">⚡</span>
        <span>${labelText}</span>
        <span class="arrow-icon" aria-hidden="true">↗</span>
      `;

      container.appendChild(button);
      document.body.appendChild(container);
    })
    .catch(err => {
      console.warn("Floating comparison button failed to load:", err.message);
    });
});

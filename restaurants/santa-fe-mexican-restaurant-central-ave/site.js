document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener("click", () => {
      mainNav.classList.toggle("show");
      const isExpanded = mainNav.classList.contains("show");
      toggleBtn.setAttribute("aria-expanded", isExpanded);
    });
  }

  // 2. Menu Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuSections = document.querySelectorAll(".menu-category-section");

  if (filterBtns.length > 0 && menuSections.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetCat = btn.getAttribute("data-category");

        menuSections.forEach(section => {
          if (targetCat === "all" || section.getAttribute("data-cat") === targetCat) {
            section.style.display = "block";
          } else {
            section.style.display = "none";
          }
        });
      });
    });
  }

  // 3. Interactive Catering / Party Estimator
  const guestInput = document.getElementById("catering-guests");
  const packageSelect = document.getElementById("catering-package");
  const chipsAddon = document.getElementById("addon-chips");
  const margMixAddon = document.getElementById("addon-margarita-mix");
  const estTotalEl = document.getElementById("est-total-cost");
  const estPerPersonEl = document.getElementById("est-per-person");

  function calculateCateringEstimate() {
    if (!guestInput || !packageSelect || !estTotalEl) return;

    const guests = parseInt(guestInput.value, 10) || 0;
    let basePricePerPerson = parseFloat(packageSelect.value) || 14.50;

    if (chipsAddon && chipsAddon.checked) {
      basePricePerPerson += 2.50;
    }
    if (margMixAddon && margMixAddon.checked) {
      basePricePerPerson += 3.50;
    }

    const total = guests * basePricePerPerson;

    estTotalEl.textContent = "$" + total.toFixed(2);
    if (estPerPersonEl) {
      estPerPersonEl.textContent = "$" + basePricePerPerson.toFixed(2) + " / guest";
    }
  }

  if (guestInput && packageSelect) {
    guestInput.addEventListener("input", calculateCateringEstimate);
    packageSelect.addEventListener("change", calculateCateringEstimate);
    if (chipsAddon) chipsAddon.addEventListener("change", calculateCateringEstimate);
    if (margMixAddon) margMixAddon.addEventListener("change", calculateCateringEstimate);
    calculateCateringEstimate();
  }

  // 4. Accordion FAQ
  const faqHeaders = document.querySelectorAll(".faq-header");
  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      // Close other open accordions in the same group
      document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 5. Toast Notification System & Form Submission Handlers
  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  const inquiryForm = document.getElementById("inquiry-form");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you! Your inquiry has been sent. Our team will contact you shortly.");
      inquiryForm.reset();
      if (typeof calculateCateringEstimate === "function") calculateCateringEstimate();
    });
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you for subscribing to Santa Fe specials and events!");
      newsletterForm.reset();
    });
  }
});

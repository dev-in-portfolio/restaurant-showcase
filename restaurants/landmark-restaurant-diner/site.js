document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation
  const toggleBtn = document.querySelector(".diner-menu-toggle-btn");
  const navMenu = document.querySelector(".diner-nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      const isExpanded = navMenu.classList.contains("show");
      toggleBtn.setAttribute("aria-expanded", isExpanded);
    });
  }

  // 2. Ledger Menu Tabs
  const tabBtns = document.querySelectorAll(".diner-tab-btn");
  const ledgerSections = document.querySelectorAll(".diner-menu-ledger");

  if (tabBtns.length > 0 && ledgerSections.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetCat = btn.getAttribute("data-category");

        ledgerSections.forEach(section => {
          if (targetCat === "all" || section.getAttribute("data-cat") === targetCat) {
            section.style.display = "block";
          } else {
            section.style.display = "none";
          }
        });
      });
    });
  }

  // 3. FAQ Unit Toggles
  const faqTriggers = document.querySelectorAll(".diner-faq-trigger");
  faqTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const unit = trigger.parentElement;
      const isActive = unit.classList.contains("active");

      document.querySelectorAll(".diner-faq-unit").forEach(el => el.classList.remove("active"));

      if (!isActive) {
        unit.classList.add("active");
      }
    });
  });
});

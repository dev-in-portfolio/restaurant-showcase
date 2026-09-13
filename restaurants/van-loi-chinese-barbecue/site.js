document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const toggleBtn = document.querySelector(".siumei-menu-toggle");
  const navList = document.querySelector(".siumei-nav-list");

  if (toggleBtn && navList) {
    toggleBtn.addEventListener("click", () => {
      navList.classList.toggle("show");
      const isExpanded = navList.classList.contains("show");
      toggleBtn.setAttribute("aria-expanded", isExpanded);
    });
  }

  // 2. Roast Menu Category Filtering
  const tabPills = document.querySelectorAll(".siumei-tab-pill");
  const menuBlocks = document.querySelectorAll(".siumei-menu-block");

  if (tabPills.length > 0 && menuBlocks.length > 0) {
    tabPills.forEach(pill => {
      pill.addEventListener("click", () => {
        tabPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");

        const targetCat = pill.getAttribute("data-category");

        menuBlocks.forEach(block => {
          if (targetCat === "all" || block.getAttribute("data-cat") === targetCat) {
            block.style.display = "block";
          } else {
            block.style.display = "none";
          }
        });
      });
    });
  }

  // 3. Accordion FAQ
  const faqHeaders = document.querySelectorAll(".siumei-faq-header-btn");
  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const row = header.parentElement;
      const isActive = row.classList.contains("active");

      document.querySelectorAll(".siumei-faq-row").forEach(el => el.classList.remove("active"));

      if (!isActive) {
        row.classList.add("active");
      }
    });
  });
});

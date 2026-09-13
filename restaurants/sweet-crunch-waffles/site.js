document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector('.crunch-nav-toggle');
  const navMenu = document.querySelector('.crunch-nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // FAQ Accordion Handler
  const faqButtons = document.querySelectorAll('.crunch-faq-trigger');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.crunch-faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('active');

      const parentWrapper = item.parentElement;
      if (parentWrapper) {
        parentWrapper.querySelectorAll('.crunch-faq-item').forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.crunch-faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  // Menu Category Filter Tabs
  const filterTabs = document.querySelectorAll('.crunch-tab-btn');
  const menuDivisions = document.querySelectorAll('.crunch-menu-division');

  if (filterTabs.length > 0 && menuDivisions.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');

        menuDivisions.forEach((division) => {
          if (category === 'all' || division.getAttribute('data-division') === category) {
            division.style.display = 'block';
          } else {
            division.style.display = 'none';
          }
        });
      });
    });
  }
});

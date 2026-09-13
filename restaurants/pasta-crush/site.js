document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector('.crush-menu-toggle');
  const navLinks = document.querySelector('.crush-nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // FAQ Accordion Handler
  const faqButtons = document.querySelectorAll('.crush-faq-trigger');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.crush-faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('active');

      const parentWrapper = item.parentElement;
      if (parentWrapper) {
        parentWrapper.querySelectorAll('.crush-faq-item').forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.crush-faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  // Menu Category Filter Tabs
  const filterTabs = document.querySelectorAll('.crush-tab-btn');
  const menuDivisions = document.querySelectorAll('.crush-menu-division');

  if (filterTabs.length > 0 && menuDivisions.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-division');

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

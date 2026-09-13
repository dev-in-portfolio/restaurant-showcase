document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector('.kuya-menu-toggle');
  const navLinks = document.querySelector('.kuya-nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // FAQ Accordion Handler
  const faqButtons = document.querySelectorAll('.kuya-faq-button');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cell = btn.closest('.kuya-faq-cell');
      if (!cell) return;
      const isOpen = cell.classList.contains('active');

      const parentWrapper = cell.parentElement;
      if (parentWrapper) {
        parentWrapper.querySelectorAll('.kuya-faq-cell').forEach((otherCell) => {
          if (otherCell !== cell) {
            otherCell.classList.remove('active');
            const otherBtn = otherCell.querySelector('.kuya-faq-button');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      cell.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  // Menu Category Filter Tabs
  const filterTabs = document.querySelectorAll('.kuya-tab-trigger');
  const menuSegments = document.querySelectorAll('.kuya-catalog-segment');

  if (filterTabs.length > 0 && menuSegments.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filterCategory = tab.getAttribute('data-segment');

        menuSegments.forEach((segment) => {
          if (filterCategory === 'all' || segment.getAttribute('data-segment') === filterCategory) {
            segment.style.display = 'block';
          } else {
            segment.style.display = 'none';
          }
        });
      });
    });
  }
});

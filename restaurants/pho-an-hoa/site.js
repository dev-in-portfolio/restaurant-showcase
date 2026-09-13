document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector('.pho-menu-toggle-btn');
  const navLinks = document.querySelector('.pho-nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('show');
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // FAQ Accordion Handler
  const faqButtons = document.querySelectorAll('.pho-faq-button');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cell = btn.closest('.pho-faq-cell');
      if (!cell) return;
      const isOpen = cell.classList.contains('active');

      const parentContainer = cell.parentElement;
      if (parentContainer) {
        parentContainer.querySelectorAll('.pho-faq-cell').forEach((otherCell) => {
          if (otherCell !== cell) {
            otherCell.classList.remove('active');
            const otherBtn = otherCell.querySelector('.pho-faq-button');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      cell.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  // Menu Category Filter Tabs
  const menuTabs = document.querySelectorAll('.pho-tab-item');
  const menuSections = document.querySelectorAll('.pho-menu-catalog-section');

  if (menuTabs.length > 0 && menuSections.length > 0) {
    menuTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        menuTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-category');

        menuSections.forEach((section) => {
          if (filterValue === 'all' || section.getAttribute('data-category') === filterValue) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });
  }
});

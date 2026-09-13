document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.querySelector('.seoul-nav-toggle-btn');
  const navList = document.querySelector('.seoul-nav-list');

  if (toggleBtn && navList) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navList.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // FAQ Accordion Handler
  const faqButtons = document.querySelectorAll('.seoul-faq-trigger');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.seoul-faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('active');

      const parentWrapper = item.parentElement;
      if (parentWrapper) {
        parentWrapper.querySelectorAll('.seoul-faq-item').forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.seoul-faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  // Menu Category Filter Tabs
  const filterTabs = document.querySelectorAll('.seoul-tab-item');
  const menuCategories = document.querySelectorAll('.seoul-menu-category');

  if (filterTabs.length > 0 && menuCategories.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filterVal = tab.getAttribute('data-category');

        menuCategories.forEach((cat) => {
          if (filterVal === 'all' || cat.getAttribute('data-category') === filterVal) {
            cat.style.display = 'block';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    });
  }
});

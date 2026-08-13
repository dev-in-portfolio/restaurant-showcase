/* Aqua e Vino — Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && navDrawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navDrawer.classList.contains('open');
      if (isOpen) {
        navDrawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        navDrawer.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navDrawer.contains(e.target)) {
        navDrawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Accordion Component Behavior
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      const siblings = item.parentElement.querySelectorAll('.accordion-item');
      siblings.forEach((s) => s.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      } else {
        header.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

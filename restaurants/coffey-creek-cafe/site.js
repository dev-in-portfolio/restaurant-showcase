/* Coffey Creek Café — Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const toggleBtn = document.querySelector('.mobile-drawer-trigger');
  const drawerPane = document.querySelector('.mobile-coffey-drawer');

  if (toggleBtn && drawerPane) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawerPane.classList.contains('open');
      if (isOpen) {
        drawerPane.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawerPane.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !drawerPane.contains(e.target)) {
        drawerPane.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Accordion Component Behavior
  const accordionButtons = document.querySelectorAll('.accordion-trigger-btn');
  accordionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      const siblings = item.parentElement.querySelectorAll('.coffey-accordion');
      siblings.forEach((s) => s.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

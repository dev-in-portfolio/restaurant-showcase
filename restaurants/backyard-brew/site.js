/* Backyard Brew — Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const triggerBtn = document.querySelector('.mobile-menu-trigger-btn');
  const drawerPane = document.querySelector('.mobile-garden-drawer');

  if (triggerBtn && drawerPane) {
    triggerBtn.addEventListener('click', () => {
      const isOpen = drawerPane.classList.contains('open');
      if (isOpen) {
        drawerPane.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawerPane.classList.add('open');
        triggerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!triggerBtn.contains(e.target) && !drawerPane.contains(e.target)) {
        drawerPane.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Accordion Component Behavior
  const accordionButtons = document.querySelectorAll('.accordion-trigger-button');
  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const accordion = button.parentElement;
      const isActive = accordion.classList.contains('active');

      const siblings = accordion.parentElement.querySelectorAll('.garden-accordion');
      siblings.forEach((s) => s.classList.remove('active'));

      if (!isActive) {
        accordion.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      } else {
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

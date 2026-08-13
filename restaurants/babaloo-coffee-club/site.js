/* Babaloo Coffee Club — Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const btn = document.querySelector('.mobile-hamburger-btn');
  const drawer = document.querySelector('.babaloo-mobile-drawer');

  if (btn && drawer) {
    btn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Accordion Component Behavior
  const accordionButtons = document.querySelectorAll('.accordion-header-btn');
  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const accordion = button.parentElement;
      const isActive = accordion.classList.contains('active');

      const siblings = accordion.parentElement.querySelectorAll('.babaloo-accordion');
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

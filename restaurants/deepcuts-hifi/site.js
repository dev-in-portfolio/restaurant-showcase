/* DeepCuts HiFi — Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const trigger = document.querySelector('.drawer-trigger');
  const pane = document.querySelector('.mobile-navigation-pane');

  if (trigger && pane) {
    trigger.addEventListener('click', () => {
      const isOpen = pane.classList.contains('open');
      if (isOpen) {
        pane.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        pane.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !pane.contains(e.target)) {
        pane.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Accordion Component Behavior
  const accordionButtons = document.querySelectorAll('.accordion-button-toggle');
  accordionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.parentElement;
      const isActive = panel.classList.contains('active');

      const siblings = panel.parentElement.querySelectorAll('.accordion-panel');
      siblings.forEach((s) => s.classList.remove('active'));

      if (!isActive) {
        panel.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

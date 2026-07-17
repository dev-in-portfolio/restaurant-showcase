// Cornerstone Pub & Grill: Navigation Utilities
(function() {
  const toggleBtn = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
})();
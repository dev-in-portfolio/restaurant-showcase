/* ============================================
   Eddie V's Prime Seafood — site.js
   ============================================ */

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // Navbar background on scroll
  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(13, 27, 42, 0.97)';
    } else {
      nav.style.background = 'rgba(13, 27, 42, 0.92)';
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = nav ? nav.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // Fade-in animation on scroll
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply fade-in to key elements
  var fadeElements = document.querySelectorAll(
    '.feature-card, .plate-card, .menu-category, .about-pillar, .pd-occasion, ' +
    '.visit-hours-card, .visit-info-card, .reservation-option, .nearby-item, ' +
    '.pd-cta-card, .menu-wine-banner'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Inject fade-in styles
  var style = document.createElement('style');
  style.textContent =
    '.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }' +
    '.fade-in-visible { opacity: 1; transform: translateY(0); }';
  document.head.appendChild(style);

})();

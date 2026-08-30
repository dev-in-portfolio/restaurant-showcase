(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var burger = document.querySelector('.cb-burger');
  var body = document.body;

  if (burger) {
    burger.addEventListener('click', function () {
      var open = body.classList.toggle('drawer-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.querySelectorAll('.cb-drawer a').forEach(function (link) {
      link.addEventListener('click', function () {
        body.classList.remove('drawer-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && body.classList.contains('drawer-open')) {
        body.classList.remove('drawer-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var risers = document.querySelectorAll('.cb-rise');

  if (!reduceMotion && 'IntersectionObserver' in window && risers.length) {
    body.classList.add('js-anim');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    risers.forEach(function (el) { observer.observe(el); });
  } else {
    risers.forEach(function (el) { el.classList.add('in-view'); });
  }
})();

(function () {
  'use strict';

  var burger = document.querySelector('.cp-burger');
  var body = document.body;

  if (burger) {
    burger.addEventListener('click', function () {
      var open = body.classList.toggle('drawer-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.querySelectorAll('.cp-drawer a').forEach(function (link) {
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
})();

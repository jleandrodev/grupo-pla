(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var THRESHOLD = 60;
  var SCROLLED_CLASS = 'site-header--scrolled';
  var ticking = false;

  function update() {
    header.classList.toggle(SCROLLED_CLASS, window.scrollY > THRESHOLD);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
}());

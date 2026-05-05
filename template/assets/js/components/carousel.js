/**
 * Carousel — scroll horizontal com setas de navegação.
 * Uso no HTML: data-component="carousel"
 * Setas: data-action="carousel-prev" / data-action="carousel-next"
 * Track: data-role="carousel-track"
 */

const SELECTOR = '[data-component="carousel"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(el) {
  const track = el.querySelector('[data-role="carousel-track"]');
  const prevBtn = el.querySelector('[data-action="carousel-prev"]');
  const nextBtn = el.querySelector('[data-action="carousel-next"]');

  if (!track || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => scroll(track, -1));
  nextBtn.addEventListener('click', () => scroll(track, 1));

  track.addEventListener('scroll', () => updateArrows(track, prevBtn, nextBtn), { passive: true });

  // Estado inicial
  updateArrows(track, prevBtn, nextBtn);

  // Recalcular ao redimensionar
  const observer = new ResizeObserver(() => updateArrows(track, prevBtn, nextBtn));
  observer.observe(track);
}

function scroll(track, direction) {
  const item = track.querySelector(':scope > *');
  if (!item) return;

  const scrollAmount = item.offsetWidth + parseInt(getComputedStyle(track).gap || '0');
  track.scrollBy({ left: direction * scrollAmount * 2, behavior: 'smooth' });
}

function updateArrows(track, prevBtn, nextBtn) {
  const atStart = track.scrollLeft <= 1;
  const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

  prevBtn.disabled = atStart;
  nextBtn.disabled = atEnd;
}

export { init };

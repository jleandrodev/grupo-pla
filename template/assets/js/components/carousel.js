/**
 * Carousel — scroll horizontal com setas de navegação, dots e autoplay opcional.
 * Uso no HTML: data-component="carousel"
 * Setas (opcional no HTML — criadas automaticamente se ausentes): data-action="carousel-prev/next"
 * Track: data-role="carousel-track"
 * Autoplay: data-autoplay="3500" (ms, só ativo em mobile/tablet < 1024px)
 * Dots: inseridos automaticamente abaixo do carousel
 */

const SELECTOR = '[data-component="carousel"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(el) {
  const track = el.querySelector('[data-role="carousel-track"]');
  if (!track) return;

  // Setas — usa as existentes no HTML ou cria dinamicamente
  let prevBtn = el.querySelector('[data-action="carousel-prev"]');
  let nextBtn = el.querySelector('[data-action="carousel-next"]');

  if (!prevBtn) {
    prevBtn = createArrowBtn('prev');
    el.insertBefore(prevBtn, track);
  }
  if (!nextBtn) {
    nextBtn = createArrowBtn('next');
    el.insertBefore(nextBtn, track.nextSibling);
  }

  prevBtn.addEventListener('click', () => scrollByItem(track, -1));
  nextBtn.addEventListener('click', () => scrollByItem(track, 1));

  track.addEventListener('scroll', () => updateArrows(track, prevBtn, nextBtn), { passive: true });
  updateArrows(track, prevBtn, nextBtn);

  // Dots
  const dotsEl = buildDots(el, track);

  const resizeObs = new ResizeObserver(() => {
    updateArrows(track, prevBtn, nextBtn);
    updateDots(track, dotsEl);
  });
  resizeObs.observe(track);

  if (dotsEl) {
    track.addEventListener('scroll', () => updateDots(track, dotsEl), { passive: true });
    updateDots(track, dotsEl);
  }

  // Autoplay (todos os tamanhos de tela)
  const autoplayMs = parseInt(el.dataset.autoplay);
  if (autoplayMs) {
    initAutoplay(el, track, autoplayMs);
  }
}

// ── ARROWS ───────────────────────────────────────────────────

function createArrowBtn(direction) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `carousel__arrow carousel__arrow--${direction}`;
  btn.dataset.action = `carousel-${direction}`;
  btn.setAttribute('aria-label', direction === 'prev' ? 'Anterior' : 'Próximo');
  btn.innerHTML = direction === 'prev'
    ? '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
    : '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
  return btn;
}

function scrollByItem(track, direction) {
  const item = track.querySelector(':scope > *');
  if (!item) return;
  const gap = parseInt(getComputedStyle(track).gap || '0');
  track.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: 'smooth' });
}

function updateArrows(track, prevBtn, nextBtn) {
  const atStart = track.scrollLeft <= 1;
  const atEnd   = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  prevBtn.disabled = atStart;
  nextBtn.disabled = atEnd;
}

// ── DOTS ─────────────────────────────────────────────────────

function buildDots(el, track) {
  const items = [...track.querySelectorAll(':scope > *')];
  if (items.length <= 1) return null;

  const container = document.createElement('div');
  container.className = 'carousel__dots';
  container.setAttribute('aria-hidden', 'true');

  items.forEach((item, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
    dot.dataset.dotIndex = String(i);
    dot.setAttribute('aria-label', `Ir para o item ${i + 1}`);
    dot.addEventListener('click', () => {
      const left = item.offsetLeft - track.offsetLeft;
      track.scrollTo({ left, behavior: 'smooth' });
    });
    container.appendChild(dot);
  });

  el.appendChild(container);
  return container;
}

function updateDots(track, dotsEl) {
  if (!dotsEl) return;

  const items = [...track.querySelectorAll(':scope > *')];
  const dots  = [...dotsEl.querySelectorAll('.carousel__dot')];
  if (!items.length || !dots.length) return;

  const center = track.scrollLeft + track.clientWidth / 2;

  let activeIdx = 0;
  let minDist = Infinity;
  items.forEach((item, i) => {
    const itemCenter = (item.offsetLeft - track.offsetLeft) + item.offsetWidth / 2;
    const dist = Math.abs(center - itemCenter);
    if (dist < minDist) { minDist = dist; activeIdx = i; }
  });

  dots.forEach((dot, i) => dot.classList.toggle('carousel__dot--active', i === activeIdx));
}

// ── AUTOPLAY ──────────────────────────────────────────────────

function initAutoplay(el, track, ms) {
  let timer = null;

  function advance() {
    // Ignora se o track não tem conteúdo scrollável (ex: grid no desktop)
    if (track.scrollWidth <= track.clientWidth + 5) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    if (atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollByItem(track, 1);
    }
  }

  function start() { if (!timer) timer = setInterval(advance, ms); }
  function stop()  { clearInterval(timer); timer = null; }

  start();
  el.addEventListener('mouseenter', stop);
  el.addEventListener('mouseleave', start);
  el.addEventListener('touchstart', stop, { passive: true });
  el.addEventListener('touchend', () => setTimeout(start, ms), { passive: true });
}

export { init };

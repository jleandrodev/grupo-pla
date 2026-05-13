/**
 * ProductGallery — troca imagem principal ao clicar em thumbnails.
 * Suporta lightbox ao clicar na imagem principal e embed de vídeo YouTube.
 *
 * Uso no HTML: data-component="product-gallery"
 * Main image: data-role="gallery-main"
 * Thumbs: data-action="gallery-thumb"
 * Video thumb: data-action="gallery-video" data-video-id="[youtube-id]"
 */

const SELECTOR = '[data-component="product-gallery"]';

// Lightbox singleton (um único elemento reutilizado entre galerias)
let lightboxEl = null;
let lightboxImgEl = null;
let currentImages = [];
let currentIndex = 0;
let openerEl = null;

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(gallery) {
  const mainImage = gallery.querySelector('[data-role="gallery-main"]');
  const thumbsContainer = gallery.querySelector('.product-gallery__thumbs');
  const thumbs = gallery.querySelectorAll('[data-action="gallery-thumb"]');

  if (!mainImage) return;

  // Build images array from thumbs (src + alt)
  function buildImagesArray() {
    return Array.from(gallery.querySelectorAll('[data-action="gallery-thumb"]')).map((t) => ({
      src: t.dataset.imageSrc || '',
      alt: t.dataset.imageAlt || '',
    })).filter((img) => img.src);
  }

  // Thumb click — swap main image
  gallery.addEventListener('click', (e) => {
    const thumb = e.target.closest('[data-action="gallery-thumb"]');
    if (thumb) {
      const newSrc = thumb.dataset.imageSrc;
      const newAlt = thumb.dataset.imageAlt || mainImage.alt;

      if (!newSrc) return;

      mainImage.src = newSrc;
      mainImage.alt = newAlt;

      // Update active state
      gallery.querySelectorAll('[data-action="gallery-thumb"]').forEach((t) => {
        t.classList.toggle('product-gallery__thumb--active', t === thumb);
      });

      // Update currentIndex for lightbox
      const images = buildImagesArray();
      const idx = images.findIndex((img) => img.src === newSrc);
      if (idx !== -1) currentIndex = idx;

      return;
    }

    // Video button click — abre no lightbox
    const videoBtn = e.target.closest('[data-action="gallery-video"]');
    if (videoBtn) {
      const videoId = videoBtn.dataset.videoId;
      if (!videoId) return;
      openVideoLightbox(videoId, videoBtn);
      return;
    }

    // Main image click — open lightbox
    if (e.target.closest('[data-role="gallery-main"]')) {
      const images = buildImagesArray();
      if (images.length === 0) return;

      // Find current index by matching main image src
      const idx = images.findIndex((img) => img.src === mainImage.src);
      openLightbox(images, idx !== -1 ? idx : 0, mainImage);
    }
  });
}

// ── Lightbox ───────────────────────────────────────────────────────────────

function ensureLightbox() {
  if (lightboxEl) return;

  lightboxEl = document.createElement('div');
  lightboxEl.className = 'gallery-lightbox';
  lightboxEl.setAttribute('role', 'dialog');
  lightboxEl.setAttribute('aria-modal', 'true');
  lightboxEl.setAttribute('aria-label', 'Visualização ampliada da imagem');

  lightboxEl.innerHTML = `
    <div class="gallery-lightbox__overlay" data-action="lightbox-close"></div>
    <div class="gallery-lightbox__panel">
      <img class="gallery-lightbox__img" src="" alt="">
    </div>
    <button type="button" class="gallery-lightbox__close" data-action="lightbox-close" aria-label="Fechar visualização">×</button>
    <button type="button" class="gallery-lightbox__arrow gallery-lightbox__arrow--prev" data-action="lightbox-prev" aria-label="Imagem anterior">&#8249;</button>
    <button type="button" class="gallery-lightbox__arrow gallery-lightbox__arrow--next" data-action="lightbox-next" aria-label="Próxima imagem">&#8250;</button>
  `;

  document.body.appendChild(lightboxEl);
  lightboxImgEl = lightboxEl.querySelector('.gallery-lightbox__img');

  // Click handlers
  lightboxEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="lightbox-close"]')) {
      closeLightbox();
    } else if (e.target.closest('[data-action="lightbox-prev"]')) {
      navigateLightbox(-1);
    } else if (e.target.closest('[data-action="lightbox-next"]')) {
      navigateLightbox(1);
    }
  });

  // Keyboard handler
  document.addEventListener('keydown', onLightboxKeydown);
}

function openVideoLightbox(videoId, opener) {
  ensureLightbox();

  const panel = lightboxEl.querySelector('.gallery-lightbox__panel');

  // Oculta a imagem e as setas (sem navegação no vídeo)
  if (lightboxImgEl) lightboxImgEl.hidden = true;
  lightboxEl.querySelectorAll('.gallery-lightbox__arrow').forEach(btn => { btn.hidden = true; });

  // Remove iframe anterior se existir
  panel.querySelector('.gallery-lightbox__video-embed')?.remove();

  const iframe = document.createElement('iframe');
  iframe.className = 'gallery-lightbox__video-embed';
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('title', 'Vídeo do produto');
  panel.appendChild(iframe);

  openerEl = opener;
  lightboxEl.classList.add('gallery-lightbox--open');
  document.body.classList.add('lightbox-open');
  lightboxEl.querySelector('.gallery-lightbox__close').focus();
}

function openLightbox(images, idx, opener) {
  ensureLightbox();

  currentImages = images;
  currentIndex = idx;
  openerEl = opener;

  updateLightboxImage();
  updateArrowVisibility();

  lightboxEl.classList.add('gallery-lightbox--open');
  document.body.classList.add('lightbox-open');

  // Move focus to close button
  lightboxEl.querySelector('.gallery-lightbox__close').focus();
}

function closeLightbox() {
  if (!lightboxEl) return;

  // Remove iframe de vídeo se existir (para o vídeo ao fechar)
  const iframe = lightboxEl.querySelector('.gallery-lightbox__video-embed');
  if (iframe) {
    iframe.remove();
    if (lightboxImgEl) lightboxImgEl.hidden = false;
    lightboxEl.querySelectorAll('.gallery-lightbox__arrow').forEach(btn => { btn.hidden = false; });
  }

  lightboxEl.classList.remove('gallery-lightbox--open');
  document.body.classList.remove('lightbox-open');

  openerEl?.focus();
  openerEl = null;
}

function navigateLightbox(delta) {
  const next = currentIndex + delta;
  if (next < 0 || next >= currentImages.length) return;
  currentIndex = next;
  updateLightboxImage();
  updateArrowVisibility();
}

function updateLightboxImage() {
  const img = currentImages[currentIndex];
  if (!img || !lightboxImgEl) return;
  lightboxImgEl.src = img.src;
  lightboxImgEl.alt = img.alt;
}

function updateArrowVisibility() {
  if (!lightboxEl) return;
  const prevBtn = lightboxEl.querySelector('.gallery-lightbox__arrow--prev');
  const nextBtn = lightboxEl.querySelector('.gallery-lightbox__arrow--next');

  if (prevBtn) prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
  if (nextBtn) nextBtn.style.visibility = currentIndex === currentImages.length - 1 ? 'hidden' : 'visible';
}

function onLightboxKeydown(e) {
  if (!lightboxEl?.classList.contains('gallery-lightbox--open')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  }
}

export { init };

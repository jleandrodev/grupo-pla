/**
 * ProductGallery — troca imagem principal ao clicar em thumbnails.
 * Uso no HTML: data-component="product-gallery"
 * Main image: data-role="gallery-main"
 * Thumbs: data-action="gallery-thumb"
 */

const SELECTOR = '[data-component="product-gallery"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(gallery) {
  const mainImage = gallery.querySelector('[data-role="gallery-main"]');
  const thumbs = gallery.querySelectorAll('[data-action="gallery-thumb"]');

  if (!mainImage || thumbs.length === 0) return;

  gallery.addEventListener('click', (e) => {
    const thumb = e.target.closest('[data-action="gallery-thumb"]');
    if (!thumb) return;

    const newSrc = thumb.dataset.imageSrc;
    const newAlt = thumb.dataset.imageAlt || mainImage.alt;

    if (!newSrc) return;

    // Atualizar imagem principal
    mainImage.src = newSrc;
    mainImage.alt = newAlt;

    // Atualizar estado ativo dos thumbs
    thumbs.forEach((t) => {
      t.classList.toggle('product-gallery__thumb--active', t === thumb);
    });
  });
}

export { init };

/**
 * WishlistManager — gestão da lista de desejos com persistência em localStorage.
 *
 * Escuta data-action="toggle-wishlist" em qualquer elemento da página.
 * Persiste dados em localStorage com chave "ecom_wishlist".
 *
 * Produto: { id, name, price, image, category, url }
 *
 * Eventos emitidos:
 *   wishlist:updated      — a qualquer mudança
 *   wishlist:item-added   — quando item é adicionado
 *   wishlist:item-removed — quando item é removido
 */

const STORAGE_KEY = 'ecom_wishlist';

// ── STORAGE ─────────────────────────────────────────────────

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWishlist(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* quota exceeded */ }
}

// ── OPERATIONS ──────────────────────────────────────────────

function isInWishlist(id) {
  return getWishlist().some(i => i.id === id);
}

function addItem(product) {
  const list = getWishlist();
  if (!list.some(i => i.id === product.id)) {
    list.push(product);
    saveWishlist(list);
  }
  return list;
}

function removeItem(id) {
  const list = getWishlist().filter(i => i.id !== id);
  saveWishlist(list);
  return list;
}

function toggleItem(product) {
  return isInWishlist(product.id) ? removeItem(product.id) : addItem(product);
}

// ── PRODUCT DATA EXTRACTION ─────────────────────────────────

function extractProduct(btn) {
  const articleContainer = btn.closest('article')
    || btn.closest('[data-product-id]:not(button)');

  const id = btn.dataset.productId
    || articleContainer?.dataset.productId
    || String(Date.now());

  let name = btn.dataset.productName;
  if (!name && articleContainer) {
    name = articleContainer.querySelector(
      '.product-card__title a, .product-card__title, h1'
    )?.textContent?.trim();
  }
  if (!name) {
    name = document.querySelector('h1')?.textContent?.trim() || 'Produto';
  }

  let price = 0;
  if (btn.dataset.productPrice) {
    price = parseFloat(btn.dataset.productPrice) || 0;
  } else {
    const priceCtx = articleContainer || document;
    const priceEl = priceCtx.querySelector(
      '.product-info__price--current, .product-card__price--current'
    );
    if (priceEl) {
      const content = priceEl.getAttribute('content');
      price = content
        ? parseFloat(content)
        : parseFloat(priceEl.textContent.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    }
  }

  let image = btn.dataset.productImage || '';
  if (!image) {
    const imgEl = (articleContainer || document).querySelector(
      '.product-card__image, .product-gallery__main img, img[loading="lazy"]'
    );
    image = imgEl?.src || '';
  }

  let category = btn.dataset.productCategory || '';
  if (!category && articleContainer) {
    category = articleContainer.querySelector('.product-card__category')?.textContent?.trim() || '';
  }

  const linkEl = articleContainer?.querySelector('.product-card__title a, .product-card__image-link');
  const url = linkEl?.href || '';

  return { id, name, price, image, category, url };
}

// ── UI SYNC ─────────────────────────────────────────────────

function syncButtons(wishlist) {
  const ids = new Set(wishlist.map(i => i.id));
  document.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
    const id = btn.dataset.productId;
    if (!id) return;
    const active = ids.has(id);
    btn.classList.toggle('product-card__wishlist--active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function updateBadge(count) {
  document.querySelectorAll('[data-role="wishlist-count"]').forEach(el => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
  document.querySelectorAll('.header-wishlist').forEach(el => {
    el.setAttribute(
      'aria-label',
      `Lista de desejos${count > 0 ? `, ${count} ${count === 1 ? 'item' : 'itens'}` : ''}`
    );
  });
}

// ── EVENT HANDLERS ───────────────────────────────────────────

function handleToggle(e) {
  const btn = e.target.closest('[data-action="toggle-wishlist"]');
  if (!btn) return;

  e.preventDefault();

  const product = extractProduct(btn);
  const wasInList = isInWishlist(product.id);
  const list = toggleItem(product);

  syncButtons(list);
  updateBadge(list.length);

  const eventName = wasInList ? 'wishlist:item-removed' : 'wishlist:item-added';
  document.dispatchEvent(new CustomEvent(eventName, { detail: product }));
  document.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { list } }));
}

// ── INIT ─────────────────────────────────────────────────────

function init() {
  document.addEventListener('click', handleToggle);
  const list = getWishlist();
  syncButtons(list);
  updateBadge(list.length);
}

export { init, getWishlist, addItem, removeItem, toggleItem, isInWishlist };

/**
 * Wishlist page — renderiza a lista de desejos salva no localStorage.
 */

import { init as initCartManager } from '../components/cart-manager.js';
import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';
import { init as initWishlist, getWishlist, removeItem } from '../components/wishlist-manager.js';

const HEART_SVG = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function createItemEl(item) {
  const el = document.createElement('article');
  el.className = 'wishlist-item';
  el.dataset.productId = item.id;

  const nameHtml = item.url
    ? `<a href="${item.url}" class="wishlist-item__name-link">${item.name}</a>`
    : item.name;

  const priceHtml = item.price > 0
    ? `<p class="wishlist-item__price">${formatCurrency(item.price)}</p>`
    : '';

  const categoryHtml = item.category
    ? `<span class="wishlist-item__category">${item.category}</span>`
    : '';

  el.innerHTML = `
    <div class="wishlist-item__image-wrap">
      <img
        src="${item.image || ''}"
        alt="${item.name}"
        class="wishlist-item__image"
        width="200"
        height="200"
        loading="lazy"
      >
    </div>
    <div class="wishlist-item__body">
      ${categoryHtml}
      <h2 class="wishlist-item__name">${nameHtml}</h2>
      ${priceHtml}
      <div class="wishlist-item__actions">
        <button
          type="button"
          class="btn btn--primary btn--sm"
          data-action="add-to-cart"
          data-product-id="${item.id}"
          data-product-name="${item.name}"
          data-product-price="${item.price}"
          data-product-image="${item.image || ''}"
          aria-label="Adicionar ${item.name} ao carrinho"
        >
          Adicionar ao Carrinho
        </button>
        <button
          type="button"
          class="wishlist-item__remove"
          data-action="remove-wishlist"
          data-product-id="${item.id}"
          aria-label="Remover ${item.name} da lista de desejos"
        >
          ${HEART_SVG}
          Remover
        </button>
      </div>
    </div>
  `;

  return el;
}

function updatePageBadge(count) {
  document.querySelectorAll('[data-role="wishlist-count"]').forEach(el => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
}

function renderPage() {
  const list = getWishlist();
  const emptyEl = document.querySelector('[data-role="wishlist-empty"]');
  const filledEl = document.querySelector('[data-role="wishlist-filled"]');
  const gridEl = document.querySelector('[data-role="wishlist-grid"]');
  const countEl = document.querySelector('[data-role="wishlist-total-count"]');

  if (!gridEl) return;

  gridEl.querySelectorAll('.wishlist-item').forEach(el => el.remove());

  if (list.length === 0) {
    emptyEl?.removeAttribute('hidden');
    filledEl?.setAttribute('hidden', '');
    return;
  }

  emptyEl?.setAttribute('hidden', '');
  filledEl?.removeAttribute('hidden');

  if (countEl) countEl.textContent = String(list.length);

  list.forEach(item => gridEl.appendChild(createItemEl(item)));
}

function handleRemove(e) {
  const btn = e.target.closest('[data-action="remove-wishlist"]');
  if (!btn) return;

  const id = btn.dataset.productId;
  if (!id) return;

  removeItem(id);

  const count = getWishlist().length;
  updatePageBadge(count);
  renderPage();

  document.dispatchEvent(new CustomEvent('wishlist:updated', {
    detail: { list: getWishlist() }
  }));
}

function handleClearAll(e) {
  const btn = e.target.closest('[data-action="clear-wishlist"]');
  if (!btn) return;

  try { localStorage.removeItem('ecom_wishlist'); } catch { /* */ }

  updatePageBadge(0);
  renderPage();

  document.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { list: [] } }));
}

document.addEventListener('DOMContentLoaded', () => {
  initCartManager();
  initWishlist();
  initMobileMenu();
  initSearchModal();

  renderPage();

  document.addEventListener('click', handleRemove);
  document.addEventListener('click', handleClearAll);
});

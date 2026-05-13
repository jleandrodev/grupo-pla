/**
 * Cart page — renderiza itens do localStorage e gerencia qty, remoção e totais.
 */

import { init as initCartManager, getCart, removeItem, updateQty } from '../components/cart-manager.js';
import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';
import { formatCurrency } from '../core/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initCartManager();
  initMobileMenu();
  initSearchModal();

  renderPageCart();
  bindEvents();
});

// ── RENDER ────────────────────────────────────────────────────

function renderPageCart() {
  const listEl  = document.querySelector('[data-role="cart-items-list"]');
  const cart    = getCart();

  if (!listEl) return;

  // Remove itens estáticos do HTML (demo)
  listEl.innerHTML = '';

  cart.forEach(item => listEl.appendChild(createPageItemEl(item)));

  recalcAll();
  checkEmptyState();
}

function createPageItemEl(item) {
  const article = document.createElement('article');
  article.className = 'cart-page-item';
  article.dataset.cartItem = '';
  article.dataset.productId = item.id;

  const subtotal = item.price * item.qty;

  // Produto (imagem + nome)
  const productDiv = document.createElement('div');
  productDiv.className = 'cart-page-item__product';

  const img = document.createElement('img');
  img.src = item.image || '';
  img.alt = item.name;
  img.className = 'cart-page-item__image';
  img.width = 80;
  img.height = 80;
  img.loading = 'lazy';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'cart-page-item__info';

  const nameH3 = document.createElement('h3');
  nameH3.className = 'cart-page-item__name';
  nameH3.textContent = item.name;

  infoDiv.appendChild(nameH3);
  productDiv.append(img, infoDiv);

  // Preço unitário
  const priceDiv = document.createElement('div');
  priceDiv.className = 'cart-page-item__price';
  priceDiv.dataset.role = 'item-unit-price';
  priceDiv.dataset.price = String(item.price);

  const priceLabel = document.createElement('span');
  priceLabel.className = 'cart-page-item__price-label';
  priceLabel.textContent = 'Preço Unit.:';
  priceDiv.append(priceLabel, document.createTextNode(' ' + formatCurrency(item.price)));

  // Quantidade
  const qtyDiv = document.createElement('div');
  qtyDiv.className = 'cart-page-item__quantity';

  const btnMinus = document.createElement('button');
  btnMinus.type = 'button';
  btnMinus.className = 'cart-page-item__qty-btn';
  btnMinus.dataset.action = 'qty-decrease';
  btnMinus.setAttribute('aria-label', `Diminuir quantidade de ${item.name}`);
  btnMinus.textContent = '−';

  const qtyInput = document.createElement('input');
  qtyInput.type = 'number';
  qtyInput.className = 'cart-page-item__qty-input';
  qtyInput.dataset.role = 'qty-value';
  qtyInput.value = String(item.qty);
  qtyInput.min = '1';
  qtyInput.max = '999';
  qtyInput.setAttribute('aria-label', `Quantidade de ${item.name}`);

  const btnPlus = document.createElement('button');
  btnPlus.type = 'button';
  btnPlus.className = 'cart-page-item__qty-btn';
  btnPlus.dataset.action = 'qty-increase';
  btnPlus.setAttribute('aria-label', `Aumentar quantidade de ${item.name}`);
  btnPlus.textContent = '+';

  qtyDiv.append(btnMinus, qtyInput, btnPlus);

  // Subtotal
  const subtotalDiv = document.createElement('div');
  subtotalDiv.className = 'cart-page-item__subtotal';
  subtotalDiv.dataset.role = 'item-subtotal';

  const subtotalLabel = document.createElement('span');
  subtotalLabel.className = 'cart-page-item__subtotal-label';
  subtotalLabel.textContent = 'Subtotal:';
  subtotalDiv.append(subtotalLabel, document.createTextNode(' ' + formatCurrency(subtotal)));

  // Botão remover
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'cart-page-item__actions';

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'cart-page-item__remove';
  removeBtn.dataset.action = 'cart-remove';
  removeBtn.dataset.productId = item.id;
  removeBtn.setAttribute('aria-label', `Remover ${item.name} do carrinho`);
  removeBtn.innerHTML =
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">' +
    '<polyline points="3 6 5 6 21 6"/>' +
    '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>' +
    '</svg>';
  actionsDiv.appendChild(removeBtn);

  article.append(productDiv, priceDiv, qtyDiv, subtotalDiv, actionsDiv);
  return article;
}

// ── EVENTS ────────────────────────────────────────────────────

function bindEvents() {
  // +/- buttons
  document.addEventListener('click', (e) => {
    const decrease = e.target.closest('[data-action="qty-decrease"]');
    const increase = e.target.closest('[data-action="qty-increase"]');
    const btn = decrease || increase;
    if (!btn) return;

    const item = btn.closest('[data-cart-item]');
    if (!item) return;

    const input = item.querySelector('[data-role="qty-value"]');
    if (!input) return;

    const delta = increase ? 1 : -1;
    const newQty = Math.max(1, parseInt(input.value || '1') + delta);
    input.value = String(newQty);

    persistQtyChange(item, newQty);
    recalcItem(item);
    recalcAll();
  });

  // Input direto
  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-role="qty-value"]');
    if (!input) return;
    const item = input.closest('[data-cart-item]');
    if (!item) return;

    const newQty = Math.max(1, parseInt(input.value) || 1);
    input.value = String(newQty);

    persistQtyChange(item, newQty);
    recalcItem(item);
    recalcAll();
  });

  // Remover
  document.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-action="cart-remove"]');
    if (!removeBtn) return;
    const item = removeBtn.closest('[data-cart-item]');
    if (!item) return;
    handleRemoveItem(item, removeBtn.dataset.productId);
  });

  // CEP
  document.querySelector('#cep-input')?.addEventListener('input', handleCepMask);

  // Calcular frete
  document.querySelector('[data-action="calculate-shipping"]')
    ?.addEventListener('click', handleCalculateShipping);
}

// ── HELPERS ───────────────────────────────────────────────────

function persistQtyChange(itemEl, newQty) {
  const id = itemEl.dataset.productId;
  if (id) updateQty(id, newQty);
}

function handleRemoveItem(itemEl, id) {
  const name = itemEl.querySelector('.cart-page-item__name')?.textContent?.trim() ?? 'Produto';

  itemEl.style.opacity = '0';
  itemEl.style.transform = 'translateX(-1rem)';
  itemEl.style.transition = 'opacity var(--ecom-duration-normal) var(--ecom-ease-default), transform var(--ecom-duration-normal) var(--ecom-ease-default)';

  setTimeout(() => {
    if (id) removeItem(id);
    itemEl.remove();
    recalcAll();
    checkEmptyState();
    announceStatus(`${name} removido do carrinho.`);
  }, 250);
}

function recalcItem(itemEl) {
  const priceEl    = itemEl.querySelector('[data-role="item-unit-price"]');
  const qtyInput   = itemEl.querySelector('[data-role="qty-value"]');
  const subtotalEl = itemEl.querySelector('[data-role="item-subtotal"]');
  if (!priceEl || !qtyInput || !subtotalEl) return;

  const unitPrice = parseFloat(priceEl.dataset.price) || 0;
  const qty       = parseInt(qtyInput.value) || 1;
  const label     = subtotalEl.querySelector('.cart-page-item__subtotal-label');
  const labelHTML = label ? label.outerHTML : '';
  subtotalEl.innerHTML = labelHTML + ' ' + formatCurrency(unitPrice * qty);
}

function recalcAll() {
  const items = document.querySelectorAll('[data-cart-item]');
  let total = 0;

  items.forEach(item => {
    const priceEl  = item.querySelector('[data-role="item-unit-price"]');
    const qtyInput = item.querySelector('[data-role="qty-value"]');
    if (!priceEl || !qtyInput) return;
    total += (parseFloat(priceEl.dataset.price) || 0) * (parseInt(qtyInput.value) || 1);
  });

  const subtotalEl = document.querySelector('.cart-summary [data-role="cart-subtotal"]');
  const totalEl    = document.querySelector('[data-role="cart-total"]');
  if (subtotalEl) subtotalEl.textContent = formatCurrency(total);
  if (totalEl)    totalEl.textContent    = formatCurrency(total);

  // Badge do header
  const totalQty = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.header-cart__count').forEach(el => {
    el.textContent = String(totalQty);
    el.hidden = totalQty === 0;
  });
}

function checkEmptyState() {
  const items    = document.querySelectorAll('[data-cart-item]');
  const filledEl = document.querySelector('[data-role="cart-filled"]');
  const emptyEl  = document.querySelector('.cart-page [data-role="cart-empty"], .cart-empty[data-role="cart-empty"]');

  if (filledEl) filledEl.hidden = items.length === 0;
  if (emptyEl)  emptyEl.hidden  = items.length > 0;
}

function handleCepMask(e) {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
  e.target.value = v;
}

function handleCalculateShipping() {
  const cepInput   = document.querySelector('#cep-input');
  const shippingEl = document.querySelector('[data-role="cart-shipping"]');
  if (!cepInput || !shippingEl) return;

  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) { announceStatus('Informe um CEP válido com 8 dígitos.'); return; }

  shippingEl.textContent = 'Calculando...';
  shippingEl.classList.remove('cart-summary__value--muted');

  setTimeout(() => {
    shippingEl.textContent = 'R$ 35,00';
    announceStatus('Frete calculado: R$ 35,00');

    const subtotalEl = document.querySelector('.cart-summary [data-role="cart-subtotal"]');
    const totalEl    = document.querySelector('[data-role="cart-total"]');
    if (subtotalEl && totalEl) {
      const subtotalValue = parseFloat(subtotalEl.textContent.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      totalEl.textContent = formatCurrency(subtotalValue + 35);
    }
  }, 800);
}

function announceStatus(message) {
  const statusEl = document.querySelector('#page-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  setTimeout(() => { statusEl.textContent = ''; }, 3000);
}

/**
 * CartManager — gestão do carrinho com persistência em localStorage.
 *
 * Integra com cart-drawer.js (open/close do painel lateral).
 * Escuta data-action="add-to-cart" em qualquer elemento da página.
 * Persiste dados em localStorage com chave "ecom_cart".
 *
 * Produto: { id, name, price, image, qty }
 *
 * Eventos emitidos:
 *   cart:updated    — a qualquer mudança no carrinho
 *   cart:item-added — quando item é adicionado
 */

import { init as initCartDrawer, open as openCartDrawer } from './cart-drawer.js';

const STORAGE_KEY = 'ecom_cart';

// ── STORAGE ──────────────────────────────────────────────────

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* quota exceeded — falha silenciosa */ }
}

// ── CART OPERATIONS ──────────────────────────────────────────

function addItem(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }

  saveCart(cart);
  return cart;
}

function removeItem(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  return cart;
}

function updateQty(id, qty) {
  if (qty <= 0) return removeItem(id);

  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return cart;

  item.qty = qty;
  saveCart(cart);
  return cart;
}

// ── PRODUCT DATA EXTRACTION ───────────────────────────────────

/**
 * Extrai dados do produto a partir do botão clicado.
 * Estratégia: data attributes do botão > DOM traversal do container.
 *
 * Dois contextos:
 *  - Página de detalhe: botão tem data-product-id/name; preço/imagem no DOM mais amplo.
 *  - Card de listagem: article[data-product-id] envolve tudo.
 */
function extractProduct(btn) {
  // Container de listagem: article ou elemento com data-product-id que NÃO seja o próprio botão
  const articleContainer = btn.closest('article')
    || btn.closest('[data-product-id]:not(button)');

  const id = btn.dataset.productId
    || articleContainer?.dataset.productId
    || String(Date.now());

  // Nome: prioritiza data attribute (já definido em detalhe-*.html)
  let name = btn.dataset.productName;
  if (!name && articleContainer) {
    name = articleContainer.querySelector(
      '.product-card__title a, .product-card__title, h1'
    )?.textContent?.trim();
  }
  if (!name) {
    // Fallback: h1 da página (detalhe sem data-product-name)
    name = document.querySelector('h1')?.textContent?.trim() || 'Produto';
  }

  // Preço: data attribute > elemento com itemprop content > texto formatado
  let price = 0;
  if (btn.dataset.productPrice) {
    price = parseFloat(btn.dataset.productPrice) || 0;
  } else {
    // Busca no container (listagem) ou no documento inteiro (detalhe)
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

  // Imagem: data attribute > container > gallery > primeira img disponível
  let image = btn.dataset.productImage || '';
  if (!image) {
    const imgEl = (articleContainer || document).querySelector(
      '.product-card__image, .product-gallery__main img, .product-gallery img, img[loading="lazy"]'
    );
    image = imgEl?.src || '';
  }

  return { id, name, price, image };
}

// ── RENDER ────────────────────────────────────────────────────

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function createCartItemEl(item) {
  const el = document.createElement('div');
  el.className = 'cart-item';
  el.dataset.cartItem = '';
  el.dataset.productId = item.id;

  // Imagem
  const img = document.createElement('img');
  img.src = item.image || '';
  img.alt = item.name;
  img.className = 'cart-item__image';
  img.width = 80;
  img.height = 80;
  img.loading = 'lazy';
  el.appendChild(img);

  // Detalhes
  const details = document.createElement('div');
  details.className = 'cart-item__details';

  const nameEl = document.createElement('p');
  nameEl.className = 'cart-item__name';
  nameEl.textContent = item.name;
  details.appendChild(nameEl);

  const bottom = document.createElement('div');
  bottom.className = 'cart-item__bottom';

  const priceEl = document.createElement('span');
  priceEl.className = 'cart-item__price';
  priceEl.textContent = formatCurrency(item.price);
  bottom.appendChild(priceEl);

  // Controle de quantidade
  const qtyWrap = document.createElement('div');
  qtyWrap.className = 'cart-item__qty';

  const btnMinus = document.createElement('button');
  btnMinus.type = 'button';
  btnMinus.className = 'cart-item__qty-btn';
  btnMinus.dataset.action = 'qty-decrease';
  btnMinus.dataset.cartItemId = item.id;
  btnMinus.setAttribute('aria-label', 'Diminuir quantidade');
  btnMinus.textContent = '−';

  const qtyVal = document.createElement('span');
  qtyVal.className = 'cart-item__qty-value';
  qtyVal.dataset.role = 'qty-value';
  qtyVal.textContent = String(item.qty);

  const btnPlus = document.createElement('button');
  btnPlus.type = 'button';
  btnPlus.className = 'cart-item__qty-btn';
  btnPlus.dataset.action = 'qty-increase';
  btnPlus.dataset.cartItemId = item.id;
  btnPlus.setAttribute('aria-label', 'Aumentar quantidade');
  btnPlus.textContent = '+';

  qtyWrap.append(btnMinus, qtyVal, btnPlus);
  bottom.appendChild(qtyWrap);

  // Botão remover
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'cart-item__remove';
  removeBtn.dataset.action = 'cart-remove';
  removeBtn.dataset.cartItemId = item.id;
  removeBtn.setAttribute('aria-label', `Remover ${item.name} do carrinho`);
  removeBtn.innerHTML =
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="3 6 5 6 21 6"/>' +
    '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>' +
    '</svg>';
  bottom.appendChild(removeBtn);

  details.appendChild(bottom);
  el.appendChild(details);

  return el;
}

function renderDrawer(cart) {
  const drawer = document.querySelector('[data-component="cart-drawer"]');
  if (!drawer) return;

  const emptyEl  = drawer.querySelector('[data-role="cart-empty"]');
  const subtotalEl = drawer.querySelector('[data-role="cart-subtotal"]');
  const body     = drawer.querySelector('.cart-drawer__body');
  const countEl  = drawer.querySelector('.cart-drawer__count');

  if (!body) return;

  // Remove itens renderizados anteriormente
  drawer.querySelectorAll('[data-cart-item]').forEach(el => el.remove());

  const totalQty   = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Estado vazio
  if (emptyEl) {
    emptyEl.hidden = cart.length > 0;
  }

  // Renderizar itens
  cart.forEach(item => body.appendChild(createCartItemEl(item)));

  // Subtotal
  if (subtotalEl) subtotalEl.textContent = formatCurrency(totalPrice);

  // Contagem no título do drawer
  if (countEl) {
    countEl.textContent = `(${totalQty} ${totalQty === 1 ? 'item' : 'itens'})`;
  }

  updateBadges(totalQty);
}

function updateBadges(totalQty) {
  document.querySelectorAll('.header-cart__count').forEach(el => {
    el.textContent = String(totalQty);
    el.hidden = totalQty === 0;
  });

  document.querySelectorAll('[data-action="open-cart"]').forEach(btn => {
    btn.setAttribute(
      'aria-label',
      `Abrir carrinho de compras, ${totalQty} ${totalQty === 1 ? 'item' : 'itens'}`
    );
  });
}

// ── EVENT HANDLERS ────────────────────────────────────────────

function handleAddToCart(e) {
  const btn = e.target.closest('[data-action="add-to-cart"]');
  if (!btn) return;

  e.preventDefault();

  const product = extractProduct(btn);
  btn.disabled = true;

  const cart = addItem(product);
  renderDrawer(cart);

  document.dispatchEvent(new CustomEvent('cart:item-added', { detail: product }));
  document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));

  openCartDrawer();

  // Reabilita o botão após breve delay
  requestAnimationFrame(() => setTimeout(() => { btn.disabled = false; }, 400));
}

function handleCartInteraction(e) {
  const removeBtn   = e.target.closest('[data-action="cart-remove"][data-cart-item-id]');
  const decreaseBtn = e.target.closest('[data-action="qty-decrease"][data-cart-item-id]');
  const increaseBtn = e.target.closest('[data-action="qty-increase"][data-cart-item-id]');

  if (!removeBtn && !decreaseBtn && !increaseBtn) return;

  const id = (removeBtn || decreaseBtn || increaseBtn).dataset.cartItemId;

  let cart;
  if (removeBtn) {
    cart = removeItem(id);
  } else {
    const current = getCart().find(i => i.id === id);
    if (!current) return;
    const delta = increaseBtn ? 1 : -1;
    cart = updateQty(id, current.qty + delta);
  }

  renderDrawer(cart);
  document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
}

// ── INIT ──────────────────────────────────────────────────────

function init() {
  // Inicializa cart-drawer (open/close + Escape + overlay)
  initCartDrawer();

  document.addEventListener('click', handleAddToCart);
  document.addEventListener('click', handleCartInteraction);

  // Renderiza o estado persistido ao carregar a página
  renderDrawer(getCart());
}

export { init, getCart, addItem, removeItem, updateQty };

/**
 * Cart page — manages cart items, quantity updates, removal, and totals.
 */

import { init as initQtyInput } from '../components/quantity-input.js';
import { init as initCartDrawer } from '../components/cart-drawer.js';
import { init as initMobileMenu } from '../components/mobile-menu.js';
import { formatCurrency } from '../core/utils.js';

const CART_KEY = 'ecom_cart';

document.addEventListener('DOMContentLoaded', () => {
  initQtyInput();
  initCartDrawer();
  initMobileMenu();
  bindEvents();
  recalcAll();
});

function bindEvents() {
  // Quantity change events (from quantity-input component)
  document.addEventListener('quantity:change', handleQtyChange);

  // Remove item
  document.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-action="cart-remove"]');
    if (removeBtn) {
      handleRemoveItem(removeBtn);
    }
  });

  // CEP mask
  const cepInput = document.querySelector('#cep-input');
  if (cepInput) {
    cepInput.addEventListener('input', handleCepMask);
  }

  // Calculate shipping
  const shippingBtn = document.querySelector('[data-action="calculate-shipping"]');
  if (shippingBtn) {
    shippingBtn.addEventListener('click', handleCalculateShipping);
  }
}

function handleQtyChange(e) {
  const item = e.target.closest('[data-cart-item]');
  if (!item) return;

  recalcItem(item);
  recalcAll();
}

function handleRemoveItem(btn) {
  const item = btn.closest('[data-cart-item]');
  if (!item) return;

  const productName = item.querySelector('.cart-page-item__name')?.textContent?.trim() ?? 'Produto';

  item.style.opacity = '0';
  item.style.transform = 'translateX(-1rem)';
  item.style.transition = `opacity var(--ecom-duration-normal) var(--ecom-ease-default), transform var(--ecom-duration-normal) var(--ecom-ease-default)`;

  setTimeout(() => {
    item.remove();
    recalcAll();
    announceStatus(`${productName} removido do carrinho.`);
    checkEmptyState();
  }, 250);
}

function recalcItem(item) {
  const priceEl = item.querySelector('[data-role="item-unit-price"]');
  const qtyInput = item.querySelector('[data-role="qty-value"]');
  const subtotalEl = item.querySelector('[data-role="item-subtotal"]');

  if (!priceEl || !qtyInput || !subtotalEl) return;

  const unitPrice = parseFloat(priceEl.dataset.price) || 0;
  const qty = parseInt(qtyInput.value) || 1;
  const subtotal = unitPrice * qty;

  // Preserve the label on mobile
  const label = subtotalEl.querySelector('.cart-page-item__subtotal-label');
  const labelHTML = label ? label.outerHTML : '';
  subtotalEl.innerHTML = labelHTML + formatCurrency(subtotal);
}

function recalcAll() {
  const items = document.querySelectorAll('[data-cart-item]');
  let total = 0;

  items.forEach((item) => {
    const priceEl = item.querySelector('[data-role="item-unit-price"]');
    const qtyInput = item.querySelector('[data-role="qty-value"]');
    if (!priceEl || !qtyInput) return;

    const unitPrice = parseFloat(priceEl.dataset.price) || 0;
    const qty = parseInt(qtyInput.value) || 1;
    total += unitPrice * qty;
  });

  const subtotalEl = document.querySelector('[data-role="cart-subtotal"]');
  const totalEl = document.querySelector('[data-role="cart-total"]');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(total);
  if (totalEl) totalEl.textContent = formatCurrency(total);

  // Update header cart count
  updateHeaderCount(items.length);
}

function updateHeaderCount(count) {
  const badge = document.querySelector('.header-cart__count');
  if (badge) badge.textContent = count;

  const cartBtn = document.querySelector('.header-cart');
  if (cartBtn) {
    cartBtn.setAttribute('aria-label', `Abrir carrinho de compras, ${count} ${count === 1 ? 'item' : 'itens'}`);
  }
}

function checkEmptyState() {
  const items = document.querySelectorAll('[data-cart-item]');
  const filledEl = document.querySelector('[data-role="cart-filled"]');
  const emptyEl = document.querySelector('[data-role="cart-empty"]');

  if (!filledEl || !emptyEl) return;

  if (items.length === 0) {
    filledEl.setAttribute('hidden', '');
    emptyEl.removeAttribute('hidden');
  } else {
    filledEl.removeAttribute('hidden');
    emptyEl.setAttribute('hidden', '');
  }
}

function handleCepMask(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 5) {
    value = value.slice(0, 5) + '-' + value.slice(5, 8);
  }
  e.target.value = value;
}

function handleCalculateShipping() {
  const cepInput = document.querySelector('#cep-input');
  if (!cepInput) return;

  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) {
    announceStatus('Informe um CEP válido com 8 dígitos.');
    return;
  }

  const shippingEl = document.querySelector('[data-role="cart-shipping"]');
  if (shippingEl) {
    shippingEl.textContent = 'Calculando...';
    shippingEl.classList.remove('cart-summary__value--muted');

    // Simulate shipping calculation
    setTimeout(() => {
      shippingEl.textContent = 'R$ 35,00';
      announceStatus('Frete calculado: R$ 35,00');

      // Update total
      const subtotalEl = document.querySelector('[data-role="cart-subtotal"]');
      const totalEl = document.querySelector('[data-role="cart-total"]');
      if (subtotalEl && totalEl) {
        const subtotalText = subtotalEl.textContent;
        const subtotalValue = parseFloat(subtotalText.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        totalEl.textContent = formatCurrency(subtotalValue + 35);
      }
    }, 800);
  }
}

function announceStatus(message) {
  const statusEl = document.querySelector('#page-status');
  if (statusEl) {
    statusEl.textContent = message;
    setTimeout(() => { statusEl.textContent = ''; }, 3000);
  }
}

/**
 * QuantityInput — controla inputs de quantidade de produto.
 * Uso no HTML: data-component="quantity-input"
 * Dispara evento customizado "quantity:change" no elemento.
 */

const SELECTOR = '[data-component="quantity-input"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(el) {
  const input = el.querySelector('[data-role="qty-value"]');
  const btnMinus = el.querySelector('[data-action="qty-decrease"]');
  const btnPlus = el.querySelector('[data-action="qty-increase"]');

  if (!input || !btnMinus || !btnPlus) return;

  btnMinus.addEventListener('click', () => adjust(input, -1));
  btnPlus.addEventListener('click', () => adjust(input, +1));
  input.addEventListener('change', () => validate(input));
}

function adjust(input, delta) {
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 999;
  const next = Math.min(Math.max((parseInt(input.value) || 1) + delta, min), max);

  input.value = next;
  input.dispatchEvent(new CustomEvent('quantity:change', {
    bubbles: true,
    detail: { value: next }
  }));
}

function validate(input) {
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 999;
  const val = parseInt(input.value);

  if (isNaN(val) || val < min) input.value = min;
  if (val > max) input.value = max;
}

export { init };

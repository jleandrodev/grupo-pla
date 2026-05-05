/**
 * CartDrawer — mini carrinho lateral que abre da direita.
 * Uso no HTML: data-component="cart-drawer"
 * Abrir: data-action="open-cart"
 * Fechar: data-action="close-cart"
 */

const SELECTOR = '[data-component="cart-drawer"]';
let drawerEl = null;
let overlayEl = null;
let lastFocused = null;

function init(root = document) {
  drawerEl = root.querySelector(SELECTOR);
  overlayEl = root.querySelector('[data-component="cart-drawer-overlay"]');

  if (!drawerEl || !overlayEl) return;

  // Abrir
  root.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-action="open-cart"]');
    if (openBtn) {
      e.preventDefault();
      open();
    }
  });

  // Fechar via botão ou overlay
  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="close-cart"]') || e.target === overlayEl) {
      close();
    }
  });

  // Fechar com Escape
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerEl.dataset.state === 'open') {
      close();
    }
  });
}

function open() {
  if (!drawerEl || !overlayEl) return;

  lastFocused = document.activeElement;
  drawerEl.dataset.state = 'open';
  overlayEl.dataset.state = 'open';
  document.body.style.overflow = 'hidden';

  // Mover foco para o drawer
  const closeBtn = drawerEl.querySelector('[data-action="close-cart"]');
  if (closeBtn) closeBtn.focus();

  // Trap de foco
  drawerEl.addEventListener('keydown', trapFocus);
}

function close() {
  if (!drawerEl || !overlayEl) return;

  drawerEl.dataset.state = 'closed';
  overlayEl.dataset.state = 'closed';
  document.body.style.overflow = '';

  drawerEl.removeEventListener('keydown', trapFocus);

  // Devolver foco
  if (lastFocused) lastFocused.focus();
}

function trapFocus(e) {
  if (e.key !== 'Tab') return;

  const focusable = drawerEl.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export { init, open, close };

/**
 * SearchModal — modal de busca.
 *
 * Mobile (< 768px): abre modal fullscreen via [data-action="toggle-search"]
 * Desktop (≥ 768px): abre dropdown abaixo do header ao focar #header-search-input
 *
 * Fechar: ESC | overlay | [data-action="close-search-modal"] | clique fora (desktop)
 */

const MODAL_ID          = 'search-modal';
const OPEN_CLASS        = 'search-modal--open';
const DROPDOWN_CLASS    = 'search-modal--dropdown';
const TRIGGER_ACTION    = 'toggle-search';
const CLOSE_ACTION      = 'close-search-modal';
const BODY_CLASS        = 'search-modal-open';
const BREAKPOINT        = 768;
const DESKTOP_INPUT_ID  = 'header-search-input';

let modalEl    = null;
let inputEl    = null;
let isOpen     = false;
let isDropdown = false;

function init(root = document) {
  modalEl = root.getElementById(MODAL_ID);
  if (!modalEl) return;

  inputEl = modalEl.querySelector('.search-modal__input');

  // Mobile trigger
  root.querySelectorAll(`[data-action="${TRIGGER_ACTION}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth < BREAKPOINT) openModal();
    });
  });

  // Desktop trigger: foco no campo de busca do header
  const desktopInput = root.getElementById(DESKTOP_INPUT_ID);
  if (desktopInput) {
    desktopInput.addEventListener('focus', () => {
      if (window.innerWidth >= BREAKPOINT) openDropdown(desktopInput);
    });
  }

  // Triggers de fechamento
  root.querySelectorAll(`[data-action="${CLOSE_ACTION}"]`).forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // Overlay
  modalEl.querySelector('.search-modal__overlay')
    ?.addEventListener('click', closeModal);

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeModal();
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener('mousedown', e => {
    if (!isOpen || !isDropdown) return;
    const panel = modalEl.querySelector('.search-modal__panel');
    const desktopInputEl = document.getElementById(DESKTOP_INPUT_ID);
    if (!panel?.contains(e.target) && !desktopInputEl?.contains(e.target)) {
      closeModal();
    }
  });
}

function openDropdown(triggerInput) {
  if (!modalEl) return;

  // Posiciona o painel logo abaixo do site-header
  const header = document.querySelector('.site-header');
  const bottom = header ? header.getBoundingClientRect().bottom : 80;
  const panel = modalEl.querySelector('.search-modal__panel');
  if (panel) panel.style.top = bottom + 'px';

  isOpen     = true;
  isDropdown = true;
  modalEl.classList.add(OPEN_CLASS, DROPDOWN_CLASS);
  modalEl.removeAttribute('aria-hidden');
  // Sem body scroll-lock no dropdown
}

function openModal() {
  if (!modalEl) return;
  isOpen     = true;
  isDropdown = false;
  modalEl.classList.add(OPEN_CLASS);
  modalEl.classList.remove(DROPDOWN_CLASS);
  modalEl.removeAttribute('aria-hidden');
  document.body.classList.add(BODY_CLASS);

  requestAnimationFrame(() => inputEl?.focus());
}

function closeModal() {
  if (!modalEl) return;
  const wasDropdown = isDropdown;
  isOpen     = false;
  isDropdown = false;
  modalEl.classList.remove(OPEN_CLASS, DROPDOWN_CLASS);
  modalEl.setAttribute('aria-hidden', 'true');

  if (!wasDropdown) {
    document.body.classList.remove(BODY_CLASS);
    document.querySelector(`[data-action="${TRIGGER_ACTION}"]`)?.focus();
  }
}

export { init };

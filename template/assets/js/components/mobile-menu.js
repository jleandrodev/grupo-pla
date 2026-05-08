/**
 * MobileMenu — hamburger toggle para navegação principal.
 *
 * Trigger (abrir/fechar): data-action="toggle-menu"
 * Nav alvo: .site-nav
 * Fecha ao pressionar Escape ou clicar fora.
 *
 * SearchToggle — abre/fecha campo de busca no mobile.
 *
 * Trigger: data-action="toggle-search"
 * Alvo: .main-header__search (recebe classe --mobile-open)
 */

const TOGGLE_ACTION = 'toggle-menu';
const NAV_SELECTOR = '.site-nav';
const MENU_OPEN_CLASS = 'site-nav--open';

const SEARCH_TOGGLE_ACTION = 'toggle-search';
const SEARCH_SELECTOR = '.main-header__search';
const SEARCH_OPEN_CLASS = 'main-header__search--mobile-open';

let isOpen = false;
let toggleBtn = null;
let navEl = null;

let isSearchOpen = false;
let searchToggleBtn = null;
let searchEl = null;

function init(root = document) {
  // — Hamburger menu
  toggleBtn = root.querySelector(`[data-action="${TOGGLE_ACTION}"]`);
  navEl = root.querySelector(NAV_SELECTOR);

  if (toggleBtn && navEl) {
    toggleBtn.addEventListener('click', toggle);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onOutsideClick);
  }

  // — Search toggle
  searchToggleBtn = root.querySelector(`[data-action="${SEARCH_TOGGLE_ACTION}"]`);
  searchEl = root.querySelector(SEARCH_SELECTOR);

  if (searchToggleBtn && searchEl) {
    searchToggleBtn.addEventListener('click', toggleSearch);
    document.addEventListener('click', onSearchOutsideClick);
  }
}

// ── Hamburger ──────────────────────────────────────────────

function toggle() {
  isOpen ? close() : open();
}

function open() {
  isOpen = true;
  navEl.classList.add(MENU_OPEN_CLASS);
  toggleBtn.setAttribute('aria-expanded', 'true');
}

function close() {
  isOpen = false;
  navEl.classList.remove(MENU_OPEN_CLASS);
  toggleBtn.setAttribute('aria-expanded', 'false');
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    if (isOpen) {
      close();
      toggleBtn.focus();
    }
    if (isSearchOpen) {
      closeSearch();
      searchToggleBtn.focus();
    }
  }
}

function onOutsideClick(e) {
  if (!isOpen) return;
  if (toggleBtn.contains(e.target) || navEl.contains(e.target)) return;
  close();
}

// ── Search toggle ───────────────────────────────────────────

function toggleSearch() {
  isSearchOpen ? closeSearch() : openSearch();
}

function openSearch() {
  isSearchOpen = true;
  searchEl.classList.add(SEARCH_OPEN_CLASS);
  searchToggleBtn.setAttribute('aria-expanded', 'true');

  // Mover foco para o input de busca
  const input = searchEl.querySelector('input[type="search"], input[type="text"]');
  if (input) input.focus();
}

function closeSearch() {
  isSearchOpen = false;
  searchEl.classList.remove(SEARCH_OPEN_CLASS);
  searchToggleBtn.setAttribute('aria-expanded', 'false');
}

function onSearchOutsideClick(e) {
  if (!isSearchOpen) return;
  if (searchToggleBtn.contains(e.target) || searchEl.contains(e.target)) return;
  closeSearch();
}

export { init };

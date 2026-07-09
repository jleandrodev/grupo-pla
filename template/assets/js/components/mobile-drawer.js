/**
 * MobileDrawer — menu lateral (drawer) para mobile/tablet.
 *
 * Trigger abrir: data-action="toggle-menu" (hamburger)
 * Trigger fechar: data-action="close-drawer" (overlay ou botão X)
 * Drawer: #mobile-drawer
 * Overlay: #mobile-drawer-overlay
 */

const DRAWER_ID   = 'mobile-drawer';
const OVERLAY_ID  = 'mobile-drawer-overlay';
const OPEN_CLASS  = 'mobile-drawer--open';
const TOGGLE_ACTION = 'toggle-menu';
const CLOSE_ACTION  = 'close-drawer';

let drawerEl  = null;
let overlayEl = null;
let toggleBtn = null;
let isOpen    = false;

function init(root = document) {
  drawerEl  = root.getElementById(DRAWER_ID);
  overlayEl = root.getElementById(OVERLAY_ID);

  // Todos os gatilhos de abertura (hambúrguer do header + item "Menu" da barra inferior).
  const toggleBtns = root.querySelectorAll(`[data-action="${TOGGLE_ACTION}"]`);
  toggleBtn = toggleBtns[0]; // referência p/ bookkeeping de aria-expanded/foco

  if (!drawerEl || !toggleBtn) return;

  toggleBtns.forEach(btn => btn.addEventListener('click', toggleDrawer));
  document.addEventListener('keydown', onKeydown);

  root.querySelectorAll(`[data-action="${CLOSE_ACTION}"]`).forEach(el => {
    el.addEventListener('click', closeDrawer);
  });

  if (overlayEl) overlayEl.addEventListener('click', closeDrawer);

  setActiveLink(root);
}

// ── Drawer ──────────────────────────────────────────────

function toggleDrawer() {
  isOpen ? closeDrawer() : openDrawer();
}

function openDrawer() {
  if (!drawerEl) return;
  isOpen = true;
  drawerEl.classList.add(OPEN_CLASS);
  if (overlayEl) {
    overlayEl.style.display = 'block';
    requestAnimationFrame(() => { overlayEl.style.opacity = '1'; });
  }
  document.body.classList.add('drawer-open');
  toggleBtn?.setAttribute('aria-expanded', 'true');
  drawerEl.focus();
}

function closeDrawer() {
  if (!drawerEl) return;
  isOpen = false;
  drawerEl.classList.remove(OPEN_CLASS);
  if (overlayEl) {
    overlayEl.style.opacity = '0';
    setTimeout(() => { if (!isOpen) overlayEl.style.display = 'none'; }, 250);
  }
  document.body.classList.remove('drawer-open');
  toggleBtn?.setAttribute('aria-expanded', 'false');
  toggleBtn?.focus();
}

function onKeydown(e) {
  if (e.key === 'Escape' && isOpen) closeDrawer();
}

function setActiveLink(root) {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  root.querySelectorAll('.mobile-drawer__link').forEach(link => {
    const linkPage = (link.getAttribute('href') || '').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('mobile-drawer__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

export { init };

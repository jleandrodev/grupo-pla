/**
 * contato.js — Inicializa cart drawer na página de Contato.
 */

import { init as initCartManager } from '../components/cart-manager.js';
import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initCartManager();
  initMobileMenu();
  initSearchModal();
});

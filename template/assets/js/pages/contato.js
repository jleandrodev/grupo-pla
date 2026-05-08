/**
 * contato.js — Inicializa cart drawer na página de Contato.
 */

import { init as initCartDrawer } from '../components/cart-drawer.js';
import { init as initMobileMenu } from '../components/mobile-menu.js';

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initMobileMenu();
});

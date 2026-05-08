/**
 * Catalog page — orquestra componentes da página de categoria.
 */

import { init as initCarousel } from '../components/carousel.js';
import { init as initFiltersSidebar } from '../components/filters-sidebar.js';
import { init as initCartDrawer } from '../components/cart-drawer.js';
import { init as initMobileMenu } from '../components/mobile-menu.js';

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initFiltersSidebar();
  initCartDrawer();
  initMobileMenu();
});

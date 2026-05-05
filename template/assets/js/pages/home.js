/**
 * Home page — orquestra componentes da página inicial.
 */

import { init as initFaq } from '../components/faq-accordion.js';
import { init as initTabs } from '../components/tabs.js';
import { init as initCarousel } from '../components/carousel.js';
import { init as initCartDrawer } from '../components/cart-drawer.js';

document.addEventListener('DOMContentLoaded', () => {
  initFaq();
  initTabs();
  initCarousel();
  initCartDrawer();
});

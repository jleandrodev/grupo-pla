/**
 * Home page — orquestra componentes da página inicial.
 */

import { init as initFaq } from '../components/faq-accordion.js';
import { init as initTabs } from '../components/tabs.js';
import { init as initCarousel } from '../components/carousel.js';
import { init as initCartManager } from '../components/cart-manager.js';
import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initFaq();
  initTabs();
  initCarousel();
  initCartManager();
  initMobileMenu();
  initSearchModal();
});

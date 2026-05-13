import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';
import { init as initCartManager } from '../components/cart-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSearchModal();
  initCartManager();
});

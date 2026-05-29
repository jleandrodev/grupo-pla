import { init as initCarousel }    from '../components/carousel.js';
import { init as initCartManager }  from '../components/cart-manager.js';
import { init as initMobileMenu }   from '../components/mobile-drawer.js';
import { init as initSearchModal }  from '../components/search-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initCartManager();
  initMobileMenu();
  initSearchModal();
});

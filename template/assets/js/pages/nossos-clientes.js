import { init as initCartManager } from '../components/cart-manager.js';
import { init as initMobileMenu }  from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initCartManager();
  initMobileMenu();
  initSearchModal();
  initSegmentTabs();
});

function initSegmentTabs() {
  const tabs  = document.querySelectorAll('[data-segment-tab]');
  const items = document.querySelectorAll('[data-segment]');

  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.segmentTab;

      tabs.forEach(t => {
        t.classList.remove('segment-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('segment-tab--active');
      tab.setAttribute('aria-selected', 'true');

      items.forEach(li => {
        const match = target === 'todos' || li.dataset.segment === target;
        if (match) {
          li.removeAttribute('hidden');
        } else {
          li.setAttribute('hidden', '');
        }
      });
    });
  });
}

/**
 * Detalhe Peça — orquestra componentes da página de produto.
 */

import { init as initGallery } from '../components/product-gallery.js';
import { init as initQuantity } from '../components/quantity-input.js';
import { init as initCartDrawer } from '../components/cart-drawer.js';
import { init as initMobileMenu } from '../components/mobile-menu.js';

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initQuantity();
  initCartDrawer();
  initMobileMenu();
  initProductTabs();
});

/**
 * Product Tabs — abas específicas da página de produto.
 * Usa role="tablist", role="tab", role="tabpanel".
 */
function initProductTabs() {
  const tabNav = document.querySelector('[data-component="product-tabs"]');
  if (!tabNav) return;

  const tabs = tabNav.querySelectorAll('[role="tab"]');
  const panels = tabNav.querySelectorAll('[role="tabpanel"]');

  tabNav.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;

    const targetPanel = tab.getAttribute('aria-controls');

    tabs.forEach((t) => {
      const isActive = t === tab;
      t.classList.toggle('product-tabs__tab--active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      t.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isActive = panel.id === targetPanel;
      if (isActive) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  });

  // Navegação por teclado nas abas
  tabNav.addEventListener('keydown', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;

    const tabList = [...tabs];
    const index = tabList.indexOf(tab);
    let newIndex;

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabList.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabList.length) % tabList.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabList.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    tabList[newIndex].focus();
    tabList[newIndex].click();
  });
}

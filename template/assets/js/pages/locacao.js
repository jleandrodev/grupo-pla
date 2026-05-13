/**
 * Locação page — orchestrates view toggle and filter interactions.
 */

import { init as initViewToggle } from '../components/view-toggle.js';
import { init as initCartManager } from '../components/cart-manager.js';
import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initViewToggle();
  initCartManager();
  initMobileMenu();
  initSearchModal();
  initFilters();
  initMobileFilterDrawer();
});

/* ── Filters ── */

function initFilters() {
  const chips = document.querySelectorAll('[data-action="toggle-chip"]');
  const applyBtn = document.querySelector('[data-action="apply-filters"]');
  const clearBtn = document.querySelector('[data-action="clear-filters"]');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const pressed = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', String(!pressed));
      chip.classList.toggle('rental-filters__chip--active', !pressed);
    });
  });

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      // Progressive enhancement: in a real implementation,
      // this would filter the displayed cards.
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      // Reset checkboxes
      document.querySelectorAll('.rental-filters input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });

      // Reset chips
      chips.forEach(chip => {
        chip.setAttribute('aria-pressed', 'false');
        chip.classList.remove('rental-filters__chip--active');
      });

      // Reset toggle switch
      const toggle = document.querySelector('[data-action="toggle-available"]');
      if (toggle) toggle.checked = false;
    });
  }
}

/* ── Mobile filter drawer ── */

function initMobileFilterDrawer() {
  const openBtn = document.querySelector('[data-action="open-filters"]');
  const sidebar = document.querySelector('[data-component="rental-filters"]');
  const overlay = document.querySelector('[data-component="filter-overlay"]');

  if (!openBtn || !sidebar) return;

  openBtn.addEventListener('click', () => {
    sidebar.setAttribute('data-state', 'open');
    if (overlay) overlay.setAttribute('data-state', 'open');
    document.body.style.overflow = 'hidden';
  });

  const closeFilter = () => {
    sidebar.setAttribute('data-state', 'closed');
    if (overlay) overlay.setAttribute('data-state', 'closed');
    document.body.style.overflow = '';
  };

  if (overlay) {
    overlay.addEventListener('click', closeFilter);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.getAttribute('data-state') === 'open') {
      closeFilter();
    }
  });
}

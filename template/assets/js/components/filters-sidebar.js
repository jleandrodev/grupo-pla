/**
 * FiltersSidebar — controla abertura/fechamento da sidebar no mobile
 * e lógica de limpar/aplicar filtros.
 * Uso no HTML: data-component="filters-sidebar"
 */

const SELECTOR = '[data-component="filters-sidebar"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);

  // Mobile toggle
  root.querySelectorAll('[data-action="open-filters"]').forEach(btn => {
    btn.addEventListener('click', openFilters);
  });
}

function mount(sidebar) {
  const overlay = document.querySelector('[data-component="filters-overlay"]');
  const closeBtn = sidebar.querySelector('[data-action="close-filters"]');
  const clearBtn = sidebar.querySelector('[data-action="clear-filters"]');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeFilters(sidebar, overlay));
  }

  if (overlay) {
    overlay.addEventListener('click', () => closeFilters(sidebar, overlay));
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => clearAllFilters(sidebar));
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.dataset.state === 'open') {
      closeFilters(sidebar, overlay);
    }
  });
}

function openFilters() {
  const sidebar = document.querySelector(SELECTOR);
  const overlay = document.querySelector('[data-component="filters-overlay"]');

  if (sidebar) {
    sidebar.dataset.state = 'open';
    sidebar.focus();
  }
  if (overlay) {
    overlay.dataset.state = 'open';
  }
}

function closeFilters(sidebar, overlay) {
  if (sidebar) sidebar.dataset.state = 'closed';
  if (overlay) overlay.dataset.state = 'closed';

  // Return focus to toggle button
  const toggle = document.querySelector('[data-action="open-filters"]');
  if (toggle) toggle.focus();
}

function clearAllFilters(sidebar) {
  const checkboxes = sidebar.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => { cb.checked = false; });

  const inputs = sidebar.querySelectorAll('.filters-sidebar__price-input');
  inputs.forEach(input => { input.value = ''; });
}

export { init };

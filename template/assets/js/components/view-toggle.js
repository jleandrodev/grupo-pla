/**
 * ViewToggle — alterna entre visualização grid e lista.
 * Uso no HTML: data-component="view-toggle"
 * Botões: data-action="toggle-view" data-view="grid|list"
 * Container alvo: data-component="truck-list"
 *
 * Persiste preferência em localStorage (key: ecom_rental_view).
 */

const STORAGE_KEY = 'ecom_rental_view';
const DEFAULT_VIEW = 'grid';

function init(root = document) {
  const buttons = root.querySelectorAll('[data-action="toggle-view"]');
  const container = root.querySelector('[data-component="truck-list"]');

  if (!buttons.length || !container) return;

  // Restore saved preference
  const saved = getSavedView();
  setView(container, buttons, saved);

  // Bind click events
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      setView(container, buttons, view);
      saveView(view);
    });
  });
}

function setView(container, buttons, view) {
  container.setAttribute('data-view', view);

  buttons.forEach(btn => {
    const isActive = btn.dataset.view === view;
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function getSavedView() {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === 'list' ? 'list' : DEFAULT_VIEW;
  } catch {
    return DEFAULT_VIEW;
  }
}

function saveView(view) {
  try {
    localStorage.setItem(STORAGE_KEY, view);
  } catch {
    /* storage full — silent fail */
  }
}

export { init };

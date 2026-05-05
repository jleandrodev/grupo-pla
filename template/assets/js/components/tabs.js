/**
 * Tabs — alterna entre painéis de conteúdo.
 * Uso no HTML: data-component="tabs"
 * Triggers: data-action="tab-select" data-tab="[id]"
 * Painéis: data-tab-panel="[id]"
 */

const SELECTOR = '[data-component="tabs"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(tabContainer) {
  const triggers = tabContainer.querySelectorAll('[data-action="tab-select"]');
  const panels = tabContainer.querySelectorAll('[data-tab-panel]');

  tabContainer.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="tab-select"]');
    if (!trigger) return;

    const targetTab = trigger.dataset.tab;

    triggers.forEach((btn) => {
      const isActive = btn.dataset.tab === targetTab;
      btn.classList.toggle('tabs__btn--active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.tabPanel === targetTab;
      if (isActive) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  });
}

export { init };

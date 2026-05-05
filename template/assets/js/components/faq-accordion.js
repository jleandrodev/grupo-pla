/**
 * FAQ Accordion — abre/fecha itens de perguntas frequentes.
 * Uso no HTML: data-component="faq-accordion"
 * Itens: data-component="faq-item"
 * Trigger: data-action="faq-toggle"
 */

const SELECTOR = '[data-component="faq-accordion"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(accordion) {
  accordion.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="faq-toggle"]');
    if (!trigger) return;

    const item = trigger.closest('[data-component="faq-item"]');
    if (!item) return;

    const isOpen = item.getAttribute('data-state') === 'open';
    const content = item.querySelector('[data-role="faq-content"]');

    if (isOpen) {
      item.setAttribute('data-state', 'closed');
      trigger.setAttribute('aria-expanded', 'false');
      if (content) content.setAttribute('hidden', '');
    } else {
      item.setAttribute('data-state', 'open');
      trigger.setAttribute('aria-expanded', 'true');
      if (content) content.removeAttribute('hidden');
    }
  });
}

export { init };

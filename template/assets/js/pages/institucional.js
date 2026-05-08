/**
 * institucional.js — Navegação do menu lateral institucional + cart drawer.
 * Controla a troca de seções de conteúdo via sidebar menu.
 *
 * HTML requirements:
 *   - Sidebar links: data-action="switch-section" data-target="<section-id>"
 *   - Content sections: data-section="<key>" with matching id
 *   - Active class: sidebar-menu__item--active
 */

import { init as initCartDrawer } from '../components/cart-drawer.js';
import { init as initMobileMenu } from '../components/mobile-menu.js';

const MENU_SELECTOR = '[data-action="switch-section"]';
const CONTENT_SELECTOR = '[data-component="institutional-content"]';
const ACTIVE_CLASS = 'sidebar-menu__item--active';

/** Map of hash → section id */
const SECTION_MAP = {
  '#privacidade': 'section-privacidade',
  '#troca': 'section-troca',
  '#cookies': 'section-cookies',
  '#sobre': 'section-sobre',
};

/** Map of section id → page title */
const TITLE_MAP = {
  'section-privacidade': 'Políticas de Privacidade — Grupo PLA',
  'section-troca': 'Políticas de Troca e Devolução — Grupo PLA',
  'section-cookies': 'Políticas de Cookies — Grupo PLA',
  'section-sobre': 'Sobre Nós — Grupo PLA',
};

function init() {
  const contentArea = document.querySelector(CONTENT_SELECTOR);
  if (!contentArea) return;

  // Attach click handlers to sidebar menu items
  document.querySelectorAll(MENU_SELECTOR).forEach((link) => {
    link.addEventListener('click', handleMenuClick);
  });

  // Check URL hash on page load
  const hash = window.location.hash;
  if (hash && SECTION_MAP[hash]) {
    switchToSection(SECTION_MAP[hash]);
  }

  // Handle browser back/forward
  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash;
    if (currentHash && SECTION_MAP[currentHash]) {
      switchToSection(SECTION_MAP[currentHash]);
    }
  });
}

/**
 * Handle click on a sidebar menu item.
 * @param {Event} e
 */
function handleMenuClick(e) {
  e.preventDefault();

  const link = e.currentTarget;
  const targetId = link.dataset.target;

  if (!targetId) return;

  switchToSection(targetId);

  // Update URL hash without scrolling
  const hash = link.getAttribute('href');
  if (hash) {
    history.pushState(null, '', hash);
  }
}

/**
 * Switch visible section and update active menu item.
 * @param {string} targetId — id of the section element to show
 */
function switchToSection(targetId) {
  const contentArea = document.querySelector(CONTENT_SELECTOR);
  if (!contentArea) return;

  const targetSection = document.getElementById(targetId);
  if (!targetSection) return;

  // Hide all sections
  contentArea.querySelectorAll('[data-section]').forEach((section) => {
    section.setAttribute('hidden', '');
  });

  // Show target section
  targetSection.removeAttribute('hidden');

  // Update active class on menu items
  document.querySelectorAll(MENU_SELECTOR).forEach((link) => {
    if (link.dataset.target === targetId) {
      link.classList.add(ACTIVE_CLASS);
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove(ACTIVE_CLASS);
      link.removeAttribute('aria-current');
    }
  });

  // Update page title
  if (TITLE_MAP[targetId]) {
    document.title = TITLE_MAP[targetId];
  }

  // Scroll to top of content area on mobile
  if (window.innerWidth < 768) {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  initCartDrawer();
  initMobileMenu();
});

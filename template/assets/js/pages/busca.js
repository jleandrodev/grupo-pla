/**
 * busca.js — Página de resultados de busca
 *
 * Responsabilidades:
 * 1. Lê ?q= da URL e preenche os elementos [data-role="search-term-*"]
 * 2. Sincroniza o termo com o campo de busca do header
 * 3. Filtra os cards pelo texto do título quando o termo é informado
 * 4. Exibe estado vazio quando não há resultados
 * 5. Inicializa filters-sidebar e encaminha busca do header para busca.html
 */

import { init as initFiltersSidebar } from '../components/filters-sidebar.js';
import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';
import { init as initCartManager } from '../components/cart-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  initFiltersSidebar();
  initMobileMenu();
  initSearchModal();
  initCartManager();
  initSearch();
  initHeaderSearch();
});

/* ── Leitura do query param ── */

function getSearchTerm() {
  const params = new URLSearchParams(window.location.search);
  return (params.get('q') || '').trim();
}

/* ── Preenche os elementos de termo de busca na página ── */

function fillSearchTerms(term) {
  const displayTerm = term || '';

  // Atualiza <title>
  if (displayTerm) {
    document.title = `Resultados para "${displayTerm}" — Grupo PLA`;
  }

  // Atualiza todos os spans que exibem o termo
  const roles = ['search-term-heading', 'search-term-breadcrumb', 'search-term-empty'];
  roles.forEach(role => {
    document.querySelectorAll(`[data-role="${role}"]`).forEach(el => {
      el.textContent = displayTerm;
    });
  });

  // Preenche campo de busca do header com o termo atual
  const headerInput = document.querySelector('#header-search-input');
  if (headerInput && displayTerm) {
    headerInput.value = displayTerm;
  }
}

/* ── Filtra os cards de produto pelo termo de busca ── */

function filterResultsByTerm(term) {
  const normalizedTerm = normalize(term);
  const grid = document.querySelector('[data-role="search-results"]');
  if (!grid) return;

  const cards = grid.querySelectorAll('[data-product-name]');
  let visibleCount = 0;

  cards.forEach(card => {
    const name = normalize(card.dataset.productName || '');
    const titleEl = card.querySelector('.product-card__title-link');
    const titleText = normalize(titleEl ? titleEl.textContent : '');
    const categoryEl = card.querySelector('.product-card__category');
    const categoryText = normalize(categoryEl ? categoryEl.textContent : '');

    const matches = !normalizedTerm ||
      name.includes(normalizedTerm) ||
      titleText.includes(normalizedTerm) ||
      categoryText.includes(normalizedTerm);

    card.hidden = !matches;
    if (matches) visibleCount++;
  });

  return visibleCount;
}

/* ── Atualiza contagem de resultados visíveis ── */

function updateResultsCount(count) {
  const countEl = document.querySelector('[data-role="results-count"]');
  if (countEl) countEl.textContent = count;
}

/* ── Exibe ou oculta o estado vazio ── */

function toggleEmptyState(count) {
  const emptyEl = document.querySelector('[data-search-empty]');
  const catalogLayout = document.querySelector('.catalog-layout');
  const pagination = document.querySelector('.pagination');

  if (!emptyEl) return;

  if (count === 0) {
    emptyEl.removeAttribute('hidden');
    if (catalogLayout) catalogLayout.hidden = true;
    if (pagination) pagination.hidden = true;
  } else {
    emptyEl.setAttribute('hidden', '');
    if (catalogLayout) catalogLayout.removeAttribute('hidden');
    if (pagination) pagination.removeAttribute('hidden');
  }
}

/* ── Inicializa a lógica de busca ── */

function initSearch() {
  const term = getSearchTerm();

  fillSearchTerms(term);

  const count = filterResultsByTerm(term);
  updateResultsCount(count);
  toggleEmptyState(count);
}

/* ── Redireciona o formulário de busca do header para busca.html ── */

function initHeaderSearch() {
  const form = document.querySelector('.main-header__search');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[name="q"]');
    const q = input ? input.value.trim() : '';
    if (q) {
      window.location.href = './busca.html?q=' + encodeURIComponent(q);
    }
  });
}

/* ── Utilitário: normaliza texto para comparação case/accent-insensitive ── */

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

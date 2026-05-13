/**
 * minha-conta.js — Lógica da área do cliente (todas as páginas de conta)
 *
 * Detecta contexto pelo DOM (seletores presentes na página) e inicializa
 * apenas os módulos relevantes. JS é progressive enhancement: todo conteúdo
 * já existe no HTML estático.
 *
 * Módulos:
 * - Cart drawer
 * - Sidebar accordion (mobile)
 * - Toggle tipo pessoa (física/jurídica) — perfil
 * - Máscara de CPF/CNPJ — perfil
 * - Máscara de telefone — formulários
 * - Toggle formulário de endereço — endereços
 * - Busca de CEP — endereços
 * - Filtros de pedidos — pedidos
 */

import { init as initCartManager } from '../components/cart-manager.js';
import { init as initMobileMenu } from '../components/mobile-drawer.js';
import { init as initSearchModal } from '../components/search-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initCartManager();
  initMobileMenu();
  initSearchModal();
  initSidebarAccordion();

  if (document.querySelector('[data-person-type-toggle]')) {
    initPersonTypeToggle();
  }

  if (document.querySelector('[data-mask="cpf"], [data-mask="cnpj"], [data-mask="cpf-cnpj"]')) {
    initDocumentMask();
  }

  if (document.querySelector('[data-mask="phone"]')) {
    initPhoneMask();
  }

  if (document.querySelector('[data-address-form]')) {
    initAddressFormToggle();
  }

  if (document.querySelector('[data-cep-input]')) {
    initCepLookup();
  }

  if (document.querySelector('[data-orders-filter]')) {
    initOrdersFilter();
  }
});

/* ──────────────────────────────────────────────
   SIDEBAR ACCORDION (mobile)
   ────────────────────────────────────────────── */

function initSidebarAccordion() {
  const toggle = document.querySelector('[data-action="toggle-account-nav"]');
  const nav = document.querySelector('[data-account-nav]');

  if (!toggle || !nav) return;

  // No desktop (>= 1024px) o nav fica sempre visível.
  // No mobile, começa oculto com hidden.
  const mq = window.matchMedia('(min-width: 1024px)');

  function syncVisibility(matches) {
    if (matches) {
      nav.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      // Só esconde se não estiver expandido pelo usuário
      if (toggle.getAttribute('aria-expanded') !== 'true') {
        nav.setAttribute('hidden', '');
      }
    }
  }

  mq.addEventListener('change', (e) => syncVisibility(e.matches));
  syncVisibility(mq.matches);

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));

    if (isExpanded) {
      nav.setAttribute('hidden', '');
    } else {
      nav.removeAttribute('hidden');
    }
  });
}

/* ──────────────────────────────────────────────
   TOGGLE TIPO PESSOA (Física / Jurídica)
   ────────────────────────────────────────────── */

function initPersonTypeToggle() {
  const buttons = document.querySelectorAll('[data-person-type-toggle]');
  const cpfField = document.querySelector('[data-field="cpf"]');
  const cnpjField = document.querySelector('[data-field="cnpj"]');
  const docInput = document.querySelector('[data-mask="cpf-cnpj"]');
  const docLabel = document.querySelector('[data-doc-label]');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.personTypeToggle;

      // Atualiza estado visual dos botões
      buttons.forEach(b => {
        b.classList.toggle('person-type-toggle__btn--active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      // Alterna campos visíveis e atributos do input de documento
      if (type === 'pf') {
        cpfField?.removeAttribute('hidden');
        cnpjField?.setAttribute('hidden', '');
        if (docInput) {
          docInput.setAttribute('data-mask', 'cpf');
          docInput.setAttribute('maxlength', '14');
          docInput.setAttribute('placeholder', '000.000.000-00');
          docInput.value = '';
        }
        if (docLabel) docLabel.textContent = 'CPF';
      } else {
        cpfField?.setAttribute('hidden', '');
        cnpjField?.removeAttribute('hidden');
        if (docInput) {
          docInput.setAttribute('data-mask', 'cnpj');
          docInput.setAttribute('maxlength', '18');
          docInput.setAttribute('placeholder', '00.000.000/0000-00');
          docInput.value = '';
        }
        if (docLabel) docLabel.textContent = 'CNPJ';
      }
    });
  });
}

/* ──────────────────────────────────────────────
   MÁSCARA DE CPF / CNPJ
   ────────────────────────────────────────────── */

function initDocumentMask() {
  // Seleciona todos os inputs de documento (CPF, CNPJ ou CPF/CNPJ)
  const inputs = document.querySelectorAll('[data-mask="cpf"], [data-mask="cnpj"], [data-mask="cpf-cnpj"]');

  inputs.forEach(input => {
    input.addEventListener('input', (e) => {
      applyDocumentMask(e.target);
    });
  });
}

function applyDocumentMask(input) {
  const type = input.getAttribute('data-mask');
  let value = input.value.replace(/\D/g, '');

  if (type === 'cpf-cnpj') {
    // Decide tipo pelo tamanho
    if (value.length <= 11) {
      value = maskCpf(value);
    } else {
      value = maskCnpj(value.slice(0, 14));
    }
  } else if (type === 'cpf') {
    value = maskCpf(value.slice(0, 11));
  } else if (type === 'cnpj') {
    value = maskCnpj(value.slice(0, 14));
  }

  input.value = value;
}

function maskCpf(digits) {
  // 000.000.000-00
  digits = digits.slice(0, 11);
  if (digits.length > 9) return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6,9)}-${digits.slice(9)}`;
  if (digits.length > 6) return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6)}`;
  if (digits.length > 3) return `${digits.slice(0,3)}.${digits.slice(3)}`;
  return digits;
}

function maskCnpj(digits) {
  // 00.000.000/0000-00
  digits = digits.slice(0, 14);
  if (digits.length > 12) return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8,12)}-${digits.slice(12)}`;
  if (digits.length > 8) return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8)}`;
  if (digits.length > 5) return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5)}`;
  if (digits.length > 2) return `${digits.slice(0,2)}.${digits.slice(2)}`;
  return digits;
}

/* ──────────────────────────────────────────────
   MÁSCARA DE TELEFONE
   ────────────────────────────────────────────── */

function initPhoneMask() {
  const inputs = document.querySelectorAll('[data-mask="phone"]');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, '').slice(0, 11);

      if (value.length > 10) {
        // Celular: (00) 00000-0000
        value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
      } else if (value.length > 6) {
        // Fixo: (00) 0000-0000
        value = `(${value.slice(0,2)}) ${value.slice(2,6)}-${value.slice(6)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0,2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      input.value = value;
    });
  });
}

/* ──────────────────────────────────────────────
   TOGGLE FORMULÁRIO DE ENDEREÇO
   ────────────────────────────────────────────── */

function initAddressFormToggle() {
  const formWrapper = document.querySelector('[data-address-form]');
  const openBtn = document.querySelector('[data-action="open-address-form"]');
  const closeBtn = document.querySelector('[data-action="close-address-form"]');
  const cancelBtn = document.querySelector('[data-action="cancel-address-form"]');

  if (!formWrapper || !openBtn) return;

  openBtn.addEventListener('click', () => {
    formWrapper.removeAttribute('hidden');
    openBtn.setAttribute('hidden', '');
    // Foco no primeiro campo do formulário
    const firstInput = formWrapper.querySelector('input, select, textarea');
    firstInput?.focus();
  });

  [closeBtn, cancelBtn].forEach(btn => {
    btn?.addEventListener('click', () => {
      formWrapper.setAttribute('hidden', '');
      openBtn.removeAttribute('hidden');
      openBtn.focus();
    });
  });
}

/* ──────────────────────────────────────────────
   BUSCA DE CEP
   ────────────────────────────────────────────── */

function initCepLookup() {
  const cepBtn = document.querySelector('[data-action="lookup-cep"]');
  const cepInput = document.querySelector('[data-cep-input]');

  if (!cepBtn || !cepInput) return;

  // Máscara de CEP: 00000-000
  cepInput.addEventListener('input', () => {
    let value = cepInput.value.replace(/\D/g, '').slice(0, 8);
    if (value.length > 5) value = `${value.slice(0,5)}-${value.slice(5)}`;
    cepInput.value = value;
  });

  cepInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchCep(cepInput.value);
    }
  });

  cepBtn.addEventListener('click', () => {
    fetchCep(cepInput.value);
  });
}

async function fetchCep(cep) {
  const digits = cep.replace(/\D/g, '');
  if (digits.length !== 8) return;

  const btn = document.querySelector('[data-action="lookup-cep"]');
  if (btn) {
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (!res.ok) throw new Error('CEP não encontrado');
    const data = await res.json();

    if (data.erro) throw new Error('CEP não encontrado');

    fillAddressFields(data);
  } catch {
    // Falha silenciosa — usuário preenche manualmente
    const statusEl = document.getElementById('page-status');
    if (statusEl) statusEl.textContent = 'CEP não encontrado. Preencha o endereço manualmente.';
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute('aria-busy');
    }
  }
}

function fillAddressFields(data) {
  const map = {
    '[data-address-field="street"]': data.logradouro,
    '[data-address-field="neighborhood"]': data.bairro,
    '[data-address-field="city"]': data.localidade,
    '[data-address-field="state"]': data.uf,
  };

  Object.entries(map).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (el && value) {
      el.value = value;
    }
  });

  // Foco no campo número após preencher
  document.querySelector('[data-address-field="number"]')?.focus();
}

/* ──────────────────────────────────────────────
   FILTROS DE PEDIDOS
   ────────────────────────────────────────────── */

function initOrdersFilter() {
  const filterBtns = document.querySelectorAll('[data-orders-filter]');
  const orderItems = document.querySelectorAll('[data-order-status]');
  const periodSelect = document.querySelector('[data-orders-period]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.ordersFilter;

      // Atualiza estado visual dos botões
      filterBtns.forEach(b => {
        b.classList.toggle('orders-filter-btn--active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      // Filtra os itens no DOM
      filterOrders(filter, periodSelect?.value || 'all');
    });
  });

  periodSelect?.addEventListener('change', () => {
    const activeBtn = document.querySelector('[data-orders-filter].orders-filter-btn--active');
    const activeFilter = activeBtn?.dataset.ordersFilter || 'all';
    filterOrders(activeFilter, periodSelect.value);
  });
}

function filterOrders(statusFilter, periodFilter = 'all') {
  const orderItems = document.querySelectorAll('[data-order-status]');
  const now = new Date();
  let visibleCount = 0;

  orderItems.forEach(item => {
    const status = item.dataset.orderStatus;
    const dateStr = item.dataset.orderDate;

    let matchesStatus = statusFilter === 'all' || status === statusFilter;
    let matchesPeriod = true;

    if (periodFilter !== 'all' && dateStr) {
      const orderDate = new Date(dateStr);
      const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

      if (periodFilter === '30' && diffDays > 30) matchesPeriod = false;
      if (periodFilter === '90' && diffDays > 90) matchesPeriod = false;
      if (periodFilter === '180' && diffDays > 180) matchesPeriod = false;
      if (periodFilter === '365' && diffDays > 365) matchesPeriod = false;
    }

    const visible = matchesStatus && matchesPeriod;
    item.hidden = !visible;
    if (visible) visibleCount++;
  });

  // Atualiza estado vazio
  const emptyState = document.querySelector('[data-orders-empty]');
  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }

  // Anuncia resultado para leitores de tela
  const statusEl = document.getElementById('page-status');
  if (statusEl) {
    statusEl.textContent = visibleCount === 0
      ? 'Nenhum pedido encontrado para os filtros selecionados.'
      : `${visibleCount} pedido${visibleCount > 1 ? 's' : ''} encontrado${visibleCount > 1 ? 's' : ''}.`;
  }
}

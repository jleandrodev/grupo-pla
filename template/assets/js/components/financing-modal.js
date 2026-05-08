/**
 * FinancingModal — modal de simulação de financiamento.
 * Uso no HTML: data-component="financing-modal"
 * Abre via: data-action="open-financing-modal"
 */

import { getWhatsAppUrl } from '../core/whatsapp.js';

const MONTHLY_RATE = 0.0149; // 1,49% a.m.

let modalEl = null;
let triggerEl = null;
let focusableEls = [];
let firstFocusable = null;
let lastFocusable = null;

function init() {
  modalEl = document.querySelector('[data-component="financing-modal"]');
  if (!modalEl) return;

  // Botão de abrir
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-action="open-financing-modal"]');
    if (openBtn) {
      triggerEl = openBtn;
      open();
    }
  });

  // Botão de fechar
  modalEl.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-action="close-financing-modal"]');
    if (closeBtn) {
      close();
      return;
    }

    // Click no overlay (fora do card)
    if (e.target === modalEl) {
      close();
    }
  });

  // Escape para fechar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      close();
    }
  });

  // Parcelas: toggle de seleção
  const installmentBtns = modalEl.querySelectorAll('[data-installments]');
  installmentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      installmentBtns.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('financing-modal__installment-btn--active', isActive);
        b.setAttribute('aria-checked', isActive ? 'true' : 'false');
      });
      recalculate();
    });
  });

  // Inputs: recalcular ao alterar
  const vehicleInput = modalEl.querySelector('[data-role="vehicle-value"]');
  const downPaymentInput = modalEl.querySelector('[data-role="down-payment"]');

  if (vehicleInput) {
    vehicleInput.addEventListener('input', () => {
      formatCurrencyInput(vehicleInput);
      recalculate();
    });
  }

  if (downPaymentInput) {
    downPaymentInput.addEventListener('input', () => {
      formatCurrencyInput(downPaymentInput);
      recalculate();
    });
  }

  // Solicitar Financiamento
  const submitBtn = modalEl.querySelector('[data-action="request-financing"]');
  if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmit);
  }
}

function isOpen() {
  return modalEl && modalEl.getAttribute('data-state') === 'open';
}

function open() {
  if (!modalEl) return;

  modalEl.setAttribute('data-state', 'open');
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Atualizar focusable elements
  updateFocusableElements();

  // Mover foco para o modal
  if (firstFocusable) {
    firstFocusable.focus();
  }

  // Trap de foco
  modalEl.addEventListener('keydown', trapFocus);
}

function close() {
  if (!modalEl) return;

  modalEl.setAttribute('data-state', 'closed');
  modalEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Devolver foco ao botão que abriu
  if (triggerEl) {
    triggerEl.focus();
    triggerEl = null;
  }

  modalEl.removeEventListener('keydown', trapFocus);
}

function updateFocusableElements() {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  focusableEls = [...modalEl.querySelectorAll(selectors)];
  firstFocusable = focusableEls[0];
  lastFocusable = focusableEls[focusableEls.length - 1];
}

function trapFocus(e) {
  if (e.key !== 'Tab') return;

  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    }
  } else {
    if (document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
}

function parseCurrency(str) {
  if (!str) return 0;
  // Remove tudo exceto dígitos e vírgula
  const cleaned = str.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function formatCurrencyInput(input) {
  const cursorPos = input.selectionStart;
  const oldLen = input.value.length;

  const raw = parseCurrency(input.value);
  if (raw > 0) {
    input.value = formatBRL(raw);
  }

  // Tentar restaurar posição do cursor
  const newLen = input.value.length;
  const diff = newLen - oldLen;
  input.setSelectionRange(cursorPos + diff, cursorPos + diff);
}

function getSelectedInstallments() {
  const activeBtn = modalEl.querySelector('.financing-modal__installment-btn--active');
  return activeBtn ? parseInt(activeBtn.dataset.installments, 10) : 60;
}

function calculateInstallment(principal, n) {
  // PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
  const r = MONTHLY_RATE;
  const factor = Math.pow(1 + r, n);
  return principal * (r * factor) / (factor - 1);
}

function recalculate() {
  const vehicleInput = modalEl.querySelector('[data-role="vehicle-value"]');
  const downPaymentInput = modalEl.querySelector('[data-role="down-payment"]');
  const resultValue = modalEl.querySelector('[data-role="result-value"]');
  const resultDetail = modalEl.querySelector('[data-role="result-detail"]');

  if (!vehicleInput || !downPaymentInput || !resultValue) return;

  const vehicleValue = parseCurrency(vehicleInput.value);
  const downPayment = parseCurrency(downPaymentInput.value);

  // Validação
  const errorEl = modalEl.querySelector('[data-role="down-payment-error"]');
  if (downPayment > vehicleValue) {
    if (errorEl) {
      errorEl.textContent = 'Entrada não pode ser maior que o valor do veículo.';
      errorEl.removeAttribute('hidden');
    }
    downPaymentInput.setAttribute('aria-invalid', 'true');
    return;
  } else if (downPayment < vehicleValue * 0.2 && downPayment > 0) {
    if (errorEl) {
      errorEl.textContent = 'Entrada mínima recomendada: 20% do valor.';
      errorEl.removeAttribute('hidden');
    }
    downPaymentInput.removeAttribute('aria-invalid');
  } else {
    if (errorEl) {
      errorEl.setAttribute('hidden', '');
    }
    downPaymentInput.removeAttribute('aria-invalid');
  }

  const financedAmount = Math.max(vehicleValue - downPayment, 0);
  const n = getSelectedInstallments();
  const installmentValue = financedAmount > 0 ? calculateInstallment(financedAmount, n) : 0;

  resultValue.textContent = formatBRL(financedAmount);

  if (resultDetail) {
    resultDetail.textContent = `em ${n}x de ${formatBRL(installmentValue)}+`;
  }
}

function handleSubmit() {
  const vehicleInput = modalEl.querySelector('[data-role="vehicle-value"]');
  const downPaymentInput = modalEl.querySelector('[data-role="down-payment"]');
  const resultValue = modalEl.querySelector('[data-role="result-value"]');
  const productName = modalEl.querySelector('.financing-modal__product-name')?.textContent?.trim() || 'Maquinário';

  const vehicleValue = vehicleInput ? vehicleInput.value : '';
  const downPayment = downPaymentInput ? downPaymentInput.value : '';
  const financed = resultValue ? resultValue.textContent : '';
  const n = getSelectedInstallments();

  const message =
    `Olá! Gostaria de solicitar financiamento:\n\n` +
    `Produto: ${productName}\n` +
    `Valor do veículo: ${vehicleValue}\n` +
    `Entrada: ${downPayment}\n` +
    `Valor financiado: ${financed}\n` +
    `Parcelas: ${n}x`;

  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export { init };

/**
 * Detalhe Filtro com Modelo — orquestra componentes da página de produto com verificação de compatibilidade.
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
  initCompatibilityWidget();
});

/**
 * Product Tabs — abas específicas da página de produto.
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

/**
 * Compatibility Widget — cascata de selects Marca > Modelo > Ano.
 */
function initCompatibilityWidget() {
  const widget = document.querySelector('[data-component="compatibility-widget"]');
  if (!widget) return;

  const marcaSelect = widget.querySelector('[data-role="compat-marca"]');
  const modeloSelect = widget.querySelector('[data-role="compat-modelo"]');
  const anoSelect = widget.querySelector('[data-role="compat-ano"]');
  const verifyBtn = widget.querySelector('[data-action="verify-compatibility"]');
  const resultEl = widget.querySelector('[data-role="compat-result"]');

  // Dados de exemplo para a cascata
  const data = {
    'John Deere': {
      '5075E': ['2020', '2021', '2022', '2023', '2024'],
      '5090E': ['2019', '2020', '2021', '2022'],
      '5E 105cv': ['2022', '2023', '2024'],
      '6110J': ['2020', '2021', '2022']
    },
    'Massey Ferguson': {
      'MF 4292': ['2020', '2021', '2022'],
      'MF 7270': ['2019', '2020', '2021'],
      'MF 283': ['2018', '2019', '2020']
    },
    'New Holland': {
      'TL 75E': ['2021', '2022', '2023'],
      'T7.205': ['2022', '2023', '2024'],
      'TM 7010': ['2019', '2020', '2021']
    },
    'Valtra': {
      'BM 125i': ['2019', '2020', '2021'],
      'A750': ['2021', '2022', '2023'],
      'BH 180': ['2020', '2021', '2022']
    }
  };

  if (marcaSelect) {
    marcaSelect.addEventListener('change', () => {
      const marca = marcaSelect.value;

      // Reset modelo e ano
      resetSelect(modeloSelect, 'Selecione o modelo');
      resetSelect(anoSelect, 'Selecione o ano');

      if (marca && data[marca]) {
        const modelos = Object.keys(data[marca]);
        modelos.forEach((m) => {
          const opt = document.createElement('option');
          opt.value = m;
          opt.textContent = m;
          modeloSelect.appendChild(opt);
        });
        modeloSelect.disabled = false;
        modeloSelect.removeAttribute('aria-disabled');
      }

      hideResult(resultEl);
    });
  }

  if (modeloSelect) {
    modeloSelect.addEventListener('change', () => {
      const marca = marcaSelect.value;
      const modelo = modeloSelect.value;

      resetSelect(anoSelect, 'Selecione o ano');

      if (marca && modelo && data[marca] && data[marca][modelo]) {
        const anos = data[marca][modelo];
        anos.forEach((a) => {
          const opt = document.createElement('option');
          opt.value = a;
          opt.textContent = a;
          anoSelect.appendChild(opt);
        });
        anoSelect.disabled = false;
        anoSelect.removeAttribute('aria-disabled');
      }

      hideResult(resultEl);
    });
  }

  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      if (!marcaSelect.value || !modeloSelect.value || !anoSelect.value) {
        showResult(resultEl, 'error', 'Por favor, preencha todos os campos para verificar a compatibilidade.');
        return;
      }

      // Simulação de resultado — compatível para John Deere
      if (marcaSelect.value === 'John Deere') {
        showResult(resultEl, 'success', 'Esta peça é compatível com o veículo selecionado.');
      } else {
        showResult(resultEl, 'error', 'Esta peça não é compatível com o veículo selecionado. Consulte peças compatíveis em nosso catálogo.');
      }
    });
  }

  // Inline widget sync
  const inlineSelect = document.querySelector('[data-role="compat-inline-modelo"]');
  if (inlineSelect && marcaSelect) {
    inlineSelect.addEventListener('change', () => {
      // Sincronizar com o widget principal é opcional
    });
  }
}

function resetSelect(selectEl, placeholder) {
  if (!selectEl) return;
  selectEl.innerHTML = `<option value="">${placeholder}</option>`;
  selectEl.disabled = true;
  selectEl.setAttribute('aria-disabled', 'true');
}

function showResult(el, type, message) {
  if (!el) return;
  el.textContent = message;
  el.className = 'compatibility-widget__result';
  el.classList.add(`compatibility-widget__result--${type}`);
  el.setAttribute('data-state', 'visible');
}

function hideResult(el) {
  if (!el) return;
  el.removeAttribute('data-state');
}

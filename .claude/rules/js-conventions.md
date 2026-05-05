# Convenções de JavaScript

## Princípio Fundamental: HTML Estático Primeiro

> **Todo conteúdo visível deve existir no HTML estático.** JavaScript NUNCA renderiza, cria ou injeta conteúdo que deveria ser indexável por motores de busca. JS é exclusivamente para **progressive enhancement** — adicionar interatividade a elementos que já existem no DOM.

### O que JS pode fazer
- Alternar classes CSS (`classList.add/remove/toggle`)
- Mostrar/ocultar conteúdo que já existe no HTML (`hidden`, `aria-expanded`)
- Adicionar event listeners para interatividade
- Gerenciar estado de UI (carrinho, modais, tabs, accordions)
- Fazer chamadas de API para dados dinâmicos (carrinho, busca)
- Atualizar contadores e textos de status via `aria-live`

### O que JS NUNCA deve fazer
- Renderizar cards de produto, listas ou qualquer conteúdo indexável
- Criar elementos HTML via `createElement`/`innerHTML` para conteúdo principal
- Ser a única fonte de conteúdo visível ao usuário
- Substituir HTML semântico por templates renderizados no client-side

### Por quê
- Motores de busca (Googlebot, Bingbot) podem não executar JS ou executar com atraso
- Conteúdo renderizado via JS não aparece no source da página (Ctrl+U)
- Performance: HTML estático renderiza imediatamente, JS depende de download + parse + execução
- Acessibilidade: leitores de tela funcionam melhor com DOM estático

## Stack

- **Vanilla JS ES2020+** — sem frameworks, sem bundlers
- **ES Modules** nativos (`type="module"`)
- **Nenhuma dependência externa** no runtime (máximo: polyfills pontuais)
- **Progressive enhancement** — o site deve funcionar sem JS; JS apenas melhora a experiência

---

## Estrutura de Módulos

```
assets/js/
├── core/
│   ├── dom.js          ← helpers de manipulação de DOM
│   ├── events.js       ← pub/sub ou event bus simples
│   ├── api.js          ← fetch wrapper
│   ├── storage.js      ← localStorage/sessionStorage wrapper
│   └── utils.js        ← formatadores (moeda, data, CPF...)
├── components/
│   ├── cart-drawer.js  ← mini carrinho lateral
│   ├── product-gallery.js
│   ├── quantity-input.js
│   ├── toast.js        ← notificações
│   ├── modal.js
│   └── header-search.js
└── pages/
    ├── home.js
    ├── catalog.js
    ├── product.js
    ├── cart.js
    └── checkout.js
```

---

## Padrão de Módulo de Componente

Cada componente exporta uma função `init` e funções públicas necessárias.

```js
// components/quantity-input.js

/**
 * QuantityInput — controla inputs de quantidade de produto.
 * Uso no HTML: data-component="quantity-input"
 * Dispara evento customizado "quantity:change" no elemento.
 */

const SELECTOR = '[data-component="quantity-input"]';

function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(mount);
}

function mount(el) {
  const input   = el.querySelector('[data-role="qty-value"]');
  const btnMinus = el.querySelector('[data-action="qty-decrease"]');
  const btnPlus  = el.querySelector('[data-action="qty-increase"]');

  if (!input || !btnMinus || !btnPlus) return;

  btnMinus.addEventListener('click', () => adjust(input, -1));
  btnPlus.addEventListener('click',  () => adjust(input, +1));
  input.addEventListener('change', () => validate(input));
}

function adjust(input, delta) {
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 999;
  const next = Math.min(Math.max((parseInt(input.value) || 1) + delta, min), max);

  input.value = next;
  input.dispatchEvent(new CustomEvent('quantity:change', {
    bubbles: true,
    detail: { value: next }
  }));
}

function validate(input) {
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 999;
  const val = parseInt(input.value);

  if (isNaN(val) || val < min) input.value = min;
  if (val > max) input.value = max;
}

export { init };
```

---

## Padrão de Módulo de Página

A página orquestra os componentes — nunca contém lógica de UI própria.

```js
// pages/product.js
import { init as initGallery }   from '../components/product-gallery.js';
import { init as initQtyInput }  from '../components/quantity-input.js';
import { init as initToast }     from '../components/toast.js';
import { addToCart }             from '../core/api.js';

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initQtyInput();
  initToast();

  document.addEventListener('click', handleAddToCart);
});

async function handleAddToCart(e) {
  const btn = e.target.closest('[data-action="add-to-cart"]');
  if (!btn) return;

  const productId = btn.dataset.productId;
  const qty = document.querySelector('[data-role="qty-value"]')?.value ?? 1;

  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');

  try {
    await addToCart({ productId, quantity: parseInt(qty) });
    document.dispatchEvent(new CustomEvent('cart:updated'));
  } catch (err) {
    console.error('[add-to-cart]', err);
  } finally {
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
  }
}
```

---

## Helpers de Core

### `core/dom.js`
```js
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

export function show(el) { el?.removeAttribute('hidden'); }
export function hide(el) { el?.setAttribute('hidden', ''); }
export function toggle(el) {
  el?.hasAttribute('hidden') ? show(el) : hide(el);
}
```

### `core/utils.js`
```js
export function formatCurrency(value, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, limit = 200) {
  let inThrottle;
  return (...args) => {
    if (inThrottle) return;
    fn(...args);
    inThrottle = true;
    setTimeout(() => { inThrottle = false; }, limit);
  };
}
```

### `core/storage.js`
```js
const PREFIX = 'ecom_';

export function getItem(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch { /* quota exceeded — falha silenciosa */ }
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key);
}
```

---

## Regras

| Regra | Motivo |
|---|---|
| **Todo conteúdo no HTML estático** | SEO — crawlers não dependem de JS |
| **JS = progressive enhancement apenas** | Site funciona sem JS; JS melhora a UX |
| Nenhum `var` — apenas `const`/`let` | Evita hoisting bugs e reatribuição acidental |
| Nenhum `innerHTML` para conteúdo principal | Previne XSS e garante indexabilidade |
| Nenhum event listener inline no HTML | Separa concerns — JS em JS, HTML em HTML |
| Nenhum `style.property = value` direto | Classes controlam visual; JS controla estado |
| Sem `alert`, `confirm`, `prompt` | UX ruim — usar componentes de modal/toast |
| Sempre tratar erros de `fetch` | Rede falha; UX degrada gracefully |
| Eventos customizados com namespace | `cart:updated`, `quantity:change` — evita colisões |

---

## Eventos Customizados Globais

| Evento | Disparado por | Ouvido por |
|---|---|---|
| `cart:updated` | Qualquer ação no carrinho | Header (contagem), CartDrawer |
| `cart:item-added` | `addToCart()` | Toast de confirmação |
| `modal:open` | Botões com `data-modal-target` | Modal component |
| `modal:close` | Botão fechar, overlay, Escape | Modal component |
| `search:submit` | Form de busca | Catalog page |

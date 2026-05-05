# Arquitetura do Template

## Princípio Central

> **One template, many skins.** A estrutura nunca muda. Apenas o `tokens.css` e os assets do cliente mudam.

---

## Estrutura de Pastas

### `template/assets/css/`

| Arquivo/Pasta | Responsabilidade | Editar por cliente? |
|---|---|---|
| `tokens.css` | Variáveis CSS (cores, fontes, espaçamento, border-radius) | **SIM** |
| `base.css` | Reset CSS, estilos de elementos HTML, tipografia base | Não |
| `layout.css` | Grid system, containers, regiões de página | Não |
| `components/` | Estilos de UI reutilizáveis (botão, card, modal, etc.) | Não |
| `pages/` | Estilos específicos de cada página | Não |

**Ordem de importação obrigatória no `<head>`:**
```html
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/layout.css">
<link rel="stylesheet" href="/assets/css/components/[componente].css">
<link rel="stylesheet" href="/assets/css/pages/[pagina].css">
```

### `template/assets/js/`

| Pasta | Responsabilidade |
|---|---|
| `core/` | Utilitários puros, helpers sem efeito colateral |
| `components/` | Comportamento de componentes de UI |
| `pages/` | Orquestração de lógica por página |

**Regra de dependência:** `pages/` pode importar `components/` e `core/`. `components/` pode importar `core/`. `core/` não importa nada interno.

### `template/assets/images/`

| Pasta | Conteúdo |
|---|---|
| `logo/` | `logo.png` (principal), `logo-white.svg` (versão clara), `favicon.svg` |
| `icons/` | Ícones SVG do sistema — nunca PNG |
| `placeholders/` | Imagens de fallback para produto sem foto |

---

## Nomenclatura de Arquivos

- **CSS/JS:** `kebab-case` → `product-card.css`, `cart-manager.js`
- **Imagens:** `kebab-case` com descritor → `product-placeholder-square.svg`
- **HTML pages:** `kebab-case` → `product-detail.html`
- **Variáveis CSS:** prefixo `--ecom-` → `--ecom-color-primary`
- **Classes CSS:** metodologia BEM → `product-card__price--discounted`

---

## Metodologia CSS: BEM

```
bloco__elemento--modificador
```

### Exemplos
```css
/* Bloco */
.product-card { }

/* Elemento */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modificador */
.product-card--featured { }
.product-card__price--discounted { }
.product-card__price--original { }
```

### Regras BEM no projeto
- Blocos nunca são aninhados no CSS (`.nav .product-card` é errado)
- Modificadores nunca existem sem o bloco base
- Máximo de 2 níveis de aninhamento BEM (`bloco__elemento` — sem `bloco__elemento__sub`)

---

## Regras de CSS

1. **Sem valores hardcoded** de cor, fonte ou espaçamento — usar sempre variável do `tokens.css`
2. **Sem `!important`** — se precisar, é sinal de especificidade errada
3. **Sem `id` como seletor CSS** — apenas classes
4. Unidades: `rem` para tipografia e espaçamento, `px` apenas para bordas e sombras
5. Media queries: mobile-first com breakpoints definidos em `tokens.css`

---

## Regras de JavaScript

1. **Sem frameworks** — vanilla JS ES2020+
2. **Sem modificação direta de estilos inline** — usar `classList.add/remove/toggle`
3. Seleção de DOM: `data-` attributes para JS, classes para CSS
   ```html
   <!-- CORRETO: atributo para JS, classe para CSS -->
   <button class="btn btn--primary" data-action="add-to-cart">Comprar</button>
   ```
4. Eventos: sempre com `addEventListener`, nunca atributos inline `onclick`
5. Estado de componentes: gerenciado no próprio módulo do componente

---

## Breakpoints

Definidos em `tokens.css` e usados via `@media`:

```css
/* Mobile first */
/* xs: < 480px  — padrão (sem media query) */
/* sm: >= 480px */
/* md: >= 768px */
/* lg: >= 1024px */
/* xl: >= 1280px */
/* 2xl: >= 1536px */
```

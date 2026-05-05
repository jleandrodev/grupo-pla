# Guia de Theming por Cliente

## Fluxo de Onboarding de Novo Cliente

```
1. Copiar template/  →  clientes/[nome-cliente]/
2. Editar tokens.css →  paleta, fontes, border-radius
3. Substituir logo   →  assets/images/logo/
4. Atualizar textos  →  nome da loja, categorias, textos fixos
5. Configurar API    →  endpoint e chaves em config.js
```

---

## Passo 1 — Cores

Abra `assets/css/tokens.css` e substitua apenas a paleta primária e secundária.

**Exemplo: cliente com identidade verde/dourado**

```css
/* ANTES (template padrão azul) */
--ecom-color-primary-500: #3b82f6;
--ecom-color-secondary-500: #f59e0b;

/* DEPOIS (cliente verde/dourado) */
--ecom-color-primary-500: #16a34a;   /* verde */
--ecom-color-secondary-500: #ca8a04; /* dourado */
```

Gere toda a escala (50→900) com ferramentas como:
- [Tints & Shades](https://maketintsandshades.com)
- [Coolors Palette Generator](https://coolors.co)
- [Tailwind Color Shades](https://uicolors.app)

**Checklist de contraste obrigatório (WCAG AA):**
- [ ] `--ecom-action-primary` sobre `--ecom-text-on-primary`: mínimo 4.5:1
- [ ] `--ecom-text-primary` sobre `--ecom-bg-page`: mínimo 4.5:1
- [ ] `--ecom-text-secondary` sobre `--ecom-bg-surface`: mínimo 4.5:1

Verificar em: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker)

---

## Passo 2 — Tipografia

### Opção A: Google Fonts

1. Escolher fonte no [Google Fonts](https://fonts.google.com)
2. Adicionar `<link>` de preconnect e fonte no `<head>` de todos os HTMLs
3. Atualizar em `tokens.css`:

```css
/* tokens.css */
--ecom-font-sans: 'Poppins', system-ui, sans-serif;
--ecom-font-body:    var(--ecom-font-sans);
--ecom-font-heading: var(--ecom-font-sans);
```

### Opção B: Fonte local (arquivo do cliente)

1. Colocar arquivos em `assets/fonts/`
2. Declarar `@font-face` no topo de `base.css`
3. Atualizar `tokens.css` com o nome declarado

```css
/* base.css */
@font-face {
  font-family: 'BrandFont';
  src: url('/assets/fonts/brandfont-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

/* tokens.css */
--ecom-font-body: 'BrandFont', system-ui, sans-serif;
```

**Formatos obrigatórios:** apenas `.woff2` — suporte universal moderno, melhor compressão.

---

## Passo 3 — Logo

Substituir os arquivos em `assets/images/logo/` mantendo os mesmos nomes:

| Arquivo | Uso | Tamanho sugerido |
|---|---|---|
| `logo.png` | Header (fundo claro) | Width máx 200px |
| `logo-white.svg` | Footer, banners escuros | Width máx 200px |
| `favicon.svg` | Tab do browser | 32×32 ou escalável |

**SVG obrigatório** — PNG apenas como fallback se o cliente não tiver SVG.

Se o cliente fornecer apenas PNG:
```html
<!-- Fallback PNG com dimensões explícitas -->
<img src="/assets/images/logo/logo.png" alt="[Nome]" width="160" height="40">
```

---

## Passo 4 — Estilo Geral (border-radius)

Define a "personalidade" visual:

| Estilo | `--ecom-radius-lg` | `--ecom-radius-full` |
|---|---|---|
| Moderno arredondado | `1rem` | `9999px` |
| Padrão (default) | `0.5rem` | `9999px` |
| Minimalista/reto | `0.125rem` | `0.25rem` |
| Orgânico | `1.5rem` | `9999px` |

---

## Passo 5 — Configuração de API

Criar `assets/js/config.js` (não commitar com dados reais — usar `.env` equivalente ou variáveis de servidor):

```js
// assets/js/config.js
export const CONFIG = {
  storeName: 'Nome da Loja',
  apiBase:   'https://api.cliente.com.br/v1',
  currency:  'BRL',
  locale:    'pt-BR',
};
```

---

## Checklist de Entrega por Cliente

```
DESIGN
[ ] Paleta primária e secundária com escala completa (50-900)
[ ] Contraste WCAG AA verificado
[ ] Tipografia definida e fontes carregando
[ ] Logo em SVG (principal + versão branca + favicon)
[ ] Border-radius definindo personalidade visual

CONTEÚDO
[ ] Nome da loja atualizado em todos os HTMLs
[ ] Meta descriptions personalizadas por página
[ ] Categorias do menu atualizadas
[ ] Rodapé com dados reais (endereço, CNPJ, redes sociais)

TÉCNICO
[ ] config.js com endpoint de API real
[ ] Fontes carregando sem 404
[ ] Imagens com alt text correto
[ ] Favicon aparecendo na aba
[ ] Layout responsivo testado em 320px, 768px, 1280px
[ ] Cross-browser: Chrome, Firefox, Safari, Edge
```

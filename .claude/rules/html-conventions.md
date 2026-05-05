# Convenções de HTML

## Princípios

1. **HTML estático e completo** — todo conteúdo indexável existe no HTML servido ao browser; JavaScript NUNCA renderiza conteúdo principal
2. **Semântico primeiro** — usar a tag HTML correta antes de recorrer a `<div>`
3. **Acessível por padrão** — ARIA roles e atributos fazem parte da estrutura, não são afterthought
4. **Performance** — atributos de loading e preload no lugar certo
5. **SEO por construção** — o HTML é a fonte de verdade para crawlers; `Ctrl+U` mostra todo o conteúdo

---

## Estrutura de Página Padrão

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[descrição da página — max 160 chars]">

  <!-- Preconnect para fontes externas (antes do CSS) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- CSS — tokens primeiro, sempre -->
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
  <link rel="stylesheet" href="/assets/css/components/[componentes-usados].css">
  <link rel="stylesheet" href="/assets/css/pages/[pagina].css">

  <title>[Nome da Página] — [Nome da Loja]</title>

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/assets/images/logo/favicon.svg">
</head>
<body>

  <!-- Skip link — acessibilidade, deve ser o primeiro elemento do body -->
  <a class="skip-link" href="#main-content">Pular para o conteúdo</a>

  <header class="site-header" role="banner">
    <!-- nav, logo, busca, carrinho -->
  </header>

  <main id="main-content" class="site-main" role="main">
    <!-- conteúdo da página -->
  </main>

  <footer class="site-footer" role="contentinfo">
    <!-- links, redes sociais, copyright -->
  </footer>

  <!-- JS ao final do body -->
  <script type="module" src="/assets/js/pages/[pagina].js"></script>

</body>
</html>
```

---

## Tags Semânticas — Quando Usar

| Tag | Usar para |
|---|---|
| `<header>` | Cabeçalho do site ou de uma seção |
| `<nav>` | Grupos de links de navegação |
| `<main>` | Conteúdo principal da página (único por página) |
| `<section>` | Agrupamento temático com heading próprio |
| `<article>` | Conteúdo independente (produto, post) |
| `<aside>` | Conteúdo complementar (filtros, widgets) |
| `<footer>` | Rodapé do site ou seção |
| `<figure>` + `<figcaption>` | Imagens com legenda |
| `<ul>` / `<ol>` | Listas de produtos, categorias, steps |
| `<button>` | Ações (sempre; nunca `<a>` para ação JS) |
| `<a>` | Navegação (sempre; nunca `<button>` para links) |

---

## Atributos Obrigatórios

### Imagens
```html
<!-- Produto: width e height evitam CLS (Cumulative Layout Shift) -->
<img
  src="/assets/images/produto.webp"
  alt="Camiseta azul slim fit masculina"
  width="400"
  height="400"
  loading="lazy"
>

<!-- Logo: não lazy, carrega imediato -->
<img
  src="/assets/images/logo/logo.png"
  alt="[Nome da Loja]"
  width="160"
  height="40"
>

<!-- Hero: preload no head para LCP -->
<!-- <link rel="preload" as="image" href="/assets/images/hero.webp"> -->
<img
  src="/assets/images/hero.webp"
  alt="[descrição contextual]"
  width="1280"
  height="600"
  fetchpriority="high"
>
```

### Formulários
```html
<!-- Sempre: label explícita ou aria-label -->
<div class="form-group">
  <label for="email" class="form-label">E-mail</label>
  <input
    type="email"
    id="email"
    name="email"
    class="form-input"
    autocomplete="email"
    required
    aria-describedby="email-error"
  >
  <span id="email-error" class="form-error" role="alert" hidden></span>
</div>
```

### Botões
```html
<!-- Botão de ação (JS) -->
<button type="button" class="btn btn--primary" data-action="add-to-cart" data-product-id="123">
  Adicionar ao Carrinho
</button>

<!-- Botão de submit -->
<button type="submit" class="btn btn--primary">
  Finalizar Compra
</button>

<!-- Botão apenas com ícone — obrigatório aria-label -->
<button type="button" class="btn btn--icon" aria-label="Remover produto do carrinho">
  <img src="/assets/images/icons/trash.svg" alt="" aria-hidden="true" width="20" height="20">
</button>
```

---

## Seleção de DOM via data-attributes

JS usa `data-*` para selecionar elementos. Classes são exclusivas para CSS.

```html
<!-- Seleção JS via data-action, não via classe -->
<button
  class="btn btn--primary"
  data-action="add-to-cart"
  data-product-id="42"
  data-product-name="Camiseta Slim Fit"
>
  Comprar
</button>
```

```js
// No JS: sempre data-attributes
document.querySelectorAll('[data-action="add-to-cart"]')

// NUNCA selecionar por classe que tem uso visual
document.querySelectorAll('.btn--primary') // ← errado
```

---

## Padrão de Cards de Produto

```html
<article class="product-card" data-product-id="42">
  <a href="/produto/camiseta-slim-fit" class="product-card__image-link" tabindex="-1" aria-hidden="true">
    <figure class="product-card__figure">
      <img
        src="/assets/images/produtos/camiseta-slim-fit.webp"
        alt=""
        class="product-card__image"
        width="300"
        height="300"
        loading="lazy"
      >
    </figure>
    <span class="product-card__badge">Novo</span>
  </a>

  <div class="product-card__body">
    <h2 class="product-card__title">
      <a href="/produto/camiseta-slim-fit" class="product-card__title-link">
        Camiseta Slim Fit Masculina
      </a>
    </h2>

    <div class="product-card__pricing" aria-label="Preço">
      <span class="product-card__price product-card__price--original">
        <span class="sr-only">De</span>
        R$ 89,90
      </span>
      <span class="product-card__price product-card__price--discounted">
        <span class="sr-only">Por</span>
        R$ 59,90
      </span>
    </div>

    <button
      type="button"
      class="btn btn--primary product-card__cta"
      data-action="add-to-cart"
      data-product-id="42"
      aria-label="Adicionar Camiseta Slim Fit ao carrinho"
    >
      Adicionar ao Carrinho
    </button>
  </div>
</article>
```

---

## Classes Utilitárias de Acessibilidade

Definidas em `base.css`, não remover:

```css
/* Visível apenas para leitores de tela */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

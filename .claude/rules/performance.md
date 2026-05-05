# Performance

## Metas (Core Web Vitals)

| Métrica | Meta | Crítico |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| FID / INP (Interaction to Next Paint) | < 200ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| TTFB (Time to First Byte) | < 600ms | > 1.8s |
| Total de recursos na home | < 1MB | > 3MB |

---

## Imagens

### Formato
- **WebP** para todas as fotos de produto e banners
- **SVG** para ícones, logo, ilustrações
- **AVIF** como opção futura com `<picture>` fallback

```html
<!-- Produto com fallback WebP → JPEG -->
<picture>
  <source type="image/webp" srcset="/assets/images/produto.webp">
  <img src="/assets/images/produto.jpg" alt="Descrição" width="400" height="400" loading="lazy">
</picture>
```

### Dimensões obrigatórias
Sempre declarar `width` e `height` para evitar CLS:

```html
<!-- CORRETO: browser reserva espaço antes de carregar -->
<img src="produto.webp" alt="..." width="300" height="300" loading="lazy">

<!-- ERRADO: layout shift quando a imagem carrega -->
<img src="produto.webp" alt="...">
```

### Lazy loading
- `loading="lazy"`: todos os produtos, banners secundários, imagens abaixo do fold
- `loading="eager"` (padrão) ou `fetchpriority="high"`: hero, logo

### Responsive images
```html
<img
  srcset="
    /assets/images/hero-480.webp  480w,
    /assets/images/hero-768.webp  768w,
    /assets/images/hero-1280.webp 1280w
  "
  sizes="(max-width: 768px) 100vw, 1280px"
  src="/assets/images/hero-1280.webp"
  alt="Banner principal"
  width="1280"
  height="480"
  fetchpriority="high"
>
```

---

## CSS

### Ordem de carregamento
CSS no `<head>` — nunca ao final do body. Crítico para renderização.

### Evitar render-blocking
```html
<!-- Fontes: preconnect antes do link da fonte -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

### font-display
Sempre usar `font-display: swap` em `@font-face` para evitar FOIT (Flash of Invisible Text).

### Animações performáticas
Usar apenas propriedades que não causam reflow:

```css
/* PERFORMÁTICO — apenas composite layers */
.btn { transition: opacity, transform; }
.product-card:hover { transform: translateY(-2px); }

/* EVITAR — causa reflow */
.product-card:hover { margin-top: -2px; width: 105%; }
```

```css
/* Respeitar preferência do usuário */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## JavaScript

### Carregamento
```html
<!-- Ao final do body, com type="module" (defer implícito) -->
<script type="module" src="/assets/js/pages/home.js"></script>
```

### Nunca bloquear a main thread
```js
// Operações pesadas em idle callback
requestIdleCallback(() => {
  initAnalytics();
  loadChatWidget();
});

// Scroll handler: sempre throttle
window.addEventListener('scroll', throttle(onScroll, 100));

// Input de busca: sempre debounce
searchInput.addEventListener('input', debounce(fetchSuggestions, 300));
```

### Dynamic imports para código não-crítico
```js
// Carregar modal apenas quando necessário
async function openProductModal(id) {
  const { init } = await import('../components/product-modal.js');
  init(id);
}
```

---

## HTML

### Resource hints no `<head>`
```html
<!-- Preconnect: domínios de API e fontes -->
<link rel="preconnect" href="https://api.loja.com.br">

<!-- Preload: hero image (LCP) -->
<link rel="preload" as="image" href="/assets/images/hero.webp" fetchpriority="high">

<!-- DNS prefetch: domínios externos de baixa prioridade -->
<link rel="dns-prefetch" href="https://cdn.parceiro.com">
```

---

## Checklist de Performance Antes de Entregar

```
IMAGENS
[ ] Todas as fotos em WebP
[ ] width e height declarados em todas as <img>
[ ] loading="lazy" nas imagens abaixo do fold
[ ] Hero com fetchpriority="high"
[ ] Logo e favicon em SVG

CSS
[ ] tokens.css carregado primeiro
[ ] Sem CSS inline desnecessário
[ ] font-display: swap em todas as @font-face
[ ] Animações usando apenas transform e opacity

JAVASCRIPT
[ ] Scripts com type="module" ao final do body
[ ] Nenhum script síncrono no <head>
[ ] Scroll handlers com throttle
[ ] Inputs de busca com debounce

LIGHTHOUSE (meta mínima)
[ ] Performance: >= 85
[ ] Accessibility: >= 95
[ ] Best Practices: >= 95
[ ] SEO: >= 90
```

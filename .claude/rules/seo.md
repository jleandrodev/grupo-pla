# SEO — Search Engine Optimization

## Objetivo

Todo e-commerce gerado por este template deve alcançar **score SEO >= 95 no Lighthouse** e seguir as melhores práticas de SEO técnico, semântico e de dados estruturados.

---

## 0. Regra Zero: HTML Estático Obrigatório

> **Todo conteúdo que deve ser indexado por motores de busca DEVE existir no HTML estático.** Nenhum conteúdo principal pode depender de JavaScript para ser renderizado.

### Motivação
- Googlebot e outros crawlers podem não executar JS, ou executá-lo com atraso de dias/semanas
- HTML estático é indexado imediatamente na primeira visita do crawler
- Conteúdo renderizado via JS tem risco de **não ser indexado** ou indexado parcialmente
- `view-source:` (Ctrl+U) deve mostrar 100% do conteúdo visível da página

### O que é conteúdo indexável (DEVE estar no HTML estático)
- Textos, headings, parágrafos, listas
- Cards de produto (nome, preço, imagem, link)
- Breadcrumbs e navegação
- FAQs e conteúdo informativo
- Dados estruturados (JSON-LD)
- Meta tags, Open Graph, canonical

### O que pode ser manipulado por JS (progressive enhancement)
- Mostrar/ocultar conteúdo que **já existe** no HTML (tabs, accordions, modais)
- Alternar classes CSS para estados visuais
- Carrinho de compras (contador, drawer)
- Busca em tempo real (sugestões)
- Lazy loading de imagens abaixo do fold (com `loading="lazy"` nativo)

### Teste de validação
```
1. Desabilitar JavaScript no browser
2. A página deve exibir TODO o conteúdo principal
3. Navegação deve funcionar (links são <a> com href real)
4. Formulários devem ter action e method
```

---

## 1. Estrutura de Headings

### Hierarquia obrigatória

Cada página deve ter **exatamente um `<h1>`**. A hierarquia nunca pula níveis.

```
h1 → Título principal da página (único)
  h2 → Seções principais
    h3 → Sub-seções
      h4 → Detalhes (raro)
```

### Por página

| Página | `<h1>` | Exemplo |
|---|---|---|
| Home | Nome da loja ou proposta de valor | `<h1>Grupo PLA — Materiais de Construção</h1>` |
| Catálogo | Categoria ou "Nossos Produtos" | `<h1>Camisetas Masculinas</h1>` |
| Produto | Nome do produto | `<h1>Camiseta Slim Fit Azul Marinho</h1>` |
| Carrinho | "Seu Carrinho" | `<h1>Seu Carrinho</h1>` |
| Checkout | "Finalizar Compra" | `<h1>Finalizar Compra</h1>` |
| Conta | "Minha Conta" | `<h1>Minha Conta</h1>` |

### Regras

- **Nunca** usar heading para estilizar texto — usar classes CSS
- **Nunca** pular níveis (`h1` → `h3` sem `h2`)
- **Nunca** usar `<h1>` no logo — logo é `<a>` com `<img>` ou texto dentro de `<p>`
- Headings devem conter a **keyword principal** da página de forma natural
- Headings dentro de `<section>` devem começar em `<h2>`

---

## 2. Meta Tags Obrigatórias

### Head de cada página

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO essencial -->
  <title>[Título da Página] — [Nome da Loja]</title>
  <meta name="description" content="[Descrição única, 120-160 caracteres, com keyword principal]">

  <!-- Canonical — evita conteúdo duplicado -->
  <link rel="canonical" href="https://www.dominio.com.br/pagina-atual">

  <!-- Robots -->
  <meta name="robots" content="index, follow">
  <!-- Para páginas que NÃO devem indexar: -->
  <!-- <meta name="robots" content="noindex, nofollow"> -->

  <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="[Título da Página]">
  <meta property="og:description" content="[Mesma meta description ou versão social]">
  <meta property="og:image" content="https://www.dominio.com.br/assets/images/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="https://www.dominio.com.br/pagina-atual">
  <meta property="og:site_name" content="[Nome da Loja]">
  <meta property="og:locale" content="pt_BR">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Título da Página]">
  <meta name="twitter:description" content="[Descrição]">
  <meta name="twitter:image" content="https://www.dominio.com.br/assets/images/og-image.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/assets/images/logo/favicon.svg">
  <link rel="apple-touch-icon" href="/assets/images/logo/apple-touch-icon.png">

  <!-- Idioma alternativo (se houver versão em outro idioma) -->
  <!-- <link rel="alternate" hreflang="en" href="https://www.dominio.com/en/page"> -->
  <link rel="alternate" hreflang="pt-BR" href="https://www.dominio.com.br/pagina-atual">
  <link rel="alternate" hreflang="x-default" href="https://www.dominio.com.br/pagina-atual">
</head>
```

### Regras de `<title>`

| Regra | Exemplo |
|---|---|
| Máx 60 caracteres | `Camiseta Slim Fit Azul — Loja X` |
| Keyword no início | `Camisetas Masculinas — Loja X` (não `Loja X — Camisetas`) |
| Único por página | Nunca repetir o mesmo title em páginas diferentes |
| Separador padrão | ` — ` (travessão) ou ` | ` |

### Regras de `<meta description>`

| Regra | Exemplo |
|---|---|
| 120-160 caracteres | Curto demais = snippet pobre; longo = truncado |
| Keyword incluída | Naturalidade > repetição forçada |
| Call-to-action | "Confira", "Compre", "Veja" — convida ao clique |
| Única por página | Nunca duplicar descriptions |

### Páginas que NÃO indexar

```html
<!-- Carrinho, Checkout, Conta, Thank You -->
<meta name="robots" content="noindex, nofollow">
```

---

## 3. HTML Semântico para SEO

### Landmarks e estrutura

```html
<body>
  <a class="skip-link" href="#main-content">Pular para o conteúdo</a>

  <header class="site-header" role="banner">
    <nav aria-label="Navegação principal">
      <!-- menu -->
    </nav>
  </header>

  <!-- Breadcrumb — obrigatório em páginas internas -->
  <nav aria-label="Breadcrumb" class="breadcrumb">
    <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/" itemprop="item"><span itemprop="name">Início</span></a>
        <meta itemprop="position" content="1">
      </li>
      <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/camisetas" itemprop="item"><span itemprop="name">Camisetas</span></a>
        <meta itemprop="position" content="2">
      </li>
      <li class="breadcrumb__item breadcrumb__item--active" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name" aria-current="page">Camiseta Slim Fit</span>
        <meta itemprop="position" content="3">
      </li>
    </ol>
  </nav>

  <main id="main-content" class="site-main" role="main">
    <!-- conteúdo -->
  </main>

  <footer class="site-footer" role="contentinfo">
    <nav aria-label="Links do rodapé">
      <!-- links -->
    </nav>
  </footer>
</body>
```

### Tags semânticas e SEO

| Tag | Valor para SEO |
|---|---|
| `<article>` | Indica conteúdo independente — produto, post |
| `<section>` | Agrupa conteúdo temático com heading |
| `<nav>` | Identifica blocos de navegação para crawlers |
| `<aside>` | Conteúdo complementar — filtros, related products |
| `<figure>` + `<figcaption>` | Contextualiza imagens para indexação |
| `<time datetime="">` | Data legível por máquina |
| `<address>` | Informações de contato da empresa |

### Links internos

```html
<!-- CORRETO: texto descritivo -->
<a href="/camisetas">Ver todas as camisetas masculinas</a>

<!-- ERRADO: texto genérico (péssimo para SEO) -->
<a href="/camisetas">Clique aqui</a>
<a href="/camisetas">Saiba mais</a>
```

---

## 4. Dados Estruturados (Schema.org)

Usar **JSON-LD** (recomendado pelo Google) no `<head>` ou antes do `</body>`.

### 4.1 Organization (todas as páginas)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Nome da Loja]",
  "url": "https://www.dominio.com.br",
  "logo": "https://www.dominio.com.br/assets/images/logo/logo.png",
  "description": "[Descrição da empresa]",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-9999-9999",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Rua]",
    "addressLocality": "[Cidade]",
    "addressRegion": "[UF]",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.facebook.com/loja",
    "https://www.instagram.com/loja",
    "https://www.linkedin.com/company/loja"
  ]
}
</script>
```

### 4.2 WebSite + SearchAction (home)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[Nome da Loja]",
  "url": "https://www.dominio.com.br",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.dominio.com.br/busca?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 4.3 Product (página de produto)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Camiseta Slim Fit Azul Marinho",
  "description": "Camiseta masculina slim fit em algodão premium, disponível nos tamanhos P ao GG.",
  "image": [
    "https://www.dominio.com.br/assets/images/produtos/camiseta-slim-fit-frente.webp",
    "https://www.dominio.com.br/assets/images/produtos/camiseta-slim-fit-costas.webp"
  ],
  "sku": "CAM-SLIM-001",
  "brand": {
    "@type": "Brand",
    "name": "[Marca]"
  },
  "category": "Camisetas Masculinas",
  "offers": {
    "@type": "Offer",
    "url": "https://www.dominio.com.br/produto/camiseta-slim-fit",
    "priceCurrency": "BRL",
    "price": "59.90",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "[Nome da Loja]"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "BR"
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "BR",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "127"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "João Silva"
      },
      "datePublished": "2026-03-15",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Ótima qualidade, caimento perfeito."
    }
  ]
}
</script>
```

### 4.4 BreadcrumbList (páginas internas)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Início",
      "item": "https://www.dominio.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Camisetas",
      "item": "https://www.dominio.com.br/camisetas"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Camiseta Slim Fit"
    }
  ]
}
</script>
```

### 4.5 ItemList (página de catálogo)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Camisetas Masculinas",
  "numberOfItems": 24,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://www.dominio.com.br/produto/camiseta-slim-fit"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://www.dominio.com.br/produto/camiseta-basica"
    }
  ]
}
</script>
```

### 4.6 FAQPage (se a página tiver FAQ)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual o prazo de entrega?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O prazo de entrega varia de 3 a 10 dias úteis, dependendo da região."
      }
    },
    {
      "@type": "Question",
      "name": "Como faço para trocar um produto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Você pode solicitar a troca em até 30 dias após o recebimento, pela área Minha Conta."
      }
    }
  ]
}
</script>
```

### 4.7 LocalBusiness (se loja física)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "[Nome da Loja]",
  "image": "https://www.dominio.com.br/assets/images/fachada.webp",
  "url": "https://www.dominio.com.br",
  "telephone": "+55-11-9999-9999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Rua, número]",
    "addressLocality": "[Cidade]",
    "addressRegion": "[UF]",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "13:00"
    }
  ],
  "priceRange": "$$"
}
</script>
```

---

## 5. URLs e Navegação

### Estrutura de URL

```
https://www.dominio.com.br/                          ← Home
https://www.dominio.com.br/camisetas                 ← Categoria
https://www.dominio.com.br/camisetas/masculinas      ← Subcategoria
https://www.dominio.com.br/produto/camiseta-slim-fit  ← Produto
https://www.dominio.com.br/busca?q=camiseta          ← Busca
```

| Regra | Exemplo |
|---|---|
| Sempre lowercase | `/camisetas` (não `/Camisetas`) |
| Hifens como separador | `/camiseta-slim-fit` (não `/camiseta_slim_fit`) |
| Sem extensão `.html` se possível | `/camisetas` (não `/camisetas.html`) |
| Sem IDs numéricos na URL | `/produto/camiseta-slim-fit` (não `/produto/42`) |
| Sem parâmetros desnecessários | URL limpa, filtros via query string |
| Trailing slash consistente | Escolher um padrão e manter |

### Sitemap

Gerar `sitemap.xml` na raiz do domínio:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://www.dominio.com.br/</loc>
    <lastmod>2026-04-23</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.dominio.com.br/camisetas</loc>
    <lastmod>2026-04-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://www.dominio.com.br/assets/images/categorias/camisetas.webp</image:loc>
      <image:title>Camisetas Masculinas</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://www.dominio.com.br/produto/camiseta-slim-fit</loc>
    <lastmod>2026-04-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### robots.txt

```
User-agent: *
Allow: /

Disallow: /carrinho
Disallow: /checkout
Disallow: /conta
Disallow: /busca?
Disallow: /assets/js/
Disallow: /assets/css/

Sitemap: https://www.dominio.com.br/sitemap.xml
```

---

## 6. Imagens e SEO

### Alt text

| Tipo | Alt | Exemplo |
|---|---|---|
| Produto | Descritivo com keywords naturais | `alt="Camiseta slim fit azul marinho masculina, algodão"` |
| Categoria | Descrição da categoria | `alt="Coleção de camisetas masculinas verão 2026"` |
| Banner/Hero | Contexto da promoção | `alt="Promoção de inverno: até 50% off em casacos"` |
| Logo | Nome da empresa | `alt="Grupo PLA"` |
| Decorativo | Vazio | `alt=""` |
| Ícone com texto | Vazio + aria-hidden | `alt="" aria-hidden="true"` |

### Nomes de arquivo

```
CORRETO: camiseta-slim-fit-azul-masculina.webp
ERRADO:  IMG_20260423_001.webp
ERRADO:  produto1.webp
```

### Atributos obrigatórios

```html
<img
  src="/assets/images/produtos/camiseta-slim-fit.webp"
  alt="Camiseta slim fit azul marinho masculina"
  width="400"
  height="400"
  loading="lazy"
>
```

---

## 7. Performance e SEO

Performance impacta diretamente o ranking. Seguir integralmente o `.claude/rules/performance.md`, com atenção especial a:

| Fator | Impacto SEO |
|---|---|
| LCP < 2.5s | Core Web Vital — fator de ranking |
| CLS < 0.1 | Core Web Vital — fator de ranking |
| INP < 200ms | Core Web Vital — fator de ranking |
| Mobile-first | Google usa mobile-first indexing |
| HTTPS | Fator de ranking direto |

---

## 8. Conteúdo Semântico

### Texto de produto

Cada produto deve ter:
- **Título** (`<h1>`) com keyword principal
- **Descrição curta** (1-2 frases) — visível acima do fold
- **Descrição completa** (`<section>`) — abaixo do fold, com `<h2>` próprio
- **Especificações** em `<table>` ou `<dl>` (definition list)
- **FAQ do produto** se aplicável — gera rich snippet

```html
<!-- Especificações com dl (definition list) — semântico -->
<section aria-labelledby="specs-heading">
  <h2 id="specs-heading">Especificações</h2>
  <dl class="product-specs">
    <dt>Material</dt>
    <dd>100% Algodão Pima</dd>
    <dt>Peso</dt>
    <dd>180g/m²</dd>
    <dt>Origem</dt>
    <dd>Fabricado no Brasil</dd>
  </dl>
</section>
```

### Rodapé rico

O footer deve conter:
- Links para categorias principais (link juice)
- Dados da empresa (nome, CNPJ, endereço) — `<address>`
- Links para políticas (privacidade, troca, termos)
- Redes sociais com `rel="noopener noreferrer"`

```html
<footer class="site-footer" role="contentinfo">
  <nav aria-label="Links institucionais">
    <h2 class="sr-only">Links do Rodapé</h2>
    <!-- links organizados em seções -->
  </nav>

  <address class="site-footer__address">
    <p>[Nome da Empresa] — CNPJ: XX.XXX.XXX/0001-XX</p>
    <p>[Endereço completo]</p>
  </address>

  <p class="site-footer__copyright">
    <small>&copy; <time datetime="2026">2026</time> [Nome da Loja]. Todos os direitos reservados.</small>
  </p>
</footer>
```

---

## 9. Internacionalização

```html
<!-- Sempre declarar idioma -->
<html lang="pt-BR">

<!-- Datas sempre com <time> -->
<time datetime="2026-04-23">23 de abril de 2026</time>

<!-- Preços com microdata -->
<span itemprop="price" content="59.90">R$ 59,90</span>
<meta itemprop="priceCurrency" content="BRL">
```

---

## 10. Checklist SEO por Página

### Todas as páginas

```
ESTRUTURA
[ ] Exatamente um <h1> por página
[ ] Hierarquia de headings sem pular níveis
[ ] <html lang="pt-BR">
[ ] <title> único, < 60 chars, keyword no início
[ ] <meta description> única, 120-160 chars
[ ] <link rel="canonical"> apontando para URL correta
[ ] <meta name="robots"> configurado
[ ] Open Graph completo (og:title, og:description, og:image, og:url)
[ ] Twitter Card configurado
[ ] Favicon e apple-touch-icon

DADOS ESTRUTURADOS
[ ] Organization (JSON-LD) — em todas as páginas
[ ] BreadcrumbList (JSON-LD) — em páginas internas

SEMÂNTICA
[ ] <header>, <main>, <footer> presentes
[ ] <nav> com aria-label em cada bloco de navegação
[ ] Breadcrumb semântico em páginas internas
[ ] Links com texto descritivo (nunca "clique aqui")
[ ] <address> no footer com dados da empresa

IMAGENS
[ ] Alt text descritivo com keywords naturais
[ ] width e height declarados
[ ] Nomes de arquivo descritivos em kebab-case

MOBILE
[ ] viewport meta tag presente
[ ] Layout responsivo testado em 320px+
[ ] Tap targets >= 44x44px
[ ] Texto legível sem zoom (>= 16px base)
```

### Home (adicional)

```
[ ] WebSite + SearchAction (JSON-LD)
[ ] Hero com fetchpriority="high"
[ ] Links para categorias principais
```

### Página de produto (adicional)

```
[ ] Product (JSON-LD) completo com offers, rating, reviews
[ ] Múltiplas imagens do produto no schema
[ ] Descrição completa abaixo do fold
[ ] Especificações em <dl> ou <table>
[ ] Breadcrumb: Home > Categoria > Produto
```

### Catálogo (adicional)

```
[ ] ItemList (JSON-LD) com produtos listados
[ ] Paginação com rel="next" / rel="prev" (se aplicável)
[ ] Filtros não criam URLs duplicadas (usar canonical)
[ ] <h1> com nome da categoria
```

### Páginas transacionais (carrinho, checkout, conta)

```
[ ] <meta name="robots" content="noindex, nofollow">
[ ] Sem dados estruturados de produto
[ ] Formulários com autocomplete correto
```

---

## Ferramentas de Validação

| Ferramenta | O que valida |
|---|---|
| [Google Rich Results Test](https://search.google.com/test/rich-results) | Dados estruturados |
| [Schema.org Validator](https://validator.schema.org) | Sintaxe de JSON-LD |
| [Google Lighthouse](https://pagespeed.web.dev) | Score SEO + Performance |
| [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) | Auditoria SEO completa |
| [Google Search Console](https://search.google.com/search-console) | Indexação e erros |
| [OpenGraph Debugger](https://developers.facebook.com/tools/debug) | Preview de compartilhamento |
| [Twitter Card Validator](https://cards-dev.twitter.com/validator) | Preview do Twitter |

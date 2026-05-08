# 01 — Home (index.html)

## Referencia Visual

- Full page: `references/screenshots/01-home/full-page.png`
- Fold 01: `references/screenshots/01-home/fold-01.png` — Top Bar + Header + Hero + Trust Bar
- Fold 02: `references/screenshots/01-home/fold-02.png` — Produtos em Destaque + Marcas que Atendemos
- Fold 03: `references/screenshots/01-home/fold-03.png` — Maquinas Agricolas Disponiveis (cards + tabs)
- Fold 04: `references/screenshots/01-home/fold-04.png` — Maquinas (continuacao) + Navegue por Categoria
- Fold 05: `references/screenshots/01-home/fold-05.png` — Produtos em Destaque (2a aparicao) + Depoimentos (inicio)
- Fold 06: `references/screenshots/01-home/fold-06.png` — Depoimentos (cards) + Ofertas e Campanhas
- Fold 07: `references/screenshots/01-home/fold-07.png` — CTA Ajuda + FAQ + Newsletter + Footer (inicio)
- Fold 08: `references/screenshots/01-home/fold-08.png` — Footer (continuacao) + Sub-footer + Copyright

---

## Secoes (top to bottom)

---

### 1. Top Bar

**Tag semantica:** `<div class="top-bar">` dentro de `<header>`

**Layout:** Barra horizontal fina, fundo navy escuro (`--ecom-color-neutral-900` / `~#1A2332`), texto branco pequeno. Container centralizado com `max-width: var(--ecom-container-max)`. Padding vertical minimo (~`var(--ecom-space-2)`).

**Estrutura:** Duas areas — informacoes de contato a esquerda, icones de redes sociais a direita.

**Conteudo textual exato:**

- Esquerda (separados por pipes ou espacamento):
  - Icone telefone + `(11) 4000-0000`
  - Icone WhatsApp + `WhatsApp: (11) 99999-0000`
  - Icone email + `contato@grupopla.com.br`
- Direita (icones de redes sociais):
  - Facebook
  - Instagram
  - YouTube
  - LinkedIn

**Cores:**
- Fundo: `--ecom-color-neutral-900` (~#1A2332)
- Texto: `--ecom-text-inverse` (branco)
- Icones: brancos, opacidade levemente reduzida; hover: opacidade total ou cor laranja

**Tipografia:** `--ecom-text-xs` (12px), `--ecom-font-regular`

**Componentes:** Nenhum componente complexo. Icones SVG inline ou de sprite.

**Comportamento interativo:**
- Links de telefone: `<a href="tel:+551140000000">`
- Link WhatsApp: `<a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer">`
- Link email: `<a href="mailto:contato@grupopla.com.br">`
- Icones sociais: links externos com `target="_blank" rel="noopener noreferrer"`

**Classes BEM:**
```
.top-bar
.top-bar__container
.top-bar__contact
.top-bar__contact-item
.top-bar__contact-icon
.top-bar__social
.top-bar__social-link
```

---

### 2. Header Principal

**Tag semantica:** `<header class="site-header" role="banner">`

**Layout:** Fundo branco (`--ecom-bg-surface`). Altura ~70-80px. Container centralizado. Tres areas em linha horizontal com `display: flex; align-items: center; justify-content: space-between`:
1. Logo (esquerda)
2. Campo de busca (centro, ocupa maior parte do espaco)
3. Acoes — botao WhatsApp + icone carrinho (direita)

**Conteudo textual exato:**

- **Logo:** Imagem placeholder "Logoipsum" (sera substituida por logo PLA). Cor laranja no icone, texto escuro.
  - `<a href="/" class="site-header__logo-link"><img src="/assets/images/logo/logo.png" alt="Grupo PLA" width="160" height="40"></a>`
- **Campo de busca:** Input com icone de lupa a esquerda.
  - Placeholder: `"Buscar pecas, veiculos, marcas..."`
  - Borda arredondada (`--ecom-radius-full` ou `--ecom-radius-xl`)
  - Borda cinza (`--ecom-border-default`)
  - Icone lupa dentro do input (posicao absoluta, lado esquerdo)
- **Botao WhatsApp:**
  - Fundo laranja (`--ecom-action-primary`)
  - Texto branco: `WhatsApp`
  - Icone WhatsApp (branco) a esquerda do texto
  - Border-radius arredondado (`--ecom-radius-md` ou `--ecom-radius-lg`)
  - Padding: `var(--ecom-space-2) var(--ecom-space-4)`
- **Icone Carrinho:**
  - Icone SVG de carrinho de compras
  - Fundo branco, icone escuro (`--ecom-text-primary`)
  - Borda cinza sutil ao redor do icone (quadrado arredondado ~40x40px)
  - Badge de contagem (quando houver itens): circulo laranja com numero branco

**Cores:**
- Fundo: `--ecom-bg-surface` (#FFFFFF)
- Sombra inferior sutil: `--ecom-shadow-sm` (separacao visual do nav)
- Input busca: borda `--ecom-border-default`, fundo branco
- Botao WhatsApp: fundo `--ecom-action-primary` (~#F7941D), texto `--ecom-text-on-primary`

**Tipografia:**
- Input busca: `--ecom-text-sm`, `--ecom-font-regular`, placeholder em `--ecom-text-muted`
- Botao WhatsApp: `--ecom-text-sm`, `--ecom-font-semibold`

**Comportamento interativo:**
- Campo de busca: ao focar, borda muda para `--ecom-border-focus` (laranja ou primary)
- Botao WhatsApp: abre WhatsApp Web/App em nova aba
- Icone carrinho: abre cart drawer (mini carrinho lateral) ou navega para `/carrinho`
- Header deve ser sticky no scroll (verificar se aplica; no design nao ha evidencia clara, mas e recomendado)

**Classes BEM:**
```
.site-header
.site-header__container
.site-header__logo
.site-header__logo-link
.site-header__search
.site-header__search-input
.site-header__search-icon
.site-header__actions
.site-header__whatsapp-btn
.site-header__cart-btn
.site-header__cart-badge
```

---

### 3. Menu de Navegacao

**Tag semantica:** `<nav class="main-nav" aria-label="Navegacao principal">`

**Layout:** Barra horizontal logo abaixo do header. Fundo branco. Borda inferior sutil cinza (1px `--ecom-border-default`). Itens de menu centralizados horizontalmente com espacamento uniforme (~`var(--ecom-space-6)` entre itens).

**Conteudo textual exato (itens do menu, da esquerda para direita):**

1. **Pecas** (ativo — com sublinhado laranja e texto laranja)
2. Estoque
3. Novos
4. Marcas
5. Locacao
6. Meus Clientes
7. Contato

**Cores:**
- Texto normal: `--ecom-text-primary` (~#1A2332)
- Texto ativo/hover: `--ecom-action-primary` (~#F7941D, laranja)
- Sublinhado ativo: borda inferior 2-3px `--ecom-action-primary`, com `border-radius` nas pontas
- Fundo: `--ecom-bg-surface` (branco)

**Tipografia:** `--ecom-text-sm`, `--ecom-font-medium`

**Comportamento interativo:**
- Hover: texto muda para cor laranja (`--ecom-action-primary`)
- Ativo: texto laranja + sublinhado laranja inferior (2-3px)
- O item "Pecas" aparece como ativo na home (pode ser o padrao ou indicar que a home prioriza pecas)
- Possivel dropdown em "Pecas" e "Marcas" com subcategorias (nao visivel no design, mas considerar `aria-expanded`)

**Classes BEM:**
```
.main-nav
.main-nav__container
.main-nav__list
.main-nav__item
.main-nav__link
.main-nav__link--active
```

---

### 4. Hero Banner

**Tag semantica:** `<section class="hero" aria-labelledby="hero-heading">`

**Layout:** Secao full-width com imagem de fundo de maquinario agricola (trator arando terra ao por do sol, tons quentes laranja/dourado). Overlay escuro gradiente da esquerda para direita (mais escuro na esquerda onde fica o texto, mais transparente na direita). Altura estimada: ~450-500px. Conteudo alinhado a esquerda dentro do container, ocupando ~50% da largura.

**Conteudo textual exato:**

- **Tag/Badge superior:** Pill/badge arredondado com fundo semi-transparente laranja escuro ou fundo laranja solido
  - Icone estrela laranja + texto: `"Especialistas em Pecas e Equipamentos Agricolas"`
  - Border-radius: `--ecom-radius-full` (pill)
  - Fundo: laranja com opacidade ou fundo escuro com borda laranja

- **Heading (h1):**
  ```
  Pecas e Equipamentos
  para o
  Agronegocio
  ```
  - Tipografia: `--ecom-text-5xl` (~48px) ou ate maior, `--ecom-font-bold`
  - Cor: `--ecom-text-inverse` (branco)
  - Line-height: `--ecom-leading-tight`

- **Paragrafo descritivo:**
  ```
  Mais de 15.000 itens em estoque. Pecas originais e remanufaturadas
  para tratores, colheitadeiras e implementos agricolas. Entrega para
  todo o Brasil.
  ```
  - Tipografia: `--ecom-text-base` ou `--ecom-text-lg`, `--ecom-font-regular`
  - Cor: branco com leve opacidade (~rgba(255,255,255,0.85))

- **Botoes (2 lado a lado):**
  1. **CTA primario:** `"Ver Pecas Agricolas →"`
     - Fundo: `--ecom-action-primary` (laranja ~#F7941D)
     - Texto: branco, `--ecom-font-semibold`
     - Border-radius: `--ecom-radius-full` (pill, bem arredondado)
     - Icone seta (→) apos o texto
     - Padding generoso: `var(--ecom-space-3) var(--ecom-space-8)`
  2. **CTA secundario/ghost:** `"Falar com Especialista"`
     - Fundo: transparente
     - Borda: 1-2px branca
     - Texto: branco, `--ecom-font-semibold`
     - Border-radius: `--ecom-radius-full` (pill)
     - Hover: fundo branco semi-transparente

**Imagem de fundo:**
- `assets/images/hero/hero-home.webp`
- Trator no campo ao por do sol, tons terrosos/dourados
- Overlay CSS: `linear-gradient(to right, rgba(26,35,50,0.85) 0%, rgba(26,35,50,0.4) 60%, transparent 100%)`
- Ou: overlay escuro geral + imagem com opacity
- A imagem deve ter `fetchpriority="high"` e ser preloaded no `<head>`

**Notas de implementacao:**
- Imagem de fundo via CSS `background-image` ou `<img>` posicionado absoluto com `object-fit: cover`
- Preferir `<img>` com `fetchpriority="high"` para LCP
- O badge superior usa um estilo pill com cantos totalmente arredondados
- Textura de pontos/dots no overlay (verificar no design — ha um padrao de pontos no lado direito do hero, efeito decorativo)

**Classes BEM:**
```
.hero
.hero__container
.hero__badge
.hero__badge-icon
.hero__heading
.hero__description
.hero__actions
.hero__btn
.hero__btn--primary
.hero__btn--secondary
.hero__background
.hero__overlay
.hero__dots (elemento decorativo de pontos)
```

---

### 5. Trust Bar (Barra de Confianca)

**Tag semantica:** `<section class="trust-bar" aria-label="Diferenciais">`

**Layout:** Faixa horizontal logo abaixo do hero, fundo branco (`--ecom-bg-surface`). 4 cards lado a lado em grid de 4 colunas (`grid-template-columns: repeat(4, 1fr)`). Cada card tem borda sutil (`--ecom-border-default`), border-radius (`--ecom-radius-lg`), e leve sombra. A secao fica levemente sobreposta ao hero (posicao relativa com `margin-top` negativo de ~-40px ou `transform: translateY(-50%)`), criando efeito de elevacao.

**Conteudo textual exato (4 cards):**

1. **Financiamento BNDES**
   - Icone: circulo verde/laranja com "$" ou icone de dinheiro
   - Titulo: `"Financiamento BNDES"`
   - Descricao: `"Linhas de credito com ate 120 dias de carencia"`

2. **Frete Gratis**
   - Icone: circulo com icone de caminhao/caixa
   - Titulo: `"Frete Gratis"`
   - Descricao: `"Entregas expressas em todo o territorio nacional"`

3. **Entrega Nacional**
   - Icone: circulo com icone de mapa do Brasil ou pin de localizacao
   - Titulo: `"Entrega Nacional"`
   - Descricao: `"Logistica propria com equipe especializada"`

4. **Garantia Premium**
   - Icone: circulo com icone de escudo/check
   - Titulo: `"Garantia Premium"`
   - Descricao: `"Suporte tecnico 24h e manutencao autorizada"`

**Cores:**
- Fundo cards: `--ecom-bg-surface` (branco)
- Icones: fundo laranja claro ou laranja solido (`--ecom-color-primary-100` como bg, `--ecom-action-primary` como icone)
- Titulo: `--ecom-text-primary`, `--ecom-font-semibold`
- Descricao: `--ecom-text-secondary`, `--ecom-font-regular`
- Borda: `--ecom-border-default`
- Sombra: `--ecom-shadow-md`

**Tipografia:**
- Titulo: `--ecom-text-sm` ou `--ecom-text-base`, `--ecom-font-semibold`
- Descricao: `--ecom-text-xs` ou `--ecom-text-sm`, `--ecom-font-regular`

**Comportamento interativo:**
- Nenhum link — apenas informativo
- Possivel hover com leve elevacao de sombra (`--ecom-shadow-lg`)

**Classes BEM:**
```
.trust-bar
.trust-bar__container
.trust-bar__grid
.trust-bar__card
.trust-bar__icon
.trust-bar__title
.trust-bar__description
```

---

### 6. Produtos em Destaque (1a aparicao)

**Tag semantica:** `<section class="featured-products" aria-labelledby="featured-products-heading">`

**Layout:** Fundo branco (`--ecom-bg-surface`). Padding vertical generoso (`var(--ecom-space-16)` ou `var(--ecom-space-20)`). Header da secao com titulo a esquerda e botao "Ver Todos" a direita. Abaixo, grid de 4 colunas: 1 banner promocional + 3 cards de produto.

**Header da secao:**
- Titulo: `"Produtos em Destaque"`
  - Tag: `<h2>`, `--ecom-text-3xl` ou `--ecom-text-4xl`, `--ecom-font-bold`
- Subtitulo: `"Pecas selecionadas com qualidade garantida para seu maquinario agricola"`
  - `--ecom-text-secondary`, `--ecom-text-sm` ou `--ecom-text-base`
- Botao a direita: `"Ver Todos os Produtos"`
  - Estilo: outlined (borda escura, fundo transparente), border-radius `--ecom-radius-md`
  - Texto: `--ecom-text-primary`, `--ecom-font-medium`
  - Hover: fundo escuro, texto branco

**Coluna 1 — Banner Promocional (ocupa 1 coluna, altura total):**
- Imagem de fundo com overlay
- Fundo: gradiente verde escuro ou imagem de pecas agricolas
- Badge superior: `"OFERTAS ESPECIAIS"` — fundo laranja, texto branco, pill
- Texto principal em branco:
  ```
  Pecas Agricolas com Ate
  30% OFF
  ```
  - "30% OFF" em tamanho grande, bold, destaque
- Subtexto: `"Qualidade e durabilidade para o seu maquinario"`
- Lista de beneficios com icones check (laranjas):
  - `"Envio rapido"`
  - `"Pecas originais e paralelas"`
  - `"Atendimento especializado"`
- Botao CTA: `"COMPRAR AGORA"` — fundo laranja, texto branco, full-width
- Rodape do banner: `"Parcelamento facilitado"` — texto pequeno

**Colunas 2-4 — Product Cards (3 cards):**

Cada card tem:
- **Imagem do produto:** Fundo branco/cinza claro, imagem centralizada, ratio quadrado (1:1 ou similar). `loading="lazy"`, `width="300"`, `height="300"`
- **Badge de categoria:** Pill colorida abaixo da imagem
  - Cores variam por categoria:
    - "Hidraulica" → verde/teal
    - "Motor" → laranja
    - "Transmissao" → roxo/azul
  - Border-radius: `--ecom-radius-full`
  - Font-size: `--ecom-text-xs`
- **Nome do produto:** `--ecom-text-sm` ou `--ecom-text-base`, `--ecom-font-medium`, 2 linhas max (line-clamp)
- **Rating:** 5 estrelas (outline, vazias = cinza, preenchidas = laranja). `--ecom-text-xs`
- **Preco:**
  - Se com desconto: preco original riscado (`text-decoration: line-through`, `--ecom-text-muted`) + preco atual em destaque
  - Preco atual: `--ecom-text-primary`, `--ecom-font-bold`, `--ecom-text-lg`
  - Formato: `R$ 1.290,00`
- **Botao:** `"Comprar"` — fundo laranja (`--ecom-action-primary`), texto branco, full-width, border-radius `--ecom-radius-md`
- **Icone favorito:** Coracao (outline) a direita do botao ou no canto do card

**Produtos exatos do design:**

| # | Categoria | Nome | Preco Original | Preco Atual |
|---|-----------|------|---------------|-------------|
| 1 | Hidraulica | Bomba Hidraulica Massey Ferguson 4275 | — | R$ 1.290,00 |
| 2 | Motor | Kit Reparo Motor Valtra BT150 | R$ 990,00 | R$ 890,00 |
| 3 | Transmissao | Embreagem Completa New Holland T7.205 | — | R$ 2.450,00 |

**Cores do card:**
- Fundo: `--ecom-bg-surface` (branco)
- Borda: `--ecom-border-default` (sutil)
- Sombra: `--ecom-shadow-sm`
- Hover: `--ecom-shadow-md`, leve elevacao

**Comportamento interativo:**
- Cards clicaveis (link envolvente para pagina de produto)
- Hover: sombra aumenta, possivel `transform: translateY(-2px)`
- Botao "Comprar": hover com `--ecom-action-primary-hover`
- Icone coracao: toggle favorito (preenchido/outline)
- Possivelmente um carrossel/slider com setas (se houver mais de 3 produtos)

**Imagens necessarias:**
- `assets/images/banners/ofertas-especiais.webp` (ou construido em CSS)
- `assets/images/produtos/bomba-hidraulica-massey-ferguson-4275.webp`
- `assets/images/produtos/kit-reparo-motor-valtra-bt150.webp`
- `assets/images/produtos/embreagem-completa-new-holland-t7-205.webp`

**Classes BEM:**
```
.featured-products
.featured-products__header
.featured-products__heading
.featured-products__subtitle
.featured-products__cta-link
.featured-products__grid
.featured-products__banner

.product-card
.product-card__image-link
.product-card__figure
.product-card__image
.product-card__badge
.product-card__badge--hidraulica
.product-card__badge--motor
.product-card__badge--transmissao
.product-card__body
.product-card__title
.product-card__title-link
.product-card__rating
.product-card__rating-stars
.product-card__pricing
.product-card__price
.product-card__price--original
.product-card__price--discounted
.product-card__cta
.product-card__favorite
```

---

### 7. Marcas que Atendemos

**Tag semantica:** `<section class="brands" aria-labelledby="brands-heading">`

**Layout:** Fundo branco (`--ecom-bg-surface`). Secao centralizada. Titulo centralizado no topo. Abaixo, grid horizontal de logos de marcas, 6 logos em uma unica linha, igualmente espacados. Cada logo dentro de um container com borda arredondada e fundo levemente cinza ou borda sutil.

**Conteudo textual exato:**

- Titulo: `"Marcas que Atendemos"`
  - `<h2>`, `--ecom-text-3xl`, `--ecom-font-bold`, `text-align: center`

- Logos das marcas (da esquerda para direita):
  1. **John Deere** — logo verde/amarelo com cervo
  2. **Massey Ferguson** — logo triangulo vermelho
  3. **New Holland** — logo azul com folha
  4. **Valtra** — logo roxo/texto
  5. **Case IH** — logo vermelho
  6. **Fendt** — logo verde

**Cores:**
- Fundo: `--ecom-bg-surface` (branco)
- Logos: em cores originais (coloridos) ou versao monocromatica com hover colorido
- Container de cada logo: possivel fundo `--ecom-bg-surface-alt` (#F5F5F5) com borda `--ecom-border-default`, border-radius `--ecom-radius-lg`

**Comportamento interativo:**
- Logos sao links para pagina de filtro por marca (`<a href="/marcas/john-deere">`)
- Hover: leve opacidade ou escala sutil
- Possivel carrossel em mobile (swipe horizontal)

**Imagens necessarias:**
- `assets/images/marcas/john-deere.svg`
- `assets/images/marcas/massey-ferguson.svg`
- `assets/images/marcas/new-holland.svg`
- `assets/images/marcas/valtra.svg`
- `assets/images/marcas/case-ih.svg`
- `assets/images/marcas/fendt.svg`

**Classes BEM:**
```
.brands
.brands__container
.brands__heading
.brands__grid
.brands__item
.brands__logo
.brands__link
```

---

### 8. Maquinas Agricolas Disponiveis

**Tag semantica:** `<section class="machines" aria-labelledby="machines-heading">`

**Layout:** Fundo cinza claro (`--ecom-bg-page` / ~#F5F5F5). Padding vertical generoso. Header da secao com titulo/subtitulo a esquerda e botao a direita. Abaixo do header, uma barra de filtro por tabs (categorias de maquinas). Depois, grid de 4 colunas com cards de maquinas.

**NOTA IMPORTANTE:** Esta secao aparece DUAS vezes no design de forma identica (folds 03 e 04 mostram a mesma secao — e a segunda aparicao e a mesma secao continuando, com as tabs de filtro). Trata-se de uma UNICA secao com tabs que filtram o conteudo.

**Header da secao:**
- Titulo: `"Maquinas Agricolas Disponiveis"`
  - `<h2>`, `--ecom-text-3xl`, `--ecom-font-bold`
- Subtitulo: `"Tratores e colheitadeiras selecionados com qualidade e procedencia garantidas"`
  - `--ecom-text-secondary`, `--ecom-text-base`
- Botao a direita: `"Ver Maquinas Disponiveis"`
  - Estilo: fundo escuro (`--ecom-color-neutral-800`), texto branco, border-radius `--ecom-radius-md`
  - Hover: fundo `--ecom-color-neutral-700`

**Barra de tabs/filtros:**
- 5 botoes pill/tab inline:
  1. **Tratores** (ativo — fundo escuro, texto branco)
  2. Colheitadeiras (inativo — fundo branco, borda cinza, texto escuro)
  3. Plantadeiras (inativo)
  4. Pulverizadores (inativo)
  5. Seminovos (inativo)
- Border-radius: `--ecom-radius-full` (pill)
- Tab ativa: fundo `--ecom-color-neutral-800`, texto branco
- Tab inativa: fundo branco, borda `--ecom-border-default`, texto `--ecom-text-primary`
- Hover inativa: fundo cinza claro

**Grid de Machine Cards (4 cards):**

Cada card de maquina tem:
- **Imagem:** Foto da maquina no campo, ratio ~16:10 ou 4:3, border-radius no topo do card (`--ecom-radius-lg`)
- **Badge de marca:** Pill colorida (cor varia por marca)
  - John Deere: verde
  - Massey Ferguson: vermelho
  - New Holland: laranja
  - Valtra: roxo
- **Ano:** Alinhado a direita, na mesma linha do badge. Texto `--ecom-text-secondary`, `--ecom-text-sm`
- **Nome da maquina:** `--ecom-text-base`, `--ecom-font-semibold`, 1-2 linhas
- **Rating:** 5 estrelas (mesmo padrao dos product cards)
- **Preco:** `--ecom-text-lg` ou `--ecom-text-xl`, `--ecom-font-bold`, cor `--ecom-action-primary` (laranja)
  - Formato: `R$ 189.000` (sem centavos para maquinas)
- **Botao:** `"Ver Detalhes"` — fundo laranja, texto branco, full-width, border-radius `--ecom-radius-md`

**Maquinas exatas do design:**

| # | Marca (badge) | Ano | Nome | Preco |
|---|---------------|-----|------|-------|
| 1 | John Deere (verde) | 2022 | John Deere 6110J 4x4 | R$ 189.000 |
| 2 | Massey Ferguson (vermelho) | 2021 | Massey Ferguson 7270 Dyna-6 | R$ 245.000 |
| 3 | New Holland (laranja) | 2023 | New Holland T7.205 AutoCommand | R$ 320.000 |
| 4 | Valtra (roxo) | 2020 | Valtra BM125i 4x4 Turbo | R$ 165.000 |

**Cores:**
- Fundo secao: `--ecom-bg-page` (~#F5F5F5)
- Fundo card: `--ecom-bg-surface` (branco)
- Sombra card: `--ecom-shadow-sm`
- Preco: `--ecom-action-primary` (laranja)

**Comportamento interativo:**
- Tabs filtram os cards por categoria (JS alterna visibilidade ou faz fetch)
- Cards clicaveis (link para detalhe da maquina)
- Hover: sombra aumenta
- Botao "Ver Detalhes": hover `--ecom-action-primary-hover`

**Imagens necessarias:**
- `assets/images/maquinas/john-deere-6110j-4x4.webp`
- `assets/images/maquinas/massey-ferguson-7270-dyna-6.webp`
- `assets/images/maquinas/new-holland-t7-205-autocommand.webp`
- `assets/images/maquinas/valtra-bm125i-4x4-turbo.webp`

**Classes BEM:**
```
.machines
.machines__container
.machines__header
.machines__heading
.machines__subtitle
.machines__cta-link
.machines__tabs
.machines__tab
.machines__tab--active
.machines__grid

.machine-card
.machine-card__image-link
.machine-card__figure
.machine-card__image
.machine-card__meta
.machine-card__brand-badge
.machine-card__brand-badge--john-deere
.machine-card__brand-badge--massey-ferguson
.machine-card__brand-badge--new-holland
.machine-card__brand-badge--valtra
.machine-card__year
.machine-card__body
.machine-card__title
.machine-card__rating
.machine-card__price
.machine-card__cta
```

---

### 9. Navegue por Categoria

**Tag semantica:** `<section class="categories-nav" aria-labelledby="categories-nav-heading">`

**Layout:** Fundo branco (`--ecom-bg-surface`). Padding vertical generoso. Titulo a esquerda com link "Ver Todas" a direita. Abaixo, carrossel horizontal de cards circulares/arredondados de categorias (scroll horizontal). Mostra ~7-8 categorias visiveis com possibilidade de scroll.

**Header da secao:**
- Titulo: `"Navegue por Categoria"`
  - `<h2>`, `--ecom-text-3xl`, `--ecom-font-bold`
- Link a direita: `"Ver Todas"` — texto laranja (`--ecom-action-primary`), sem botao, link simples
  - Hover: sublinhado

**Cards de categoria (carrossel horizontal):**

Cada card tem:
- **Imagem:** Circular ou com border-radius grande, mostrando a peca/categoria. Fundo cinza claro. Tamanho ~120x120px ou 140x140px.
- **Nome da categoria:** Abaixo da imagem, centralizado, `--ecom-text-sm`, `--ecom-font-medium`

**Categorias exatas do design (da esquerda para direita):**

1. Filtros de Ar — imagem: filtros coloridos (laranja/verde)
2. Correias e Rolamentos — imagem: correias pretas
3. Pneus Agricolas — imagem: pneu grande
4. Discos de Arado — imagem: disco metalico redondo
5. Sistema Eletrico — imagem: componentes eletricos
6. Bancos — imagem: assento de trator
7. Correias e... (cortado, visivel parcialmente — indica scroll)

**Cores:**
- Fundo de cada card: `--ecom-bg-surface-alt` (~#F5F5F5), circulo/arredondado
- Texto: `--ecom-text-primary`

**Comportamento interativo:**
- Scroll horizontal nativo (CSS `overflow-x: auto`, `scroll-snap-type: x mandatory`)
- Possivel setas de navegacao nos extremos (esquerda/direita)
- Cada card e um link para pagina de categoria
- Hover: leve escurecimento da imagem ou borda laranja

**Imagens necessarias:**
- `assets/images/categorias/filtros-de-ar.webp`
- `assets/images/categorias/correias-e-rolamentos.webp`
- `assets/images/categorias/pneus-agricolas.webp`
- `assets/images/categorias/discos-de-arado.webp`
- `assets/images/categorias/sistema-eletrico.webp`
- `assets/images/categorias/bancos.webp`
- (+ mais categorias nao visiveis no scroll)

**Classes BEM:**
```
.categories-nav
.categories-nav__container
.categories-nav__header
.categories-nav__heading
.categories-nav__see-all
.categories-nav__carousel
.categories-nav__track

.category-card
.category-card__link
.category-card__image-wrapper
.category-card__image
.category-card__name
```

---

### 10. Produtos em Destaque (2a aparicao)

**Tag semantica:** `<section class="featured-products featured-products--alt" aria-labelledby="featured-products-alt-heading">`

**Layout:** Identico a secao 6 (Produtos em Destaque). Fundo branco. Mesmo layout de 4 colunas: 1 banner promocional + 3 product cards. Reutiliza os mesmos componentes.

**Diferenca em relacao a secao 6:** Pode conter produtos diferentes ou ser um segundo bloco de destaques. No design, os produtos e o banner parecem identicos aos da secao 6. Possivelmente e a mesma secao repetida no design por erro, ou pode ser um carrossel que mostra diferentes conjuntos de produtos.

**NOTA DE IMPLEMENTACAO:** Avaliar se esta secao e de fato duplicada ou se deve ser implementada como uma unica secao com paginacao/carrossel. Se for intencional manter duas instancias, usar IDs e headings diferentes. Se for carrossel, implementar com setas e dots de paginacao.

**Conteudo:** Mesmo da secao 6 — ver detalhes la.

**Botao a direita:** `"Ver Todos os Produtos"` — mesmo estilo

---

### 11. Depoimentos (Social Proof)

**Tag semantica:** `<section class="testimonials" aria-labelledby="testimonials-heading">`

**Layout:** Fundo branco (`--ecom-bg-surface`). Padding vertical generoso. Kicker/overline + titulo + subtitulo centralizados ou alinhados a esquerda. Abaixo, grid de 3 colunas com cards de depoimentos.

**Header da secao:**
- **Kicker/Overline:** `"DEPOIMENTOS DE QUEM PRODUZ"`
  - Texto uppercase, `--ecom-text-xs`, `--ecom-font-semibold`, `letter-spacing: var(--ecom-tracking-widest)`
  - Cor: `--ecom-action-primary` (laranja)
- **Titulo:** `"Quem vive o agro confia no Grupo PLA"`
  - `<h2>`, `--ecom-text-3xl` ou `--ecom-text-4xl`, `--ecom-font-bold`
- **Subtitulo:**
  ```
  Relatos de produtores e gestores que contam com nossas pecas e equipamentos para manter a operacao agricola com maximo desempenho.
  ```
  - `--ecom-text-secondary`, `--ecom-text-base`

**Cards de depoimento (3 cards):**

Cada card tem:
- Fundo: `--ecom-bg-surface` ou verde muito claro/mint (`~#F0FDF4` ou similar tom esverdeado)
- Borda: sutil, possivelmente verde claro
- Border-radius: `--ecom-radius-lg`
- **Aspas/texto do depoimento:** Texto entre aspas, `--ecom-text-sm`, `--ecom-font-regular`, `--ecom-text-primary`
- **Avatar:** Icone de pessoa ou foto circular (~40px), a esquerda
- **Nome:** `--ecom-font-semibold`, `--ecom-text-sm`
- **Localizacao e cargo:** `--ecom-text-secondary`, `--ecom-text-xs`
- **Rating:** 5 estrelas laranja/amarelas preenchidas

**Depoimentos exatos:**

1. **Marcos Tavares**
   - Local: `Sorriso, MT`
   - Cargo: `Gerente de Frota`
   - Rating: 5 estrelas
   - Texto: `"Depois que passamos a comprar pecas do Grupo PLA, o tempo de maquina parada na safra caiu muito. Atendimento agil e produto confiavel."`

2. **Patricia Gomes**
   - Local: `Rio Verde, GO`
   - Cargo: `Produtora Rural`
   - Rating: 5 estrelas
   - Texto: `"Nossas colheitadeiras ganharam regularidade apos a revisao com componentes da PLA. E qualidade para aguentar o ritmo do campo."`

3. **Joao Henrique Lima**
   - Local: `BA`
   - Cargo: `Coordenador de Operacoes`
   - Rating: 5 estrelas
   - Texto: `"No plantio, cada hora conta. A disponibilidade de pecas e o suporte tecnico da equipe PLA fazem diferenca real na nossa produtividade."`

**Cores:**
- Fundo cards: tom verde muito claro/mint (#F0FDF4 ou similar)
- Borda cards: verde claro sutil
- Texto depoimento: `--ecom-text-primary`
- Estrelas: laranja/amarelo (`--ecom-color-secondary-500` ou `--ecom-action-primary`)

**Comportamento interativo:**
- Estatico (sem carrossel no desktop)
- Possivel carrossel em mobile (1 card por vez)

**Classes BEM:**
```
.testimonials
.testimonials__container
.testimonials__kicker
.testimonials__heading
.testimonials__subtitle
.testimonials__grid

.testimonial-card
.testimonial-card__quote
.testimonial-card__author
.testimonial-card__avatar
.testimonial-card__name
.testimonial-card__role
.testimonial-card__rating
```

---

### 12. Ofertas e Campanhas

**Tag semantica:** `<section class="campaigns" aria-labelledby="campaigns-heading">`

**Layout:** Fundo branco (`--ecom-bg-surface`). Padding vertical generoso. Titulo a esquerda, link "Ver todas" a direita. Abaixo, grid assimetrico (mosaic layout) com 3 banners: 1 grande a esquerda + 2 empilhados a direita.

**Header da secao:**
- Titulo: `"Ofertas e campanhas"`
  - `<h2>`, `--ecom-text-3xl`, `--ecom-font-bold`
- Link a direita: `"Ver todas"` — texto laranja, link simples

**Grid de banners (layout mosaico):**

Layout CSS Grid:
```
+----------------------------+-------------------+
|                            |  Banner 2 (top)   |
|    Banner 1 (grande)       +-------------------+
|                            |  Banner 3 (bottom)|
+----------------------------+-------------------+
```

- **Coluna esquerda (~60% width):** Banner 1 — ocupa altura total
- **Coluna direita (~40% width):** Banner 2 no topo + Banner 3 embaixo (metade da altura cada)

**Banner 1 (grande, esquerda):**
- Imagem: Trator no campo ao por do sol, foto dramatica
- Overlay escuro gradiente na parte inferior
- Texto sobre a imagem, parte inferior:
  - `"Condicao especial para tratores"`
  - `"Linha pesada"`
- Texto branco, bold, `--ecom-text-xl` ou `--ecom-text-2xl`
- Border-radius: `--ecom-radius-lg`

**Banner 2 (pequeno, direita superior):**
- Imagem: Colheitadeira trabalhando no campo
- Overlay leve
- Texto sobre a imagem:
  - `"Frete gratis"`
  - `"em pedidos acima de R$ 2.500"`
- Texto branco
- Border-radius: `--ecom-radius-lg`

**Banner 3 (pequeno, direita inferior):**
- Imagem: Colheitadeira + foto de galpao/estoque (2 imagens lado a lado ou split)
- Texto sobre a imagem:
  - `"Queima de estoque"`
  - `"de componentes selecionados"`
- Texto branco
- Border-radius: `--ecom-radius-lg`

**Cores:**
- Overlay dos banners: gradiente escuro na base (`linear-gradient(to top, rgba(0,0,0,0.6), transparent)`)
- Texto: branco

**Comportamento interativo:**
- Cada banner e um link clicavel para a respectiva campanha
- Hover: leve zoom na imagem (`transform: scale(1.03)`) com `overflow: hidden` no container

**Imagens necessarias:**
- `assets/images/campanhas/condicao-tratores-linha-pesada.webp`
- `assets/images/campanhas/frete-gratis-acima-2500.webp`
- `assets/images/campanhas/queima-estoque-componentes.webp`

**Classes BEM:**
```
.campaigns
.campaigns__container
.campaigns__header
.campaigns__heading
.campaigns__see-all
.campaigns__grid

.campaign-card
.campaign-card--large
.campaign-card--small
.campaign-card__link
.campaign-card__image
.campaign-card__overlay
.campaign-card__content
.campaign-card__title
.campaign-card__subtitle
```

---

### 13. CTA de Ajuda + FAQ

**Tag semantica:** `<section class="help-cta" aria-labelledby="help-cta-heading">`

**Layout:** Fundo branco. Duas subsecoes verticais dentro:
1. **Bloco CTA** (titulo + barra escura com botoes)
2. **FAQ** (accordion + imagem)

#### 13.1 Bloco CTA Superior

**Titulo centralizado:**
- `"Precisa de ajuda para encontrar a peca certa?"`
  - `<h2>`, `--ecom-text-3xl` ou `--ecom-text-4xl`, `--ecom-font-bold`, `text-align: center`
- Subtitulo: `"Fale com nosso time tecnico e receba recomendacao rapida com disponibilidade real de estoque."`
  - `--ecom-text-secondary`, `--ecom-text-base`, `text-align: center`

**Barra escura de CTA:**
- Fundo: `--ecom-color-neutral-900` (~#1A2332, navy escuro)
- Border-radius: `--ecom-radius-xl` ou `--ecom-radius-2xl`
- Padding: `var(--ecom-space-6) var(--ecom-space-8)`
- Layout flex horizontal: texto a esquerda, botoes a direita
- **Texto a esquerda:**
  - Titulo: `"Atendimento especializado para maquinas agricolas"` — branco, `--ecom-font-semibold`
  - Subtitulo: `"Envie o modelo da maquina ou codigo da peca e retornamos com opcoes compativeis."` — branco opaco, `--ecom-text-sm`
- **Botoes a direita (2 botoes):**
  1. `"Chamar no WhatsApp"` — fundo laranja (`--ecom-action-primary`), texto branco, icone WhatsApp
  2. `"Ver Catalogo"` — fundo transparente/ghost, borda branca, texto branco
  - Ambos com border-radius `--ecom-radius-md`

#### 13.2 FAQ (Perguntas Frequentes)

**Layout:** 2 colunas — accordion a esquerda (~55-60%), imagem a direita (~40-45%).

**Titulo:** `"Perguntas frequentes"`
- `<h3>` ou `<h2>`, `--ecom-text-2xl`, `--ecom-font-bold`

**Accordion (5 perguntas):**

Cada item tem:
- Borda inferior cinza (`--ecom-border-default`)
- Texto da pergunta a esquerda, icone `+` a direita
- Ao expandir: icone muda para `-` ou `×`, resposta aparece abaixo
- `--ecom-text-sm` ou `--ecom-text-base`, `--ecom-font-medium`

**Perguntas exatas:**

1. `"Como confirmar compatibilidade da peca com meu equipamento?"`
2. `"Voces enviam para todo o Brasil?"`
3. `"Qual o prazo medio para separacao e envio?"`
4. `"As pecas possuem garantia?"`
5. `"Posso comprar pelo CNPJ com faturamento?"`

**Imagem a direita:**
- Foto de trator John Deere verde no campo
- Border-radius: `--ecom-radius-lg`
- `loading="lazy"`

**Comportamento interativo (accordion):**
- Clicar em uma pergunta expande a resposta e fecha as demais (comportamento exclusivo) ou permite multiplas abertas
- Animacao suave de abertura/fechamento (height transition)
- Icone `+` rotaciona ou muda para `-`
- Atributos de acessibilidade obrigatorios:
  - `<button aria-expanded="false/true" aria-controls="faq-answer-N">`
  - `<div id="faq-answer-N" role="region" aria-labelledby="faq-question-N" hidden>`

**Imagem necessaria:**
- `assets/images/faq/trator-campo.webp`

**Classes BEM:**
```
.help-cta
.help-cta__container
.help-cta__heading
.help-cta__subtitle
.help-cta__bar
.help-cta__bar-content
.help-cta__bar-title
.help-cta__bar-description
.help-cta__bar-actions
.help-cta__bar-btn
.help-cta__bar-btn--primary
.help-cta__bar-btn--secondary

.faq
.faq__container
.faq__heading
.faq__grid
.faq__list
.faq__item
.faq__question
.faq__question-text
.faq__question-icon
.faq__answer
.faq__image-wrapper
.faq__image
```

---

### 14. Newsletter Bar

**Tag semantica:** `<section class="newsletter" aria-labelledby="newsletter-heading">`

**Layout:** Faixa horizontal full-width. Fundo navy escuro (`--ecom-color-neutral-800` ou `--ecom-color-neutral-900`). Padding vertical `var(--ecom-space-6)`. Layout flex horizontal: icone + texto a esquerda, campo email + botao a direita.

**Conteudo textual exato:**

- **Icone:** Circulo branco ou claro com icone de email/envelope dentro (lado esquerdo)
- **Texto:**
  - Titulo: `"Newsletter"` — branco, `--ecom-font-bold`, `--ecom-text-lg`
  - Subtitulo: `"Inscreva-se para receber dicas e promocoes"` — branco opaco, `--ecom-text-sm`
- **Formulario:**
  - Input email: placeholder `"seu e-mail..."`, fundo branco, border-radius `--ecom-radius-md` (no lado esquerdo)
  - Botao: `"Enviar"` — fundo laranja (`--ecom-action-primary`), texto branco, border-radius `--ecom-radius-md` (no lado direito)
  - Input e botao lado a lado, formando um grupo unido (input-group)

**Cores:**
- Fundo: `--ecom-color-neutral-800` ou `--ecom-color-neutral-900`
- Texto: branco
- Input: fundo branco, texto escuro
- Botao: fundo `--ecom-action-primary` (laranja)

**Comportamento interativo:**
- Submit do formulario: enviar email para lista de newsletter (JS fetch ou form action)
- Validacao de email (HTML5 + JS)
- Feedback apos envio: toast ou mensagem inline de sucesso

**Classes BEM:**
```
.newsletter
.newsletter__container
.newsletter__content
.newsletter__icon
.newsletter__heading
.newsletter__subtitle
.newsletter__form
.newsletter__input
.newsletter__submit
```

---

### 15. Footer Principal

**Tag semantica:** `<footer class="site-footer" role="contentinfo">`

**Layout:** Fundo navy escuro (`--ecom-color-neutral-900` / ~#1A2332). Padding vertical generoso. Grid de 5 colunas desiguais dentro do container:

1. **Coluna 1 (~25%)** — Logo + descricao + redes sociais
2. **Coluna 2 (~15%)** — Institucional
3. **Coluna 3 (~15%)** — Categorias
4. **Coluna 4 (~15%)** — Contato
5. **Coluna 5 (~30%)** — Visite Nossa Loja (mapa)

#### Coluna 1 — Logo e Descricao

- **Logo:** Versao branca do logo (`assets/images/logo/logo-white.svg`)
- **Descricao:** `"Especialistas em pecas e veiculos pesados. Mais de 15 anos servindo o agronegocio e o transporte brasileiro."`
  - Texto branco opaco (~rgba(255,255,255,0.7)), `--ecom-text-sm`
- **Icones de redes sociais:** 3 icones circulares (fundo cinza escuro, icone branco)
  - Instagram
  - Facebook
  - YouTube

#### Coluna 2 — Institucional

- **Titulo:** `"Institucional"` — branco, `--ecom-font-semibold`, `--ecom-text-sm`
- **Links (lista vertical):**
  - Sobre nos
  - Politicas de Troca
  - Politicas de Frete
  - Politicas de Cookies
  - Assistencia tecnica
  - Blog
- Texto: branco opaco, `--ecom-text-sm`, hover: branco total ou laranja

#### Coluna 3 — Categorias

- **Titulo:** `"Categorias"` — branco, `--ecom-font-semibold`, `--ecom-text-sm`
- **Links:**
  - Pecas
  - Estoque
  - Novos
  - Marcas
  - Locacao
  - Contato

#### Coluna 4 — Contato

- **Titulo:** `"Contato"` — branco, `--ecom-font-semibold`, `--ecom-text-sm`
- **Itens:**
  - Icone telefone + `(11) 4002-8922`
  - Icone email + `contato@grupopla.com.br`
  - Icone relogio + `Seg-Sex: 8h as 18h`

#### Coluna 5 — Visite Nossa Loja

- **Titulo:** `"Visite Nossa Loja"` — branco, `--ecom-font-semibold`, `--ecom-text-sm`
- **Endereco:** Icone pin + `"Av. Industrial, 1234 - SP"`
- **Mapa:** Embed do Google Maps (iframe) mostrando localizacao, com border-radius `--ecom-radius-lg`
  - Link: `"Abrir no Maps"` (link externo)
  - Tamanho: ~250x180px

**Cores:**
- Fundo: `--ecom-color-neutral-900` (~#1A2332)
- Texto: branco com opacidade variavel
- Titulos: branco total
- Links: branco opaco, hover branco ou laranja
- Icones sociais: fundo `--ecom-color-neutral-700`, icone branco; hover: fundo laranja

**Classes BEM:**
```
.site-footer
.site-footer__container
.site-footer__grid
.site-footer__brand
.site-footer__logo
.site-footer__description
.site-footer__social
.site-footer__social-link
.site-footer__nav
.site-footer__nav-title
.site-footer__nav-list
.site-footer__nav-link
.site-footer__contact
.site-footer__contact-item
.site-footer__contact-icon
.site-footer__map
.site-footer__map-title
.site-footer__map-address
.site-footer__map-embed
```

---

### 16. Sub-footer (Pagamento + Politicas)

**Tag semantica:** Dentro de `<footer>`, como `<div class="sub-footer">`

**Layout:** Fundo ligeiramente diferente do footer (pode ser o mesmo navy ou um tom levemente mais escuro). Borda superior sutil separando do footer principal. Layout flex horizontal: formas de pagamento a esquerda, links de politicas a direita.

**Conteudo textual exato:**

- **Esquerda:**
  - Label: `"Formas de Pagamento"` — branco, `--ecom-font-semibold`, `--ecom-text-sm`
  - Badges/pills de pagamento lado a lado:
    - `PIX` — pill com borda, fundo escuro
    - `VISA` — pill com borda
    - `MASTER` — pill com borda
    - `BOLETO` — pill com borda
  - Cada badge: border-radius `--ecom-radius-md`, borda cinza, texto branco, `--ecom-text-xs`

- **Direita:**
  - `"Politica de Privacidade"` | `"Termos de Uso"`
  - Links separados por pipe (`|`)
  - Texto branco opaco, `--ecom-text-sm`

**Classes BEM:**
```
.sub-footer
.sub-footer__container
.sub-footer__payments
.sub-footer__payments-label
.sub-footer__payment-badge
.sub-footer__links
.sub-footer__link
```

---

### 17. Copyright Bar

**Tag semantica:** Dentro de `<footer>`, como `<div class="copyright">`

**Layout:** Ultima linha do footer. Fundo igual ao footer. Borda superior sutil ou sem. Texto centralizado ou alinhado a esquerda.

**Conteudo textual exato:**
- `"© 2025 Grupo PLA. Todos os direitos reservados."`

**Tipografia:** `--ecom-text-xs`, `--ecom-font-regular`, branco opaco

**Classes BEM:**
```
.copyright
.copyright__container
.copyright__text
```

---

## Componentes Necessarios

Lista de componentes CSS/JS a criar para a home (e reutilizaveis em outras paginas):

### CSS (`template/assets/css/components/`)

| Arquivo | Componente | Usado nas secoes |
|---------|-----------|-----------------|
| `top-bar.css` | Barra de contato no topo | 1 |
| `site-header.css` | Header com logo, busca, acoes | 2 |
| `main-nav.css` | Navegacao principal | 3 |
| `hero.css` | Banner hero com overlay | 4 |
| `trust-bar.css` | Cards de diferenciais | 5 |
| `product-card.css` | Card de produto (pecas) | 6, 10 |
| `machine-card.css` | Card de maquinario | 8 |
| `category-card.css` | Card circular de categoria | 9 |
| `testimonial-card.css` | Card de depoimento | 11 |
| `campaign-card.css` | Banner de campanha | 12 |
| `accordion.css` | FAQ accordion | 13 |
| `newsletter.css` | Barra de newsletter | 14 |
| `site-footer.css` | Footer completo + sub-footer + copyright | 15, 16, 17 |
| `buttons.css` | Todos os estilos de botao | Todas |
| `rating.css` | Estrelas de avaliacao | 6, 8, 10, 11 |
| `badges.css` | Pills/badges de categoria e marca | 6, 8 |
| `section-header.css` | Header padrao de secao (titulo + subtitulo + CTA) | 6, 8, 9, 10, 11, 12 |

### JS (`template/assets/js/components/`)

| Arquivo | Funcionalidade |
|---------|---------------|
| `header-search.js` | Busca com sugestoes |
| `tabs.js` | Tabs de filtro (maquinas) |
| `carousel.js` | Carrossel horizontal (categorias, possivelmente produtos) |
| `accordion.js` | FAQ expandir/colapsar |
| `newsletter-form.js` | Validacao e submit do formulario |
| `favorite.js` | Toggle favorito nos product cards |

### JS (`template/assets/js/pages/`)

| Arquivo | Funcionalidade |
|---------|---------------|
| `home.js` | Orquestra todos os componentes da home |

---

## Dados Estruturados (JSON-LD)

### Organization (obrigatorio em todas as paginas)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grupo PLA",
  "url": "https://www.grupopla.com.br",
  "logo": "https://www.grupopla.com.br/assets/images/logo/logo.png",
  "description": "Especialistas em pecas e equipamentos para o agronegocio. Mais de 15.000 itens em estoque para tratores, colheitadeiras e implementos agricolas.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-4000-0000",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Industrial, 1234",
    "addressLocality": "Ribeirao Preto",
    "addressRegion": "SP",
    "postalCode": "00000-000",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.facebook.com/grupopla",
    "https://www.instagram.com/grupopla",
    "https://www.youtube.com/grupopla",
    "https://www.linkedin.com/company/grupopla"
  ]
}
```

### WebSite + SearchAction (apenas na home)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Grupo PLA",
  "url": "https://www.grupopla.com.br",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.grupopla.com.br/busca?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### LocalBusiness / Store (home)

```json
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Grupo PLA",
  "image": "https://www.grupopla.com.br/assets/images/fachada.webp",
  "url": "https://www.grupopla.com.br",
  "telephone": "+55-11-4000-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Industrial, 1234",
    "addressLocality": "Ribeirao Preto",
    "addressRegion": "SP",
    "postalCode": "00000-000",
    "addressCountry": "BR"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
}
```

### FAQPage (para a secao de perguntas frequentes)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como confirmar compatibilidade da peca com meu equipamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta a ser preenchida pelo cliente]"
      }
    },
    {
      "@type": "Question",
      "name": "Voces enviam para todo o Brasil?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta a ser preenchida pelo cliente]"
      }
    },
    {
      "@type": "Question",
      "name": "Qual o prazo medio para separacao e envio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta a ser preenchida pelo cliente]"
      }
    },
    {
      "@type": "Question",
      "name": "As pecas possuem garantia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta a ser preenchida pelo cliente]"
      }
    },
    {
      "@type": "Question",
      "name": "Posso comprar pelo CNPJ com faturamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Resposta a ser preenchida pelo cliente]"
      }
    }
  ]
}
```

---

## Notas de Implementacao

### Meta Tags do `<head>`

```html
<title>Grupo PLA — Pecas e Equipamentos para o Agronegocio</title>
<meta name="description" content="Mais de 15.000 pecas originais e remanufaturadas para tratores, colheitadeiras e implementos agricolas. Financiamento BNDES, frete gratis e entrega nacional. Grupo PLA.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.grupopla.com.br/">
<meta property="og:type" content="website">
<meta property="og:title" content="Grupo PLA — Pecas e Equipamentos para o Agronegocio">
<meta property="og:description" content="Mais de 15.000 pecas originais e remanufaturadas para tratores, colheitadeiras e implementos agricolas.">
<meta property="og:image" content="https://www.grupopla.com.br/assets/images/og-image.jpg">
<meta property="og:url" content="https://www.grupopla.com.br/">
<meta property="og:site_name" content="Grupo PLA">
<meta property="og:locale" content="pt_BR">
```

### Ordem de CSS no `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">

<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/layout.css">
<link rel="stylesheet" href="/assets/css/components/buttons.css">
<link rel="stylesheet" href="/assets/css/components/badges.css">
<link rel="stylesheet" href="/assets/css/components/rating.css">
<link rel="stylesheet" href="/assets/css/components/section-header.css">
<link rel="stylesheet" href="/assets/css/components/top-bar.css">
<link rel="stylesheet" href="/assets/css/components/site-header.css">
<link rel="stylesheet" href="/assets/css/components/main-nav.css">
<link rel="stylesheet" href="/assets/css/components/hero.css">
<link rel="stylesheet" href="/assets/css/components/trust-bar.css">
<link rel="stylesheet" href="/assets/css/components/product-card.css">
<link rel="stylesheet" href="/assets/css/components/machine-card.css">
<link rel="stylesheet" href="/assets/css/components/category-card.css">
<link rel="stylesheet" href="/assets/css/components/testimonial-card.css">
<link rel="stylesheet" href="/assets/css/components/campaign-card.css">
<link rel="stylesheet" href="/assets/css/components/accordion.css">
<link rel="stylesheet" href="/assets/css/components/newsletter.css">
<link rel="stylesheet" href="/assets/css/components/site-footer.css">
<link rel="stylesheet" href="/assets/css/pages/home.css">
```

### Preload da Hero Image

```html
<link rel="preload" as="image" href="/assets/images/hero/hero-home.webp" fetchpriority="high">
```

### JS ao final do `<body>`

```html
<script type="module" src="/assets/js/pages/home.js"></script>
```

### Responsividade

A home segue mobile-first. Breakpoints principais:

| Breakpoint | Adaptacao |
|-----------|-----------|
| < 480px (xs) | 1 coluna para tudo. Hero com texto menor. Trust bar empilhado. Cards em coluna unica. |
| >= 480px (sm) | Trust bar 2x2. Product cards 2 colunas (sem banner). |
| >= 768px (md) | Trust bar 4 colunas. Product cards 2 colunas + banner. Machine cards 2 colunas. |
| >= 1024px (lg) | Layout completo. Product cards 1 banner + 3 cards. Machine cards 4 colunas. |
| >= 1280px (xl) | Container max-width. Espacamentos maiores. |

### Performance

- Hero image: `fetchpriority="high"`, preload no `<head>` — e o LCP
- Todas as outras imagens: `loading="lazy"`
- Mapa do Google no footer: carregar via `loading="lazy"` no iframe ou via Intersection Observer
- Logo: nao usar lazy (above the fold)
- Imagens de produto e maquinas: WebP, com `width` e `height` declarados

### Acessibilidade

- Skip link como primeiro elemento do `<body>`
- Cada secao com `aria-labelledby` apontando para seu heading
- Accordion do FAQ com `aria-expanded`, `aria-controls`, `role="region"`
- Tabs de maquinas com `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Rating stars com `aria-label="Avaliacao: X de 5 estrelas"`
- Todos os icones decorativos com `aria-hidden="true"` e `alt=""`
- Botoes icon-only com `aria-label` descritivo
- Formulario de newsletter com `<label>` para o input (pode ser `aria-label` se label visual nao existir)

### Secoes com fundo alternado

Para criar ritmo visual, as secoes alternam fundos:

| Secao | Fundo |
|-------|-------|
| Top Bar | Navy escuro |
| Header | Branco |
| Nav | Branco |
| Hero | Imagem + overlay escuro |
| Trust Bar | Branco (elevado sobre hero) |
| Produtos em Destaque | Branco |
| Marcas | Branco |
| Maquinas Agricolas | Cinza claro (#F5F5F5) |
| Navegue por Categoria | Branco |
| Produtos em Destaque (2) | Branco |
| Depoimentos | Branco |
| Ofertas e Campanhas | Branco |
| CTA + FAQ | Branco |
| Newsletter | Navy escuro |
| Footer | Navy escuro |
| Sub-footer | Navy escuro |
| Copyright | Navy escuro |

### Imagens — Inventario Completo

| Caminho | Descricao | Dimensoes sugeridas |
|---------|-----------|-------------------|
| `assets/images/logo/logo.png` | Logo principal (fundo claro) | 160x40 |
| `assets/images/logo/logo-white.svg` | Logo branco (fundo escuro) | 160x40 |
| `assets/images/logo/favicon.svg` | Favicon | 32x32 |
| `assets/images/hero/hero-home.webp` | Trator no campo ao por do sol | 1920x600 |
| `assets/images/icons/phone.svg` | Icone telefone | 20x20 |
| `assets/images/icons/whatsapp.svg` | Icone WhatsApp | 20x20 |
| `assets/images/icons/email.svg` | Icone email | 20x20 |
| `assets/images/icons/cart.svg` | Icone carrinho | 24x24 |
| `assets/images/icons/search.svg` | Icone lupa | 20x20 |
| `assets/images/icons/heart.svg` | Icone favorito (coracao) | 20x20 |
| `assets/images/icons/star.svg` | Icone estrela (rating) | 16x16 |
| `assets/images/icons/star-filled.svg` | Estrela preenchida | 16x16 |
| `assets/images/icons/plus.svg` | Icone + (accordion) | 16x16 |
| `assets/images/icons/arrow-right.svg` | Seta direita | 16x16 |
| `assets/images/icons/facebook.svg` | Icone Facebook | 20x20 |
| `assets/images/icons/instagram.svg` | Icone Instagram | 20x20 |
| `assets/images/icons/youtube.svg` | Icone YouTube | 20x20 |
| `assets/images/icons/linkedin.svg` | Icone LinkedIn | 20x20 |
| `assets/images/icons/clock.svg` | Icone relogio | 20x20 |
| `assets/images/icons/map-pin.svg` | Icone pin de mapa | 20x20 |
| `assets/images/icons/shield.svg` | Icone escudo (garantia) | 32x32 |
| `assets/images/icons/truck.svg` | Icone caminhao (frete) | 32x32 |
| `assets/images/icons/dollar.svg` | Icone dolar (financiamento) | 32x32 |
| `assets/images/icons/globe.svg` | Icone globo (entrega nacional) | 32x32 |
| `assets/images/banners/ofertas-especiais.webp` | Banner 30% OFF pecas | 300x500 |
| `assets/images/produtos/bomba-hidraulica-massey-ferguson-4275.webp` | Foto produto | 400x400 |
| `assets/images/produtos/kit-reparo-motor-valtra-bt150.webp` | Foto produto | 400x400 |
| `assets/images/produtos/embreagem-completa-new-holland-t7-205.webp` | Foto produto | 400x400 |
| `assets/images/maquinas/john-deere-6110j-4x4.webp` | Foto trator | 600x400 |
| `assets/images/maquinas/massey-ferguson-7270-dyna-6.webp` | Foto trator | 600x400 |
| `assets/images/maquinas/new-holland-t7-205-autocommand.webp` | Foto trator | 600x400 |
| `assets/images/maquinas/valtra-bm125i-4x4-turbo.webp` | Foto trator | 600x400 |
| `assets/images/categorias/filtros-de-ar.webp` | Foto categoria | 200x200 |
| `assets/images/categorias/correias-e-rolamentos.webp` | Foto categoria | 200x200 |
| `assets/images/categorias/pneus-agricolas.webp` | Foto categoria | 200x200 |
| `assets/images/categorias/discos-de-arado.webp` | Foto categoria | 200x200 |
| `assets/images/categorias/sistema-eletrico.webp` | Foto categoria | 200x200 |
| `assets/images/categorias/bancos.webp` | Foto categoria | 200x200 |
| `assets/images/campanhas/condicao-tratores-linha-pesada.webp` | Banner campanha grande | 800x500 |
| `assets/images/campanhas/frete-gratis-acima-2500.webp` | Banner campanha pequeno | 500x240 |
| `assets/images/campanhas/queima-estoque-componentes.webp` | Banner campanha pequeno | 500x240 |
| `assets/images/faq/trator-campo.webp` | Foto trator para FAQ | 500x400 |
| `assets/images/marcas/john-deere.svg` | Logo John Deere | 120x60 |
| `assets/images/marcas/massey-ferguson.svg` | Logo Massey Ferguson | 120x60 |
| `assets/images/marcas/new-holland.svg` | Logo New Holland | 120x60 |
| `assets/images/marcas/valtra.svg` | Logo Valtra | 120x60 |
| `assets/images/marcas/case-ih.svg` | Logo Case IH | 120x60 |
| `assets/images/marcas/fendt.svg` | Logo Fendt | 120x60 |

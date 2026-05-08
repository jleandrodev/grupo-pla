# 02 — Categoria (categoria.html)

Página de listagem de peças por categoria. Exibe subcategorias em carrossel, sidebar de filtros à esquerda, grid de produtos 3 colunas, paginação numérica e seção de conteúdo SEO abaixo do grid.

---

## Referencia Visual

| Arquivo | Conteudo |
|---------|----------|
| `references/screenshots/02-categoria/full-page.png` | Captura full-page desktop |
| `references/screenshots/02-categoria/fold-01.png` | Hero + subcategorias + inicio do grid |
| `references/screenshots/02-categoria/fold-02.png` | Grid de produtos (linhas 1-3) |
| `references/screenshots/02-categoria/fold-03.png` | Ultima linha do grid + paginacao + secao SEO + inicio footer |
| `references/screenshots/02-categoria/fold-04.png` | Sub-footer (pagamento, copyright) |
| `Categoria — Grupo PLA desktop.pdf` | PDF fonte do layout |

---

## Secoes (top to bottom)

---

### 1. Top Bar / Header / Nav (compartilhado — apenas referencia)

Componentes globais identicos a todas as paginas. Consultar `00-page-map.md` para detalhes completos.

**Resumo rapido visivel no layout:**

#### 1.1 Top Bar
- Fundo: navy escuro (`--ecom-color-neutral-900` / `~#1A2332`)
- Lado esquerdo: icone telefone + "(11) 4000-0000" | icone WhatsApp + "(11) 99999-0000" | icone email + "contato@grupopla.com.br"
- Lado direito: icones sociais (Facebook, Instagram, YouTube, LinkedIn) em branco
- Texto: `--ecom-text-xs`, cor branca (`--ecom-text-inverse`)
- Altura: ~36px

#### 1.2 Header Principal
- Fundo: branco (`--ecom-bg-surface`)
- Layout: flex, 3 areas — logo | campo de busca | acoes
- **Logo:** "Logoipsum" (placeholder) alinhado a esquerda, ~160px de largura
- **Campo de busca:** centralizado, largura ~400px, fundo cinza claro (`--ecom-bg-surface-alt`), border-radius full (`--ecom-radius-full`), icone lupa a esquerda, placeholder "Buscar pecas, veiculos, marcas..."
- **Acoes a direita:** botao "WhatsApp" (fundo laranja `--ecom-action-primary`, icone WhatsApp branco + texto "WhatsApp", border-radius full) | icone carrinho (outline, cor escura)
- Altura: ~64px
- Sombra sutil no header: `--ecom-shadow-sm`

#### 1.3 Menu de Navegacao
- Fundo: branco, logo abaixo do header (ou parte inferior do header)
- Itens em linha: **Pecas** (ativo) | Estoque | Novos | Marcas | Locacao | Meus Clientes | Contato
- Item ativo ("Pecas"): texto laranja (`--ecom-action-primary`) com sublinhado laranja (borda inferior 2-3px)
- Itens inativos: texto escuro (`--ecom-text-primary`), hover muda para laranja
- Font-size: `--ecom-text-sm`, font-weight: `--ecom-font-medium`
- Espacamento entre itens: `--ecom-space-6` a `--ecom-space-8`

---

### 2. Hero Banner com Breadcrumb

**Tag semantica:** `<section>` com imagem de fundo, contendo `<nav>` para breadcrumb e `<h1>`

**Layout:**
- Largura: 100% da viewport (full-bleed)
- Altura: ~200px desktop
- Imagem de fundo: foto de ambiente industrial/armazem com pecas e estruturas metalicas, tonalidade escurecida com overlay semi-transparente escuro (~60-70% opacidade) para garantir legibilidade do texto
- Texto alinhado a esquerda, dentro do container (`--ecom-container-max: 1280px`)
- Padding vertical: `--ecom-space-10` a `--ecom-space-12`
- Padding horizontal: `--ecom-container-pad`

**Breadcrumb:**
- Posicao: acima do titulo, topo do banner
- Texto: branco com opacidade reduzida (~70%)
- Formato: "Home / Pecas para Tratores"
- Separador: " / " (barra)
- "Home" e "Pecas para Tratores" sao links (o ultimo nao e clicavel, indica pagina atual)
- Font-size: `--ecom-text-sm`
- Tag: `<nav aria-label="Breadcrumb">` com `<ol>` e microdata Schema.org BreadcrumbList

**Titulo (H1):**
- Texto exato: **"Pecas para Tratores"**
- Cor: branco (`--ecom-text-inverse`)
- Font-size: `--ecom-text-4xl` (~36px) ou `--ecom-text-5xl` (~48px)
- Font-weight: `--ecom-font-bold`
- Font-family: `--ecom-font-heading`

**Subtitulo:**
- Texto exato: **"Encontre as melhores pecas originais e remanufaturadas para o seu trator."**
- Cor: branco com leve opacidade (~80-90%)
- Font-size: `--ecom-text-base` ou `--ecom-text-lg`
- Font-weight: `--ecom-font-regular`
- Margin-top: `--ecom-space-2`

**Imagem de fundo:**
- Foto de um armazem/galpao industrial com estruturas metalicas, prateleiras de pecas, ambiente em tons de laranja/amarelo quente (iluminacao industrial)
- Overlay: gradiente ou cor solida `rgba(26, 35, 50, 0.65)` (navy escuro semi-transparente)
- `background-size: cover; background-position: center;`

---

### 3. Carrossel de Subcategorias

**Tag semantica:** `<section>` com heading "Explore subcategorias"

**Layout:**
- Posicao: imediatamente abaixo do hero, dentro da area de conteudo principal (ao lado direito da sidebar de filtros)
- Fundo: branco (`--ecom-bg-surface`)
- Padding: `--ecom-space-6` em todos os lados
- Border-radius: `--ecom-radius-lg`
- A secao ocupa a largura da area de conteudo (excluindo sidebar) — aproximadamente 75% do container

**Heading:**
- Texto exato: **"Explore subcategorias"**
- Font-size: `--ecom-text-xl` ou `--ecom-text-2xl`
- Font-weight: `--ecom-font-bold`
- Cor: `--ecom-text-primary`
- Alinhado a esquerda

**Setas de navegacao:**
- Duas setas circulares posicionadas a direita do heading (na mesma linha)
- Seta esquerda: circulo com borda cinza (`--ecom-border-default`), seta chevron cinza
- Seta direita: circulo com fundo laranja (`--ecom-action-primary`), seta chevron branca
- Tamanho: ~36-40px de diametro
- A seta ativa (direita) indica que ha mais itens para rolar

**Itens do carrossel:**
- Layout: flex horizontal, 6 itens visiveis por vez (possibilidade de mais com scroll)
- Espacamento entre itens: `--ecom-space-4` a `--ecom-space-6`

**Cada item de subcategoria:**
- Container: retangulo vertical com borda cinza claro (`--ecom-border-default`, ~1px), border-radius: `--ecom-radius-lg`
- Padding: `--ecom-space-4`
- Largura: ~120-140px
- Imagem: foto circular ou recorte de peca em fundo cinza claro (`--ecom-bg-surface-alt`), centralizada, ~80px de diametro
- Label: texto abaixo da imagem, centralizado
- Font-size: `--ecom-text-sm`
- Font-weight: `--ecom-font-medium`
- Cor: `--ecom-text-primary`

**Subcategorias visiveis (textos exatos):**

| Posicao | Imagem | Label |
|---------|--------|-------|
| 1 | Filtro de ar (peca cilindrica laranja) | **Filtros** |
| 2 | Bomba hidraulica (peca metalica com engrenagem) | **Bancos** |
| 3 | Correia (peca preta em V) | **Correias** |
| 4 | Disco de embreagem (peca redonda) | **Discos** |
| 5 | Conjunto de eixos/peças variadas | **Eixos** |
| 6 | Correia (outra variacao) | **Correias** |
| 7 (parcialmente visivel ou acessivel via scroll) | Peça de transmissão | **Transmissao** |

**Comportamento interativo:**
- Hover no item: leve elevacao (`transform: translateY(-2px)`) ou sombra (`--ecom-shadow-sm`)
- Clique: filtra os produtos da grid pela subcategoria selecionada
- Setas: rolam o carrossel horizontalmente com animacao suave (`scroll-behavior: smooth`)
- Em mobile: o carrossel deve permitir swipe/touch horizontal

---

### 4. Sidebar de Filtros + Grid de Produtos

**Tag semantica:** `<div class="catalog-layout">` com `<aside>` (filtros) e `<section>` (grid)

**Layout geral:**
- Dentro do container (`--ecom-container-max`)
- Display: grid ou flex, 2 colunas
- Sidebar (esquerda): ~25% da largura (~280-300px fixa)
- Area de conteudo (direita): ~75% restante
- Gap entre colunas: `--ecom-space-6` a `--ecom-space-8`
- Fundo geral da area: cinza claro (`--ecom-bg-page` / `~#F5F5F5`)
- Padding vertical superior: `--ecom-space-6`

---

#### 4.1 Sidebar de Filtros

**Tag semantica:** `<aside aria-label="Filtros de produto">` ou `<aside class="filters-sidebar">`

**Layout:**
- Fundo: branco (`--ecom-bg-surface`)
- Padding: `--ecom-space-4` a `--ecom-space-6`
- Border-radius: `--ecom-radius-lg`
- Sombra: nenhuma visivel ou `--ecom-shadow-sm` muito sutil
- Sticky: a sidebar deve acompanhar o scroll (`position: sticky; top: ...`)

**Titulo da sidebar:**
- Texto exato: **"Filtrar por"**
- Font-size: `--ecom-text-lg`
- Font-weight: `--ecom-font-bold`
- Cor: `--ecom-text-primary`
- Margin-bottom: `--ecom-space-4`

##### Grupo de Filtro: Categoria

- Heading do grupo: **"Categoria"**
- Font-size: `--ecom-text-sm` ou `--ecom-text-base`
- Font-weight: `--ecom-font-semibold`
- Cor: `--ecom-text-primary`
- Margin-bottom: `--ecom-space-2`

**Opcoes (checkboxes):**

| Checkbox | Label | Contagem |
|----------|-------|----------|
| Marcado (laranja) | Filtro de Ar | (48) |
| Desmarcado | Motor e Transmissao | (124) |
| Desmarcado | Freios | (67) |
| Desmarcado | Eletrica | (89) |
| Desmarcado | Hidraulica | (52) |

- Cada opcao: `<label>` com `<input type="checkbox">` + texto + contagem entre parenteses
- Checkbox customizado: quando marcado, cor de fundo laranja (`--ecom-action-primary`) com check branco
- Checkbox desmarcado: borda cinza (`--ecom-border-default`), fundo branco
- Font-size do label: `--ecom-text-sm`
- Cor do label: `--ecom-text-primary`
- Cor da contagem: `--ecom-text-secondary` ou `--ecom-text-muted`
- Espacamento vertical entre opcoes: `--ecom-space-2`

##### Grupo de Filtro: Marca

- Heading do grupo: **"Marca"**
- Mesmo estilo do heading de Categoria
- Separacao visual do grupo anterior: `--ecom-space-4` de margin-top, possivelmente uma linha divisoria (`<hr>` ou `border-top`)

**Opcoes (checkboxes):**

| Checkbox | Label |
|----------|-------|
| Marcado (laranja) | Scania |
| Desmarcado | Volvo |
| Desmarcado | Mercedes-Benz |
| Desmarcado | MAN |

- Mesma estilizacao dos checkboxes de Categoria
- Sem contagem entre parenteses neste grupo

##### Grupo de Filtro: Faixa de Preco

- Heading do grupo: **"Faixa de Preco"**
- Mesmo estilo dos headings anteriores

**Inputs de preco:**
- 2 campos lado a lado com "~" (til) ou travessao entre eles
- Campo esquerdo: placeholder ou valor "R$ 0"
- Campo direito: placeholder ou valor "R$ 50.000"
- Campos: `<input type="text">` ou `<input type="number">` com formatacao de moeda
- Largura de cada campo: ~50% do espaco disponivel menos o separador
- Border: 1px solid `--ecom-border-default`
- Border-radius: `--ecom-radius-sm`
- Font-size: `--ecom-text-sm`
- Padding interno: `--ecom-space-2`

**Botao "Aplicar Filtros":**
- Texto exato: **"Aplicar Filtros"**
- Fundo: laranja (`--ecom-action-primary`)
- Texto: branco (`--ecom-text-on-primary`)
- Font-weight: `--ecom-font-semibold`
- Font-size: `--ecom-text-sm`
- Border-radius: `--ecom-radius-md`
- Largura: 100% da sidebar
- Padding: `--ecom-space-2` vertical, `--ecom-space-4` horizontal
- Hover: fundo mais escuro (`--ecom-action-primary-hover`)
- Margin-top: `--ecom-space-4`

**Link "Limpar Filtros":**
- Texto exato: **"Limpar Filtros"**
- Estilo: botao outline ou link com borda
- Borda: 1px solid `--ecom-border-default`
- Fundo: branco/transparente
- Texto: `--ecom-text-secondary`
- Font-size: `--ecom-text-sm`
- Border-radius: `--ecom-radius-md`
- Largura: 100% da sidebar
- Margin-top: `--ecom-space-2`
- Hover: fundo cinza claro

**Comportamento interativo:**
- Checkboxes: ao clicar, marcam/desmarcam. Filtros podem ser aplicados automaticamente (sem botao) ou somente ao clicar "Aplicar Filtros" — decisao de implementacao
- Faixa de preco: campos editaveis, aplicados ao clicar "Aplicar Filtros"
- "Limpar Filtros": reseta todos os checkboxes e campos de preco
- Em mobile: sidebar colapsada, abre como drawer lateral ou modal com botao "Filtrar"

---

#### 4.2 Barra de Resultados e Ordenacao

**Tag semantica:** `<div class="catalog-toolbar">` dentro da area de conteudo, acima do grid

**Layout:**
- Flex horizontal, `justify-content: space-between; align-items: center;`
- Margem inferior: `--ecom-space-4`

**Lado esquerdo — Contagem de resultados:**
- Texto exato: **"148 produtos encontrados"**
- Font-size: `--ecom-text-sm`
- Cor: `--ecom-text-secondary`

**Lado direito — Ordenacao:**
- Label: **"Ordenar por:"**
- Font-size: `--ecom-text-sm`
- Cor: `--ecom-text-secondary`
- Select/dropdown: **"Mais Relevantes"** (valor padrao)
- Select: borda cinza (`--ecom-border-default`), border-radius `--ecom-radius-sm`, fundo branco, seta chevron a direita
- Opcoes esperadas: "Mais Relevantes", "Menor Preco", "Maior Preco", "Mais Recentes", "Mais Vendidos"

---

#### 4.3 Grid de Produtos

**Tag semantica:** `<section aria-label="Produtos">` contendo `<ul>` ou multiplos `<article class="product-card">`

**Layout:**
- Display: grid, 3 colunas
- `grid-template-columns: repeat(3, 1fr)`
- Gap: `--ecom-space-4` a `--ecom-space-6` (horizontal e vertical)
- 3 linhas visiveis = 9 cards por pagina

**Cada Product Card:**

**Tag semantica:** `<article class="product-card" data-product-id="...">`

**Estrutura visual (de cima para baixo):**

1. **Area da imagem:**
   - Fundo: branco (`--ecom-bg-surface`)
   - Proporcao: quadrada ou levemente retangular (~1:1 ou 4:3)
   - Imagem centralizada, `object-fit: contain`
   - Border-radius topo: `--ecom-radius-lg`
   - Sem borda inferior na area de imagem (flui para o conteudo)

2. **Badge de categoria:**
   - Posicao: abaixo da imagem, acima do titulo (inline)
   - Texto: nome da subcategoria (ex: "Hidraulica", "Motor", "Transmissao")
   - Estilo: badge/pill
   - Fundo: transparente ou levemente colorido
   - Texto: laranja (`--ecom-action-primary`)
   - Font-size: `--ecom-text-xs`
   - Font-weight: `--ecom-font-medium`
   - Border: possivelmente 1px laranja ou sem borda (apenas texto colorido)

3. **Titulo do produto:**
   - Texto exato (exemplos):
     - **"Bomba Hidraulica Massey Ferguson 4275"**
     - **"Kit Reparo Motor Valtra BT150"**
     - **"Embreagem Completa New Holland T7.205"**
   - Font-size: `--ecom-text-sm` ou `--ecom-text-base`
   - Font-weight: `--ecom-font-semibold`
   - Cor: `--ecom-text-primary`
   - Maximo 2 linhas, com `line-clamp: 2` ou truncamento
   - O titulo e um link para a pagina do produto

4. **Avaliacao (estrelas):**
   - 5 estrelas outline (vazias), cor laranja (`--ecom-action-primary`) — indicando que nao ha avaliacoes ainda ou rating zero
   - Tamanho das estrelas: ~14-16px
   - Sem texto de contagem de reviews visivel

5. **Preco:**
   - **Sem desconto:** apenas preco atual
     - Texto: **"R$ 1.290,00"** ou **"R$ 2.450,00"**
     - Cor: laranja (`--ecom-action-primary`)
     - Font-size: `--ecom-text-lg`
     - Font-weight: `--ecom-font-bold`
   - **Com desconto:** preco original riscado + preco atual
     - Preco original: **"R$ 990,00"** com `text-decoration: line-through`
     - Cor do original: `--ecom-text-muted` ou `--ecom-text-secondary`
     - Font-size do original: `--ecom-text-sm`
     - Preco atual: **"R$ 890,00"**
     - Cor: laranja (`--ecom-action-primary`)
     - Font-size: `--ecom-text-lg`
     - Font-weight: `--ecom-font-bold`

6. **Area de acoes (botao + favorito):**
   - Layout: flex horizontal
   - **Botao "Comprar":**
     - Texto exato: **"Comprar"**
     - Fundo: laranja (`--ecom-action-primary`)
     - Texto: branco (`--ecom-text-on-primary`)
     - Border-radius: `--ecom-radius-full` (pill shape)
     - Font-size: `--ecom-text-sm`
     - Font-weight: `--ecom-font-semibold`
     - Flex: ocupa a maior parte da largura (~80%)
     - Hover: fundo escurece (`--ecom-action-primary-hover`)
     - `data-action="add-to-cart"`
   - **Botao favorito (coracao):**
     - Icone: coracao outline (nao preenchido)
     - Cor: cinza (`--ecom-text-muted`)
     - Fundo: branco com borda cinza (`--ecom-border-default`)
     - Border-radius: `--ecom-radius-full` (circular)
     - Tamanho: ~40px x 40px
     - Hover: icone fica laranja ou vermelho
     - `aria-label="Adicionar aos favoritos"`
     - `data-action="toggle-wishlist"`

**Card completo:**
- Fundo: branco (`--ecom-bg-surface`)
- Border: 1px solid `--ecom-border-default` (borda cinza sutil)
- Border-radius: `--ecom-radius-lg`
- Padding interno: `--ecom-space-4`
- Sombra: nenhuma ou `--ecom-shadow-sm` muito sutil
- Hover no card: leve sombra (`--ecom-shadow-md`) ou elevacao

**Produtos exibidos no grid (3 linhas x 3 colunas = 9 cards):**

| Linha | Col 1 | Col 2 | Col 3 |
|-------|-------|-------|-------|
| 1 | Bomba Hidraulica Massey Ferguson 4275 — Hidraulica — R$ 1.290,00 | Kit Reparo Motor Valtra BT150 — Motor — ~~R$ 990,00~~ R$ 890,00 | Embreagem Completa New Holland T7.205 — Transmissao — R$ 2.450,00 |
| 2 | Bomba Hidraulica Massey Ferguson 4275 — Hidraulica — R$ 1.290,00 | Kit Reparo Motor Valtra BT150 — Motor — ~~R$ 990,00~~ R$ 890,00 | Embreagem Completa New Holland T7.205 — Transmissao — R$ 2.450,00 |
| 3 | Bomba Hidraulica Massey Ferguson 4275 — Hidraulica — R$ 1.290,00 | Kit Reparo Motor Valtra BT150 — Motor — ~~R$ 990,00~~ R$ 890,00 | Embreagem Completa New Holland T7.205 — Transmissao — R$ 2.450,00 |

> **Nota:** No design de referencia, os 9 cards mostram os mesmos 3 produtos repetidos. Na implementacao real, cada card tera dados unicos.

**Imagens dos produtos:**
- **Bomba Hidraulica:** peca metalica compacta cor cinza/prata com encaixes e engrenagens visiveis, fotografada em angulo 3/4
- **Kit Reparo Motor:** conjunto de pecas variadas (juntas, parafusos, vedacoes, retentores) dispostas em grupo, fotografadas de cima
- **Embreagem Completa:** disco de embreagem marrom/cobre com padrao circular de estrias, fotografado de frente

---

### 5. Paginacao

**Tag semantica:** `<nav aria-label="Paginacao">` com `<ol>` ou `<ul>`

**Layout:**
- Centralizada horizontalmente abaixo do grid de produtos
- Margin-top: `--ecom-space-6` a `--ecom-space-8`
- Margin-bottom: `--ecom-space-8` a `--ecom-space-10`
- Display: flex, `gap: --ecom-space-2`, `align-items: center`, `justify-content: center`

**Elementos:**

| Posicao | Tipo | Texto/Icone | Estilo |
|---------|------|-------------|--------|
| 1 | Seta anterior | `<` (chevron esquerda) | Circulo com borda cinza, fundo branco, desabilitado se na primeira pagina |
| 2 | Pagina ativa | **1** | Circulo/quadrado com fundo laranja (`--ecom-action-primary`), texto branco, border-radius `--ecom-radius-md` |
| 3 | Pagina | **2** | Circulo/quadrado com borda cinza, fundo branco, texto escuro |
| 4 | Pagina | **3** | Idem |
| 5 | Ellipsis | **...** | Texto cinza, sem borda, sem clique |
| 6 | Pagina | **8** | Idem ao 3 |
| 7 | Seta proxima | `>` (chevron direita) | Circulo com borda cinza, fundo branco, clicavel |

**Estilos detalhados:**
- Tamanho de cada item: ~36-40px x 36-40px
- Font-size: `--ecom-text-sm`
- Font-weight: `--ecom-font-medium`
- Pagina ativa: fundo laranja `--ecom-action-primary`, cor branca, sem borda
- Paginas inativas: fundo branco, borda 1px `--ecom-border-default`, cor `--ecom-text-primary`
- Hover (inativas): fundo cinza claro (`--ecom-bg-surface-alt`)
- Setas desabilitadas: opacidade reduzida, cursor `not-allowed`

**Comportamento:**
- Clique em numero: navega para a pagina correspondente (reload ou AJAX)
- Setas: avancam/retrocedem uma pagina
- Sempre mostrar primeira, ultima e paginas adjacentes a atual, com ellipsis para lacunas

---

### 6. Secao de Conteudo SEO

**Tag semantica:** `<section aria-labelledby="seo-content-heading">` — conteudo textual para SEO, abaixo da paginacao e acima do footer

**Layout:**
- Dentro do container (`--ecom-container-max`)
- Fundo: branco (`--ecom-bg-surface`) ou fundo da pagina
- Padding vertical: `--ecom-space-10` a `--ecom-space-12`
- Padding horizontal: `--ecom-container-pad`
- A secao ocupa a largura total do container (nao fica ao lado da sidebar)

**Titulo (H2):**
- Texto exato: **"Solucoes de Alta Performance para o Seu Trator"**
- Font-size: `--ecom-text-3xl` (~30px)
- Font-weight: `--ecom-font-bold`
- Cor: `--ecom-text-primary`
- Margin-bottom: `--ecom-space-4`

**Paragrafo 1:**
- Texto exato: **"Nossa linha premium de pecas para tratores e desenvolvida para unir desempenho tecnico, resistencia e eficiencia em operacoes agricolas exigentes. Cada componente e projetado para garantir durabilidade, seguranca e conformidade com os padroes mais rigorosos do setor."**
- Font-size: `--ecom-text-base`
- Cor: `--ecom-text-secondary`
- Line-height: `--ecom-leading-relaxed`
- Margin-bottom: `--ecom-space-4`
- Largura maxima do texto: ~75% do container ou `max-width: 800px` para legibilidade

**Paragrafo 2:**
- Texto exato: **"Trabalhamos com pecas selecionadas para atender diferentes modelos e necessidades no campo, oferecendo solucoes sob medida para manutencao e reposicao. Com suporte completo — da escolha a aplicacao — voce garante mais produtividade, confianca e desempenho em cada etapa do trabalho."**
- Mesma estilizacao do paragrafo 1

**Botao "Leia Mais":**
- Texto exato: **"Leia Mais"**
- Estilo: botao solido escuro
- Fundo: navy escuro (`--ecom-color-neutral-900` / `~#1A2332`)
- Texto: branco (`--ecom-text-inverse`)
- Font-size: `--ecom-text-sm`
- Font-weight: `--ecom-font-semibold`
- Border-radius: `--ecom-radius-md`
- Padding: `--ecom-space-2` vertical, `--ecom-space-6` horizontal
- Margin-top: `--ecom-space-4`
- Hover: fundo levemente mais claro ou opacidade

---

### 7. Newsletter + Footer (compartilhado — apenas referencia)

Componentes globais identicos a todas as paginas. Consultar `00-page-map.md` para detalhes completos.

**Resumo rapido:**

#### 7.1 Newsletter Bar

- Fundo: navy escuro (`--ecom-color-neutral-900` / `~#1A2332`)
- Layout: flex, 2 areas — texto a esquerda | form a direita
- Icone: envelope/email branco (~32px)
- Titulo: **"Newsletter"** — branco, `--ecom-font-bold`, `--ecom-text-xl`
- Subtitulo: **"Inscreva-se para receber dicas e promocoes"** — branco com opacidade
- Campo email: fundo escuro com borda, placeholder **"seu email..."**, border-radius `--ecom-radius-md`
- Botao: **"Enviar"** — fundo laranja, texto branco, border-radius `--ecom-radius-md`

#### 7.2 Footer Principal

- Fundo: navy escuro (`--ecom-color-neutral-900`)
- 5 colunas:
  1. **Logo branco** + descricao: "Especialistas em pecas e veiculos pesados. Mais de 15 anos servindo o agronegocio e o transporte brasileiro." + icones sociais (Instagram, Facebook, YouTube)
  2. **Institucional**: Sobre nos, Politicas de Troca, Politicas de Frete, Politicas de Cookies, Assistencia tecnica, Blog
  3. **Categorias**: Pecas, Estoque, Novos, Marcas, Locacao, Contato
  4. **Contato**: (11) 4002-8922, contato@grupopla.com.br, Seg-Sex: 8h as 18h
  5. **Visite Nossa Loja**: Av. Industrial, 1234 - SP + link "Abrir no Maps" + mapa embed Google Maps

#### 7.3 Sub-footer

- Fundo: ligeiramente diferente do footer (mais escuro ou com borda)
- **Formas de Pagamento**: badges — PIX (verde), VISA (azul), MASTER (laranja/vermelho), BOLETO (cinza)
- Links a direita: **"Politica de Privacidade"** | **"Termos de Uso"**

#### 7.4 Copyright

- Fundo: mais escuro
- Texto: **"(c) 2025 Grupo PLA. Todos os direitos reservados."**
- Cor: cinza claro sobre fundo escuro
- Font-size: `--ecom-text-xs`

---

## Componentes Necessarios

| Componente | Arquivo CSS | Arquivo JS | Descricao |
|-----------|-------------|------------|-----------|
| Top Bar | `components/top-bar.css` | — | Barra superior com contato e redes sociais |
| Header | `components/header.css` | `components/header-search.js` | Logo, busca, WhatsApp, carrinho |
| Nav Menu | `components/nav-menu.css` | `components/nav-menu.js` | Menu de navegacao com item ativo |
| Hero Banner | `components/hero-banner.css` | — | Banner com imagem de fundo, overlay, breadcrumb e titulo |
| Breadcrumb | `components/breadcrumb.css` | — | Navegacao hierarquica com microdata |
| Subcategory Carousel | `components/subcategory-carousel.css` | `components/subcategory-carousel.js` | Carrossel horizontal de subcategorias com setas |
| Filters Sidebar | `components/filters-sidebar.css` | `components/filters-sidebar.js` | Sidebar colapsavel com checkboxes, range de preco |
| Checkbox Custom | `components/checkbox.css` | — | Checkbox estilizado com cor primaria |
| Product Card | `components/product-card.css` | — | Card de produto com imagem, badge, titulo, preco, botao |
| Rating Stars | `components/rating-stars.css` | — | Estrelas de avaliacao (preenchidas e vazias) |
| Pagination | `components/pagination.css` | — | Navegacao numerica com setas e ellipsis |
| SEO Content | `pages/categoria.css` | — | Secao de texto para SEO |
| Newsletter Bar | `components/newsletter-bar.css` | `components/newsletter-bar.js` | Barra de newsletter com formulario |
| Footer | `components/footer.css` | — | Rodape com 5 colunas |
| Badge | `components/badge.css` | — | Badge de categoria (pill colorido) |

---

## Dados Estruturados

### BreadcrumbList (obrigatorio)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://www.grupopla.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pecas para Tratores"
    }
  ]
}
</script>
```

### ItemList (obrigatorio — lista de produtos)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Pecas para Tratores",
  "numberOfItems": 148,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://www.grupopla.com.br/produto/bomba-hidraulica-massey-ferguson-4275"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://www.grupopla.com.br/produto/kit-reparo-motor-valtra-bt150"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": "https://www.grupopla.com.br/produto/embreagem-completa-new-holland-t7205"
    }
  ]
}
</script>
```

### Organization (obrigatorio — todas as paginas)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grupo PLA",
  "url": "https://www.grupopla.com.br",
  "logo": "https://www.grupopla.com.br/assets/images/logo/logo.png",
  "description": "Especialistas em pecas e veiculos pesados. Mais de 15 anos servindo o agronegocio e o transporte brasileiro.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-4002-8922",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "sameAs": [
    "https://www.instagram.com/grupopla",
    "https://www.facebook.com/grupopla",
    "https://www.youtube.com/grupopla"
  ]
}
</script>
```

---

## Notas de Implementacao

### Meta Tags

```html
<title>Pecas para Tratores — Grupo PLA</title>
<meta name="description" content="Encontre pecas originais e remanufaturadas para tratores. Filtros, bombas hidraulicas, embreagens e mais. Entrega para todo o Brasil.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.grupopla.com.br/pecas-para-tratores">
```

### Responsividade

| Breakpoint | Layout |
|-----------|--------|
| < 480px (xs) | Sidebar oculta (abre como drawer/modal), grid 1 coluna, carrossel 2-3 itens visiveis |
| >= 480px (sm) | Grid 1-2 colunas, carrossel 3-4 itens |
| >= 768px (md) | Sidebar visivel colapsada ou drawer, grid 2 colunas, carrossel 4-5 itens |
| >= 1024px (lg) | Layout completo: sidebar fixa + grid 3 colunas, carrossel 6 itens |
| >= 1280px (xl) | Container max, espacamento aumentado |

### Acessibilidade

- **Filtros:** cada grupo de checkbox deve estar dentro de `<fieldset>` com `<legend>` (nome do grupo)
- **Sidebar mobile:** ao abrir como drawer, implementar trap de foco e fechar com `Escape`
- **Paginacao:** usar `aria-label="Paginacao"`, `aria-current="page"` na pagina ativa
- **Product cards:** cada card deve ter `aria-label` descritivo no botao "Comprar" (ex: `aria-label="Comprar Bomba Hidraulica Massey Ferguson 4275"`)
- **Botao favorito:** `aria-label="Adicionar Bomba Hidraulica Massey Ferguson 4275 aos favoritos"` e `aria-pressed="false"` (toggle)
- **Carrossel de subcategorias:** setas com `aria-label="Anterior"` e `aria-label="Proximo"`, `role="tablist"` ou scroll nativo com labels
- **Estrelas de avaliacao:** `aria-label="Avaliacao: 0 de 5 estrelas"` ou usar texto oculto `.sr-only`
- **Contagem de resultados:** envolver em `aria-live="polite"` para anunciar atualizacoes ao filtrar

### Performance

- **Hero:** usar `<link rel="preload" as="image">` para a imagem de fundo do hero (LCP candidate)
- **Imagens de produto:** todas com `loading="lazy"`, `width` e `height` declarados
- **Imagens de subcategoria:** `loading="lazy"` (estao logo abaixo do fold)
- **Carrossel:** scroll nativo CSS (`overflow-x: auto; scroll-snap-type: x mandatory`) em vez de JS pesado, com JS apenas para as setas de navegacao
- **Filtros:** debounce de 300ms ao aplicar filtros via JS para evitar requisicoes excessivas

### Ordem de CSS no `<head>`

```html
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/layout.css">
<link rel="stylesheet" href="/assets/css/components/top-bar.css">
<link rel="stylesheet" href="/assets/css/components/header.css">
<link rel="stylesheet" href="/assets/css/components/nav-menu.css">
<link rel="stylesheet" href="/assets/css/components/breadcrumb.css">
<link rel="stylesheet" href="/assets/css/components/hero-banner.css">
<link rel="stylesheet" href="/assets/css/components/subcategory-carousel.css">
<link rel="stylesheet" href="/assets/css/components/filters-sidebar.css">
<link rel="stylesheet" href="/assets/css/components/checkbox.css">
<link rel="stylesheet" href="/assets/css/components/product-card.css">
<link rel="stylesheet" href="/assets/css/components/rating-stars.css">
<link rel="stylesheet" href="/assets/css/components/badge.css">
<link rel="stylesheet" href="/assets/css/components/pagination.css">
<link rel="stylesheet" href="/assets/css/components/newsletter-bar.css">
<link rel="stylesheet" href="/assets/css/components/footer.css">
<link rel="stylesheet" href="/assets/css/pages/categoria.css">
```

### JS ao final do `<body>`

```html
<script type="module" src="/assets/js/pages/catalog.js"></script>
```

O `catalog.js` deve orquestrar:
- `components/header-search.js` — busca
- `components/subcategory-carousel.js` — navegacao do carrossel
- `components/filters-sidebar.js` — logica de filtros (marcar/desmarcar, aplicar, limpar)
- `components/newsletter-bar.js` — formulario de newsletter

### Conteudo Estatico no HTML

Conforme regra do projeto, **todo conteudo indexavel deve estar no HTML estatico**:
- Os 9 product cards devem existir no HTML (nao renderizados via JS)
- O breadcrumb, titulo, subtitulo, secao SEO — tudo estatico
- Subcategorias do carrossel — estaticas no HTML
- Opcoes de filtro — estaticas no HTML
- JS apenas adiciona interatividade (toggle de filtros, scroll do carrossel, paginacao AJAX opcional)

# 03 — Detalhe de Peca (Filtro de Ar)

Referencia visual: `references/screenshots/03-detalhe-peca/`

Pagina: `detalhe-peca.html`

---

## Estrutura Geral da Pagina (de cima para baixo)

1. Top Bar (global)
2. Header (global)
3. Menu de Navegacao (global)
4. Breadcrumb
5. Secao de Produto (galeria + informacoes)
6. Tabs (Descricao / Especificacoes / Entrega e Devolucao)
7. Avaliacoes
8. Produtos Similares
9. Newsletter Bar (global)
10. Footer (global)

---

## 1. Breadcrumb

- Fundo: branco (`--ecom-bg-surface`)
- Icone de home (casinha) seguido de separadores `>`
- Caminho: `Home > Pecas > Filtros de Ar > Filtro de Ar Completo Valmit RE/EURO 210600`
- Ultimo item em texto escuro (navy), sem link — itens anteriores em cinza com link
- Fonte: `--ecom-text-sm`, cor `--ecom-text-secondary`

---

## 2. Secao de Produto

Layout em 2 colunas dentro do container principal. Fundo branco.

### 2.1 Coluna Esquerda — Galeria de Imagens

- **Imagem principal**: area grande (~50% da largura do container), mostra a foto do produto (filtro de ar cilindrico)
- **Thumbnails**: fila horizontal de 5 miniaturas abaixo da imagem principal
  - Thumbnail ativa com borda laranja (`--ecom-color-primary-500`)
  - Demais com borda cinza sutil (`--ecom-border-default`)
  - Dimensao das thumbnails: ~80x80px com `border-radius: --ecom-radius-md`
- Ao clicar em um thumbnail, a imagem principal muda (comportamento JS)
- Imagem principal com `border-radius: --ecom-radius-lg`

### 2.2 Coluna Direita — Informacoes do Produto

De cima para baixo:

#### Titulo
- **h1**: `Filtro de Ar Completo Valmit RE/EURO 210600`
- Fonte: `--ecom-text-2xl` ou `--ecom-text-3xl`, `--ecom-font-bold`, cor `--ecom-text-primary`

#### Metadados (linha abaixo do titulo)
- `REF: 210600` | `Compativel: John Deere 5000 Series` | `SKU  210600`
- Fonte: `--ecom-text-sm`, cor `--ecom-text-secondary`
- Separados por pipe `|` com espacamento

#### Estrelas de Avaliacao
- 5 estrelas vazias/outline (amarelo/laranja) — indicando que ainda sem avaliacao visivel neste ponto, ou nota media
- Logo abaixo dos metadados

#### Badge de Disponibilidade
- Badge verde: icone de check (circulo verde) + texto `Em Estoque — Pronta Entrega`
- Fundo: borda verde sutil ou badge com fundo verde claro
- Icone: circulo verde com check branco
- Fonte: `--ecom-text-sm`, cor verde (`--ecom-color-success`)

#### Bloco de Preco

- **Badge de desconto**: pill retangular laranja com texto branco `12% OFF`
- **Preco original**: riscado, cinza, `--ecom-text-sm` — `R$ 204,43`
- **Preco atual**: grande, bold, cor navy escuro — `R$ 179,90`
  - Fonte: `--ecom-text-4xl` ou `--ecom-text-3xl`, `--ecom-font-bold`
- **Parcelamento**: texto menor abaixo — `ou 12x de R$ 16,99 sem juros no cartao`
  - Fonte: `--ecom-text-sm`, cor `--ecom-text-secondary`
- **Desconto PIX**: texto laranja — `R$ 171,90 no PIX (5% de desconto)`
  - Cor: `--ecom-color-primary-500` (laranja)
  - Fonte: `--ecom-text-sm`, `--ecom-font-semibold`

#### Seletor de Quantidade

- Layout horizontal: label `Quantidade:` + botoes `[-]` `[1]` `[+]`
- Botoes de incremento/decremento com borda cinza, fundo branco
- Input numerico centralizado mostrando `1`
- Texto a direita: `Quantidade minima` em cinza + `+50 unidades` em bold laranja
- Fonte: `--ecom-text-sm`

#### Botoes de Acao (lado a lado)

Dois botoes em linha, mesma altura, dividindo a largura:

1. **Adicionar ao Carrinho** (CTA principal)
   - Fundo: laranja (`--ecom-action-primary`)
   - Texto: branco, `--ecom-font-semibold`
   - Icone: carrinho branco a esquerda
   - `border-radius: --ecom-radius-lg`
   - Largura: ~55% da area

2. **Pedir via WhatsApp**
   - Fundo: branco com borda laranja
   - Texto: laranja (`--ecom-action-primary`)
   - Icone: WhatsApp laranja a esquerda
   - `border-radius: --ecom-radius-lg`
   - Largura: ~45% da area

#### Informacao de Frete
- Icone de caminhao + texto: `Frete gratis para pedidos acima de R$ 500`
- Subtexto: `Entrega em 3-7 dias uteis para todo o Brasil`
- Fundo: cinza muito claro ou borda sutil ao redor
- Fonte: `--ecom-text-sm`

#### Barra de Compartilhar
- Texto `Compartilhar:` seguido de icones:
  - Icone de share (seta)
  - Icone de coracao (favoritar)
  - Icone de impressora
  - Texto link: `Compartilhar especificacao`
- Alinhamento: centro-direita
- Cor dos icones: cinza (`--ecom-text-secondary`)

---

## 3. Tabs de Conteudo

Posicionado abaixo da secao de produto, largura total do container.

### Abas
- 3 abas em linha horizontal:
  1. **Descricao** (ativa por padrao)
  2. **Especificacoes**
  3. **Entrega e Devolucao**
- Aba ativa: texto laranja (`--ecom-color-primary-500`) com sublinhado laranja (borda inferior 2-3px)
- Abas inativas: texto cinza escuro (`--ecom-text-secondary`), sem sublinhado
- Fonte: `--ecom-text-base`, `--ecom-font-medium`
- Separador: linha horizontal cinza clara abaixo das abas

### Conteudo da Aba "Descricao" (visivel por padrao)

**Subtitulo**: `Sobre o Produto` — `--ecom-font-bold`, `--ecom-text-lg`

**Paragrafos de texto** (4 paragrafos):

1. `O Filtro de Ar Completo Valmit RE/EURO 210600 e desenvolvido com materiais de alta qualidade para garantir maxima filtragem e protecao do motor. Compativel com os modelos John Deere da serie 5000, proporciona desempenho superior em condicoes severas de trabalho no campo.`

2. `Sua construcao robusta assegura vedacao perfeita e maior durabilidade, reduzindo a manutencao e os custos operacionais da sua maquina.`

3. `Filtro completo com carcaca reforcada, selo de estanqueidade e tratamento anti-bacteriano para ambientes criticos.`

4. `Integracao direta ao sistema de controle Grupo PLA permite registrar historicos, alertas e acoes corretivas em um unico painel.`

- Fonte: `--ecom-text-base`, `--ecom-leading-relaxed`, cor `--ecom-text-primary`
- Espacamento entre paragrafos: `--ecom-space-4`

---

## 4. Secao de Avaliacoes

Fundo: cinza claro (`--ecom-bg-surface-alt` / `~#F5F5F5`), largura total da viewport.

### Layout: 2 colunas

#### Coluna Esquerda (~65%) — Lista de Avaliacoes

**Titulo da secao**: `Avaliacoes` — `--ecom-text-3xl` ou `--ecom-text-4xl`, `--ecom-font-bold`, cor navy

**Cards de avaliacao** (4 cards empilhados verticalmente):

Cada card:
- Fundo: branco (`--ecom-bg-surface`)
- `border-radius: --ecom-radius-lg`
- `box-shadow: --ecom-shadow-sm`
- Padding: `--ecom-space-6`
- Margem inferior: `--ecom-space-4`

Conteudo do card:
- **Avatar circular**: letra inicial em circulo colorido (~40px diametro)
  - Cores alternadas: azul claro (A), amarelo (E)
- **Nome do avaliador**: bold, `--ecom-text-base` — ex: `Alexander Riley`
- **Nota + quantidade**: `5.0 * 4 avaliacoes` — fonte `--ecom-text-sm`, cor `--ecom-text-secondary`
- **Texto da avaliacao**: paragrafo de texto, `--ecom-text-sm`, cor `--ecom-text-primary`

Avaliacoes de referencia:

| # | Nome | Nota | Qtd | Texto |
|---|------|------|-----|-------|
| 1 | Alexander Riley | 5.0 | 4 avaliacoes | Pecas de excelente qualidade! Comprei para manutencao do meu trator e o desempenho melhorou bastante. Entrega rapida e otimo custo-beneficio. |
| 2 | Emma Creight | 4.8 | 7 avaliacoes | Encontrei exatamente a peca que precisava. Atendimento muito bom e produto compativel perfeitamente com meu equipamento. |
| 3 | Alexander Riley | 5.0 | 4 avaliacoes | Ja testei varias lojas, mas aqui realmente vale a pena. Pecas resistentes e com otimo acabamento. Ideal para quem nao quer dor de cabeca na lavoura. |
| 4 | Emma Creight | 4.8 | 7 avaliacoes | Ja testei varias lojas, mas aqui realmente vale a pena. Pecas resistentes e com otimo acabamento. Ideal para quem nao quer dor de cabeca na lavoura. |

#### Coluna Direita (~35%) — Resumo de Avaliacoes

**Card de nota geral**:
- Fundo: laranja (`--ecom-color-primary-500`)
- `border-radius: --ecom-radius-xl` ou `--ecom-radius-2xl`
- Texto branco
- Numero grande: `4.0` — fonte ~`--ecom-text-5xl`, `--ecom-font-bold`
- Subtexto: `Baseado em 128 avaliacoes` — `--ecom-text-sm`

**Card de metricas** (abaixo do card de nota):
- Fundo: branco
- `border-radius: --ecom-radius-lg`
- Titulo: `Metricas em destaque` — `--ecom-font-bold`, `--ecom-text-lg`

Barras de progresso:

| Metrica | Nota | Cor da barra |
|---------|------|-------------|
| Qualidade | 4.5 | Laranja |
| Entrega | 4.2 | Laranja |
| Atendimento | 4.7 | Laranja |
| Localizacao | 3.9 | Laranja |

- Cada metrica: label + nota a direita, barra de progresso abaixo
- Barra: fundo cinza claro, preenchimento laranja proporcional a nota (escala 0-5)
- Fonte: `--ecom-text-sm`

#### Link "Ver todas as avaliacoes"
- Posicionado no canto inferior direito da secao
- Texto laranja (`--ecom-color-primary-500`), `--ecom-text-sm`
- Comportamento: link para pagina/ancoragem com todas as avaliacoes

---

## 5. Produtos Similares

Fundo: branco. Largura total do container.

### Cabecalho da secao
- **Titulo**: `Produtos Similares` — `--ecom-text-2xl` ou `--ecom-text-3xl`, `--ecom-font-bold`
- **Subtitulo**: `Tratores e colheitadeiras selecionados com qualidade e procedencia garantidas` — `--ecom-text-sm`, cor `--ecom-text-secondary`
- **Botao a direita**: `Ver Pecas para Tratores` — fundo navy escuro (`--ecom-color-neutral-800`), texto branco, `border-radius: --ecom-radius-full` (pill)

### Grid de Cards (4 colunas)

Cada card de maquinario:

- Fundo: branco
- `border-radius: --ecom-radius-lg`
- `box-shadow: --ecom-shadow-sm`
- Imagem no topo: foto do trator/maquina, `border-radius` superior

Conteudo do card:
- **Badge de marca**: pill colorida — ex: `John Deere` (verde), `Massey Ferguson` (vermelho), `New Holland` (azul), `Valtra` (laranja)
- **Ano**: alinhado a direita do badge — ex: `2022`
- **Nome**: `--ecom-font-bold`, `--ecom-text-base` — ex: `John Deere 6110J 4x4`
- **Estrelas**: 5 estrelas (vazias/outline)
- **Preco**: bold, laranja — ex: `R$ 189.000`
- **Botao**: `Ver Detalhes` — fundo laranja, texto branco, largura total do card, `border-radius: --ecom-radius-md`

Cards de referencia:

| Marca | Ano | Nome | Preco |
|-------|-----|------|-------|
| John Deere | 2022 | John Deere 6110J 4x4 | R$ 189.000 |
| Massey Ferguson | 2021 | Massey Ferguson 7270 Dyna-6 | R$ 245.000 |
| New Holland | 2023 | New Holland T7.205 AutoCommand | R$ 320.000 |
| Valtra | 2020 | Valtra BM125i 4x4 Turbo | R$ 165.000 |

---

## 6. Componentes BEM Identificados

```
.product-detail
.product-detail__gallery
.product-detail__gallery-main
.product-detail__gallery-thumbs
.product-detail__gallery-thumb
.product-detail__gallery-thumb--active
.product-detail__info
.product-detail__title
.product-detail__meta
.product-detail__rating
.product-detail__availability
.product-detail__pricing
.product-detail__price--original
.product-detail__price--current
.product-detail__price--pix
.product-detail__discount-badge
.product-detail__installments
.product-detail__quantity
.product-detail__actions
.product-detail__share
.product-detail__shipping

.product-tabs
.product-tabs__nav
.product-tabs__tab
.product-tabs__tab--active
.product-tabs__panel
.product-tabs__panel--active

.reviews
.reviews__title
.reviews__list
.reviews__card
.reviews__avatar
.reviews__author
.reviews__rating
.reviews__text
.reviews__summary
.reviews__score
.reviews__metrics
.reviews__metric
.reviews__metric-bar
.reviews__more-link

.similar-products
.similar-products__header
.similar-products__title
.similar-products__subtitle
.similar-products__cta
.similar-products__grid

.machine-card
.machine-card__image
.machine-card__brand-badge
.machine-card__year
.machine-card__name
.machine-card__rating
.machine-card__price
.machine-card__action
```

---

## 7. Comportamento Interativo (JavaScript)

| Interacao | Comportamento |
|-----------|--------------|
| Click em thumbnail da galeria | Troca imagem principal com transicao suave |
| Botoes +/- de quantidade | Incrementa/decrementa valor; minimo 1, respeita estoque |
| Click em aba (Descricao/Especificacoes/Entrega) | Mostra painel correspondente, oculta os demais; atualiza estado visual da aba |
| Adicionar ao Carrinho | Dispara evento `cart:item-added`, atualiza contador do header, exibe toast de confirmacao |
| Pedir via WhatsApp | Abre link `https://wa.me/...` com mensagem pre-formatada com nome e REF do produto |
| Compartilhar | Abre share nativo ou copia link |
| Favoritar (coracao) | Toggle estado de favorito no localStorage |
| Imprimir especificacao | Abre dialogo de impressao com conteudo formatado |
| Ver todas as avaliacoes | Navega/scroll para pagina completa de avaliacoes |
| Ver Detalhes (card similar) | Navega para a pagina de detalhe do produto correspondente |

---

## 8. Dados Estruturados (Schema.org)

- `Product` com `name`, `sku`, `image`, `description`, `brand`, `offers` (preco, disponibilidade, condicao)
- `BreadcrumbList` para o breadcrumb
- `AggregateRating` com `ratingValue: 4.0`, `reviewCount: 128`
- `Review` para cada avaliacao individual

---

## 9. SEO e Acessibilidade

- `<h1>`: titulo do produto
- `<h2>`: "Sobre o Produto", "Avaliacoes", "Produtos Similares"
- Tabs com `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
- Imagens com `alt` descritivo, `width`, `height`, `loading="lazy"`
- Botoes de acao com `aria-label` quando icon-only
- Badge de disponibilidade acessivel via texto
- Barras de progresso com `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `<meta name="robots" content="index, follow">`

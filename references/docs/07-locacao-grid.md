# 07 — Locacao Grid (Visualizacao em Grade)

> **Arquivo HTML:** `locacao.html`
> **Referencia visual:** `references/screenshots/07-locacao-grid/`
> **PDF:** `Locacao grid -- Grupo PLA desktop.pdf`
> **Pagina compartilhada com:** `08-locacao-lista` (toggle grid/lista)

---

## Visao Geral

Pagina de listagem de veiculos disponiveis para locacao (caminhoes e semireboques). Exibe os veiculos em formato de grade com 3 colunas. Contem sidebar de filtros a esquerda, barra de resultados/filtros no topo, cards de veiculos em grid, paginacao, secao de conteudo SEO e os componentes globais (top bar, header, nav, footer).

Esta e a **mesma pagina HTML** da versao lista (`08-locacao-lista`). A alternancia acontece via toggle grid/lista na barra de resultados.

---

## Estrutura da Pagina (top-down)

### 1. Top Bar (componente global)

Barra escura (navy `~#1A2332`) no topo com:
- Esquerda: telefone `(11) 4000-0000` | WhatsApp `(11) 99999-0000` | email `contato@grupopla.com.br`
- Direita: icones sociais (Facebook, Instagram, YouTube, LinkedIn)

### 2. Header Principal (componente global)

- Logo "Logoipsum" (placeholder) a esquerda
- Campo de busca centralizado: `"Buscar pecas, veiculos, marcas..."`
- Botao WhatsApp (laranja `~#F7941D`, icone + texto "WhatsApp")
- Icone carrinho a direita

### 3. Menu de Navegacao (componente global)

Fundo branco, itens horizontais:
- **Pecas** (sublinhado laranja -- estado ativo do template) | Estoque | Novos | Marcas | **Locacao** | Meus Clientes | Contato

> Nota: Na pagina de Locacao, o item "Locacao" devera receber o estado ativo (sublinhado laranja) ao inves de "Pecas".

---

### 4. Hero Banner com Breadcrumb

**Fundo:** Imagem fotografica de frota de caminhoes estacionados, com overlay escuro semi-transparente (gradiente da esquerda para a direita, mais escuro na esquerda).

**Breadcrumb** (sobre o hero, topo esquerdo):
```
(icone home) > Locacao
```
- Icone de casa branco
- Separador `>`
- Texto "Locacao" em laranja/dourado

**Titulo (h1):**
```
Locacao de Caminhoes e Semireboques
```
- Cor: branco `#FFFFFF`
- Fonte: heading bold, tamanho grande (~`--ecom-text-4xl` / ~36px)

**Subtitulo:**
```
Frota propria, manutencao inclusa e entrega em todo o Brasil. Contratos flexiveis a
partir de 30 dias.
```
- Cor: branco/cinza claro com leve transparencia
- Fonte: body regular, tamanho base (~`--ecom-text-base`)

**Dimensoes aproximadas:** largura total do viewport, altura ~200px.

---

### 5. Area Principal (Filtros + Resultados)

Layout em 2 colunas:
- **Coluna esquerda (~20%):** Sidebar de filtros
- **Coluna direita (~80%):** Barra de resultados + grid de cards

Fundo da area: cinza claro (`~#F5F5F5` / `--ecom-bg-page`)

---

#### 5.1 Sidebar de Filtros

Card branco (`--ecom-bg-surface`) com padding interno, border-radius medio (~8px), sombra sutil.

**Cabecalho do card:**
- Texto "Filtros" em bold (esquerda)
- Icone de filtro/sliders a direita (linhas horizontais com pontos)

**Secao: TIPO DE VEICULO**
- Label em uppercase, cinza escuro, font-weight semibold, tamanho pequeno (`--ecom-text-xs` / ~12px)
- Lista de checkboxes:
  - `[x] Caminhao` (checkbox com fundo laranja quando marcado)
  - `[ ] Semirreboque`
  - `[ ] Cavalo Mecanico`
  - `[ ] Bitrem`
- Checkbox marcado: fundo laranja `~#F7941D`, icone check branco
- Checkbox desmarcado: borda cinza `--ecom-border-default`

**Secao: CONFIGURACAO**
- Label em uppercase, cinza escuro, font-weight semibold
- Chips/pills selecionaveis em linha (wrap):
  - `6x2 Truck` (selecionado -- fundo laranja, texto branco, border-radius full/pill)
  - `6x4` (nao selecionado -- borda cinza, fundo branco, texto escuro)
  - `4x2 Toco` (nao selecionado)
  - `8x2` (nao selecionado)
- Chip selecionado: `background: ~#F7941D`, `color: #FFFFFF`, `border-radius: --ecom-radius-full`
- Chip nao selecionado: `background: #FFFFFF`, `border: 1px solid --ecom-border-default`, `color: --ecom-text-primary`

**Secao: MARCA**
- Label em uppercase, cinza escuro, font-weight semibold
- Lista de checkboxes:
  - `[ ] Scania`
  - `[ ] Volvo`
  - `[ ] Mercedes-Benz`
  - `[ ] Iveco`

**Secao: Toggle "Apenas disponiveis"**
- Texto "Apenas disponiveis" a esquerda
- Toggle switch a direita (ativo = laranja/verde, inativo = cinza)
- No screenshot: toggle esta **ativo** (cor laranja/verde)

**Botao "Aplicar Filtros":**
- Largura total do sidebar
- Fundo laranja `~#F7941D`
- Texto branco "Aplicar Filtros"
- Border-radius medio (`--ecom-radius-md`)

**Link "Limpar filtros":**
- Centralizado abaixo do botao
- Texto cinza, sem decoracao, hover underline
- Fonte pequena (`--ecom-text-sm`)

---

#### 5.2 Barra de Resultados (topo da coluna direita)

Barra horizontal acima do grid de cards:

**Esquerda:**
- Texto: `"47 veiculos encontrados"`
- Chip de filtro ativo: `6x2 Truck` (badge pill laranja com texto branco)

**Centro — Dropdowns de filtro rapido:**
- `Tipo: Todos` (dropdown select)
- `Marca: Todas` (dropdown select)
- `Modelo: Todos` (dropdown select)
- Cada um com seta dropdown a direita

**Direita:**
- Botao `"Filtrar"` (icone lupa + texto "Filtrar", fundo laranja, texto branco)
- **Toggle de visualizacao** (2 botoes adjacentes):
  - Icone lista (linhas horizontais) -- estado inativo (fundo branco/cinza)
  - Icone grid (4 quadrados) -- estado **ativo** (fundo navy escuro `~#1A2332`, icone branco)

---

#### 5.3 Grid de Cards de Veiculos

**Layout:** 3 colunas, gap uniforme (~`--ecom-space-6` / 24px).

Cada card e um `article` com fundo branco, border-radius medio (~8px), sombra sutil (`--ecom-shadow-sm`).

##### Estrutura do Card (Grid View):

**1. Area da imagem (topo do card):**
- Imagem do veiculo, aspect ratio ~4:3 ou 16:10
- `loading="lazy"`, `width` e `height` declarados
- **Badge de status** no canto superior esquerdo da imagem:
  - **"Disponivel":** fundo verde (`~#16A34A`), texto branco, border-radius full/pill
  - **"Em breve":** fundo laranja (`~#F7941D`), texto branco, border-radius full/pill
- Imagem com border-radius no topo do card (top-left e top-right)

**2. Tag de categoria (abaixo da imagem):**
- Texto em laranja `~#F7941D`, font-size pequeno (`--ecom-text-xs`)
- Exemplos: `"Cavalo Mecanico"`, `"Bitruck"`, `"Toco"`, `"Trucado"`

**3. Nome do veiculo:**
- Texto bold, escuro (`--ecom-text-primary`), font-size `--ecom-text-lg` ou `--ecom-text-xl`
- Exemplos: `"Scania R 450"`, `"Volvo FH 500"`, `"Mercedes Actros 2651"`

**4. Linha de especificacoes:**
- Texto cinza (`--ecom-text-secondary`), font-size pequeno (`--ecom-text-sm`)
- Formato: `Ano . KM Rodados . Combustivel`
- Exemplo: `"2022 . 420.000 km . Diesel"`

**5. Preco:**
- Label: `"A partir de"` (cinza, font-size `--ecom-text-xs`)
- Valor: `"R$ 8.500"` em laranja bold, font-size grande (`--ecom-text-2xl` / ~24px)
- Sufixo: `"/mes"` em cinza, font-size menor

**6. Area de acoes (rodape do card):**
- **Botao principal:** `"Solicitar Locacao"` (fundo laranja, texto branco, icone seta a direita, border-radius medio, largura ~70-80% do card)
- **Botao secundario:** icone de olho (ver detalhes) em circulo com borda cinza, a direita do botao principal
- Variacao para veiculos "Em breve": botao `"Pre-reservar"` com borda laranja, fundo branco, texto laranja (estilo outlined)

##### Dados dos Cards Visiveis no Screenshot:

| # | Nome | Categoria | Ano | KM | Combustivel | Preco/mes | Status | Botao |
|---|------|-----------|-----|-----|-------------|-----------|--------|-------|
| 1 | Scania R 450 | Cavalo Mecanico | 2022 | 420.000 km | Diesel | R$ 8.500 | Disponivel | Solicitar Locacao |
| 2 | Volvo FH 500 | Bitruck | 2021 | 380.000 km | Diesel | R$ 9.800 | Disponivel | Solicitar Locacao |
| 3 | Mercedes Actros 2651 | Bitruck | 2020 | 290.000 km | Diesel | R$ 7.200 | Em breve | Solicitar Locacao |
| 4 | Scania G 450 | Cavalo Mecanico | 2020 | 350.000 km | Diesel | R$ 6.900 | Disponivel | Solicitar Locacao |
| 5 | Volvo FM 370 | Toco | 2021 | 310.000 km | Diesel | R$ 6.400 | Disponivel | Solicitar Locacao |
| 6 | Iveco Stralis Hi-Way | Trucado | 2019 | 480.000 km | Diesel | R$ 7.800 | Disponivel | Solicitar Locacao |
| 7 | Scania R 450 | Cavalo Mecanico | 2022 | 420.000 km | Diesel | R$ 8.500 | Disponivel | Solicitar Locacao |
| 8 | Volvo FH 500 | Bitruck | 2021 | 380.000 km | Diesel | R$ 9.800 | Disponivel | Solicitar Locacao |
| 9 | Mercedes Actros 2651 | Bitruck | 2020 | 290.000 km | Diesel | R$ 7.200 | Em breve | Solicitar Locacao |

> Grid mostra 9 cards (3 linhas x 3 colunas) por pagina.

---

#### 5.4 Paginacao

Centralizada abaixo do grid. Componente de paginacao com:

- **Pagina 1** (ativa): circulo com fundo laranja `~#F7941D`, texto branco
- **Paginas 2, 3, 4:** circulos com fundo branco, borda cinza, texto escuro
- **Seta proxima (>):** circulo com fundo branco, borda cinza, icone seta direita

Layout: `[1] [2] [3] [4] [>]`

Dimensao de cada item: ~40x40px, border-radius full (circulo).

---

### 6. Secao de Conteudo SEO

Fundo branco (`--ecom-bg-surface`), abaixo do grid, largura total do container.

**Titulo (h2):**
```
Solucoes de Locacao de Frotas em Todo o Brasil
```
- Fonte heading bold, tamanho `--ecom-text-3xl` ou `--ecom-text-4xl`
- Cor escura (`--ecom-text-primary`)

**Paragrafo 1:**
```
O Grupo PLA oferece a maior frota de caminhoes e semireboques para locacao do Brasil. Com mais de 500 veiculos disponiveis, atendemos operacoes logisticas de qualquer porte, com contratos flexiveis e suporte tecnico especializado.
```

**Paragrafo 2:**
```
Nossa frota e composta por caminhoes truck, toco, cavalo mecanico e semireboques das principais marcas do mercado. Todos os veiculos passam por manutencao preventiva rigorosa e estao em conformidade com a legislacao de transporte rodoviario vigente.
```

- Cor do texto: cinza escuro (`--ecom-text-secondary`)
- Fonte body regular, `--ecom-text-base`
- Line-height relaxado (`--ecom-leading-relaxed`)

**Botao CTA:**
```
Saiba mais sobre nossa frota
```
- Fundo navy escuro (`~#1A2332`)
- Texto branco
- Border-radius medio (`--ecom-radius-md`)
- Padding generoso
- Seta nenhuma visivel no botao (apenas texto)

---

### 7. Newsletter Bar (componente global)

Fundo navy escuro (`~#1A2332`).

- Esquerda: icone de email (circulo laranja com icone envelope) + texto:
  - **"Newsletter"** (bold, branco, `--ecom-text-xl`)
  - `"Inscreva-se para receber dicas e promocoes"` (cinza claro, `--ecom-text-sm`)
- Direita: campo de input `"seu email..."` (fundo escuro/transparente, borda cinza) + botao `"Enviar"` (fundo laranja, texto branco, border-radius medio)

---

### 8. Footer Principal (componente global)

Fundo navy escuro (`~#1A2332`). Layout em 5 colunas:

**Col 1 — Marca:**
- Logo branco "Logoipsum"
- Descricao: `"Especialistas em pecas e veiculos pesados. Mais de 15 anos servindo o agronegocio e o transporte brasileiro."`
- Icones sociais: Instagram, Facebook, YouTube (circulos com borda cinza)

**Col 2 — Institucional:**
- Titulo: `"Institucional"` (branco, bold, sublinhado laranja curto)
- Links: Sobre nos, Politicas de Troca, Politicas de Frete, Politicas de Cookies, Assistencia tecnica, Blog

**Col 3 — Categorias:**
- Titulo: `"Categorias"` (branco, bold, sublinhado laranja curto)
- Links: Pecas, Estoque, Novos, Marcas, Locacao, Contato

**Col 4 — Contato:**
- Titulo: `"Contato"` (branco, bold, sublinhado laranja curto)
- Telefone: `(11) 4002-8922` (icone telefone verde)
- Email: `contato@grupopla.com.br` (icone email)
- Horario: `Seg-Sex: 8h as 18h` (icone relogio)

**Col 5 — Visite Nossa Loja:**
- Titulo: `"Visite Nossa Loja"` (branco, bold, sublinhado laranja curto)
- Endereco: `Av. Industrial, 1234 - SP` (icone pin)
- Link: `"Abrir no Maps"` (com icone externo)
- Embed do Google Maps (~250x200px)

---

### 9. Sub-footer (componente global)

Fundo navy mais escuro.

**Linha 1:**
- `"Formas de Pagamento"` (bold, branco)
- Badges: `PIX` (verde), `VISA` (azul), `MASTER` (laranja), `BOLETO` (cinza)

**Linha 2 (copyright):**
- Esquerda: `"(c) 2025 Grupo PLA. Todos os direitos reservados."`
- Direita: `"Politica de Privacidade | Termos de Uso"`
- Cor: cinza (`--ecom-text-muted`)

---

## Componentes BEM

### Bloco: `truck-card`

```
.truck-card                        -- card completo
.truck-card__image-wrapper         -- container da imagem
.truck-card__image                 -- tag <img>
.truck-card__badge                 -- badge de status (Disponivel / Em breve)
.truck-card__badge--available      -- modificador verde
.truck-card__badge--coming-soon    -- modificador laranja
.truck-card__category              -- tag de categoria (Cavalo Mecanico, Bitruck, etc.)
.truck-card__title                 -- nome do veiculo (h2 ou h3)
.truck-card__specs                 -- linha de ano, km, combustivel
.truck-card__pricing               -- wrapper do preco
.truck-card__price-label           -- "A partir de"
.truck-card__price-value           -- "R$ 8.500"
.truck-card__price-period          -- "/mes"
.truck-card__actions               -- wrapper dos botoes
.truck-card__cta                   -- botao "Solicitar Locacao"
.truck-card__cta--outline          -- variacao outline para "Pre-reservar"
.truck-card__details-btn           -- botao icone de olho (ver detalhes)
```

### Bloco: `rental-filters`

```
.rental-filters                    -- sidebar completa
.rental-filters__header            -- titulo "Filtros" + icone
.rental-filters__section           -- cada grupo de filtro
.rental-filters__label             -- label uppercase (TIPO DE VEICULO, etc.)
.rental-filters__checkbox          -- wrapper de cada checkbox
.rental-filters__chips             -- container dos chips de configuracao
.rental-filters__chip              -- chip individual
.rental-filters__chip--active      -- chip selecionado (laranja)
.rental-filters__toggle            -- toggle "Apenas disponiveis"
.rental-filters__submit            -- botao "Aplicar Filtros"
.rental-filters__clear             -- link "Limpar filtros"
```

### Bloco: `results-bar`

```
.results-bar                       -- barra completa
.results-bar__count                -- "47 veiculos encontrados"
.results-bar__active-filter        -- chip de filtro ativo
.results-bar__dropdowns            -- container dos selects
.results-bar__dropdown             -- select individual
.results-bar__filter-btn           -- botao "Filtrar"
.results-bar__view-toggle          -- container dos botoes grid/lista
.results-bar__view-btn             -- botao individual
.results-bar__view-btn--active     -- botao ativo (navy escuro)
```

### Bloco: `pagination`

```
.pagination                        -- wrapper
.pagination__list                  -- ol/ul
.pagination__item                  -- li
.pagination__link                  -- a ou button
.pagination__link--active          -- pagina ativa (laranja)
.pagination__link--next            -- seta proxima
```

### Bloco: `seo-content`

```
.seo-content                       -- secao completa
.seo-content__title                -- h2
.seo-content__text                 -- paragrafos
.seo-content__cta                  -- botao CTA
```

---

## Tokens de Cor Especificos desta Pagina

| Elemento | Cor | Token sugerido |
|----------|-----|---------------|
| Badge "Disponivel" | Verde `~#16A34A` | `--ecom-color-success` |
| Badge "Em breve" | Laranja `~#F7941D` | `--ecom-color-primary-500` |
| Chip ativo | Laranja `~#F7941D` | `--ecom-action-primary` |
| Chip inativo (borda) | Cinza `~#E5E7EB` | `--ecom-border-default` |
| Tag de categoria | Laranja `~#F7941D` | `--ecom-color-primary-500` |
| Preco | Laranja `~#F7941D` | `--ecom-color-primary-500` |
| Botao CTA principal | Laranja `~#F7941D` | `--ecom-action-primary` |
| Botao CTA SEO section | Navy `~#1A2332` | `--ecom-color-neutral-900` |
| Paginacao ativa | Laranja `~#F7941D` | `--ecom-action-primary` |
| Toggle view ativo | Navy `~#1A2332` | `--ecom-color-neutral-900` |
| Texto "Manutencao Inclusa" | Verde `~#16A34A` | `--ecom-color-success` |

---

## Comportamento e Interacoes (JavaScript)

### Toggle Grid/Lista
- Dois botoes na `results-bar`: icone lista e icone grid
- Clicar alterna a classe no container de resultados (ex: `data-view="grid"` / `data-view="list"`)
- Estado ativo: fundo navy escuro, icone branco
- Estado inativo: fundo branco/cinza, icone cinza
- Transicao suave entre layouts via CSS (nao necessita recarregar pagina)

### Filtros
- **Checkboxes (Tipo de Veiculo, Marca):** toggle selecao, multipla escolha
- **Chips (Configuracao):** toggle selecao, multipla escolha, estilo pill
- **Toggle "Apenas disponiveis":** switch on/off
- **Botao "Aplicar Filtros":** envia filtros e atualiza o grid
- **Link "Limpar filtros":** reseta todos os filtros ao estado padrao
- Filtros ativos aparecem como chips na barra de resultados (ex: `6x2 Truck`)
- Contagem de resultados atualiza: `"47 veiculos encontrados"`

### Dropdowns de Filtro Rapido
- Selects nativos ou custom dropdowns
- Opcoes: Tipo (Todos, Caminhao, Semirreboque...), Marca (Todas, Scania, Volvo...), Modelo (Todos, R 450, FH 500...)

### Cards
- **Hover no card:** leve elevacao (translateY ou sombra aumentada)
- **Botao "Solicitar Locacao":** abre fluxo de solicitacao (formulario ou pagina dedicada)
- **Botao olho (ver detalhes):** navega para pagina de detalhe do veiculo
- **Botao "Pre-reservar":** variante outline para veiculos "Em breve"

### Paginacao
- Navegacao entre paginas de resultados
- Pagina ativa destacada em laranja
- Seta `>` para proxima pagina

---

## SEO e Dados Estruturados

### Meta Tags

```html
<title>Locacao de Caminhoes e Semireboques -- Grupo PLA</title>
<meta name="description" content="Alugue caminhoes e semireboques com o Grupo PLA. Frota propria com manutencao inclusa, entrega em todo o Brasil. Contratos flexiveis a partir de 30 dias.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.grupopla.com.br/locacao">
```

### Schema.org (JSON-LD)

- **Organization** (global, todas as paginas)
- **BreadcrumbList:** Inicio > Locacao
- **ItemList:** lista de veiculos disponiveis para locacao

### Heading Hierarchy

```
h1: Locacao de Caminhoes e Semireboques
  h2: [implicit] Resultados / Grid de veiculos
    h3: Scania R 450 (nome de cada veiculo no card)
    h3: Volvo FH 500
    h3: Mercedes Actros 2651
    ...
  h2: Solucoes de Locacao de Frotas em Todo o Brasil (secao SEO)
```

---

## Responsividade (Notas)

| Breakpoint | Layout esperado |
|-----------|----------------|
| Desktop (>= 1024px) | Sidebar fixa a esquerda + grid 3 colunas |
| Tablet (768px - 1023px) | Sidebar recolhivel/overlay + grid 2 colunas |
| Mobile (< 768px) | Sidebar como drawer/modal + grid 1 coluna |

---

## Observacoes Adicionais

1. **Manutencao "Inclusa":** Nos cards da versao lista, o texto "Inclusa" aparece em verde (`--ecom-color-success`) ao lado de "Manutencao". Na versao grid simplificada, esse dado nao aparece explicitamente (apenas ano, km, combustivel).

2. **Ano no canto superior direito:** Na versao lista, o ano do veiculo aparece separado no canto superior direito do card. Na versao grid, o ano esta integrado na linha de specs.

3. **Subtipo do veiculo:** Na versao lista, aparece uma linha adicional abaixo do nome: ex. `"Cavalo Mecanico . 6x2 Truck"`. Na versao grid, apenas a tag de categoria aparece.

4. **Preco "A partir de":** Indica que o valor mensal pode variar conforme prazo e condicoes do contrato.

5. **Total de resultados:** `"47 veiculos encontrados"` -- este numero deve ser dinamico conforme filtros aplicados.

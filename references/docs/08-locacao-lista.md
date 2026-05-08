# 08 — Locacao Lista (Visualizacao em Lista)

> **Arquivo HTML:** `locacao.html` (mesma pagina que `07-locacao-grid`)
> **Referencia visual:** `references/screenshots/08-locacao-lista/`
> **PDF:** `Locacao lista -- Grupo PLA desktop.pdf`
> **Pagina compartilhada com:** `07-locacao-grid` (toggle grid/lista)

---

## Visao Geral

Esta e a **mesma pagina HTML** da versao grid (`07-locacao-grid.md`). A unica diferenca e o formato de exibicao dos cards de veiculos: ao inves de grid 3 colunas, os veiculos sao exibidos em **lista vertical** com cards horizontais (imagem a esquerda, detalhes ao centro, preco e acoes a direita).

Este documento foca exclusivamente nas **diferencas** em relacao a versao grid. Para componentes identicos (top bar, header, nav, hero, sidebar de filtros, paginacao, secao SEO, newsletter, footer), consultar `07-locacao-grid.md`.

---

## Diferencas em Relacao a Versao Grid

### 1. Toggle de Visualizacao (Barra de Resultados)

Na barra de resultados, o estado dos botoes de toggle se inverte:

- **Icone lista (linhas horizontais):** estado **ativo** (fundo navy escuro `~#1A2332`, icone branco)
- **Icone grid (4 quadrados):** estado **inativo** (fundo branco/cinza, icone cinza)

Todo o restante da barra de resultados permanece identico: contagem, chips de filtro ativo, dropdowns, botao "Filtrar".

---

### 2. Layout dos Cards de Veiculo (Lista)

Em vez de grid 3 colunas, os cards sao exibidos em **coluna unica**, cada card ocupando a largura total da area de resultados.

**Layout do card horizontal (3 zonas):**

```
+------------------+--------------------------------+-------------------+
|                  |  [Badge]          [Ano: 2022]  |                   |
|    IMAGEM        |  Nome do Veiculo               |   A partir de     |
|    (~30%)        |  Subtipo . Configuracao         |   R$ 8.500 /mes   |
|                  |                                |                   |
|                  |  KM Rodados  Combustivel  Manut|   [Ver detalhes]  |
|                  |  420.000 km  Diesel    Inclusa |   [Solicitar ->]  |
+------------------+--------------------------------+-------------------+
```

#### Zona Esquerda — Imagem (~30% da largura)

- Imagem do veiculo com aspect ratio similar ao grid (~4:3)
- **Badge de status** no canto superior esquerdo da imagem:
  - **"Disponivel":** fundo verde (`~#16A34A`), texto branco, border-radius full/pill
  - **"Em breve":** fundo laranja (`~#F7941D`), texto branco, border-radius full/pill
- Border-radius nos cantos esquerdos do card (top-left e bottom-left)
- `loading="lazy"`, `width` e `height` declarados

#### Zona Central — Detalhes (~45% da largura)

**Nome do veiculo (h3):**
- Texto bold, escuro (`--ecom-text-primary`), font-size `--ecom-text-xl` (~20px)
- Exemplo: `"Scania R 450"`

**Subtipo + Configuracao:**
- Texto cinza (`--ecom-text-secondary`), font-size `--ecom-text-sm`
- Formato: `Subtipo . Configuracao`
- Exemplo: `"Cavalo Mecanico . 6x2 Truck"`

> **Diferenca do grid:** Na lista, o subtipo e configuracao aparecem como linha de texto abaixo do nome. No grid, apenas a tag de categoria colorida aparece.

**Linha de especificacoes tecnicas:**
- Layout em colunas com labels e valores:

| Label (cinza, `--ecom-text-xs`) | Valor (escuro, `--ecom-text-sm` bold) |
|---|---|
| KM Rodados | `420.000 km` |
| Combustivel | `Diesel` |
| Manutencao | `Inclusa` (texto **verde** `~#16A34A`) |

> **Diferenca do grid:** No grid, esses dados aparecem em uma unica linha compacta `"2022 . 420.000 km . Diesel"`. Na lista, sao exibidos com labels explicitos e o campo "Manutencao: Inclusa" e adicionado em verde.

**Campo extra para Semirreboque — Carga Maxima:**
- Para veiculos do tipo semirreboque (ex: Scania G 450), aparece um campo adicional:

| Label | Valor |
|---|---|
| Carga Max. | `28 toneladas` |

#### Zona Direita — Preco e Acoes (~25% da largura)

**Ano do veiculo:**
- Posicionado no canto superior direito do card
- Texto bold, escuro (`--ecom-text-primary`), font-size `--ecom-text-base`
- Exemplo: `"2022"`

> **Diferenca do grid:** No grid, o ano esta na linha de specs. Na lista, o ano fica isolado no canto superior direito.

**Preco:**
- Label: `"A partir de"` (cinza, font-size `--ecom-text-xs`)
- Valor: `"R$ 8.500"` em laranja bold (`~#F7941D`), font-size grande (`--ecom-text-2xl`)
- Sufixo: `"/mes"` em cinza, font-size menor

**Botoes de acao (empilhados verticalmente):**

1. **Botao "Ver detalhes":**
   - Estilo outlined (borda cinza, fundo branco/transparente)
   - Icone de olho a esquerda do texto
   - Texto: `"Ver detalhes"`
   - Font-size `--ecom-text-sm`
   - Border-radius medio

2. **Botao "Solicitar Locacao":**
   - Fundo laranja `~#F7941D`, texto branco
   - Icone seta a direita
   - Texto: `"Solicitar Locacao"`
   - Font-size `--ecom-text-sm`
   - Border-radius medio

> **Diferenca do grid:** No grid, "Ver detalhes" e apenas um icone de olho circular. Na lista, e um botao completo com texto. Os botoes ficam empilhados verticalmente ao inves de lado a lado.

**Variacao para veiculos "Em breve":**
- Botao `"Pre-reservar"` em estilo outlined (borda laranja, fundo branco, texto laranja) no lugar de `"Solicitar Locacao"`

---

### 3. Quantidade de Cards por Pagina

Na versao lista, sao exibidos **8 cards** por pagina (versus 9 no grid — 3x3). Os cards visiveis no screenshot da lista:

| # | Nome | Subtipo | Config | Ano | KM | Combustivel | Manut. | Preco/mes | Status | CTA |
|---|------|---------|--------|-----|-----|-------------|--------|-----------|--------|-----|
| 1 | Scania R 450 | Cavalo Mecanico | 6x2 Truck | 2022 | 420.000 km | Diesel | Inclusa | R$ 8.500 | Disponivel | Solicitar Locacao |
| 2 | Scania R 450 | Cavalo Mecanico | 6x2 Truck | 2022 | 420.000 km | Diesel | Inclusa | R$ 8.500 | Disponivel | Solicitar Locacao |
| 3 | Scania R 450 | Cavalo Mecanico | 6x2 Truck | 2022 | 420.000 km | Diesel | Inclusa | R$ 8.500 | Disponivel | Solicitar Locacao |
| 4 | Volvo FH 500 | Cavalo Mecanico | 6x4 | 2023 | 180.000 km | Diesel | Inclusa | R$ 9.800 | Disponivel | Solicitar Locacao |
| 5 | Mercedes Actros 2651 | Cavalo Mecanico | 6x2 | 2021 | 530.000 km | Diesel | Inclusa | R$ 7.200 | Em breve | Pre-reservar |
| 6 | Scania G 450 | Semirreboque | 3 Eixos | 2022 | 310.000 km | -- | Inclusa | R$ 6.900 | Disponivel | Solicitar Locacao |
| 7 | Iveco Stralis Hi-Way | Cavalo Mecanico | 6x2 Toco | 2022 | 290.000 km | Diesel | Inclusa | R$ 7.800 | Disponivel | Solicitar Locacao |
| 8 | Volvo FM 370 | Caminhao Truck | 6x2 | 2020 | 610.000 km | Diesel | Inclusa | R$ 6.400 | Disponivel | Solicitar Locacao |

> **Nota sobre o Scania G 450:** Sendo um semirreboque, exibe "Carga Max.: 28 toneladas" no lugar de "Combustivel" e possui o campo extra de carga.

---

### 4. Separacao Visual entre Cards

- Cards da lista sao separados por espaco vertical (`--ecom-space-4` / ~16px)
- Cada card tem borda inferior sutil ou sombra leve para separacao
- Fundo de cada card: branco (`--ecom-bg-surface`)
- Border-radius: medio em todos os cantos (~8px / `--ecom-radius-lg`)

---

## Componentes BEM (Diferencas da Lista)

O bloco `truck-card` recebe um modificador para o layout lista:

```
.truck-card--list                  -- modificador para layout horizontal
.truck-card--list .truck-card__image-wrapper   -- largura fixa (~30%)
.truck-card--list .truck-card__body            -- zona central (flex column)
.truck-card--list .truck-card__sidebar         -- zona direita (preco + acoes)
.truck-card__subtitle              -- subtipo + configuracao (ex: "Cavalo Mecanico . 6x2 Truck")
.truck-card__spec-group            -- wrapper das specs com labels
.truck-card__spec                  -- item individual de spec
.truck-card__spec-label            -- label da spec (KM Rodados, Combustivel, etc.)
.truck-card__spec-value            -- valor da spec
.truck-card__spec-value--success   -- valor em verde (Manutencao "Inclusa")
.truck-card__year                  -- ano isolado no canto superior direito
.truck-card__details-btn--full     -- botao "Ver detalhes" com texto (vs icone-only no grid)
```

### Alternancia CSS (toggle)

A troca de visualizacao pode ser controlada via atributo `data-view` no container:

```css
/* Container com data-view controla o layout */
.truck-list[data-view="grid"] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--ecom-space-6);
}

.truck-list[data-view="list"] {
  display: flex;
  flex-direction: column;
  gap: var(--ecom-space-4);
}

/* Card adapta layout interno */
.truck-list[data-view="list"] .truck-card {
  display: grid;
  grid-template-columns: 280px 1fr auto;
  /* ou flex com widths definidos */
}
```

---

## Resumo das Diferencas Grid vs Lista

| Aspecto | Grid (07) | Lista (08) |
|---------|-----------|------------|
| Layout de cards | 3 colunas, cards verticais | 1 coluna, cards horizontais |
| Toggle ativo | Icone grid (navy) | Icone lista (navy) |
| Imagem do card | Topo do card, largura total | Esquerda, ~30% da largura |
| Categoria | Tag colorida laranja | Linha de texto: subtipo + configuracao |
| Specs | Linha unica: `"2022 . 420.000 km . Diesel"` | Labels explicitos em colunas: KM Rodados, Combustivel, Manutencao |
| Manutencao "Inclusa" | Nao visivel | Visivel, texto em verde |
| Carga Max. (semirreboque) | Nao visivel | Visivel como campo adicional |
| Ano | Na linha de specs | Isolado no canto superior direito |
| Botao "Ver detalhes" | Icone de olho circular | Botao completo com texto + icone |
| Botao "Solicitar Locacao" | Horizontal ao lado do icone olho | Empilhado verticalmente abaixo de "Ver detalhes" |
| Cards por pagina | 9 (3x3) | 8 (coluna unica) |
| Espaco entre cards | Gap de grid (~24px) | Gap vertical (~16px) |

---

## Comportamento JavaScript (Complementar)

### Toggle Grid/Lista

```js
// Seletor via data-attribute
const viewButtons = document.querySelectorAll('[data-action="toggle-view"]');
const container = document.querySelector('[data-component="truck-list"]');

// Alternar data-view no container
// Atualizar aria-pressed nos botoes
// Salvar preferencia no localStorage (key: ecom_rental_view)
```

- O toggle **nao recarrega a pagina** — alterna classes/atributos via JS
- A preferencia de visualizacao deve ser persistida em `localStorage`
- Ao carregar a pagina, verificar se ha preferencia salva e aplicar

### Acessibilidade do Toggle

```html
<div class="results-bar__view-toggle" role="group" aria-label="Tipo de visualizacao">
  <button
    type="button"
    class="results-bar__view-btn"
    data-action="toggle-view"
    data-view="list"
    aria-pressed="true"
    aria-label="Visualizar em lista"
  >
    <!-- icone lista -->
  </button>
  <button
    type="button"
    class="results-bar__view-btn"
    data-action="toggle-view"
    data-view="grid"
    aria-pressed="false"
    aria-label="Visualizar em grade"
  >
    <!-- icone grid -->
  </button>
</div>
```

---

## SEO

Identico a versao grid. A alternancia de visualizacao e puramente visual (CSS/JS) e nao afeta o conteudo HTML estatico. Todos os dados dos veiculos existem no HTML independentemente do modo de visualizacao ativo.

A URL canonica e a mesma: `https://www.grupopla.com.br/locacao`

---

## Responsividade (Notas)

| Breakpoint | Layout lista esperado |
|-----------|----------------------|
| Desktop (>= 1024px) | Cards horizontais com 3 zonas (imagem, detalhes, preco) |
| Tablet (768px - 1023px) | Cards horizontais com imagem menor (~25%) |
| Mobile (< 768px) | Cards empilham verticalmente (imagem no topo, dados abaixo, preco abaixo) — layout identico ao grid mobile |

> Em mobile, as visualizacoes grid e lista tendem a convergir para o mesmo layout de coluna unica com cards verticais. O toggle de visualizacao pode ser ocultado em mobile.

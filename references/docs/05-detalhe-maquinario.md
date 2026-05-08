# 05 — Detalhe de Venda de Maquinario (Trator)

Referencia visual: `references/screenshots/05-detalhe-venda-maquinario/`

Pagina: `detalhe-maquinario.html`

---

## Estrutura Geral da Pagina (de cima para baixo)

1. Top Bar (global)
2. Header (global)
3. Menu de Navegacao (global)
4. Breadcrumb
5. Secao de Produto (galeria + informacoes de maquinario)
6. Tabs (Descricao / Especificacoes / Entrega e Devolucao)
7. Avaliacoes
8. Produtos Similares
9. Newsletter Bar (global)
10. Footer (global)

---

## 1. Breadcrumb

- Caminho: `Home > Pecas > Filtros de Ar > Trator John Deere 5E 105cv 4x4 2024`
- Mesmo estilo visual da pagina 03

---

## 2. Secao de Produto

Layout em 2 colunas. Fundo branco.

### 2.1 Coluna Esquerda — Galeria de Imagens

- **Imagem principal**: foto grande do trator (John Deere 5E verde/amarelo em campo)
- **Thumbnails**: 5 miniaturas abaixo mostrando diferentes angulos do trator
- Mesmo comportamento da galeria de peca (03)
- Thumbnail ativa com borda laranja

### 2.2 Coluna Direita — Informacoes do Maquinario

#### Titulo
- **h1**: `Trator John Deere 5E 105cv 4x4 2024`
- Fonte: `--ecom-text-2xl` ou `--ecom-text-3xl`, `--ecom-font-bold`, cor `--ecom-text-primary`

#### Metadados (linha abaixo do titulo)
- `REF: JD5E-105-4x4` | `Motor: 4 cilindros turbo, 105 cv` | `SKU  JD5E105`
- Fonte: `--ecom-text-sm`, cor `--ecom-text-secondary`

#### Estrelas de Avaliacao
- 5 estrelas vazias/outline (indicando rating)

#### Badge de Disponibilidade
- Mesmo estilo de 03: icone verde + `Em Estoque — Pronta Entrega`

#### Bloco de Preco

- **Badge de desconto**: pill laranja com texto branco `12% OFF`
- **Preco original**: riscado, cinza — `R$ 410.000,00`
- **Preco atual**: grande, bold — `R$ 389.900,00`
  - Fonte: `--ecom-text-4xl`, `--ecom-font-bold`, cor navy
- **Parcelamento**: `ou 60x de R$ 7.500,00 com entrada`
  - Fonte: `--ecom-text-sm`, cor `--ecom-text-secondary`
- **Desconto PIX**: `R$ 370.905,00 no PIX (5% de desconto)`
  - Cor: laranja (`--ecom-color-primary-500`)

#### Seletor de Quantidade + Disponibilidade

- `Quantidade:` + botoes `[-]` `[1]` `[+]`
- **Diferenca de 03**: texto `Disponibilidade` + `Sob consulta` (em vez de "+50 unidades")
  - `Sob consulta`: cor navy, `--ecom-font-semibold`

#### Botoes de Acao (3 botoes)

**Linha 1** (dois botoes lado a lado, mesmo estilo de 03):

1. **Adicionar ao Carrinho**
   - Fundo: laranja, texto branco, icone de carrinho
   - Largura: ~55%

2. **Pedir via WhatsApp**
   - Fundo: branco, borda laranja, texto laranja, icone WhatsApp
   - Largura: ~45%

**Linha 2** (botao full-width, EXCLUSIVO desta pagina):

3. **Simular Financiamento**
   - Fundo: verde escuro (`~#16A34A` ou tom de verde -- ver referencia visual; na verdade o botao aparece com fundo laranja escuro/dourado, mais escuro que o CTA principal)
   - Na referencia visual: o botao tem fundo de tom verde-escuro/navy-esverdeado
   - Texto: branco, `--ecom-font-semibold`
   - Icone: simbolo de calculadora/documento a esquerda
   - `border-radius: --ecom-radius-lg`
   - Largura: 100% da coluna de informacoes
   - Ao clicar: abre o modal de financiamento (documentado em `06-popup-financiamento.md`)

#### Informacao de Frete/Entrega
- Icone de caminhao + texto: `Entrega inclui transporte especializado`
- Subtexto: `Prazo conforme localidade — consulte-nos`
- Diferente de 03: nao menciona valor minimo para frete gratis, indica transporte especializado

#### Barra de Compartilhar
- Identica a 03: `Compartilhar:` + icones (share, coracao, impressora) + `Compartilhar especificacao`

---

## 3. Tabs de Conteudo

Mesmo layout de abas que 03 (Descricao / Especificacoes / Entrega e Devolucao).

### Conteudo da Aba "Descricao" (visivel por padrao)

**Subtitulo**: `Especificacoes Tecnicas` — `--ecom-font-bold`, `--ecom-text-lg`

**Diferente de 03**: o conteudo da aba Descricao para maquinario traz especificacoes tecnicas em formato de topicos, nao paragrafos descritivos.

Conteudo (cada item em paragrafo separado com prefixo em bold):

1. **Motor:** `4 cilindros turbo diesel de 105 cv (77 kW), atendendo as normas de emissao Tier 3. Torque elevado para trabalhos pesados no campo.`

2. **Tracao:** `4x4 com tracao dianteira assistida, garantindo maior aderencia e desempenho em terrenos irregulares e umidos.`

3. **Transmissao:** `Cambio PowerShift com 12 marchas a frente e 12 a re, com engate rapido e troca de marchas sob carga.`

4. **Engate de 3 pontos:** `Categoria II com capacidade de levante de ate 3.500 kg, ideal para implementos agricolas de medio porte.`

5. **Cabine:** `Cabine pressurizada com ar-condicionado, banco suspenso com amortecedor, painel digital e visibilidade ampla para maior conforto e seguranca do operador.`

6. **Aplicacoes:** `Adequado para preparo do solo, plantio, colheita, transporte interno, e demais atividades agricolas de pequeno e medio porte.`

Formato: cada item com label em bold (`--ecom-font-bold`) seguido de dois-pontos e texto descritivo. Fonte `--ecom-text-base`, `--ecom-leading-relaxed`.

---

## 4. Secao de Avaliacoes

Identica a 03. Mesmo layout 2 colunas, mesmas avaliacoes de referencia, mesmo card de nota geral (4.0, baseado em 128 avaliacoes), mesmas metricas em destaque.

Link `Ver todas as avaliacoes` no canto inferior direito, texto laranja.

---

## 5. Produtos Similares

Identico a 03. Grid 4 colunas com os mesmos cards de maquinario de referencia:

| Marca | Ano | Nome | Preco |
|-------|-----|------|-------|
| John Deere | 2022 | John Deere 6110J 4x4 | R$ 189.000 |
| Massey Ferguson | 2021 | Massey Ferguson 7270 Dyna-6 | R$ 245.000 |
| New Holland | 2023 | New Holland T7.205 AutoCommand | R$ 320.000 |
| Valtra | 2020 | Valtra BM125i 4x4 Turbo | R$ 165.000 |

Cabecalho: `Produtos Similares` + subtitulo + botao `Ver Pecas para Tratores`.

---

## 6. Diferencas em Relacao a 03-detalhe-peca

| Aspecto | 03 (Peca) | 05 (Maquinario) |
|---------|-----------|-----------------|
| Titulo do produto | Nome da peca + REF | Nome do trator + ano + especificacao |
| Metadados | REF, Compativel, SKU | REF, Motor, SKU |
| Faixa de preco | R$ 179,90 | R$ 389.900,00 |
| Parcelamento | 12x sem juros no cartao | 60x com entrada |
| Quantidade minima | +50 unidades | Sob consulta |
| Botao extra | Nao tem | **Simular Financiamento** (full-width, abre modal) |
| Frete | Gratis acima de R$ 500, 3-7 dias | Transporte especializado, prazo sob consulta |
| Conteudo da tab Descricao | Paragrafos descritivos ("Sobre o Produto") | Especificacoes tecnicas em formato topico ("Especificacoes Tecnicas") |
| Widget de compatibilidade | Nao tem | Nao tem (so na pagina 04) |

---

## 7. Componentes BEM Adicionais

```
.product-detail--machinery
.product-detail__financing-btn
.product-detail__availability--consultation
```

Demais componentes sao os mesmos de 03.

---

## 8. Comportamento Interativo (JavaScript)

Mesmo de 03, com adicao:

| Interacao | Comportamento |
|-----------|--------------|
| Click em "Simular Financiamento" | Abre modal overlay (documentado em 06-popup-financiamento.md). Foco move para o modal. Pagina de fundo escurece com overlay semi-transparente. |

---

## 9. Dados Estruturados (Schema.org)

- `Product` com `name`, `sku`, `image`, `description`, `brand` (John Deere), `category`, `offers`
- `offers.price`: `389900.00`, `priceCurrency`: `BRL`
- `offers.availability`: `https://schema.org/InStock`
- `BreadcrumbList`
- `AggregateRating` com `ratingValue: 4.0`, `reviewCount: 128`

---

## 10. SEO e Acessibilidade

- `<h1>`: `Trator John Deere 5E 105cv 4x4 2024`
- `<h2>`: "Especificacoes Tecnicas", "Avaliacoes", "Produtos Similares"
- Botao "Simular Financiamento" com texto descritivo (nao precisa de aria-label extra)
- `aria-haspopup="dialog"` no botao de financiamento para indicar que abre modal
- Demais requisitos identicos a 03

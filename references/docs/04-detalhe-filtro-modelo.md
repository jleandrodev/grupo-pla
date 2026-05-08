# 04 — Detalhe com Filtro de Modelo (Verificar Compatibilidade)

Referencia visual: `references/screenshots/04-detalhe-filtro-modelo/`

Pagina: `detalhe-filtro-modelo.html`

---

## Relacao com 03-detalhe-peca

Esta pagina e uma **variacao** da pagina `03-detalhe-peca.html`. Possui a mesma estrutura completa (galeria, preco, tabs, avaliacoes, produtos similares), com **duas diferencas**:

1. Widget **"Verificar Compatibilidade"** inline na secao de produto (coluna direita)
2. Secao **"Verificar Compatibilidade com Seu Veiculo"** full-width entre Avaliacoes e Produtos Similares

Tudo o que nao e mencionado neste documento e identico ao `03-detalhe-peca.md`.

---

## Diferenca 1 — Widget Inline de Compatibilidade (na coluna de informacoes do produto)

Posicionado **entre o bloco de preco (desconto PIX) e o seletor de quantidade**.

### Estrutura

- **Icone**: engrenagem laranja (circulo laranja com icone de verificacao/engrenagem)
- **Titulo**: `Verificar Compatibilidade` — `--ecom-font-bold`, `--ecom-text-base`
- **Subtexto**: `Selecione o veiculo para verificar se esta peca e compativel` — `--ecom-text-sm`, cor `--ecom-text-secondary`

### Campos do formulario (inline, compacto)

- **Marca/Modelo**: dropdown/select compacto
  - Placeholder: `Selecione o modelo`
  - Borda: `--ecom-border-default`
  - `border-radius: --ecom-radius-sm`
  - Fonte: `--ecom-text-sm`

O widget inline e uma versao resumida/compacta. Mostra apenas o dropdown de Marca/Modelo juntos num espaco menor dentro da area de produto. O formulario completo (com 3 dropdowns separados) aparece na secao full-width abaixo.

### Visual
- Fundo: branco com borda cinza clara ao redor de todo o bloco
- `border-radius: --ecom-radius-md`
- Padding: `--ecom-space-4`

---

## Diferenca 2 — Secao Full-Width "Verificar Compatibilidade com Seu Veiculo"

Posicionada **entre a secao de Avaliacoes e Produtos Similares** (diferente da pagina 03 onde Produtos Similares vem logo apos Avaliacoes).

### Fundo e Layout
- Fundo: navy escuro (`--ecom-color-neutral-800` / `~#1A2332`)
- Largura: 100% da viewport (full-bleed)
- Padding vertical: `--ecom-space-12` ou `--ecom-space-16`

### Cabecalho (centrado)
- **Icone**: circulo laranja com icone de engrenagem branco, tamanho ~48px
- **Titulo**: `Verificar Compatibilidade com Seu Veiculo` — `--ecom-text-2xl` ou `--ecom-text-3xl`, `--ecom-font-bold`, cor branca
- **Subtexto**: `Selecione a marca e o modelo do veiculo para verificar se esta peca e compativel` — `--ecom-text-base`, cor cinza claro

### Formulario (card branco centrado)
- Fundo: branco (`--ecom-bg-surface`)
- `border-radius: --ecom-radius-xl`
- Padding: `--ecom-space-8`
- Largura: ~80% do container, centrado
- `box-shadow: --ecom-shadow-lg`

#### Campos (3 dropdowns em linha + botao)

Layout horizontal (flex row), 3 selects + 1 botao:

| Campo | Label | Placeholder | Largura |
|-------|-------|-------------|---------|
| Marca | `Marca` | `Selecione a marca` | ~30% |
| Modelo | `Modelo` | `Selecione o modelo` | ~30% |
| Ano | `Ano` | `Selecione o ano` | ~20% |
| Botao | — | — | ~20% |

- Labels acima de cada select, fonte `--ecom-text-sm`, `--ecom-font-medium`, cor `--ecom-text-primary`
- Selects: borda cinza (`--ecom-border-default`), `border-radius: --ecom-radius-sm`, altura ~44px
- Icone de chevron (seta para baixo) a direita de cada select

**Botao "Verificar"**:
- Fundo: laranja (`--ecom-action-primary`)
- Texto: branco, `--ecom-font-semibold`
- Icone: lupa branca a esquerda
- `border-radius: --ecom-radius-md`
- Alinhado na mesma linha dos selects (baseline dos inputs)

### Comportamento JS (cascata de selects)

| Interacao | Comportamento |
|-----------|--------------|
| Selecionar Marca | Popula o dropdown Modelo com modelos da marca selecionada |
| Selecionar Modelo | Popula o dropdown Ano com anos disponiveis para o modelo |
| Click em Verificar | Valida se todos os campos foram preenchidos; consulta API de compatibilidade; exibe resultado (compativel/incompativel) |
| Resultado compativel | Exibe mensagem de sucesso verde abaixo do formulario |
| Resultado incompativel | Exibe mensagem de alerta vermelha com sugestao de pecas compativeis |

---

## Ordem das Secoes (de cima para baixo)

1. Top Bar (global)
2. Header (global)
3. Menu de Navegacao (global)
4. Breadcrumb
5. Secao de Produto (galeria + informacoes **com widget inline de compatibilidade**)
6. Tabs (Descricao / Especificacoes / Entrega e Devolucao)
7. Avaliacoes
8. **Secao "Verificar Compatibilidade com Seu Veiculo"** (full-width, fundo navy)
9. Produtos Similares
10. Newsletter Bar (global)
11. Footer (global)

---

## Componentes BEM Adicionais (alem dos de 03)

```
.compatibility-check
.compatibility-check__icon
.compatibility-check__title
.compatibility-check__subtitle

.compatibility-widget
.compatibility-widget__section
.compatibility-widget__header
.compatibility-widget__form
.compatibility-widget__field
.compatibility-widget__label
.compatibility-widget__select
.compatibility-widget__button
.compatibility-widget__result
.compatibility-widget__result--success
.compatibility-widget__result--error

.compatibility-inline
.compatibility-inline__icon
.compatibility-inline__title
.compatibility-inline__text
.compatibility-inline__select
```

---

## Dados Estruturados Adicionais

Mesmos que `03-detalhe-peca.md`. Nenhum schema adicional para o widget de compatibilidade (e interativo, nao indexavel).

---

## Acessibilidade Especifica

- Selects de Marca/Modelo/Ano com `<label>` associado via `for`/`id`
- Resultado da verificacao anunciado via `aria-live="polite"` em regiao dinamica
- Selects desabilitados (Modelo e Ano) ate que o campo anterior seja preenchido — usar `disabled` e `aria-disabled="true"`
- Botao Verificar com `aria-label="Verificar compatibilidade da peca com o veiculo selecionado"`
- Contraste do texto branco sobre fundo navy: verificar WCAG AA (minimo 4.5:1)

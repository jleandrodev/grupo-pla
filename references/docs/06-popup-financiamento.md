# 06 — Popup de Simulacao de Financiamento

Referencia visual: `references/screenshots/06-detalhe-popup-financiamento/`

Pagina: modal sobre `detalhe-maquinario.html`

---

## Contexto

Este modal e aberto ao clicar no botao **"Simular Financiamento"** na pagina de detalhe de maquinario (`05-detalhe-maquinario.md`). Ele aparece como overlay sobre a pagina, que fica escurecida ao fundo.

---

## 1. Overlay de Fundo

- Cor: preto semi-transparente (`rgba(0, 0, 0, 0.5)` ou `--ecom-color-neutral-900` com opacity ~50%)
- Cobre toda a viewport
- `z-index: --ecom-z-overlay` (300)
- Click no overlay fecha o modal
- A pagina por tras fica visivel mas escurecida e desfocada

---

## 2. Card do Modal

- **Posicao**: centrado na viewport (horizontal e vertical)
- **Largura**: ~480px (largura fixa, centrada)
- **Fundo**: branco (`--ecom-bg-surface`)
- **`border-radius`**: `--ecom-radius-2xl` (~16px)
- **`box-shadow`**: `--ecom-shadow-xl`
- **`z-index`**: `--ecom-z-modal` (400)
- **Padding**: `--ecom-space-8` (~32px)

---

## 3. Estrutura Interna do Modal (de cima para baixo)

### 3.1 Cabecalho do Modal

- **Titulo**: `Simular Financiamento` — `--ecom-text-xl` ou `--ecom-text-2xl`, `--ecom-font-bold`, cor `--ecom-text-primary`
- **Botao fechar**: `X` no canto superior direito
  - Icone: `X` fino, cor cinza (`--ecom-text-secondary`)
  - Sem fundo, sem borda
  - `aria-label="Fechar modal de simulacao de financiamento"`
  - Tamanho do alvo de toque: minimo 44x44px

### 3.2 Subtitulo do Produto

- Texto: `Trator John Deere 5E 105cv 4x4 2024`
- Fonte: `--ecom-text-sm`, cor `--ecom-text-secondary`
- Identifica o produto para o qual o financiamento esta sendo simulado

### 3.3 Campos de Valor (2 campos lado a lado)

Layout: 2 inputs em linha (flex row, gap `--ecom-space-4`)

| Campo | Label | Valor Padrao | Largura |
|-------|-------|-------------|---------|
| Valor do Veiculo | `Valor do Veiculo` | `R$ 389.900,00` | ~50% |
| Valor de Entrada | `Valor de Entrada` | `R$ 77.980,00` | ~50% |

- Labels acima de cada input, fonte `--ecom-text-sm`, `--ecom-font-medium`
- Inputs com borda cinza (`--ecom-border-default`), `border-radius: --ecom-radius-sm`
- Valor pre-preenchido: o Valor do Veiculo vem do preco do produto; Valor de Entrada e calculado automaticamente (20% do valor do veiculo)
- Inputs editaveis pelo usuario — ao alterar, recalcula o resultado
- Formato: monetario brasileiro (`R$ XXX.XXX,XX`)

### 3.4 Quantidade de Parcelas

- **Label**: `Quantidade de Parcelas` — `--ecom-text-sm`, `--ecom-font-medium`

- **Botoes de selecao** (toggle group, 5 opcoes em linha):

| Opcao | Visual |
|-------|--------|
| `12x` | Fundo navy escuro, texto branco |
| `24x` | Fundo navy escuro, texto branco |
| `36x` | Fundo navy escuro, texto branco |
| `48x` | Fundo navy escuro, texto branco |
| `60x` | **Fundo laranja (selecionado)**, texto branco |

- Cada botao: `border-radius: --ecom-radius-full` (pill), padding `--ecom-space-2 --ecom-space-4`
- Opcao selecionada (default `60x`): fundo laranja (`--ecom-action-primary`), texto branco
- Opcoes nao selecionadas: fundo navy escuro (`--ecom-color-neutral-800`), texto branco
- Todos os botoes na mesma linha, tamanho uniforme
- Espacamento entre botoes: `--ecom-space-2`

### 3.5 Resultado da Simulacao

Card de resultado com destaque visual:

- **Fundo**: tom creme/bege muito claro (`~#FFF8F0` ou variacao de `--ecom-color-primary-50`) — levemente alaranjado/amarelado
- **`border-radius`**: `--ecom-radius-lg`
- **Padding**: `--ecom-space-4`

Conteudo:

- **Label**: `Valor a ser Financiado` — `--ecom-text-xs` ou `--ecom-text-sm`, cor `--ecom-text-secondary`
- **Valor principal**: `R$ 311.920,00` — `--ecom-text-2xl` ou `--ecom-text-3xl`, `--ecom-font-bold`, cor laranja (`--ecom-color-primary-500`)
- **Detalhe das parcelas**: `em 60x de R$ 6.500,00+` — `--ecom-text-sm`, cor `--ecom-text-secondary`, alinhado a direita do valor ou abaixo

Calculo:
- `Valor Financiado = Valor do Veiculo - Valor de Entrada`
- `389.900,00 - 77.980,00 = 311.920,00`
- `Parcela = Valor Financiado / Qtd Parcelas` (simplificado; o `+` indica taxa de juros)
- `311.920 / 60 ~ R$ 5.198,67` (o valor exibido `R$ 6.500,00+` inclui taxa)

### 3.6 Botao CTA — Solicitar Financiamento

- **Largura**: 100% do modal
- **Fundo**: laranja (`--ecom-action-primary`)
- **Texto**: branco, `--ecom-font-semibold` — `Solicitar Financiamento`
- **Icone**: icone de documento/check branco a esquerda do texto
- **`border-radius`**: `--ecom-radius-lg`
- **Altura**: ~48px
- **Hover**: `--ecom-action-primary-hover` (laranja mais escuro)

### 3.7 Disclaimer (texto legal)

- Texto: `* Simulacao com taxa de 1,49% a.m. Sujeita a analise de credito. Condicoes validas para pessoa fisica.`
- Fonte: `--ecom-text-xs`, cor `--ecom-text-muted` (cinza claro)
- Alinhamento: esquerda
- Margem superior: `--ecom-space-3`

---

## 4. Componentes BEM

```
.financing-modal
.financing-modal__overlay
.financing-modal__card
.financing-modal__header
.financing-modal__title
.financing-modal__close
.financing-modal__product-name
.financing-modal__form
.financing-modal__field-group
.financing-modal__field
.financing-modal__label
.financing-modal__input
.financing-modal__installments
.financing-modal__installments-label
.financing-modal__installments-options
.financing-modal__installment-btn
.financing-modal__installment-btn--active
.financing-modal__result
.financing-modal__result-label
.financing-modal__result-value
.financing-modal__result-detail
.financing-modal__submit
.financing-modal__disclaimer
```

---

## 5. Comportamento Interativo (JavaScript)

| Interacao | Comportamento |
|-----------|--------------|
| Abrir modal | Ao clicar "Simular Financiamento" na pagina de maquinario. Modal aparece com animacao (fade-in + scale-up). Foco move para o modal. Body recebe `overflow: hidden` para impedir scroll da pagina. |
| Fechar modal — botao X | Fecha modal, devolve foco ao botao que abriu, remove `overflow: hidden` do body |
| Fechar modal — click no overlay | Mesmo comportamento |
| Fechar modal — tecla Escape | Mesmo comportamento |
| Trap de foco | Tab navega apenas entre os elementos interativos dentro do modal (inputs, botoes de parcela, botao CTA, botao fechar). Nunca sai do modal enquanto aberto. |
| Alterar Valor do Veiculo | Recalcula Valor Financiado e valor da parcela em tempo real |
| Alterar Valor de Entrada | Recalcula Valor Financiado e valor da parcela em tempo real |
| Selecionar quantidade de parcelas | Toggle visual (ativa o botao selecionado, desativa o anterior). Recalcula valor da parcela. |
| Click em "Solicitar Financiamento" | Abre link de WhatsApp com mensagem pre-formatada contendo: nome do produto, valor do veiculo, entrada, quantidade de parcelas, valor financiado. Ou envia formulario para API. |
| Validacao | Valor de entrada nao pode ser maior que o valor do veiculo. Valor de entrada minimo: 20% (avisar se for menor). |

### Logica de Calculo

```
valorFinanciado = valorVeiculo - valorEntrada
taxaMensal = 0.0149  // 1,49% a.m.
parcela = valorFinanciado * (taxaMensal * (1 + taxaMensal)^n) / ((1 + taxaMensal)^n - 1)
// onde n = quantidade de parcelas
```

O `+` apos o valor da parcela indica que e uma estimativa sujeita a analise.

---

## 6. Atributos HTML e Acessibilidade

```html
<div
  class="financing-modal__overlay"
  role="dialog"
  aria-modal="true"
  aria-labelledby="financing-modal-title"
  id="financing-modal"
>
  <div class="financing-modal__card">
    <header class="financing-modal__header">
      <h2 id="financing-modal-title" class="financing-modal__title">
        Simular Financiamento
      </h2>
      <button
        type="button"
        class="financing-modal__close"
        aria-label="Fechar modal de simulacao de financiamento"
        data-action="close-modal"
      >
        <!-- icone X -->
      </button>
    </header>

    <p class="financing-modal__product-name">
      Trator John Deere 5E 105cv 4x4 2024
    </p>

    <form class="financing-modal__form">
      <div class="financing-modal__field-group">
        <div class="financing-modal__field">
          <label for="vehicle-value" class="financing-modal__label">
            Valor do Veiculo
          </label>
          <input
            type="text"
            id="vehicle-value"
            class="financing-modal__input"
            value="R$ 389.900,00"
            inputmode="numeric"
            data-role="vehicle-value"
          >
        </div>
        <div class="financing-modal__field">
          <label for="down-payment" class="financing-modal__label">
            Valor de Entrada
          </label>
          <input
            type="text"
            id="down-payment"
            class="financing-modal__input"
            value="R$ 77.980,00"
            inputmode="numeric"
            data-role="down-payment"
          >
        </div>
      </div>

      <fieldset class="financing-modal__installments">
        <legend class="financing-modal__installments-label">
          Quantidade de Parcelas
        </legend>
        <div class="financing-modal__installments-options" role="radiogroup">
          <!-- Cada botao como radio button acessivel -->
          <button type="button" role="radio" aria-checked="false"
            class="financing-modal__installment-btn"
            data-installments="12">12x</button>
          <button type="button" role="radio" aria-checked="false"
            class="financing-modal__installment-btn"
            data-installments="24">24x</button>
          <button type="button" role="radio" aria-checked="false"
            class="financing-modal__installment-btn"
            data-installments="36">36x</button>
          <button type="button" role="radio" aria-checked="false"
            class="financing-modal__installment-btn"
            data-installments="48">48x</button>
          <button type="button" role="radio" aria-checked="true"
            class="financing-modal__installment-btn financing-modal__installment-btn--active"
            data-installments="60">60x</button>
        </div>
      </fieldset>

      <div class="financing-modal__result" aria-live="polite">
        <span class="financing-modal__result-label">Valor a ser Financiado</span>
        <span class="financing-modal__result-value">R$ 311.920,00</span>
        <span class="financing-modal__result-detail">em 60x de R$ 6.500,00+</span>
      </div>

      <button
        type="button"
        class="financing-modal__submit btn btn--primary"
        data-action="request-financing"
      >
        Solicitar Financiamento
      </button>
    </form>

    <p class="financing-modal__disclaimer">
      * Simulacao com taxa de 1,49% a.m. Sujeita a analise de credito.
      Condicoes validas para pessoa fisica.
    </p>
  </div>
</div>
```

### Requisitos de Acessibilidade

| Requisito | Implementacao |
|-----------|--------------|
| role="dialog" + aria-modal="true" | No container do modal |
| aria-labelledby | Aponta para o h2 do titulo |
| Trap de foco | Tab circula apenas entre elementos do modal |
| Fechar com Escape | Event listener no keydown |
| Devolver foco ao fechar | Salvar referencia do botao que abriu, focus() ao fechar |
| Botoes de parcela como radiogroup | role="radiogroup" no container, role="radio" + aria-checked em cada botao |
| Resultado dinamico | aria-live="polite" no bloco de resultado para anunciar recalculos |
| Inputs monetarios | inputmode="numeric" para teclado numerico em mobile |
| Disclaimer legivel | Fonte minima 12px (--ecom-text-xs), contraste minimo 3:1 (texto muted) |

---

## 7. Estados Visuais

| Estado | Visual |
|--------|--------|
| Modal fechado | `display: none` ou `hidden` attribute |
| Modal abrindo | Animacao: overlay fade-in (`opacity: 0 -> 1`, 250ms), card scale (`transform: scale(0.95) -> scale(1)`, 250ms) |
| Modal aberto | Totalmente visivel, body com scroll bloqueado |
| Modal fechando | Animacao reversa (fade-out + scale-down), apos animacao: `display: none` |
| Parcela selecionada | Fundo laranja, demais navy escuro |
| Parcela hover | Leve clareamento do fundo navy |
| Input em foco | `border-color: --ecom-border-focus` (laranja/primario), `outline: 2px solid --ecom-border-focus` |
| Botao CTA hover | `--ecom-action-primary-hover` |
| Erro de validacao | Borda vermelha no input, mensagem abaixo em `--ecom-color-error` |

---

## 8. Dados que Nao Indexar

Este modal e puramente interativo e transacional. Nao deve conter dados estruturados Schema.org. A pagina de maquinario que contem o modal ja deve ter `Product` schema com o preco e disponibilidade.

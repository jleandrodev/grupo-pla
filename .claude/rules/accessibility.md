# Acessibilidade (WCAG 2.1 AA)

## Requisito Mínimo

Todos os e-commerces do template devem passar no nível **WCAG 2.1 AA**. Além de ser boa prática, é requisito legal no Brasil (Lei nº 13.146/2015 — LBI).

---

## Regras Obrigatórias

### 1. Foco Visível

Nunca remover outline sem substituir por alternativa visível.

```css
/* base.css — foco padrão */
:focus-visible {
  outline: 2px solid var(--ecom-border-focus);
  outline-offset: 2px;
}

/* Remover apenas o :focus (não :focus-visible) para mouse */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 2. Skip Link

Obrigatório como primeiro elemento do `<body>`:

```html
<a class="skip-link" href="#main-content">Pular para o conteúdo</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--ecom-space-4);
  padding: var(--ecom-space-2) var(--ecom-space-4);
  background: var(--ecom-action-primary);
  color: var(--ecom-text-on-primary);
  border-radius: var(--ecom-radius-md);
  z-index: var(--ecom-z-toast);
  transition: top var(--ecom-duration-fast);
}

.skip-link:focus {
  top: var(--ecom-space-4);
}
```

### 3. Contraste

| Elemento | Requisito |
|---|---|
| Texto normal (< 18px) | 4.5:1 |
| Texto grande (>= 18px regular ou >= 14px bold) | 3:1 |
| Componentes UI (bordas de input, ícones) | 3:1 |

### 4. Imagens

```html
<!-- Imagem informativa: alt descritivo -->
<img src="produto.webp" alt="Tênis Nike Air Max branco, tamanho 42">

<!-- Imagem decorativa: alt vazio -->
<img src="banner-bg.webp" alt="">

<!-- Ícone ao lado de texto: aria-hidden para não duplicar -->
<img src="icons/cart.svg" alt="" aria-hidden="true">
<span>Carrinho (3)</span>
```

### 5. Formulários

Cada campo precisa de label associado:

```html
<!-- CORRETO: label explícita -->
<label for="cep">CEP</label>
<input type="text" id="cep" name="cep" autocomplete="postal-code">

<!-- CORRETO: aria-label quando label visual não é possível -->
<input type="search" aria-label="Buscar produtos" placeholder="O que você procura?">

<!-- ERRADO: placeholder como único label -->
<input type="text" placeholder="CEP"> <!-- ← sem label! -->
```

Erros de validação:

```html
<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
>
<span id="email-error" role="alert">
  Informe um e-mail válido.
</span>
```

### 6. Botões e Links

| Elemento | Regra |
|---|---|
| `<button>` | Ação JS — sem `href` |
| `<a>` | Navegação — com `href` real |
| Botão icon-only | Obrigatório `aria-label` |
| Link abre nova aba | `target="_blank" rel="noopener noreferrer"` + indicação visual |

### 7. Modais e Overlays

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  id="cart-modal"
>
  <h2 id="modal-title">Carrinho</h2>
  <!-- conteúdo -->
  <button type="button" aria-label="Fechar modal do carrinho">×</button>
</div>
```

Comportamento obrigatório no JS:
- Ao abrir: mover foco para o modal (`modal.focus()`)
- Trap de foco: Tab não sai do modal enquanto aberto
- Fechar com `Escape`
- Ao fechar: devolver foco ao elemento que abriu

### 8. Carregamento Assíncrono

```html
<!-- Região que atualiza via JS -->
<div aria-live="polite" aria-atomic="true" id="cart-status">
  <!-- Mensagens de status: "Produto adicionado ao carrinho" -->
</div>
```

### 9. Navegação por Teclado

Ordem de Tab deve seguir a ordem visual da página. Nunca usar `tabindex` positivo (>0).

```html
<!-- Dropdown de menu — padrão acessível -->
<nav>
  <button aria-expanded="false" aria-controls="submenu-categorias">
    Categorias
  </button>
  <ul id="submenu-categorias" hidden>
    <li><a href="/camisetas">Camisetas</a></li>
    <li><a href="/calcas">Calças</a></li>
  </ul>
</nav>
```

---

## Ferramentas de Verificação

| Ferramenta | Quando usar |
|---|---|
| [axe DevTools](https://www.deque.com/axe) | Durante desenvolvimento (extensão Chrome) |
| [WAVE](https://wave.webaim.org) | Revisão visual de issues |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker) | Validar contraste de cores |
| Leitor de tela NVDA + Chrome | Teste manual no Windows |
| VoiceOver + Safari | Teste manual no Mac/iOS |
| Teclado apenas (sem mouse) | Testar toda a jornada de compra |

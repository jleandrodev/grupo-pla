# Guia Rápido de Customização por Cliente

> Para o desenvolvedor que vai customizar o template para um novo cliente.
> Tempo estimado de setup: 30-60 minutos.

---

## TL;DR — Os 3 arquivos que você vai editar

1. `template/assets/css/tokens.css` — cores, fontes, border-radius
2. `template/assets/images/logo/` — logo.png, logo-white.svg, favicon.svg
3. `template/assets/js/config.js` — nome da loja, API endpoint

---

## Passo a Passo

### 1. Duplicar o template

```bash
cp -r template/ clientes/nome-cliente/
cd clientes/nome-cliente/
```

### 2. Abrir tokens.css e customizar

O arquivo está em `assets/css/tokens.css`. Edite as seções:

**Cores:**
```css
/* Substitua estas linhas com a paleta do cliente */
--ecom-color-primary-500: #HEXAQUI;   /* cor principal */
--ecom-color-secondary-500: #HEXAQUI; /* cor de destaque */
```

Gere a escala completa em: https://uicolors.app

**Fontes:**
```css
/* Substitua com a fonte escolhida */
--ecom-font-body:    'NomeDaFonte', system-ui, sans-serif;
--ecom-font-heading: 'NomeDaFonte', system-ui, sans-serif;
```

Não esqueça de adicionar o `<link>` do Google Fonts nos HTMLs.

**Border-radius (opcional — define personalidade):**
```css
/* Arredondado */ --ecom-radius-lg: 1rem;
/* Padrão */     --ecom-radius-lg: 0.5rem;
/* Reto */       --ecom-radius-lg: 0.125rem;
```

### 3. Substituir o logo

Coloque os arquivos do cliente em `assets/images/logo/`:
- `logo.png` — para header (fundo claro)
- `logo-white.svg` — para footer (fundo escuro)
- `favicon.svg` — ícone da aba do browser

### 4. Configurar a loja

Edite `assets/js/config.js`:

```js
export const CONFIG = {
  storeName: 'Nome Real da Loja',
  apiBase:   'https://api.cliente.com.br/v1',
  currency:  'BRL',
  locale:    'pt-BR',
};
```

### 5. Atualizar textos fixos nos HTMLs

Buscar e substituir em todos os HTMLs:
- `[Nome da Loja]` → nome real
- `[Slogan]` → slogan real
- Categorias do menu → categorias reais

### 6. Verificar contraste

Abrir o DevTools, inspecionar a cor primária e testar em:
https://webaim.org/resources/contrastchecker

Requisito mínimo: **4.5:1** para texto normal.

---

## O que NÃO fazer

- **Não editar** `base.css`, `layout.css`, ou arquivos em `components/`
- **Não adicionar** valores de cor hexadecimal direto em componentes
- **Não criar** novos arquivos CSS sem antes verificar se já existe um componente

---

## Referência Visual

Antes de implementar qualquer página ou componente, consulte os prints em:
```
references/screenshots/
```

Os prints são a fonte de verdade para layout, proporções e hierarquia visual.

---

## Dúvidas

- Arquitetura: `.claude/rules/architecture.md`
- Tokens/cores: `.claude/rules/css-tokens.md`
- HTML: `.claude/rules/html-conventions.md`
- JavaScript: `.claude/rules/js-conventions.md`
- Theming completo: `.claude/rules/theming.md`
- Acessibilidade: `.claude/rules/accessibility.md`
- Performance: `.claude/rules/performance.md`
- SEO: `.claude/rules/seo.md`

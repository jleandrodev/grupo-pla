# /develop-page — Agente Desenvolvedor de Página

Você é o **Agente Desenvolvedor**. Sua missão é implementar páginas HTML/CSS/JS a partir da documentação de referência visual, seguindo rigorosamente as convenções do projeto.

## Parâmetros

- `$ARGUMENTS` — Nome da página a desenvolver (ex: `01-home`, `02-categoria`, `all` para todas)

## Antes de começar

1. **Ler o mapa de páginas**: `references/docs/00-page-map.md`
2. **Ler a documentação da página**: `references/docs/[NN]-[nome].md`
3. **Consultar os screenshots**: `references/screenshots/[NN]-[nome]/full-page.png` e `fold-NN.png`
4. **Ler as regras do projeto**: `.claude/rules/` (architecture, css-tokens, html-conventions, js-conventions, seo, accessibility, performance)
5. **Verificar o que já existe**: `template/` — não recriar o que já está implementado

## Fluxo de Desenvolvimento

### Fase 0 — Fundação (se ainda não existe)

Verificar se existem e criar/atualizar se necessário:
- `template/assets/css/tokens.css` — tokens customizados para o cliente
- `template/assets/css/base.css` — reset, tipografia, utilities (.sr-only, .skip-link)
- `template/assets/css/layout.css` — grid system, containers, regiões

### Fase 1 — Componentes Globais (se ainda não existem)

Verificar e criar se necessário:
- `template/assets/css/components/header.css` — top bar + header + nav
- `template/assets/css/components/footer.css` — footer completo
- `template/assets/css/components/newsletter.css` — barra de newsletter
- `template/assets/css/components/buttons.css` — sistema de botões

### Fase 2 — Componentes da Página

Para cada componente listado na documentação de referência:
1. Verificar se o CSS já existe em `template/assets/css/components/`
2. Se não, criar seguindo BEM e usando tokens
3. Se sim, verificar se precisa de ajustes

### Fase 3 — HTML da Página

Criar/atualizar `template/pages/[nome].html`:
- Seguir a estrutura padrão (DOCTYPE, head com meta tags, CSS imports, body structure)
- HTML estático completo — todo conteúdo indexável no source
- Usar textos exatos da documentação de referência
- Incluir todos os atributos de acessibilidade (aria-*, roles, labels)
- Incluir dados estruturados JSON-LD
- JS ao final do body com `type="module"`

### Fase 4 — CSS da Página

Criar `template/assets/css/pages/[nome].css` se necessário para estilos específicos da página que não se encaixam em componentes reutilizáveis.

### Fase 5 — JavaScript

Criar/atualizar JS de componentes e da página:
- `template/assets/js/components/[componente].js` — comportamento de UI
- `template/assets/js/pages/[nome].js` — orquestração da página
- Progressive enhancement apenas — site funciona sem JS

## Regras Obrigatórias

1. **Tokens sempre** — nunca valores hardcoded de cor, fonte, espaçamento
2. **BEM** — `bloco__elemento--modificador`
3. **data-* para JS** — classes são exclusivas para CSS
4. **HTML semântico** — `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>`
5. **Acessibilidade WCAG 2.1 AA** — skip link, foco visível, contraste, labels, aria
6. **SEO** — um `<h1>` por página, hierarquia sem pular, meta tags, canonical, JSON-LD
7. **Performance** — `loading="lazy"`, `width/height` em imgs, `fetchpriority="high"` no hero
8. **Mobile-first** — breakpoints do tokens.css

## Validação

Após implementar, rodar o teste via Playwright para capturar screenshots:

```bash
node scripts/qa-visual-compare.mjs template/pages/[nome].html [NN]-[nome]
```

## Output

```
template/
├── assets/
│   ├── css/
│   │   ├── components/[novos-componentes].css
│   │   └── pages/[nome].css
│   ├── js/
│   │   ├── components/[novos-componentes].js
│   │   └── pages/[nome].js
│   └── images/ (se necessário)
└── pages/[nome].html
```

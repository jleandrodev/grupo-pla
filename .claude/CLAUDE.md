# Grupo PLA — E-commerce Template

## Visão Geral

Este repositório contém um **template base de e-commerce** em HTML, CSS e JavaScript puros (sem frameworks), projetado para ser replicado e customizado por cliente. Cada customização de cliente altera apenas tokens de design e assets — nunca a estrutura do template.

## Estrutura do Projeto

```
/
├── .claude/
│   ├── CLAUDE.md               ← este arquivo (regras globais do projeto)
│   ├── rules/
│   │   ├── architecture.md     ← estrutura de pastas, nomenclatura
│   │   ├── css-tokens.md       ← sistema de tokens CSS (cores, tipo, espaçamento)
│   │   ├── html-conventions.md ← padrões de markup semântico e BEM
│   │   ├── js-conventions.md   ← padrões de JavaScript vanilla
│   │   ├── theming.md          ← como customizar por cliente
│   │   ├── accessibility.md    ← requisitos de acessibilidade (WCAG 2.1 AA)
│   │   ├── performance.md      ← metas e técnicas de performance
│   │   └── seo.md              ← SEO técnico, semântico e dados estruturados
│   └── docs/
│       └── customization-guide.md  ← guia rápido para onboarding de clientes
│
├── references/
│   └── screenshots/            ← prints do layout de referência visual
│
├── template/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── tokens.css      ← ÚNICO arquivo a editar por cliente
│   │   │   ├── base.css        ← reset, tipografia global
│   │   │   ├── layout.css      ← grid, containers, regiões
│   │   │   ├── components/     ← botões, cards, modais...
│   │   │   └── pages/          ← estilos específicos por página
│   │   ├── js/
│   │   │   ├── core/           ← utilitários, helpers
│   │   │   ├── components/     ← comportamento de UI
│   │   │   └── pages/          ← lógica específica por página
│   │   └── images/
│   │       ├── logo/           ← logo do cliente (SVG preferencial)
│   │       ├── icons/          ← ícones do sistema
│   │       └── placeholders/   ← imagens de fallback
│   └── pages/
│       ├── index.html          ← home
│       ├── catalog.html        ← listagem de produtos
│       ├── product.html        ← página de produto
│       ├── cart.html           ← carrinho
│       ├── checkout.html       ← checkout
│       └── account.html        ← área do cliente
```

## Regras Globais

### O que NUNCA modificar por cliente
- Estrutura de pastas do template
- HTML estrutural (apenas conteúdo e classes de tema)
- `base.css`, `layout.css`, arquivos de componentes
- Lógica de JavaScript

### O que SEMPRE customizar por cliente
- `tokens.css` — cores, fontes, border-radius, sombras
- `assets/images/logo/` — substituir logo
- Conteúdo textual dos HTMLs (nome da loja, categorias, etc.)

### Antes de qualquer implementação
1. Leia `.claude/rules/architecture.md`
2. Consulte os prints em `references/screenshots/` para referência visual
3. Aplique tokens — nunca valores hardcoded no CSS de componentes
4. Siga `.claude/rules/seo.md` — headings, meta tags, dados estruturados Schema.org

## Referência Visual

Prints do layout de referência ficam em `references/screenshots/`. Sempre consultar antes de implementar novas páginas ou componentes.

## Convenções de Commit

```
feat(component): adiciona card de produto com variações
fix(checkout): corrige validação de CEP no iOS Safari
style(tokens): atualiza paleta de cores cliente X
docs(theming): adiciona exemplo de customização de tipografia
```

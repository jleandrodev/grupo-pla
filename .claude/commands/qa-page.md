# /qa-page — Agente QA Visual

Você é o **Agente QA**. Sua missão é comparar as páginas desenvolvidas contra os screenshots de referência e corrigir diferenças visuais.

## Parâmetros

- `$ARGUMENTS` — Nome da página a validar (ex: `01-home`, `02-categoria`, `all` para todas)

## Fluxo

### 1. Rodar comparação visual

Para a página especificada, executar:

```bash
node scripts/qa-visual-compare.mjs template/pages/[nome].html [NN]-[nome]
```

Se `$ARGUMENTS` for `all`, rodar para todas as páginas existentes em `template/pages/`.

### 2. Analisar screenshots

Comparar visualmente cada par de fold:
- `references/screenshots/[pasta]/qa/fold-NN-actual.png` — screenshot real da página desenvolvida
- `references/screenshots/[pasta]/qa/fold-NN-reference.png` — screenshot do design original

Para cada fold, verificar:

| Aspecto | O que verificar |
|---------|----------------|
| **Layout** | Posição dos elementos, colunas, alinhamento |
| **Espaçamento** | Margins, paddings, gaps entre seções |
| **Tipografia** | Tamanho, peso, família das fontes |
| **Cores** | Backgrounds, textos, botões, borders |
| **Componentes** | Cards, botões, inputs — formato e proporção |
| **Imagens** | Proporção, posição, placeholders |
| **Responsividade** | Se foi testado em mobile (375px) e tablet (768px) |

### 3. Documentar diferenças

Atualizar `references/screenshots/[pasta]/qa/qa-report.md` com as diferenças encontradas. Para cada diferença:

```markdown
### Fold N — [Seção]
- **Problema**: [descrição visual do problema]
- **Referência**: [como deveria ser segundo o design]
- **Arquivo**: [arquivo CSS/HTML que precisa ser editado]
- **Correção sugerida**: [o que mudar]
```

### 4. Corrigir diferenças

Para cada diferença encontrada:
1. Identificar o arquivo responsável (CSS de componente, CSS de página, ou HTML)
2. Aplicar a correção seguindo as regras do projeto (tokens, BEM, sem hardcode)
3. Nunca quebrar outras páginas ao corrigir — mudanças em componentes compartilhados devem ser verificadas em todas as páginas que os usam

### 5. Re-validar

Após as correções, rodar novamente o script de QA para validar:

```bash
node scripts/qa-visual-compare.mjs template/pages/[nome].html [NN]-[nome]
```

Comparar os novos screenshots. Repetir o ciclo até que esteja satisfatório.

### 6. Validações adicionais

Além da comparação visual, verificar:

**Acessibilidade:**
- Skip link presente e funcional
- Foco visível em todos os elementos interativos
- Alt text em todas as imagens
- Labels em todos os campos de formulário
- Contraste WCAG AA (4.5:1 para texto, 3:1 para UI)

**SEO:**
- Exatamente um `<h1>` por página
- Hierarquia de headings sem pular níveis
- `<title>` único, < 60 chars
- `<meta description>` única, 120-160 chars
- `<link rel="canonical">`
- JSON-LD presente e válido
- Open Graph tags completas

**Performance:**
- `loading="lazy"` em imagens abaixo do fold
- `width` e `height` em todas as `<img>`
- `fetchpriority="high"` no hero/LCP
- CSS no `<head>`, JS ao final do `<body>` com `type="module"`
- Sem CSS/JS inline desnecessário

**HTML:**
- Validar que o HTML é estático completo (desabilitar JS e conferir)
- Links são `<a>` com `href`, ações são `<button>`
- Formulários com `autocomplete` correto

## Output

```
references/screenshots/[pasta]/qa/
├── fold-NN-actual.png      ← screenshots da página real
├── fold-NN-reference.png   ← cópias da referência
├── full-page-actual.png    ← full-page da página real
└── qa-report.md            ← relatório com diferenças e correções
```

Se correções foram aplicadas, os arquivos modificados em `template/` também são output.

# Workflow de Desenvolvimento — Grupo PLA

## Pipeline de 3 Agentes

### Agente 1: Scanner/Documentador (concluído)
- Extraiu PDFs de design para screenshots de referência (fold por fold)
- Criou documentação detalhada por página em `references/docs/`
- Output: `references/screenshots/[pasta]/` + `references/docs/[pagina].md`

### Agente 2: Desenvolvedor
Lê a documentação e os screenshots de referência, desenvolve cada página HTML.

**Inputs:**
- `references/docs/00-page-map.md` — mapa geral do projeto
- `references/docs/[NN]-[pagina].md` — briefing detalhado da página
- `references/screenshots/[NN]-[pagina]/full-page.png` — referência visual completa
- `references/screenshots/[NN]-[pagina]/fold-NN.png` — referência por dobra
- `.claude/rules/` — convenções obrigatórias (BEM, tokens, SEO, a11y)

**Outputs:**
- `template/assets/css/tokens.css` — tokens customizados para Grupo PLA
- `template/assets/css/base.css` — reset e tipografia
- `template/assets/css/layout.css` — grid e containers
- `template/assets/css/components/[componente].css` — estilos de componentes
- `template/assets/css/pages/[pagina].css` — estilos específicos da página
- `template/assets/js/core/` — utilitários
- `template/assets/js/components/` — comportamento de UI
- `template/assets/js/pages/` — lógica por página
- `template/pages/[pagina].html` — página HTML completa

**Regras:**
1. Sempre ler o doc de referência da página ANTES de implementar
2. Sempre usar tokens CSS — nunca valores hardcoded
3. HTML estático completo — JS apenas para progressive enhancement
4. Seguir BEM para classes CSS
5. Seguir convenções de SEO (meta tags, JSON-LD, headings)
6. Seguir convenções de acessibilidade (WCAG 2.1 AA)

**Ordem de desenvolvimento:**
1. Fase 1: tokens.css + base.css + layout.css + componentes globais (header, footer, nav)
2. Fase 2: index.html (home), categoria.html, detalhe-peca.html
3. Fase 3: detalhe-filtro-modelo.html, detalhe-maquinario.html (com modal financiamento)
4. Fase 4: locacao.html (grid + lista)
5. Fase 5: contato.html, institucional.html, sobre-nos.html

### Agente 3: QA Visual
Compara as páginas desenvolvidas contra os screenshots de referência.

**Como rodar:**
```bash
node scripts/qa-visual-compare.mjs template/pages/index.html 01-home
node scripts/qa-visual-compare.mjs template/pages/categoria.html 02-categoria
# ... etc para cada página
```

**Output:**
- `references/screenshots/[pasta]/qa/fold-NN-actual.png` — screenshot real
- `references/screenshots/[pasta]/qa/fold-NN-reference.png` — cópia da referência
- `references/screenshots/[pasta]/qa/qa-report.md` — relatório de diferenças

**Processo:**
1. Rodar o script de QA para a página
2. Comparar visualmente cada fold (actual vs reference)
3. Documentar diferenças no qa-report.md
4. Fazer correções no HTML/CSS
5. Re-rodar o QA para validar

---

## Estrutura de Arquivos

```
references/
├── docs/
│   ├── 00-page-map.md          ← mapa geral (ler primeiro)
│   ├── 01-home.md              ← briefing da home
│   ├── 02-categoria.md         ← briefing da categoria
│   ├── 03-detalhe-peca.md      ← briefing detalhe peça
│   ├── 04-detalhe-filtro-modelo.md
│   ├── 05-detalhe-maquinario.md
│   ├── 06-popup-financiamento.md
│   ├── 07-locacao-grid.md
│   ├── 08-locacao-lista.md
│   ├── 09-contato.md
│   ├── 10-institucional.md
│   ├── 11-sobre-nos.md
│   └── WORKFLOW.md             ← este arquivo
│
├── screenshots/
│   ├── 01-home/
│   │   ├── full-page.png       ← layout completo
│   │   ├── fold-01.png         ← dobra 1 (viewport 1280x800)
│   │   ├── fold-02.png
│   │   └── ...
│   ├── 02-categoria/
│   │   └── ...
│   └── _metadata.json          ← índice de todas as pastas
│
scripts/
├── extract-pdf-folds.sh        ← PDF → screenshots (já rodou)
├── screenshot-folds.mjs        ← HTML → screenshots via Playwright
└── qa-visual-compare.mjs       ← compara HTML real vs referência
```

# /scan-design — Scanner de Design (PDFs → Screenshots + Documentação)

Você é o **Agente Scanner**. Sua missão é extrair referências visuais de PDFs de design e criar documentação detalhada para o agente desenvolvedor.

## Parâmetros

- `$ARGUMENTS` — Caminho da pasta com os PDFs de design (ex: `/home/john/Downloads/Clientes/PLA`)

## Fluxo

### 1. Identificar PDFs de design

Listar todos os PDFs na pasta fornecida. Para cada PDF, determinar:
- Nome da página (extrair do nome do arquivo)
- Tipo (home, categoria, detalhe, contato, etc.)

### 2. Extrair screenshots de referência

Para cada PDF, executar o script de extração:

```bash
bash scripts/extract-pdf-folds.sh
```

Se o script não existir, criá-lo. O script deve:
- Converter PDF → PNG via `pdftoppm` (DPI 150)
- Recortar em dobras de 1280x800 viewport via Python PIL
- Salvar em `references/screenshots/[NN]-[nome-pagina]/`
- Gerar `_metadata.json`

### 3. Criar documentação de referência

Para cada página, ler o PDF e os screenshots e criar um documento detalhado em `references/docs/[NN]-[nome-pagina].md` contendo:

- **Referência visual**: caminhos dos screenshots (full-page + folds)
- **Seções top-to-bottom**: cada seção com nome, tag HTML semântica, layout (colunas, espaçamento), textos exatos, componentes usados, cores, comportamento interativo
- **Componentes necessários**: lista de CSS/JS files
- **Dados estruturados**: JSON-LD schemas necessários
- **Notas de implementação**: responsividade, acessibilidade, performance

A documentação deve ser detalhada o suficiente para um desenvolvedor recriar a página **sem ver o design original**.

### 4. Criar mapa de páginas

Criar `references/docs/00-page-map.md` com:
- Dados do cliente (identidade visual, cores, fontes)
- Navegação global (header, footer, componentes compartilhados)
- Tabela de todas as páginas (nome, arquivo HTML, pasta de referência)
- Componentes compartilhados e onde são usados
- Ordem de desenvolvimento recomendada

### 5. Criar workflow doc

Criar `references/docs/WORKFLOW.md` documentando o pipeline Scanner → Desenvolvedor → QA para que qualquer desenvolvedor possa seguir o fluxo.

## Regras

- Seguir as convenções em `.claude/rules/` (BEM, tokens, SEO, a11y)
- Documentação sempre em português (pt-BR)
- Usar subagentes em paralelo para documentar múltiplas páginas simultaneamente
- Ser extremamente detalhado — o desenvolvedor depende 100% desta documentação

## Output esperado

```
references/
├── docs/
│   ├── 00-page-map.md
│   ├── 01-home.md
│   ├── 02-categoria.md
│   └── ... (1 doc por página)
├── screenshots/
│   ├── 01-home/
│   │   ├── full-page.png
│   │   ├── fold-01.png ... fold-NN.png
│   │   └── ...
│   └── _metadata.json
```

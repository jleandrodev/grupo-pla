# Mapa de Páginas — Grupo PLA

## Sobre o Cliente

**Grupo PLA** é uma empresa de peças, equipamentos e maquinário agrícola com 30+ anos de mercado, sediada na região de Ribeirão Preto/SP. Atende produtores rurais, revendas e cooperativas em todo o Brasil. Vende peças para tratores/colheitadeiras e oferece locação de caminhões/semirreboques.

## Identidade Visual

| Token | Valor |
|-------|-------|
| Cor primária (CTA, botões) | Laranja `~#F7941D` |
| Cor secundária (header, footer, dark bg) | Navy escuro `~#1A2332` |
| Cor de fundo | Branco `#FFFFFF` e cinza claro `~#F5F5F5` |
| Cor de texto | Escuro `~#1A2332` |
| Cor de texto secundário | Cinza `~#6B7280` |
| Cor de sucesso/disponível | Verde `~#16A34A` |
| Fonte body | Sans-serif (Inter ou similar) |
| Fonte heading | Sans-serif bold |
| Border-radius | Arredondado médio (~8px cards, ~full em badges/pills) |
| Sombra de cards | Sutil, shadow-sm/md |

## Navegação Global (todas as páginas)

### Top Bar (barra escura no topo)
- Tel: (11) 4000-0000 | WhatsApp: (11) 99999-0000 | contato@grupopla.com.br
- Ícones sociais à direita: Facebook, Instagram, YouTube, LinkedIn

### Header Principal
- Logo "Logoipsum" (placeholder — substituir por logo PLA)
- Campo de busca: "Buscar peças, veículos, marcas..."
- Botão WhatsApp (laranja)
- Ícone carrinho

### Menu de Navegação
- Peças (ativo/sublinhado laranja) | Estoque | Novos | Marcas | Locação | Meus Clientes | Contato

### Footer (todas as páginas)
1. **Newsletter bar** — fundo escuro, ícone email, "Newsletter", campo email + botão "Enviar" (laranja)
2. **Footer principal** — fundo navy escuro:
   - Col 1: Logo branco + descrição + ícones sociais
   - Col 2: Institucional (Sobre nós, Políticas de Troca, Políticas de Frete, Políticas de Cookies, Assistência técnica, Blog)
   - Col 3: Categorias (Peças, Estoque, Novos, Marcas, Locação, Contato)
   - Col 4: Contato (tel, email, horário)
   - Col 5: Visite Nossa Loja (endereço + mapa embed Google Maps)
3. **Sub-footer** — Formas de Pagamento (PIX, VISA, MASTER, BOLETO badges) | Política de Privacidade | Termos de Uso
4. **Copyright** — © 2025 Grupo PLA. Todos os direitos reservados.

---

## Páginas

| # | Página | HTML | Referência | Descrição |
|---|--------|------|-----------|-----------|
| 01 | Home | `index.html` | `01-home/` | Landing principal com hero, produtos, marcas, máquinas, categorias, depoimentos, ofertas, FAQ |
| 02 | Categoria (Peças) | `categoria.html` | `02-categoria/` | Listagem de peças com filtros laterais, subcategorias, grid 3 colunas, paginação |
| 03 | Detalhe Peça | `detalhe-peca.html` | `03-detalhe-peca/` | Página de produto (peça), galeria, preço, tabs, avaliações, similares |
| 04 | Detalhe Filtro Modelo | `detalhe-filtro-modelo.html` | `04-detalhe-filtro-modelo/` | Variação do detalhe com widget "Verificar Compatibilidade com Seu Veículo" |
| 05 | Detalhe Maquinário | `detalhe-maquinario.html` | `05-detalhe-venda-maquinario/` | Detalhe de trator/máquina com botão "Simular Financiamento" |
| 06 | Popup Financiamento | `detalhe-maquinario.html` (modal) | `06-detalhe-popup-financiamento/` | Modal de simulação de financiamento sobre a página de maquinário |
| 07 | Locação Grid | `locacao.html` | `07-locacao-grid/` | Listagem de caminhões para locação, visualização grid |
| 08 | Locação Lista | `locacao.html` (toggle) | `08-locacao-lista/` | Mesma página, visualização lista (toggle grid/lista) |
| 09 | Contato | `contato.html` | `09-contato/` | Hero, cards de contato, formulário + mapa, especialistas |
| 10 | Institucional | `institucional.html` | `10-institucional/` | Menu lateral + conteúdo de políticas (privacidade, troca, etc.) |
| 11 | Sobre Nós | `sobre-nos.html` | `11-sobre-nos/` | Hero, história, timeline, stats, valores, CTA, equipe |

## Componentes Compartilhados

| Componente | Usado em |
|-----------|----------|
| Top Bar | Todas |
| Header (logo, busca, whatsapp, cart) | Todas |
| Nav Menu | Todas |
| Hero Banner (com breadcrumb) | 02, 07, 08, 09, 10, 11 |
| Product Card (grid) | 01, 02, 03, 04, 05 |
| Machine Card (grid) | 01, 05 |
| Truck Card (grid + lista) | 07, 08 |
| Filtros Sidebar | 02, 07, 08 |
| Pagination | 02, 07, 08 |
| Reviews Section | 03, 04, 05 |
| Similar Products Carousel | 03, 04, 05 |
| Newsletter Bar | Todas |
| Footer | Todas |
| Modal (financiamento) | 06 |
| Breadcrumb | Todas (exceto home) |
| Rating Stars | 03, 04, 05 (product cards e detail) |
| Badge (Disponível, Em breve, categoria) | 02, 07, 08 |
| Tabs (Descrição, Especificações, Entrega) | 03, 04, 05 |

## Ordem de Desenvolvimento Recomendada

### Fase 1 — Fundação (componentes globais)
1. `tokens.css` — paleta PLA (laranja/navy)
2. `base.css` — reset, tipografia
3. `layout.css` — grid, containers
4. Componentes: top-bar, header, nav, footer, newsletter-bar, breadcrumb

### Fase 2 — Páginas principais
5. `index.html` — Home (usa mais componentes)
6. `categoria.html` — Categoria/listagem
7. `detalhe-peca.html` — Detalhe de produto

### Fase 3 — Variações de detalhe
8. `detalhe-filtro-modelo.html` — Com verificação de compatibilidade
9. `detalhe-maquinario.html` — Maquinário + modal financiamento

### Fase 4 — Locação
10. `locacao.html` — Grid + Lista (toggle)

### Fase 5 — Institucionais
11. `contato.html`
12. `institucional.html`
13. `sobre-nos.html`

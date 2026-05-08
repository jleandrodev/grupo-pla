# 10 — Institucional (`institucional.html`)

Referência visual: `references/screenshots/10-institucional/`

---

## Estrutura Geral da Página

```
[Top Bar]
[Header]
[Nav Menu]
[Hero Banner com breadcrumb]
[Seção de Conteúdo: Sidebar Menu + Área de Texto]
[Newsletter Bar]
[Footer]
```

---

## 1. Hero Banner

### Layout
- Full-width, altura ~200px (menor que o hero de outras páginas)
- Imagem de fundo: foto de armazém/galpão industrial com overlay navy escuro (`--ecom-color-neutral-900` com opacidade ~70%)
- Conteúdo alinhado à esquerda, dentro do container

### Breadcrumb
- Posicionado acima do título
- Texto: **"Home / Institucional"**
- "Home" como link, cor laranja (`--ecom-color-primary-500`)
- Separador: `/`
- "Institucional" como texto ativo, cor branca

### Heading
- `<h1>`: **"Institucional"**
- Texto branco (`--ecom-text-inverse`), fonte bold (`--ecom-font-bold`), tamanho `--ecom-text-4xl`
- Sem parágrafo de apoio nem CTAs — hero minimalista

---

## 2. Seção de Conteúdo Principal

### Layout
- Fundo: `--ecom-bg-page` (cinza claro `#F5F5F5`)
- Container centralizado (`--ecom-container-max`)
- Grid 2 colunas: ~250px sidebar fixa (esquerda) | restante área de conteúdo (direita)
- Padding vertical: `--ecom-space-12`
- Gap: `--ecom-space-8`

### Coluna Esquerda — Menu Lateral

#### Título do menu
- Texto: **"Menu de Institucional"**
- `--ecom-text-base`, `--ecom-font-semibold`, `--ecom-text-primary`
- Margem bottom: `--ecom-space-4`

#### Itens do menu (navegação vertical)
Lista de links verticais. O item ativo tem destaque visual.

1. **Políticas de Privacidade** — ATIVO
2. **Políticas de Troca e Devolução**
3. **Políticas de Cookies**
4. **Sobre Nós**

#### Estilo do menu
- Container: fundo `--ecom-bg-surface` (branco), `--ecom-radius-lg`, `--ecom-shadow-sm`
- Padding: `--ecom-space-4`

##### Item ativo
- Fundo: `--ecom-color-primary-500` (laranja)
- Texto: branco (`--ecom-text-on-primary`), `--ecom-font-medium`
- Border-radius: `--ecom-radius-md`
- Padding: `--ecom-space-3` vertical, `--ecom-space-4` horizontal

##### Itens inativos
- Fundo: transparente
- Texto: `--ecom-text-primary`, `--ecom-text-sm`
- Padding: `--ecom-space-3` vertical, `--ecom-space-4` horizontal
- Hover: fundo `--ecom-bg-surface-alt` (cinza claro)
- Transição: `background-color --ecom-duration-fast`

#### Comportamento
- Clique em item do menu carrega o conteúdo correspondente na área direita
- Pode ser navegação SPA (troca conteúdo via JS) ou links para âncoras/subpáginas
- Item ativo atualiza visualmente ao trocar de seção
- Atributo `aria-current="page"` no item ativo

### Coluna Direita — Área de Conteúdo

O conteúdo muda conforme o item selecionado no menu lateral. Por padrão, exibe "Políticas de Privacidade".

---

## 3. Conteúdo: Políticas de Privacidade (padrão ativo)

### Heading
- `<h2>`: **"Políticas de Privacidade"**
- Cor: `--ecom-text-primary`, `--ecom-text-3xl`, `--ecom-font-bold`
- Margem bottom: `--ecom-space-6`

### Parágrafo introdutório
- Texto: **"A sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos os dados pessoais dos usuários que acessam nosso site de venda de peças agrícolas."**
- Cor: `--ecom-text-primary`, `--ecom-text-base`, `--ecom-leading-relaxed`

### Seção 1 — Coleta de Informações
- `<h3>`: **"1. Coleta de Informações"**
- `--ecom-text-xl`, `--ecom-font-bold`, `--ecom-text-primary`
- Margem top: `--ecom-space-8`

- Parágrafo: **"Coletamos informações pessoais fornecidas diretamente por você, como:"**
- Lista (sem marcadores visuais, apenas quebras de linha):
  - Nome completo
  - CPF/CNPJ
  - Endereço de entrega
  - E-mail
  - Número de telefone
  - Informações de pagamento

- Parágrafo: **"Também podemos coletar automaticamente algumas informações, como:"**
- Lista:
  - Endereço IP
  - Dados de navegação
  - Tipo de dispositivo e navegador
  - Cookies e tecnologias similares

### Seção 2 — Uso das Informações
- `<h3>`: **"2. Uso das Informações"**

- Parágrafo: **"As informações coletadas são utilizadas para:"**
- Lista:
  - Processar pedidos e entregas
  - Realizar atendimento ao cliente
  - Enviar atualizações sobre pedidos
  - Melhorar a experiência no site
  - Enviar ofertas e comunicações (quando autorizado)
  - Cumprir obrigações legais e regulatórias

### Seção 3 — Compartilhamento de Dados
- `<h3>`: **"3. Compartilhamento de Dados"**

- Parágrafo: **"Seus dados podem ser compartilhados com:"**
- Lista:
  - Operadoras de pagamento
  - Empresas de logística e entrega
  - Plataformas de tecnologia e hospedagem
  - Autoridades legais, quando exigido por lei

- Parágrafo em destaque: **"Não vendemos seus dados pessoais a terceiros."**

### Seção 4 — Contato
- `<h3>`: **"4. Contato"**

- Parágrafo: **"Em caso de dúvidas ou solicitações relacionadas a esta Política de Privacidade, entre em contato:"**
- Lista de contato:
  - **E-mail:** [seuemail@dominio.com]
  - **Telefone:** [seu telefone]
  - **Endereço:** [endereço da empresa]

### Estilo geral do conteúdo textual
- Cor do corpo: `--ecom-text-primary`
- Tamanho: `--ecom-text-base`
- Line-height: `--ecom-leading-relaxed`
- Headings H3: numeradas (1., 2., 3., 4.)
- Listas: renderizadas como texto corrido com quebras de linha (sem `<ul>/<li>` visíveis, mas semanticamente usar `<ul>`)
- Espaçamento entre seções: `--ecom-space-8`
- Espaçamento entre parágrafos: `--ecom-space-4`

---

## 4. Conteúdos Alternativos (outros itens do menu)

Os seguintes conteúdos seguem exatamente o mesmo layout e estilo da área de conteúdo. Apenas o texto do `<h2>` e o corpo mudam.

### Políticas de Troca e Devolução
- `<h2>`: **"Políticas de Troca e Devolução"**
- Conteúdo: seções numeradas sobre prazos de troca, condições, processo de devolução, reembolso
- Mesmo formato de H3 numerados

### Políticas de Cookies
- `<h2>`: **"Políticas de Cookies"**
- Conteúdo: tipos de cookies, finalidade, como desabilitar, consentimento
- Mesmo formato de H3 numerados

### Sobre Nós
- `<h2>`: **"Sobre Nós"**
- Conteúdo: texto institucional da empresa (ou link/redirect para a página `sobre-nos.html`)
- Nota: pode redirecionar para a página dedicada Sobre Nós (`11-sobre-nos`) se o conteúdo for extenso

---

## 5. Newsletter Bar

Componente global. Mesmo padrão de todas as páginas.

---

## 6. Footer

Componente global conforme `00-page-map.md`.

---

## Responsividade

### Mobile (< 768px)
- Hero: H1 reduz para `--ecom-text-3xl`
- Layout muda para 1 coluna: menu lateral fica no topo como accordion ou menu horizontal scrollável
- Menu lateral: pode colapsar em `<select>` dropdown ou accordion
- Área de conteúdo: full-width abaixo do menu
- Padding lateral: `--ecom-container-pad` (16px)

### Tablet (768px–1023px)
- Menu lateral: ~200px
- Área de conteúdo: restante
- Pode manter 2 colunas em proporção menor

### Desktop (>= 1024px)
- Layout conforme descrito: sidebar ~250px + conteúdo flexível

---

## SEO

### Meta tags
```html
<title>Políticas de Privacidade — Grupo PLA</title>
<meta name="description" content="Conheça as políticas de privacidade, troca, devolução e cookies do Grupo PLA. Transparência e segurança para nossos clientes.">
<meta name="robots" content="index, follow">
```

Nota: o `<title>` deve mudar dinamicamente conforme a seção ativa (ex: "Políticas de Troca e Devolução — Grupo PLA").

### Dados estruturados
- `Organization` (global)
- `BreadcrumbList`: Home > Institucional > [Seção ativa]

### Heading hierarchy
```
h1 — Institucional (hero)
  h2 — Políticas de Privacidade (ou seção ativa)
    h3 — 1. Coleta de Informações
    h3 — 2. Uso das Informações
    h3 — 3. Compartilhamento de Dados
    h3 — 4. Contato
```

---

## Componentes CSS necessários

| Componente | Arquivo CSS |
|---|---|
| Hero banner (variante curta) | `components/hero-banner.css` |
| Sidebar menu | `components/sidebar-menu.css` |
| Conteúdo textual/prose | `components/prose.css` |
| Newsletter bar | `components/newsletter-bar.css` |

---

## Acessibilidade

- Menu lateral: `<nav aria-label="Menu institucional">` com `<ul>` semântico
- Item ativo: `aria-current="page"` no link ativo
- Conteúdo textual: headings em ordem correta (h2 > h3), nunca pular nível
- Listas de informações: usar `<ul>` semântico mesmo que visualmente pareçam texto corrido
- Focus visible em todos os itens de menu
- Se usar troca de conteúdo via JS: `aria-live="polite"` na região de conteúdo para anunciar mudanças
- Navegação por teclado: Tab navega pelo menu, Enter/Space ativa o item
- Links de contato na seção 4: usar `<a href="mailto:...">` e `<a href="tel:...">`

---

## Comportamento JavaScript

### Navegação do menu lateral
- Clique em item do menu:
  1. Remove classe ativa do item anterior
  2. Adiciona classe ativa ao item clicado
  3. Oculta conteúdo anterior (`hidden`)
  4. Exibe conteúdo correspondente (remove `hidden`)
  5. Atualiza `aria-current="page"`
  6. Scroll suave ao topo da área de conteúdo se necessário
  7. Atualiza URL (hash ou history API) para bookmarking

### Atributos data para JS
```html
<nav aria-label="Menu institucional">
  <ul>
    <li>
      <a href="#privacidade"
         class="sidebar-menu__item sidebar-menu__item--active"
         data-action="switch-section"
         data-target="section-privacidade"
         aria-current="page">
        Políticas de Privacidade
      </a>
    </li>
    <!-- demais itens -->
  </ul>
</nav>

<div data-component="institutional-content">
  <section id="section-privacidade" data-section="privacidade">
    <!-- conteúdo -->
  </section>
  <section id="section-troca" data-section="troca" hidden>
    <!-- conteúdo -->
  </section>
  <!-- demais seções -->
</div>
```

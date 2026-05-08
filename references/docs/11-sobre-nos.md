# 11 — Sobre Nós (`sobre-nos.html`)

Referência visual: `references/screenshots/11-sobre-nos/`

---

## Estrutura Geral da Página

```
[Top Bar]
[Header]
[Nav Menu]
[Hero Banner com breadcrumb]
[Seção História — texto + imagem + mini-timeline]
[Seção Timeline Completa — 4 marcos]
[Seção Full-width — imagem + texto (variação)]
[Seção Estatísticas — barra com 4 números]
[Seção Valores — 4 cards]
[Seção CTA — chamada para ação]
[Seção Equipe — 3 membros]
[Newsletter Bar]
[Footer]
```

---

## 1. Hero Banner

### Layout
- Full-width, altura ~450px
- Imagem de fundo: foto aérea de campos agrícolas com colheitadeiras, overlay navy escuro (`--ecom-color-neutral-900` com opacidade ~60%)
- Conteúdo alinhado à esquerda, dentro do container

### Badge superior
- Pill/badge com fundo semi-transparente navy, borda arredondada (`--ecom-radius-full`)
- Ícone bolinha laranja + texto: **"Grupo PLA — 30 anos no agronegócio"**
- Texto branco, `--ecom-text-sm`

### Heading
- `<h1>`: **"Conheça quem move o agronegócio brasileiro"**
- Texto branco (`--ecom-text-inverse`), `--ecom-font-bold`, `--ecom-text-5xl`
- Line-height: `--ecom-leading-tight`
- Largura máxima ~550px

### Parágrafo
- Texto: **"Há mais de 30 anos somos referência em peças agrícolas, logística e suporte técnico para produtores, revendas e cooperativas em todo o Brasil."**
- Cor: branco translúcido (`rgba(255,255,255,0.85)`)
- `--ecom-text-lg`, `--ecom-leading-relaxed`

### CTAs (2 botões)
1. **"Nossa História →"**
   - Botão primário: fundo laranja (`--ecom-action-primary`), texto branco, `--ecom-radius-full`
   - Seta (→) após o texto

2. **"Fale Conosco"**
   - Botão outline: borda branca, fundo transparente, texto branco, `--ecom-radius-full`

---

## 2. Seção História (texto + imagem + mini-timeline)

### Layout
- Fundo: `--ecom-bg-surface` (branco)
- Container centralizado
- Grid 2 colunas: ~55% texto (esquerda) | ~45% imagem (direita)
- Padding vertical: `--ecom-space-16`
- Gap: `--ecom-space-8`
- Alinhamento vertical: centrado

### Coluna Esquerda — Texto

#### Tagline
- Texto: **"NOSSA TRAJETÓRIA"**
- Cor: laranja (`--ecom-color-primary-500`), `--ecom-text-xs`, uppercase, `--ecom-tracking-widest`, `--ecom-font-semibold`

#### Heading
- `<h2>`: **"Uma história de dedicação ao campo"**
- Cor: `--ecom-text-primary`, `--ecom-text-3xl`, `--ecom-font-bold`
- Margem top: `--ecom-space-2`

#### Parágrafo
- Texto: **"Fundada em 1993, no coração do agronegócio brasileiro, a Grupo PLA nasceu da paixão pelo campo e da necessidade de levar soluções de qualidade aos produtores rurais. De pequena revendedora de peças, crescemos para nos tornar uma referência nacional em peças e maquinários agrícolas, atendendo milhares de clientes em todo o Brasil."**
- Cor: `--ecom-text-secondary`, `--ecom-text-base`, `--ecom-leading-relaxed`

#### Mini-timeline (3 marcos verticais)
Lista vertical com ícones e linha conectora lateral.

1. **1993 — Fundação**
   - Ícone: círculo azul com ícone de prédio/loja
   - Subtítulo: **"Abertura da primeira loja no interior do Brasil"**

2. **2005 — Expansão Nacional**
   - Ícone: círculo azul com ícone de localização
   - Subtítulo: **"Inauguração de filiais em novos estados brasileiros"**

3. **2023 — Líder em Peças Agrícolas**
   - Ícone: círculo azul com ícone de troféu/estrela
   - Subtítulo: **"Reconhecidos como referência nacional no setor agrícola"**

##### Estilo da mini-timeline
- Linha vertical conectora: borda esquerda 2px `--ecom-border-default` (cinza claro)
- Ícones: círculos 40px, borda 2px `--ecom-color-primary-700`, fundo branco, ícone SVG azul dentro
- Ano em bold: `--ecom-font-bold`, `--ecom-text-primary`
- Título do marco: `--ecom-font-bold`, `--ecom-text-primary`
- Subtítulo: `--ecom-text-sm`, `--ecom-text-secondary`
- Gap entre marcos: `--ecom-space-6`

### Coluna Direita — Imagem
- Foto: vista aérea de instalações agrícolas/armazéns
- Border-radius: `--ecom-radius-xl`
- `loading="lazy"`
- `width` e `height` declarados
- Ocupa 100% da coluna

---

## 3. Seção Timeline Completa

### Layout
- Fundo: `--ecom-bg-surface` (branco) ou `--ecom-bg-page` (cinza claro)
- Container centralizado
- Padding vertical: `--ecom-space-12`

### Tagline
- Texto: **"Nossa Trajetória"**
- Cor: laranja, uppercase, `--ecom-text-xs`, `--ecom-tracking-widest`

### Heading
- `<h2>`: **"30 anos escrevendo história no agronegócio"**
- Cor: `--ecom-text-primary`, `--ecom-text-3xl`, `--ecom-font-bold`

### Subtítulo
- Texto: **"De uma pequena revendedora em Ribeirão Preto a referência nacional em peças agrícolas — essa é a nossa história."**
- Cor: `--ecom-text-secondary`

### Timeline horizontal (4 marcos)
Grid de 4 colunas iguais em desktop. Linha horizontal conectando os pontos no topo.

#### Marco 1 — 1993
- Indicador: ponto laranja (`--ecom-color-primary-500`) sobre linha horizontal
- Prefixo: **"+ 1993"** (com sinal +) — cor laranja, `--ecom-text-sm`
- Título: **"Fundação"** — `--ecom-font-bold`, `--ecom-text-primary`, `--ecom-text-lg`
- Descrição: **"Empresa fundada em Ribeirão Preto, SP, iniciando como revendedora de peças para tratores e colheitadeiras."**
- Cor descrição: `--ecom-text-secondary`, `--ecom-text-sm`

#### Marco 2 — 2005
- Prefixo: **"+ 2005"**
- Título: **"Expansão Regional"**
- Descrição: **"Abertura de novas filiais no interior paulista e Minas Gerais, atendendo mais de 1.000 produtores."**

#### Marco 3 — 2015
- Prefixo: **"+ 2015"**
- Título: **"Era Digital"**
- Descrição: **"Lançamento do catálogo digital e plataforma de pedidos online, transformando por completo o atendimento ao produtor rural."**

#### Marco 4 — 2024
- Prefixo: **"+ 2024"**
- Título: **"Referência Nacional"**
- Descrição: **"12.000+ clientes ativos, líder em peças agrícolas no Brasil e referência em logística para o agronegócio brasileiro."**

#### Estilo da timeline
- Linha horizontal: borda 2px `--ecom-border-default`, conecta os 4 pontos
- Pontos: círculos 12px preenchidos com cor laranja (`--ecom-color-primary-500`), posicionados sobre a linha
- Abaixo de cada ponto: card com o conteúdo
- Cards: sem borda visível, padding `--ecom-space-4`
- Gap entre cards: `--ecom-space-6`

### Ícones decorativos na linha
- Entre os pontos da timeline, há ícones circulares decorativos (prédio, localização, tela/monitor, pessoa)
- Ícones em círculos com borda azul (`--ecom-color-primary-700`), fundo branco
- Tamanho: ~40px
- Posicionados acima da linha horizontal

---

## 4. Seção Full-width (Imagem + Texto)

### Layout
- Full-width com conteúdo em container
- Grid 2 colunas: ~45% imagem (esquerda) | ~55% texto (direita)
- Fundo: branco (`--ecom-bg-surface`)
- Padding vertical: `--ecom-space-16`

### Coluna Esquerda — Imagem
- Foto: trator trabalhando em plantação de soja (vista lateral)
- Border-radius: `--ecom-radius-xl`
- `loading="lazy"`

### Coluna Direita — Texto

#### Tagline
- Texto: **"NOSSA TRAJETÓRIA"**
- Laranja, uppercase, `--ecom-text-xs`

#### Heading
- `<h2>`: **"Uma história de dedicação ao campo"**
- `--ecom-text-3xl`, `--ecom-font-bold`

#### Parágrafos (2 blocos)
- Parágrafo 1: **"Fundada em 1993, no coração do agronegócio brasileiro, a Grupo PLA nasceu da paixão pelo campo e da necessidade de levar soluções de qualidade aos produtores rurais. De pequena revendedora de peças, crescemos para nos tornar uma referência nacional em peças e maquinários agrícolas, atendendo milhares de clientes em todo o Brasil."**

- Parágrafo 2: **"Fundada em 1993, no coração do agronegócio brasileiro, a Grupo PLA nasceu da paixão pelo campo e da necessidade de levar soluções de qualidade aos produtores rurais. De pequena revendedora de peças, crescemos para nos tornar uma referência nacional em peças e maquinários agrícolas, atendendo milhares de clientes em todo o Brasil."**

- Cor: `--ecom-text-secondary`, `--ecom-leading-relaxed`
- Gap entre parágrafos: `--ecom-space-4`

---

## 5. Seção Estatísticas (Stats Bar)

### Layout
- Full-width, imagem de fundo: foto de campo agrícola com tratores, overlay navy escuro (`--ecom-color-neutral-900` com opacidade ~80%)
- Conteúdo centralizado
- Grid 4 colunas iguais em desktop
- Padding vertical: `--ecom-space-12`

### Itens (4 estatísticas)

Cada item é centralizado verticalmente e contém:

#### 1. 30+ anos de mercado
- Ícone: prédio/calendário — circulado, cor branca ou azul claro
- Número: **"30+"** — branco, `--ecom-text-5xl`, `--ecom-font-bold`
- Label: **"anos de mercado"** — branco translúcido, `--ecom-text-sm`

#### 2. 12.000+ clientes ativos
- Ícone: grupo de pessoas
- Número: **"12.000+"**
- Label: **"clientes ativos"**

#### 3. 200.000+ peças em estoque
- Ícone: caixa/pacote
- Número: **"200.000+"**
- Label: **"peças em estoque"**

#### 4. 95% satisfação dos clientes
- Ícone: estrela/coração
- Número: **"95%"**
- Label: **"satisfação dos clientes"**

### Estilo
- Ícones: SVG brancos em círculos com borda branca semi-transparente, ~48px
- Números: branco puro, tamanho grande `--ecom-text-5xl` ou `--ecom-text-4xl`, `--ecom-font-bold`
- Labels: `rgba(255,255,255,0.7)`, `--ecom-text-sm`
- Separadores visuais entre itens (opcionais): linhas verticais brancas translúcidas
- Alinhamento: cada item centrado (text-align center)

---

## 6. Seção Valores (4 Cards)

### Layout
- Fundo: `--ecom-bg-page` (cinza claro) ou `--ecom-bg-surface` (branco)
- Container centralizado
- Padding vertical: `--ecom-space-16`

### Tagline
- Texto: **"Nossos Valores"**
- Cor laranja, uppercase, `--ecom-text-xs`, `--ecom-tracking-widest`, itálico

### Heading
- `<h2>`: **"O que nos guia há 30 anos"**
- `--ecom-text-3xl`, `--ecom-font-bold`, `--ecom-text-primary`

### Subtítulo
- Texto: **"Cada decisão que tomamos é guiada por princípios sólidos, construídos ao longo de três décadas de trabalho dedicado ao campo."**
- `--ecom-text-secondary`, `--ecom-text-base`

### Cards de Valores (4 colunas)
Grid de 4 cards iguais em desktop. Gap: `--ecom-space-6`

#### Card 1 — Compromisso
- Ícone: escudo/handshake — cor azul (`--ecom-color-primary-700`), ~32px
- Título: **"Compromisso"** — `--ecom-font-bold`, `--ecom-text-lg`, `--ecom-text-primary`
- Descrição: **"Cada cliente é tratado como parceiro estratégico. Suporte técnico do início ao pós-venda, garantindo tranquilidade em cada etapa da operação."**
- Cor descrição: `--ecom-text-secondary`, `--ecom-text-sm`

#### Card 2 — Sustentabilidade
- Ícone: folha/planta — cor verde (`--ecom-color-success`)
- Título: **"Sustentabilidade"**
- Descrição: **"Trabalhamos com fornecedores certificados e processos responsáveis, pensando no futuro do campo e das próximas gerações de produtores."**

#### Card 3 — Excelência
- Ícone: medalha/troféu — cor laranja (`--ecom-color-primary-500`)
- Título: **"Excelência"**
- Descrição: **"Qualidade não é um diferencial — é o nosso padrão. Cada peça, entrega e atendimento segue critérios rigorosos de excelência operacional."**

#### Card 4 — Inovação
- Ícone: raio/lâmpada — cor laranja ou azul
- Título: **"Inovação"**
- Descrição: **"Investimos em tecnologia para agilizar pedidos, rastrear entregas e antecipar as necessidades do produtor com inteligência e precisão."**

#### Estilo dos cards
- Fundo: `--ecom-bg-surface` (branco)
- Borda: `--ecom-border-default` (1px solid cinza)
- Border-radius: `--ecom-radius-lg`
- Padding: `--ecom-space-6`
- Sombra: `--ecom-shadow-sm`
- Ícone no topo-esquerda
- Título: margem top `--ecom-space-3`
- Descrição: margem top `--ecom-space-2`

---

## 7. Seção CTA (Call to Action)

### Layout
- Full-width, fundo navy escuro (`--ecom-color-neutral-900`) ou com imagem de fundo escurecida
- Conteúdo centralizado (text-align center)
- Padding vertical: `--ecom-space-16`

### Badge
- Pill centralizada: **"Grupo PLA — seu parceiro estratégico no campo"**
- Fundo semi-transparente, borda arredondada, ícone bolinha laranja
- Texto branco, `--ecom-text-sm`

### Heading
- `<h2>`: **"Pronto para transformar sua operação agrícola?"**
- Branco, `--ecom-text-4xl`, `--ecom-font-bold`
- Largura máxima ~600px, centrado

### Subtítulo
- Texto: **"Fale com nossos especialistas e descubra como o Grupo PLA pode ser o parceiro de logística, peças e suporte técnico que a sua fazenda precisa para crescer."**
- Branco translúcido, `--ecom-text-base`
- Largura máxima ~600px, centrado

### CTAs (2 botões, centrados)
1. **"Falar com especialista →"**
   - Botão primário: fundo laranja, texto branco, `--ecom-radius-full`
   - Seta após o texto

2. **"Ver nosso catálogo"**
   - Botão outline: borda branca, fundo transparente, texto branco, `--ecom-radius-full`

---

## 8. Seção Equipe

### Layout
- Fundo: `--ecom-bg-page` (cinza claro) ou `--ecom-bg-surface` (branco)
- Container centralizado
- Padding vertical: `--ecom-space-16`

### Tagline
- Texto: **"Nossa Equipe"**
- Cor laranja, uppercase, `--ecom-text-xs`, `--ecom-tracking-widest`, itálico

### Heading
- `<h2>`: **"As pessoas por trás do Grupo PLA"**
- `--ecom-text-3xl`, `--ecom-font-bold`, `--ecom-text-primary`

### Subtítulo
- Texto: **"Uma equipe apaixonada por agronegócio, com décadas de experiência em peças, logística e atendimento ao produtor rural."**
- `--ecom-text-secondary`, `--ecom-text-base`

### Cards de Membros (3 colunas)
Grid de 3 cards iguais. Gap: `--ecom-space-6`

#### Card 1 — Carlos Mendes
- Foto: homem de terno em ambiente corporativo/agrícola
- Largura: 100% do card
- Border-radius: `--ecom-radius-lg` no topo, cantos retos na base
- `loading="lazy"`
- Nome: **"Carlos Mendes"** — `--ecom-text-xl`, `--ecom-font-bold`, `--ecom-text-primary`
- Cargo: **"CEO & Fundador"** — `--ecom-text-sm`, cor laranja (`--ecom-color-primary-500`)

#### Card 2 — Fernanda Oliveira
- Foto: mulher em ambiente de trabalho/campo
- Nome: **"Fernanda Oliveira"**
- Cargo: **"Diretora Comercial"** — cor laranja

#### Card 3 — Ricardo Santos
- Foto: homem em ambiente técnico/campo
- Nome: **"Ricardo Santos"**
- Cargo: **"Gerente Técnico"** — cor laranja

#### Estilo dos cards de equipe
- Fundo: `--ecom-bg-surface` (branco)
- Border-radius: `--ecom-radius-lg`
- Sombra: `--ecom-shadow-sm`
- Overflow: hidden (para imagem no topo com radius)
- Imagem: aspect-ratio ~4:3 ou ~16:10, `object-fit: cover`
- Corpo (nome + cargo): padding `--ecom-space-4` horizontal, `--ecom-space-4` vertical
- Nome → cargo: gap `--ecom-space-1`

---

## 9. Newsletter Bar

Componente global. Mesmo padrão de todas as páginas.

---

## 10. Footer

Componente global conforme `00-page-map.md`.

---

## Responsividade

### Mobile (< 768px)
- Hero: H1 reduz para `--ecom-text-3xl`, botões empilham
- Seção história: 1 coluna — texto + mini-timeline acima, imagem abaixo
- Timeline horizontal: stack vertical (1 coluna), cada marco ocupa full-width
- Stats bar: grid 2x2
- Cards de valores: stack 1 coluna ou grid 2x2
- CTA: texto e botões centrados, botões empilham
- Equipe: stack 1 coluna, cards full-width

### Tablet (768px–1023px)
- Seção história: 2 colunas mantidas, proporção 50/50
- Timeline: 2 colunas (2x2)
- Stats bar: 4 colunas mantidas (números menores)
- Valores: 2 colunas (2x2)
- Equipe: 3 colunas mantidas (cards menores)

### Desktop (>= 1024px)
- Layout conforme descrito acima

---

## SEO

### Meta tags
```html
<title>Sobre Nós — Grupo PLA</title>
<meta name="description" content="Conheça a história do Grupo PLA. Há mais de 30 anos somos referência em peças agrícolas, logística e suporte técnico para o agronegócio brasileiro.">
<meta name="robots" content="index, follow">
```

### Dados estruturados
- `Organization` (global, com dados completos)
- `BreadcrumbList`: Home > Sobre Nós
- `AboutPage` (Schema.org)

### Heading hierarchy
```
h1 — Conheça quem move o agronegócio brasileiro
  h2 — Uma história de dedicação ao campo
  h2 — 30 anos escrevendo história no agronegócio
  h2 — Uma história de dedicação ao campo (seção full-width)
  h2 — O que nos guia há 30 anos
  h2 — Pronto para transformar sua operação agrícola?
  h2 — As pessoas por trás do Grupo PLA
```

---

## Componentes CSS necessários

| Componente | Arquivo CSS |
|---|---|
| Hero banner | `components/hero-banner.css` |
| Section text+image | `components/text-image-section.css` |
| Mini-timeline (vertical) | `components/mini-timeline.css` |
| Timeline horizontal | `components/timeline.css` |
| Stats bar | `components/stats-bar.css` |
| Value cards | `components/value-card.css` |
| CTA section | `components/cta-section.css` |
| Team cards | `components/team-card.css` |
| Newsletter bar | `components/newsletter-bar.css` |

---

## Acessibilidade

- Timeline: usar `<ol>` (ordered list) semanticamente, pois é sequência cronológica
- Stats: números grandes com `aria-label` descritivo (ex: `aria-label="Mais de 30 anos de mercado"`)
- Cards de valores: ícones decorativos com `aria-hidden="true"`
- Cards de equipe: imagens com `alt` descritivo (ex: `alt="Foto de Carlos Mendes, CEO & Fundador do Grupo PLA"`)
- Seção CTA: botões com texto descritivo, sem depender apenas da cor
- Imagem de fundo na stats bar: conteúdo não depende da imagem (texto legível mesmo sem imagem)
- Contraste: texto branco sobre fundo escuro >= 4.5:1 verificado em hero, stats bar e CTA
- Focus visible em todos os botões e links interativos

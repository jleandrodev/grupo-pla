# 09 — Contato (`contato.html`)

Referência visual: `references/screenshots/09-contato/`

---

## Estrutura Geral da Página

```
[Top Bar]
[Header]
[Nav Menu]
[Hero Banner com breadcrumb]
[Seção Central de Atendimento — cards de contato]
[Seção Formulário + Sidebar especialistas + Mapa]
[Newsletter Bar]
[Footer]
```

---

## 1. Hero Banner

### Layout
- Full-width, altura ~400px
- Imagem de fundo: foto escurecida (overlay navy `--ecom-color-neutral-900` com opacidade ~70%) mostrando trabalhador agrícola em meio a plantação
- Conteúdo alinhado à esquerda, dentro do container (`--ecom-container-max: 1280px`)
- Breadcrumb acima do conteúdo: `Home / Contato` (texto laranja `--ecom-color-primary-500`)

### Badge superior
- Pill/badge com fundo semi-transparente (navy com opacidade), borda arredondada (`--ecom-radius-full`)
- Ícone de bolinha laranja + texto: **"Atendimento especializado Grupo PLA"**
- Texto branco, `--ecom-text-sm`

### Heading
- `<h1>`: **"Atendimento dedicado para sua operação agrícola"**
- Texto branco (`--ecom-text-inverse`), fonte bold (`--ecom-font-bold`), tamanho `--ecom-text-5xl`
- Line-height `--ecom-leading-tight`
- Largura máxima ~550px para quebra de linha controlada

### Parágrafo
- Texto: **"Fale com especialistas em peças, aplicação e logística. Responda em minutos e agende visitas técnicas ou suporte remoto."**
- Cor: branco levemente translúcido (`rgba(255,255,255,0.85)`)
- `--ecom-text-lg`, `--ecom-leading-relaxed`

### CTAs (2 botões lado a lado)
1. **"Agendar atendimento →"**
   - Botão primário: fundo laranja (`--ecom-action-primary`), texto branco, `--ecom-radius-full` (pill)
   - Padding: `--ecom-space-3` vertical, `--ecom-space-6` horizontal
   - Seta (→) após o texto
   - Hover: `--ecom-action-primary-hover`

2. **"Ver canais de atendimento"**
   - Botão outline: borda branca 1px, fundo transparente, texto branco, `--ecom-radius-full`
   - Mesmo padding do botão primário
   - Hover: fundo branco semi-transparente

### Espaçamento
- Badge → H1: `--ecom-space-4`
- H1 → parágrafo: `--ecom-space-4`
- Parágrafo → CTAs: `--ecom-space-6`

---

## 2. Seção Central de Atendimento

### Layout
- Fundo: `--ecom-bg-page` (cinza claro `#F5F5F5`)
- Container centralizado, padding vertical `--ecom-space-16`

### Tagline
- Texto: **"Central de Atendimento"**
- Cor laranja (`--ecom-color-primary-500`), `--ecom-text-sm`, uppercase ou itálico, `--ecom-font-medium`

### Heading
- `<h2>`: **"Converse com nosso time e agende uma visita"**
- Cor: `--ecom-text-primary` (navy escuro)
- Tamanho: `--ecom-text-3xl`, `--ecom-font-bold`

### Subtítulo
- Texto: **"Atendimento presencial, remoto e via WhatsApp. Garantimos acompanhamento rápido e registro de todas as solicitações."**
- Cor: `--ecom-text-secondary`, `--ecom-text-base`

### Cards de Contato (3 colunas, grid)
Layout: 3 cards lado a lado em desktop, stack em mobile. Gap: `--ecom-space-6`

#### Card 1 — Telefone
- Ícone: telefone (SVG), cor navy/azul (`--ecom-color-primary-700`), tamanho ~32px
- Label: **"Telefone"** — `--ecom-text-sm`, `--ecom-text-secondary`
- Valor: **"+55 (11) 4000-0000"** — `--ecom-text-xl`, `--ecom-font-bold`, `--ecom-text-primary`
- Descrição: **"WhatsApp e ligações 24/7"** — `--ecom-text-sm`, `--ecom-text-muted`

#### Card 2 — Email
- Ícone: envelope (SVG), cor navy/azul
- Label: **"Email"**
- Valor: **"contato@grupopla.com.br"** — `--ecom-text-xl`, `--ecom-font-bold`
- Descrição: **"Resposta em até 48 horas."**

#### Card 3 — Visitas Técnicas
- Ícone: pin/localização (SVG), cor navy/azul
- Label: **"Visitas Técnicas"**
- Valor: **"Av. Paulista, 1000 — São Paulo"** — `--ecom-text-xl`, `--ecom-font-bold`
- Descrição: **"Atendimento de segunda a sábado, 7h-20h"**

#### Estilo dos cards
- Fundo: `--ecom-bg-surface` (branco)
- Borda: `--ecom-border-default` (1px solid cinza claro)
- Border-radius: `--ecom-radius-lg`
- Padding: `--ecom-space-6`
- Sombra: nenhuma ou `--ecom-shadow-sm`
- Ícone posicionado no topo-esquerda do card
- Espaçamento ícone → label: `--ecom-space-3`
- Label → valor: `--ecom-space-2`
- Valor → descrição: `--ecom-space-2`

---

## 3. Seção Formulário + Sidebar + Mapa

### Layout
- Fundo: `--ecom-bg-surface` (branco)
- Container centralizado
- Grid 2 colunas: ~55% formulário (esquerda) | ~45% sidebar + mapa (direita)
- Padding vertical: `--ecom-space-16`
- Gap: `--ecom-space-8`

### Coluna Esquerda — Formulário

#### Heading
- `<h2>`: **"Solicite um retorno imediato"**
- Cor: `--ecom-text-primary`, `--ecom-text-3xl`, `--ecom-font-bold`

#### Subtítulo
- Texto: **"Preencha o formulário ou envie sua especificação e nossa equipe técnico-comercial responde em até 2 horas."**
- Cor: `--ecom-text-secondary`, `--ecom-text-base`

#### Campos do formulário
Todos os campos seguem o mesmo padrão visual:
- Label acima do input, cor laranja (`--ecom-color-primary-500`), `--ecom-text-sm`, `--ecom-font-semibold`
- Input com borda `--ecom-border-default`, `--ecom-radius-md`
- Placeholder: `--ecom-text-muted`
- Padding interno: `--ecom-space-3` vertical, `--ecom-space-4` horizontal
- Gap entre campos: `--ecom-space-4`

1. **Nome completo**
   - Label: **"Nome completo"**
   - Placeholder: **"Digite seu nome"**
   - `<input type="text">`
   - `autocomplete="name"`

2. **Telefone**
   - Label: **"Telefone"**
   - Placeholder: **"Telefone para contato"**
   - `<input type="tel">`
   - `autocomplete="tel"`

3. **Email profissional**
   - Label: **"Email profissional"**
   - Placeholder: **"exemplo@empresa.com.br"**
   - `<input type="email">`
   - `autocomplete="email"`

4. **Empresa / Unidade**
   - Label: **"Empresa / Unidade"**
   - Placeholder: **"Informe o bairro ou base operacional"**
   - `<input type="text">`
   - `autocomplete="organization"`

5. **Mensagem / Especificação**
   - Label: **"Mensagem / Especificação"**
   - Placeholder: **"Conte o desafio que deseja resolver"**
   - `<textarea>`, altura ~120px

#### Botão de envio
- Texto: **"Enviar mensagem"**
- Botão primário: fundo laranja (`--ecom-action-primary`), texto branco (`--ecom-text-on-primary`)
- `--ecom-radius-full` (pill)
- Padding: `--ecom-space-3` vertical, `--ecom-space-8` horizontal
- `--ecom-font-semibold`
- Margem top: `--ecom-space-4`

### Coluna Direita — Sidebar + Mapa

#### Card "Converse com especialistas"
- Fundo: `--ecom-bg-page` (cinza claro) ou borda `--ecom-border-default`
- Border-radius: `--ecom-radius-lg`
- Padding: `--ecom-space-6`

- Heading: **"Converse com especialistas"** — `--ecom-text-xl`, `--ecom-font-bold`, `--ecom-text-primary`
- Descrição: **"Estamos em todas as etapas da cadeia agrícola com suporte técnico, logística e atendimento dedicado."**
  - Cor: `--ecom-text-secondary`, `--ecom-text-sm`

- Lista de contatos:
  - **Telefone** (label bold) `(11) 4000-0000`
  - **WhatsApp** (label bold) `(11) 9 5999-0000`
  - **Email** (label bold) `contato@grupopla.com.br`
  - Labels em `--ecom-font-bold`, cor `--ecom-text-primary`
  - Valores em `--ecom-text-secondary`

#### Google Maps Embed
- Abaixo do card de especialistas
- Margem top: `--ecom-space-6`
- `<iframe>` do Google Maps com localização da empresa
- Largura: 100% da coluna
- Altura: ~300px
- Border-radius: `--ecom-radius-lg`
- Borda: nenhuma (`border: 0`)

---

## 4. Newsletter Bar

Componente global. Fundo navy escuro (`--ecom-color-neutral-800`).
- Ícone de envelope à esquerda
- Título: **"Newsletter"** — branco, `--ecom-font-bold`
- Subtítulo: **"Inscreva-se para receber dicas e promoções"** — branco translúcido
- Campo email à direita: placeholder **"seu email..."**
- Botão **"Enviar"** — fundo laranja, texto branco, `--ecom-radius-md`

---

## 5. Footer

Componente global conforme `00-page-map.md`.

---

## Responsividade

### Mobile (< 768px)
- Hero: H1 reduz para `--ecom-text-3xl`, botões empilham verticalmente
- Cards de contato: stack vertical (1 coluna), full-width
- Formulário e sidebar: stack vertical — formulário primeiro, sidebar + mapa abaixo
- Mapa: full-width, altura ~250px

### Tablet (768px–1023px)
- Cards de contato: 2 colunas (terceiro card full-width abaixo)
- Formulário e sidebar: podem manter 2 colunas com proporção 50/50

### Desktop (>= 1024px)
- Layout conforme descrito acima

---

## SEO

### Meta tags
```html
<title>Contato — Grupo PLA</title>
<meta name="description" content="Entre em contato com o Grupo PLA. Atendimento especializado em peças agrícolas, visitas técnicas e suporte remoto. Resposta em até 2 horas.">
<meta name="robots" content="index, follow">
```

### Dados estruturados
- `Organization` (global)
- `BreadcrumbList`: Home > Contato
- `ContactPage` (Schema.org)

### Heading hierarchy
```
h1 — Atendimento dedicado para sua operação agrícola
  h2 — Converse com nosso time e agende uma visita
  h2 — Solicite um retorno imediato
```

---

## Componentes CSS necessários

| Componente | Arquivo CSS |
|---|---|
| Hero banner | `components/hero-banner.css` |
| Contact cards | `components/contact-card.css` |
| Formulário | `components/form.css` |
| Sidebar card | `components/sidebar-card.css` |
| Google Maps embed | `components/map-embed.css` |
| Newsletter bar | `components/newsletter-bar.css` |

---

## Acessibilidade

- Formulário: cada campo com `<label for="">` associado ao `id` do input
- Campos obrigatórios com `required` e `aria-required="true"`
- Mensagens de erro com `role="alert"` e `aria-describedby`
- Cards de contato: links clicáveis no telefone (`<a href="tel:...">`), email (`<a href="mailto:...">`)
- Mapa: `<iframe>` com `title="Localização do Grupo PLA no Google Maps"`
- Botão de envio: `type="submit"` com estado `aria-busy` durante envio
- Contraste verificado: texto branco sobre hero escuro >= 4.5:1

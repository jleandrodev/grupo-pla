# Sistema de Tokens CSS

O arquivo `template/assets/css/tokens.css` é a **única fonte da verdade** de design. Todo valor de cor, fonte, espaçamento e sombra vem daqui.

---

## Estrutura do tokens.css

```css
/* ============================================================
   tokens.css — EDITAR ESTE ARQUIVO PARA CUSTOMIZAR O CLIENTE
   ============================================================ */

:root {

  /* ── PALETA DE CORES ── */

  /* Cor primária (CTA, botões principais, links ativos) */
  --ecom-color-primary-50:  #eff6ff;
  --ecom-color-primary-100: #dbeafe;
  --ecom-color-primary-200: #bfdbfe;
  --ecom-color-primary-300: #93c5fd;
  --ecom-color-primary-400: #60a5fa;
  --ecom-color-primary-500: #3b82f6; /* ← cor base */
  --ecom-color-primary-600: #2563eb;
  --ecom-color-primary-700: #1d4ed8;
  --ecom-color-primary-800: #1e40af;
  --ecom-color-primary-900: #1e3a8a;

  /* Cor secundária (destaques, badges, hover secundário) */
  --ecom-color-secondary-500: #f59e0b;
  --ecom-color-secondary-600: #d97706;

  /* Neutros */
  --ecom-color-neutral-0:   #ffffff;
  --ecom-color-neutral-50:  #f9fafb;
  --ecom-color-neutral-100: #f3f4f6;
  --ecom-color-neutral-200: #e5e7eb;
  --ecom-color-neutral-300: #d1d5db;
  --ecom-color-neutral-400: #9ca3af;
  --ecom-color-neutral-500: #6b7280;
  --ecom-color-neutral-600: #4b5563;
  --ecom-color-neutral-700: #374151;
  --ecom-color-neutral-800: #1f2937;
  --ecom-color-neutral-900: #111827;

  /* Status */
  --ecom-color-success: #16a34a;
  --ecom-color-warning: #d97706;
  --ecom-color-error:   #dc2626;
  --ecom-color-info:    #0284c7;

  /* ── ALIASES SEMÂNTICOS (usar estes nos componentes) ── */

  --ecom-bg-page:           var(--ecom-color-neutral-50);
  --ecom-bg-surface:        var(--ecom-color-neutral-0);
  --ecom-bg-surface-alt:    var(--ecom-color-neutral-100);

  --ecom-text-primary:      var(--ecom-color-neutral-900);
  --ecom-text-secondary:    var(--ecom-color-neutral-600);
  --ecom-text-muted:        var(--ecom-color-neutral-400);
  --ecom-text-inverse:      var(--ecom-color-neutral-0);
  --ecom-text-on-primary:   var(--ecom-color-neutral-0);

  --ecom-border-default:    var(--ecom-color-neutral-200);
  --ecom-border-focus:      var(--ecom-color-primary-500);

  --ecom-action-primary:        var(--ecom-color-primary-500);
  --ecom-action-primary-hover:  var(--ecom-color-primary-600);
  --ecom-action-primary-active: var(--ecom-color-primary-700);

  /* ── TIPOGRAFIA ── */

  /* Font stacks */
  --ecom-font-sans:  'Inter', system-ui, -apple-system, sans-serif;
  --ecom-font-serif: 'Playfair Display', Georgia, serif;
  --ecom-font-mono:  'JetBrains Mono', 'Courier New', monospace;

  /* Família usada (trocar aqui muda todo o site) */
  --ecom-font-body:    var(--ecom-font-sans);
  --ecom-font-heading: var(--ecom-font-sans);

  /* Escala tipográfica (modular, base 16px) */
  --ecom-text-xs:   0.75rem;    /* 12px */
  --ecom-text-sm:   0.875rem;   /* 14px */
  --ecom-text-base: 1rem;       /* 16px */
  --ecom-text-lg:   1.125rem;   /* 18px */
  --ecom-text-xl:   1.25rem;    /* 20px */
  --ecom-text-2xl:  1.5rem;     /* 24px */
  --ecom-text-3xl:  1.875rem;   /* 30px */
  --ecom-text-4xl:  2.25rem;    /* 36px */
  --ecom-text-5xl:  3rem;       /* 48px */

  /* Pesos */
  --ecom-font-regular:   400;
  --ecom-font-medium:    500;
  --ecom-font-semibold:  600;
  --ecom-font-bold:      700;

  /* Line heights */
  --ecom-leading-tight:  1.25;
  --ecom-leading-snug:   1.375;
  --ecom-leading-normal: 1.5;
  --ecom-leading-relaxed:1.625;

  /* Letter spacing */
  --ecom-tracking-tight: -0.025em;
  --ecom-tracking-normal: 0;
  --ecom-tracking-wide:   0.025em;
  --ecom-tracking-widest: 0.1em;

  /* ── ESPAÇAMENTO ── */

  /* Escala de 4px */
  --ecom-space-1:  0.25rem;   /* 4px */
  --ecom-space-2:  0.5rem;    /* 8px */
  --ecom-space-3:  0.75rem;   /* 12px */
  --ecom-space-4:  1rem;      /* 16px */
  --ecom-space-5:  1.25rem;   /* 20px */
  --ecom-space-6:  1.5rem;    /* 24px */
  --ecom-space-8:  2rem;      /* 32px */
  --ecom-space-10: 2.5rem;    /* 40px */
  --ecom-space-12: 3rem;      /* 48px */
  --ecom-space-16: 4rem;      /* 64px */
  --ecom-space-20: 5rem;      /* 80px */
  --ecom-space-24: 6rem;      /* 96px */

  /* ── BORDER RADIUS ── */

  --ecom-radius-sm:   0.25rem;   /* 4px  — inputs, badges */
  --ecom-radius-md:   0.375rem;  /* 6px  — cards pequenos */
  --ecom-radius-lg:   0.5rem;    /* 8px  — cards padrão */
  --ecom-radius-xl:   0.75rem;   /* 12px — cards grandes */
  --ecom-radius-2xl:  1rem;      /* 16px — modais */
  --ecom-radius-full: 9999px;    /* pílula — tags, avatares */

  /* ── SOMBRAS ── */

  --ecom-shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
  --ecom-shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --ecom-shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --ecom-shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* ── Z-INDEX ── */

  --ecom-z-base:    0;
  --ecom-z-raised:  10;
  --ecom-z-dropdown: 100;
  --ecom-z-sticky:  200;
  --ecom-z-overlay: 300;
  --ecom-z-modal:   400;
  --ecom-z-toast:   500;

  /* ── BREAKPOINTS (apenas referência — usar em @media) ── */
  /* sm: 480px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */

  /* ── LAYOUT ── */

  --ecom-container-max:   1280px;
  --ecom-container-pad:   var(--ecom-space-4);    /* padding lateral mobile */
  --ecom-container-pad-md: var(--ecom-space-8);   /* padding lateral desktop */

  /* ── TRANSIÇÕES ── */

  --ecom-duration-fast:   150ms;
  --ecom-duration-normal: 250ms;
  --ecom-duration-slow:   350ms;
  --ecom-ease-default:    cubic-bezier(0.4, 0, 0.2, 1);

}
```

---

## Como usar os tokens nos componentes

### CORRETO — sempre via alias semântico
```css
.btn--primary {
  background-color: var(--ecom-action-primary);
  color: var(--ecom-text-on-primary);
  padding: var(--ecom-space-3) var(--ecom-space-6);
  border-radius: var(--ecom-radius-md);
  font-size: var(--ecom-text-sm);
  font-weight: var(--ecom-font-semibold);
  transition: background-color var(--ecom-duration-fast) var(--ecom-ease-default);
}

.btn--primary:hover {
  background-color: var(--ecom-action-primary-hover);
}
```

### ERRADO — valores hardcoded
```css
/* NUNCA FAZER ISSO */
.btn--primary {
  background-color: #3b82f6;  /* ← hardcoded */
  color: #fff;                 /* ← hardcoded */
  padding: 12px 24px;          /* ← hardcoded */
  border-radius: 6px;          /* ← hardcoded */
}
```

---

## Customização por Cliente

Para criar o tema de um novo cliente, copie `tokens.css` para `tokens-[cliente].css` e altere apenas:
1. Paleta primária e secundária (escalas de 50 a 900)
2. `--ecom-font-body` e `--ecom-font-heading`
3. `--ecom-radius-*` se o estilo pedir formas mais arredondadas/quadradas
4. `--ecom-shadow-*` se necessário

Os aliases semânticos (`--ecom-action-primary`, `--ecom-text-primary`, etc.) devem continuar apontando para as variáveis de paleta — assim todos os componentes respondem automaticamente.

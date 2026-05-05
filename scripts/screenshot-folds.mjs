#!/usr/bin/env node

/**
 * screenshot-folds.mjs
 *
 * Acessa uma URL via Playwright, identifica as dobras (folds) da página
 * e salva screenshots individuais de cada dobra.
 *
 * Uso:
 *   node scripts/screenshot-folds.mjs <url> <nome-pasta> [--viewport=1280x800] [--device=mobile]
 *
 * Exemplos:
 *   node scripts/screenshot-folds.mjs https://exemplo.com.br home-desktop
 *   node scripts/screenshot-folds.mjs https://exemplo.com.br home-mobile --device=mobile
 *   node scripts/screenshot-folds.mjs https://exemplo.com.br catalog --viewport=1440x900
 */

import { chromium, devices } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..');
const SCREENSHOTS_DIR = join(PROJECT_ROOT, 'references', 'screenshots');

// --- Parse args ---
const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith('--'));
const positional = args.filter(a => !a.startsWith('--'));

const url = positional[0];
const folderName = positional[1];

if (!url || !folderName) {
  console.error(`
Uso: node scripts/screenshot-folds.mjs <url> <nome-pasta> [opções]

Opções:
  --viewport=LARGURAxALTURA   Tamanho do viewport (padrão: 1280x800)
  --device=mobile             Usa viewport de iPhone 14 (390x844)
  --device=tablet             Usa viewport de iPad (820x1180)
  --wait=MILISSEGUNDOS        Tempo extra de espera após carregamento (padrão: 1000)
  --full                      Também salva um screenshot full-page

Exemplos:
  node scripts/screenshot-folds.mjs https://site.com.br home-desktop
  node scripts/screenshot-folds.mjs https://site.com.br home-mobile --device=mobile
  `);
  process.exit(1);
}

// Parse flags
function getFlag(name, defaultValue) {
  const flag = flags.find(f => f.startsWith(`--${name}=`));
  return flag ? flag.split('=')[1] : defaultValue;
}

const hasFlag = (name) => flags.includes(`--${name}`);

const devicePresets = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
};

let viewportWidth = 1280;
let viewportHeight = 800;

const deviceFlag = getFlag('device', null);
if (deviceFlag && devicePresets[deviceFlag]) {
  viewportWidth = devicePresets[deviceFlag].width;
  viewportHeight = devicePresets[deviceFlag].height;
}

const viewportFlag = getFlag('viewport', null);
if (viewportFlag) {
  const [w, h] = viewportFlag.split('x').map(Number);
  if (w && h) {
    viewportWidth = w;
    viewportHeight = h;
  }
}

const waitTime = parseInt(getFlag('wait', '1000'));
const saveFullPage = hasFlag('full');

// --- Main ---
async function main() {
  const outputDir = join(SCREENSHOTS_DIR, folderName);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n📸 Screenshot Folds`);
  console.log(`   URL: ${url}`);
  console.log(`   Viewport: ${viewportWidth}x${viewportHeight}`);
  console.log(`   Output: ${outputDir}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: viewportWidth, height: viewportHeight },
    deviceScaleFactor: 2,
    locale: 'pt-BR',
  });

  const page = await context.newPage();

  // Navegar e esperar carregamento completo
  console.log('   Carregando página...');
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(waitTime);

  // Obter altura total da página
  const totalHeight = await page.evaluate(() => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
  });

  const foldCount = Math.ceil(totalHeight / viewportHeight);

  console.log(`   Altura total: ${totalHeight}px`);
  console.log(`   Dobras identificadas: ${foldCount}\n`);

  // Identificar seções semânticas da página (para nomear melhor os prints)
  const sections = await page.evaluate((vh) => {
    const elements = document.querySelectorAll(
      'header, main, footer, section, [data-section], .hero, .banner'
    );
    const result = [];

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const fold = Math.floor(top / vh) + 1;
      const tag = el.tagName.toLowerCase();
      const id = el.id || '';
      const className = el.className?.split?.(' ')?.[0] || '';
      const section = el.dataset?.section || '';
      const name = section || id || className || tag;

      result.push({ fold, name, top: Math.round(top) });
    }

    return result;
  }, viewportHeight);

  // Screenshot de cada dobra
  for (let i = 0; i < foldCount; i++) {
    const foldNum = i + 1;
    const y = i * viewportHeight;
    const height = Math.min(viewportHeight, totalHeight - y);

    // Encontrar seções nesta dobra
    const sectionsInFold = sections
      .filter(s => s.fold === foldNum)
      .map(s => s.name);

    const sectionLabel = sectionsInFold.length > 0
      ? `_${sectionsInFold[0]}`
      : '';

    const filename = `fold-${String(foldNum).padStart(2, '0')}${sectionLabel}.png`;
    const filepath = join(outputDir, filename);

    await page.screenshot({
      path: filepath,
      clip: { x: 0, y, width: viewportWidth, height },
    });

    console.log(`   ✓ ${filename} (y: ${y}px, seções: ${sectionsInFold.join(', ') || 'n/a'})`);
  }

  // Screenshot full-page opcional
  if (saveFullPage) {
    const fullPath = join(outputDir, 'full-page.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`   ✓ full-page.png`);
  }

  // Gerar metadata
  const metadata = {
    url,
    capturedAt: new Date().toISOString(),
    viewport: { width: viewportWidth, height: viewportHeight },
    totalHeight,
    foldCount,
    sections: sections.map(s => ({ name: s.name, top: s.top, fold: s.fold })),
  };

  const metaPath = join(outputDir, '_metadata.json');
  const { writeFileSync } = await import('fs');
  writeFileSync(metaPath, JSON.stringify(metadata, null, 2));

  console.log(`\n   📋 Metadata salvo em _metadata.json`);
  console.log(`\n✅ ${foldCount} screenshots salvos em:\n   ${outputDir}\n`);

  await browser.close();
}

main().catch(err => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});

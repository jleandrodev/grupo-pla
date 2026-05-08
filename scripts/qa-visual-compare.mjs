#!/usr/bin/env node

/**
 * qa-visual-compare.mjs
 *
 * Compara uma página HTML desenvolvida contra as imagens de referência.
 * Abre o HTML via Playwright, tira screenshots por dobra, e gera relatório.
 *
 * Uso:
 *   node scripts/qa-visual-compare.mjs <html-file> <reference-folder> [--viewport=1280x800]
 *
 * Exemplos:
 *   node scripts/qa-visual-compare.mjs template/pages/index.html 01-home
 *   node scripts/qa-visual-compare.mjs template/pages/catalog.html 02-categoria
 *
 * Saída:
 *   references/screenshots/[folder]/qa/
 *     ├── fold-01-actual.png      ← screenshot real
 *     ├── fold-01-reference.png   ← cópia da referência (para comparação lado a lado)
 *     ├── fold-01-diff.png        ← diff visual (requer pixelmatch ou manual)
 *     └── qa-report.json          ← relatório estruturado
 */

import { chromium } from 'playwright';
import { mkdirSync, existsSync, copyFileSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join, basename } from 'path';
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

const htmlFile = positional[0];
const refFolder = positional[1];

if (!htmlFile || !refFolder) {
  console.error(`
Uso: node scripts/qa-visual-compare.mjs <html-file> <reference-folder> [opções]

Opções:
  --viewport=LARGURAxALTURA   Tamanho do viewport (padrão: 1280x800)

Exemplos:
  node scripts/qa-visual-compare.mjs template/pages/index.html 01-home
  node scripts/qa-visual-compare.mjs template/pages/contato.html 09-contato
  `);
  process.exit(1);
}

function getFlag(name, defaultValue) {
  const flag = flags.find(f => f.startsWith(`--${name}=`));
  return flag ? flag.split('=')[1] : defaultValue;
}

const viewportFlag = getFlag('viewport', '1280x800');
const [viewportWidth, viewportHeight] = viewportFlag.split('x').map(Number);

async function main() {
  const htmlPath = resolve(PROJECT_ROOT, htmlFile);
  const refDir = join(SCREENSHOTS_DIR, refFolder);
  const qaDir = join(refDir, 'qa');

  if (!existsSync(htmlPath)) {
    console.error(`❌ HTML não encontrado: ${htmlPath}`);
    process.exit(1);
  }

  if (!existsSync(refDir)) {
    console.error(`❌ Pasta de referência não encontrada: ${refDir}`);
    process.exit(1);
  }

  mkdirSync(qaDir, { recursive: true });

  // Listar folds de referência
  const refFolds = readdirSync(refDir)
    .filter(f => f.match(/^fold-\d+\.png$/))
    .sort();

  if (refFolds.length === 0) {
    console.error(`❌ Nenhum fold de referência encontrado em ${refDir}`);
    process.exit(1);
  }

  console.log(`\n🔍 QA Visual Compare`);
  console.log(`   HTML:      ${htmlFile}`);
  console.log(`   Reference: ${refFolder}/ (${refFolds.length} folds)`);
  console.log(`   Viewport:  ${viewportWidth}x${viewportHeight}`);
  console.log(`   Output:    ${qaDir}\n`);

  // Abrir browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: viewportWidth, height: viewportHeight },
    deviceScaleFactor: 1,
    locale: 'pt-BR',
  });

  const page = await context.newPage();

  // Navegar para o HTML local
  const fileUrl = `file://${htmlPath}`;
  console.log(`   Loading: ${fileUrl}`);
  // Block external requests (Google Maps, Fonts) that cause networkidle timeout on file://
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.startsWith('file://') || url.startsWith('data:')) {
      route.continue();
    } else {
      route.abort();
    }
  });
  await page.goto(fileUrl, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500);

  // Obter altura total
  const totalHeight = await page.evaluate(() =>
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
  );

  const actualFoldCount = Math.ceil(totalHeight / viewportHeight);
  console.log(`   Page height: ${totalHeight}px (${actualFoldCount} folds)\n`);

  const report = {
    html: htmlFile,
    reference: refFolder,
    viewport: { width: viewportWidth, height: viewportHeight },
    timestamp: new Date().toISOString(),
    totalHeight,
    referenceFolds: refFolds.length,
    actualFolds: actualFoldCount,
    folds: [],
  };

  // Tirar screenshot full-page primeiro (mais robusto que clip individual)
  const fullActual = join(qaDir, 'full-page-actual.png');
  await page.screenshot({ path: fullActual, fullPage: true });
  console.log(`   ✓ full-page-actual.png captured`);

  // Recortar folds a partir do full-page usando sharp ou canvas
  // Como não temos sharp, usamos screenshots individuais com scroll
  const maxFolds = Math.max(refFolds.length, actualFoldCount);

  for (let i = 0; i < maxFolds; i++) {
    const num = String(i + 1).padStart(2, '0');
    const foldEntry = { fold: i + 1 };

    // Screenshot atual via scroll + viewport screenshot
    if (i < actualFoldCount) {
      const y = i * viewportHeight;
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(100);

      const actualPath = join(qaDir, `fold-${num}-actual.png`);
      await page.screenshot({ path: actualPath });
      foldEntry.actual = `fold-${num}-actual.png`;
      console.log(`   ✓ fold-${num}-actual.png captured`);
    } else {
      foldEntry.actual = null;
      foldEntry.issue = 'MISSING_IN_ACTUAL';
      console.log(`   ⚠ fold-${num}: existe na referência mas não na página desenvolvida`);
    }

    // Copiar referência
    if (i < refFolds.length) {
      const refSrc = join(refDir, refFolds[i]);
      const refDst = join(qaDir, `fold-${num}-reference.png`);
      copyFileSync(refSrc, refDst);
      foldEntry.reference = `fold-${num}-reference.png`;
    } else {
      foldEntry.reference = null;
      if (!foldEntry.issue) {
        foldEntry.issue = 'EXTRA_IN_ACTUAL';
        console.log(`   ⚠ fold-${num}: existe na página desenvolvida mas não na referência`);
      }
    }

    report.folds.push(foldEntry);
  }

  // Salvar relatório
  const reportPath = join(qaDir, 'qa-report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Gerar relatório markdown para o agente QA ler
  const mdReport = generateMarkdownReport(report);
  const mdPath = join(qaDir, 'qa-report.md');
  writeFileSync(mdPath, mdReport);

  console.log(`\n   📋 Reports saved:`);
  console.log(`      ${reportPath}`);
  console.log(`      ${mdPath}`);

  // Resumo
  const issues = report.folds.filter(f => f.issue);
  if (issues.length > 0) {
    console.log(`\n   ⚠ ${issues.length} fold(s) com diferenças de quantidade`);
  }

  if (report.referenceFolds !== report.actualFolds) {
    console.log(`   ⚠ Diferença de altura: referência tem ${report.referenceFolds} folds, página tem ${report.actualFolds}`);
  }

  console.log(`\n✅ QA complete. Compare visualmente os pares *-actual.png vs *-reference.png\n`);

  await browser.close();
}

function generateMarkdownReport(report) {
  let md = `# QA Report: ${report.reference}\n\n`;
  md += `- **HTML:** \`${report.html}\`\n`;
  md += `- **Data:** ${report.timestamp}\n`;
  md += `- **Viewport:** ${report.viewport.width}x${report.viewport.height}\n`;
  md += `- **Altura da página:** ${report.totalHeight}px\n`;
  md += `- **Folds referência:** ${report.referenceFolds}\n`;
  md += `- **Folds real:** ${report.actualFolds}\n\n`;

  md += `## Comparação por Fold\n\n`;
  md += `| Fold | Referência | Atual | Status |\n`;
  md += `|------|-----------|-------|--------|\n`;

  for (const fold of report.folds) {
    const ref = fold.reference || '❌ ausente';
    const actual = fold.actual || '❌ ausente';
    const status = fold.issue ? `⚠ ${fold.issue}` : '✅ OK (comparar visualmente)';
    md += `| ${fold.fold} | ${ref} | ${actual} | ${status} |\n`;
  }

  md += `\n## Instruções para QA\n\n`;
  md += `1. Abra os pares \`fold-NN-reference.png\` e \`fold-NN-actual.png\` lado a lado\n`;
  md += `2. Verifique: layout, espaçamentos, cores, tipografia, alinhamentos\n`;
  md += `3. Documente diferenças encontradas abaixo\n\n`;
  md += `## Diferenças Encontradas\n\n`;
  md += `<!-- O agente QA preenche esta seção -->\n\n`;

  return md;
}

main().catch(err => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});

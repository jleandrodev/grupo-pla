import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(__dirname, 'template');

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(templateDir, decodeURIComponent(req.url));

  // Fallback: if .webp not found, try .svg
  if (!fs.existsSync(filePath)) {
    const svgPath = filePath.replace(/\.webp$/, '.svg');
    if (fs.existsSync(svgPath)) {
      filePath = svgPath;
    } else {
      console.log(`  404: ${req.url}`);
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise(resolve => server.listen(3333, resolve));
console.log('Server running on http://localhost:3333');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
const failedResources = [];

page.on('console', msg => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
page.on('requestfailed', req => {
  failedResources.push(`FAILED: ${req.url()} — ${req.failure()?.errorText}`);
});

await page.goto('http://localhost:3333/pages/index.html', { waitUntil: 'networkidle' });

// Screenshot desktop
await page.screenshot({ path: path.join(__dirname, 'screenshot-home-desktop.png'), fullPage: true });

// Screenshot mobile
await page.setViewportSize({ width: 375, height: 812 });
await page.screenshot({ path: path.join(__dirname, 'screenshot-home-mobile.png'), fullPage: true });

console.log('\n=== CONSOLE ERRORS ===');
errors.forEach(e => console.log(e));
if (!errors.length) console.log('(none)');

console.log('\n=== FAILED RESOURCES (404s) ===');
failedResources.forEach(f => console.log(f));
if (!failedResources.length) console.log('(none)');

await browser.close();
server.close();

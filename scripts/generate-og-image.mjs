import puppeteer from 'puppeteer';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const logoPath = resolve(root, 'public', 'The Gahitwen LLC Logo 512.png');
const outPath = resolve(root, 'public', 'og-image.png');

const logoBase64 = (await readFile(logoPath)).toString('base64');

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
  .card {
    width: 1200px; height: 630px;
    background: linear-gradient(135deg, #3B271F 0%, #2b1d18 55%, #1a1210 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    font-family: Inter, system-ui, sans-serif; position: relative;
  }
  .bar { position: absolute; top: 0; left: 0; right: 0; height: 8px; background: #FFC200; }
  .logo { width: 180px; height: 180px; object-fit: contain; margin-bottom: 28px; }
  .title { font-size: 56px; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
  .title span { color: #FFC200; }
  .tagline {
    margin-top: 16px; font-size: 26px; font-weight: 600; color: #c8b2aa;
    letter-spacing: 0.5px;
  }
  .domain { margin-top: 32px; font-size: 22px; color: #816155; }
</style></head>
<body>
  <div class="card">
    <div class="bar"></div>
    <img class="logo" src="data:image/png;base64,${logoBase64}" alt="" />
    <div class="title">The Gahitwen <span>LLC</span></div>
    <div class="tagline">Software &amp; Cybersecurity Solutions</div>
    <div class="domain">gahitwen.com</div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outPath, type: 'png' });
  console.log(`og-image written -> public/og-image.png (1200x630)`);
} finally {
  await browser.close();
}

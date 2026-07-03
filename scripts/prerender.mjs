import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ROUTES } from './site-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

// Routes to prerender into static HTML. Keep in sync with src/App.tsx
// (the catch-all 404 route is intentionally excluded).
const routes = SITE_ROUTES.map((r) => r.path);

const outFileForRoute = (route) => {
  if (route === '/') return resolve(distDir, 'index.html');
  return resolve(distDir, `.${route}`, 'index.html');
};

const run = async () => {
  const server = await preview({
    preview: { port: 4173, strictPort: true },
  });

  const baseUrl =
    server.resolvedUrls?.local?.[0]?.replace(/\/$/, '') ??
    'http://localhost:4173';

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // Render every route first and only write files afterwards. Writing
    // dist/index.html mid-crawl would make it the SPA fallback for the
    // remaining routes, leaking one page's <head> tags into the next.
    const rendered = [];

    for (const route of routes) {
      const page = await browser.newPage();
      try {
        await page.goto(`${baseUrl}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });

        // Footer renders on every page via the shared Layout, so its
        // presence is a reliable signal that React has finished mounting.
        await page.waitForSelector('footer', { timeout: 30000 });

        // Small settle delay for Helmet head tags + JSON-LD to be applied.
        await new Promise((r) => setTimeout(r, 300));

        rendered.push({ route, html: await page.content() });
      } finally {
        await page.close();
      }
    }

    for (const { route, html } of rendered) {
      const outFile = outFileForRoute(route);
      await mkdir(dirname(outFile), { recursive: true });
      await writeFile(outFile, html, 'utf-8');
      console.log(`prerendered ${route} -> ${outFile.replace(distDir, 'dist')}`);
    }
  } finally {
    await browser.close();
    await new Promise((resolveClose) => {
      server.httpServer.close(() => resolveClose());
    });
  }
};

run().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});

import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ROUTES } from './site-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(__dirname, '..', 'public', 'sitemap.xml');
const SITE_URL = 'https://gahitwen.com';
const lastmod = new Date().toISOString().slice(0, 10);

const urls = SITE_ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(outFile, xml, 'utf-8');
console.log(`sitemap written -> public/sitemap.xml (lastmod ${lastmod})`);

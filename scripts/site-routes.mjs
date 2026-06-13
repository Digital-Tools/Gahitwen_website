// Public routes for sitemap + prerender. Keep in sync with src/App.tsx.
export const SITE_ROUTES = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/products', changefreq: 'monthly', priority: '0.9' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/quote', changefreq: 'monthly', priority: '0.9' },
  { path: '/team', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

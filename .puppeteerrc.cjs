const { join } = require('path');

/**
 * Store Puppeteer's Chromium download inside node_modules so it lives in a
 * directory that hosts like Netlify cache between builds (the default
 * ~/.cache/puppeteer is outside the cached workspace and re-downloads every
 * build).
 *
 * @type {import('puppeteer').Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer'),
};

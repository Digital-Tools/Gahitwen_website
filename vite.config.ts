import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});


// ── Security headers (added by setup-security.ps1) ──────────────────────────
// Vite does not set HTTP headers at runtime. Add these at your server/host level:
//
//   X-Frame-Options: DENY
//   X-Content-Type-Options: nosniff
//   Referrer-Policy: strict-origin-when-cross-origin
//
// For local dev you can use the viteStaticCopy or a custom middleware:
//
//   server: {
//     headers: {
//       "X-Frame-Options": "DENY",
//       "X-Content-Type-Options": "nosniff",
//       "Referrer-Policy": "strict-origin-when-cross-origin",
//     }
//   }
// ─────────────────────────────────────────────────────────────────────────────

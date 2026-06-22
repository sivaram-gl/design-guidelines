import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Relative base ('./') so the built site works at any GitHub Pages path,
// whether it's served from a user/org site root or a project subpath.
export default defineConfig({
  root: path.resolve(__dirname),
  base: './',
  plugins: [react()],
  build: {
    // Emit into ../docs so GitHub Pages (configured to serve from /docs) picks
    // up index.html, assets, downloads/, and manifest.json together.
    outDir: path.resolve(__dirname, '../docs'),
    emptyOutDir: false,
    assetsDir: 'assets'
  },
  server: {
    port: 5173
  }
});

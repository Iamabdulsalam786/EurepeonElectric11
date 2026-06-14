import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    target: 'es2020',
    sourcemap: false,
    cssMinify: true,
    minify: 'esbuild',
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 600,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/aos')) {
            return 'vendor-aos';
          }
          if (id.includes('/src/config/')) {
            return 'app-config';
          }
        },
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const asyncEntryCss = () => ({
  name: 'async-entry-css',
  apply: 'build' as const,
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
      '<link rel="preload" as="style" crossorigin href="$1" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" crossorigin href="$1"></noscript>'
    );
  }
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/',
  plugins: [react(), asyncEntryCss()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react']
        }
      }
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    reportCompressedSize: false
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  esbuild: {
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
}));

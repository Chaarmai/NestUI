import { defineConfig } from 'vite'
import { resolve } from 'node:path'

/**
 * Separate Vite config for building the GHL inject script.
 *
 * Usage:  npm run build:inject
 * Output: dist-inject/inject.js  (single self-contained IIFE)
 */
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/inject/inject.ts'),
      name: 'NestUIInject',
      fileName: () => 'inject.js',
      formats: ['iife'],
    },
    outDir: 'dist-inject',
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      output: {
        // No code-splitting — everything in one file
        inlineDynamicImports: true,
      },
    },
  },
})

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        cms: resolve(__dirname, 'src/index.ts'),
        build: resolve(__dirname, 'build/index.ts')
      },
      output: {
        entryFileNames: `[name].js`, // Pour nommer chaque sortie après son point d'entrée
        format: 'umd', // Choisissez le format qui convient à votre usage (umd, esm, cjs, etc.)
        globals: {
          vue: 'Vue'
        },
        inlineDynamicImports: false,
        dir: resolve(__dirname, 'dist') // Définir un répertoire de sortie commun
      },
      external: ['vue', 'fs', 'path']
    }
  },
  plugins: [dts({ rollupTypes: true }), vue()]
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Instruct Babel (via react plugin) to parse JSX in .js files
      include: /\.(js|jsx)$/,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  // Instruct esbuild to load JSX for source files inside src/
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  // Instruct pre-bundling process to load JSX for .js files
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});

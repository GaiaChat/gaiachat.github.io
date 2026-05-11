import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'assets/gaiachat-app.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? assetInfo.name ?? '';

          if (name.endsWith('.css')) {
            return 'assets/gaiachat-app.css';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});

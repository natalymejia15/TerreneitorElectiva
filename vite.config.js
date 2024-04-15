import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteAliases({
    entries: [
      { find: '~/src/assets', replacement: './assets' },
    ],
  })],
  server: {
    port: 3000,
  },
  css: {
    preprocessor: 'postcss',
  },
});

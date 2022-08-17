/* eslint-disable import/no-default-export */

import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@validation-schemas': path.resolve(
        __dirname,
        './src/validation-schemas',
      ),
      '@navigation': path.resolve(__dirname, './src/navigation'),
      '@autoline/shared': path.resolve(
        __dirname,
        './node_modules/@autoline/shared',
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@autoline/shared'],
  },
});

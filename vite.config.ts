/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@features': path.resolve(__dirname, './src/features'),
      '@store': path.resolve(__dirname, './src/store'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});

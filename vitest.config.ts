import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Configuración de Vitest debe estar dentro del objeto principal
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: './test/setup.ts',
    coverage: {
      reporter: ['html', 'text'],
      exclude: [
        "**/*.config.ts",
        "**/*.config.js",
        "**/*.d.ts",
        "**/src/main.tsx",
        '**/*.types.ts',
        '**/interface/**'
      ],
      thresholds: {
        functions: 80
      }
    }
  }
});
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    server: {
      // These CJS packages (pulled in via @creit.tech/stellar-wallets-kit)
      // don't declare static named exports, so Vitest's default SSR module
      // loader can't interop them. Force them through Vite's transform
      // pipeline instead, same as the dev server and production build do.
      deps: {
        inline: ['@creit.tech/stellar-wallets-kit', '@stellar/freighter-api'],
      },
    },
  },
})

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: [        
        '**/node_modules/**',
        '**/dist/**',
        '**/vite.config.*',
        '**/vitest.config.*',
        '**/eslint.config.*',
        '**/.storybook/**',
        '**/src/stories/**',
        '**/src/main.tsx',
        '**/src/vite-env.d.ts',
        '**/src/context/**',
        '**/src/types.ts',
        '**/src/*/*/types.ts',
        '**/src/api/**',
        '**/src/App.tsx',
        '**/*/styles/**',
        '**/src/components/icons/**'
      ],
    },
  },
})
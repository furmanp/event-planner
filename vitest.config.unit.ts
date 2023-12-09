// vitest.config.unit.ts

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // include: ['__tests__/*.test.ts'],
    include: ['src/**/*.test.ts'],
    coverage: {
      exclude: [
        'config.ts',
        'src/utils/server.ts',
        'src/models/*.ts',
        'src/routes/*.ts',
        'src/routes.ts',
      ],
    },
  },
});

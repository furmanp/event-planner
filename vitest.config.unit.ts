// vitest.config.unit.ts

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['__tests__/*.test.ts'],
    coverage: {
      exclude: [
        'src/libs/**',
        'src/utils/server.ts',
        'src/routes/data.ts',
        'src/routes.ts',
      ],
    },
  },
});

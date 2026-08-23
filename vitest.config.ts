import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Month and year counts come off the local calendar, so pin the zone.
    env: { TZ: 'UTC' },
  },
});

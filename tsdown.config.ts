import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outExtensions: () => ({ js: '.mjs', dts: '.d.mts' }),
  platform: 'neutral',
  target: 'es2023',
  dts: { sourcemap: true },
  sourcemap: true,
  clean: true,
  treeshake: true,
  publint: true,
});

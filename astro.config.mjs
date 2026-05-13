import { defineConfig } from 'astro/config';

const isCI = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  output: 'static',
  site: 'https://johanerfass.github.io',
  base: isCI ? '/reef-design-system' : '/',
});

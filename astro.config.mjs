// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  base: "/luks-ph-cms/",
  vite: {
    plugins: [tailwindcss()]
  }
});
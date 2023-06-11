import { defineConfig } from 'astro/config';
import glsl from 'vite-plugin-glsl';
import relativeLinks from "astro-relative-links";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  outDir: '../dist/',
  "paths": {
    "@scripts/*": ["src/scripts/*"]
  },
  vite: {
    build: {
      emptyOutDir: true
    },
    plugins: [glsl()]
  },
  integrations: [relativeLinks(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
  build: {
    assets: 'assets'
  }
});
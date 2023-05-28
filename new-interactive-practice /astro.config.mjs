import { defineConfig } from 'astro/config';
import glsl from 'vite-plugin-glsl';
import relativeLinks from "astro-relative-links";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  outDir: '../docs/',
  "paths": {
    "@scripts/*": ["src/scripts/*"]
  },
  vite: {
    build: {
      emptyOutDir: false
    },
    plugins: [glsl()]
  },
  integrations: [relativeLinks(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })]
});
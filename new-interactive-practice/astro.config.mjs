import { defineConfig } from 'astro/config';
import glsl from 'vite-plugin-glsl';
import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  outDir: '../dist/',
  "paths": {
    "@scripts/*": ["src/scripts/*"]
  },
  output: "static",
  vite: {
    build: {
      emptyOutDir: true
    },
    plugins: [glsl()]
  },
  build: {
    assets: 'assets'
  },
  experimental: {
    optimizeHoistedScript: true,
  },
});

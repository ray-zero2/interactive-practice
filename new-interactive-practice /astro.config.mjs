import {
  defineConfig
} from 'astro/config';
import glsl from 'vite-plugin-glsl'

// https://astro.build/config
export default defineConfig( {
  outDir: '../docs/',
  "paths": {
    "@scripts/*": ["src/scripts/*"],
  },
  vite: {
    build: {
      emptyOutDir: false
    },
    plugins: [glsl()]
  }
} );
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: './',
  build: {
    outDir: '../../docs/step11',
  },
  plugins: [glsl()]
});
import { resolve } from 'path';
import { globSync } from 'glob';

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    sourcemap: true,
    rollupOptions: {
      input: Object.fromEntries(
        globSync('src/**/*.html').map((file) => {
          const name = file.replace(/^src\//, '').replace(/\.html$/, '');
          return [name, resolve(__dirname, file)];
        })
      )
    }
  },
  preview: { outDir: resolve(__dirname, 'dist'), port: 3000, open: true },
  server: { port: 3000, open: true }
};

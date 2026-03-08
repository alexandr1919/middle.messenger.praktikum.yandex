import { resolve } from 'path';

export default {
  root: resolve(__dirname, 'src'),
  appType: 'spa',
  build: {
    outDir: resolve(__dirname, 'dist'),
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html')
    }
  },
  preview: { outDir: resolve(__dirname, 'dist'), port: 3000, open: true },
  server: { port: 3000, open: true }
};

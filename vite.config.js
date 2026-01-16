import { resolve } from 'path';
import { globSync } from 'glob';
import handlebars from 'vite-plugin-handlebars';

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
      ),
    },
  },
  preview: { outDir: resolve(__dirname, 'dist'), port: 3000, open: true },
  server: { port: 3000, open: true },
  plugins: [
    handlebars({
      reloadOnPartialChange: true,
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        title: 'Hello, world!',
        chatList: [
          { name: 'username_1', preview: 'preview_1_lorem_ipsum_sit_amet' },
          { name: 'username_2', preview: 'preview_1_lorem_ipsum_sit_amet' },
          { name: 'username_3', preview: 'preview_1_lorem_ipsum_sit_amet' },
        ],
        chat: {
          user: 'username_2',
          messages: [
            {
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",
              time: '20:20',
            },
            {
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              time: '20:20',
            },
            {
              text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry. It has survived when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived ',
              time: '20:20',
            },
            {
              text: 'Lorem Ipsum is simply dummy text of the',
              time: '20:20',
            },
          ],
        },
        settings: {
          login: 'user_login',
          firstName: 'user_first_name',
          secondName: 'user_second_name',
          displayName: 'user_display_name',
          phone: '+12345678910',
        },
      },
    }),
  ],
};

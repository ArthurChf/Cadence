import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '#shared': fileURLToPath(new URL('../shared/src', import.meta.url)),
            '#': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        open: true
    }
});

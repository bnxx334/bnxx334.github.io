import { copyFile, cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const pages = ['index', 'activities', 'certification', 'thanks'];

const copyStaticAssets = {
    name: 'copy-static-assets',
    apply: 'build',
    async closeBundle() {
        await cp(resolve(process.cwd(), 'Asset'), resolve(process.cwd(), 'dist/Asset'), {
            recursive: true
        });
        await copyFile(resolve(process.cwd(), 'sw.js'), resolve(process.cwd(), 'dist/sw.js'));
    }
};

export default defineConfig({
    base: './',
    plugins: [react(), copyStaticAssets],
    build: {
        rollupOptions: {
            input: Object.fromEntries(
                pages.map((page) => [page, resolve(process.cwd(), `${page}.html`)])
            )
        }
    }
});

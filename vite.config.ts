import { defineConfig } from 'vite';
import { getSrcPath, setupPlugins } from './build';

const srcPath = getSrcPath();
export default defineConfig({
    plugins: setupPlugins(),
    resolve: {
        alias: {
            '@': srcPath,
        },
    },
});

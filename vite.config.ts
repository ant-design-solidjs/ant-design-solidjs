import { defineConfig } from 'vite';
import { setupPlugins } from './build';

export default defineConfig({
    plugins: setupPlugins(),
});

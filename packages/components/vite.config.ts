import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solid from 'vite-plugin-solid';

const entry = './src/index.ts';
export default defineConfig({
    plugins: [
        solid(),
        dts({
            entryRoot: 'src',
            outDir: ['es', 'lib'],
        }),
    ],
    build: {
        emptyOutDir: true,
        sourcemap: false,
        target: 'modules',
        outDir: 'es',
        lib: {
            entry,
        },
        rollupOptions: {
            external: [
                'clsx',
                'solid-js',
                'solid-js/web',
                '@ctrl/tinycolor',
                '@ant-design/colors',
                '@ant-design-solidjs/cssinjs',
                '@ant-design-solidjs/util',
                '@ant-design-solidjs/icons',
            ],
            output: [
                {
                    format: 'es',
                    //不用打包成.es.js,这里我们想把它打包成.js
                    entryFileNames: '[name].mjs',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    exports: 'named',
                    //配置打包根目录
                    dir: 'es',
                },
                {
                    format: 'cjs',
                    //不用打包成.cjs
                    entryFileNames: '[name].js',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    exports: 'named',
                    //配置打包根目录
                    dir: 'lib',
                },
            ],
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
        // if you have few tests, try commenting this
        // out to improve performance:
        isolate: false,
    },
});

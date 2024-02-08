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
                'solid-js',
                'solid-js/web',
                '@emotion/hash',
                '@emotion/unitless',
                'stylis',
                '@ant-design-solidjs/util',
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
});

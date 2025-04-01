import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import solid from "vite-plugin-solid"

export default defineConfig({
    plugins: [
        solid(),
        dts({ tsconfigPath: "tsconfig.json", entryRoot: "src" }),
        vanillaExtractPlugin({ unstable_mode: "emitCss" }),
    ],
    build: {
        minify: false,
        lib: {
            entry: "./src/index.tsx",
        },
        rollupOptions: {
            jsx: "preserve",
            external: [
                "solid-js",
                "solid-js/web",
                "@vanilla-extract/css",
            ],
            output: [{
                format: "esm",
                preserveModules: true,
                exports: "named",
                preserveModulesRoot: "src",
                entryFileNames: "[name].js",
            }],
        },
    },
})

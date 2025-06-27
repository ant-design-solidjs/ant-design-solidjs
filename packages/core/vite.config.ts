import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
    plugins: [
        solid(),
    ],
    build: {
        minify: true,
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

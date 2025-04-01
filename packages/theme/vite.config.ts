import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import solid from "vite-plugin-solid"

export default defineConfig({
    plugins: [
        solid(),
        dts({ tsconfigPath: "tsconfig.app.json" }),
    ],
    build: {
        lib: {
            entry: "./src/index.ts",
        },
        rollupOptions: {
            external: ["solid-js", "solid-js/web", "@vanilla-extract/css", "@ant-design/colors", "@ant-design/fast-color"],
            output: [{
                format: "es",
                preserveModules: true,
                exports: "named",
                preserveModulesRoot: "src",
                entryFileNames: "[name].js",
            }],
        },
    },
})

import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: "tsconfig.app.json",
        }),
    ],
    build: {
        lib: {
            entry: "./src/index.tsx",
        },
        minify: false,
        rollupOptions: {
            external: [
                "vite",
                "@ant-design-solidjs/theme",
                "@vanilla-extract/css/transformCss",
                "@vanilla-extract/vite-plugin",
                "@vanilla-extract/integration",
            ],
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

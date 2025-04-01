import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: "tsconfig.json",
            entryRoot: "src",
            outDir: ["es", "lib"],
        }),
    ],
    build: {
        lib: {
            entry: "./src/index.tsx",
        },
        emptyOutDir: true,
        rollupOptions: {
            output: [
                {
                    dir: "es",
                    format: "es",
                    preserveModules: true,
                    exports: "named",
                    preserveModulesRoot: "src",
                    entryFileNames: "[name].js",
                },
                {
                    dir: "lib",
                    format: "cjs",
                    preserveModules: true,
                    exports: "named",
                    preserveModulesRoot: "src",
                    entryFileNames: "[name].js",
                },
            ],
        },
    },
})

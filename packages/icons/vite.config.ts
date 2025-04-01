import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import solid from "vite-plugin-solid"

export default defineConfig({
    plugins: [
        solid(),
        dts({
            tsconfigPath: "tsconfig.json",
            entryRoot: "src",
            outDir: ["es", "lib"],
        }),
    ],
    build: {
        lib: {
            entry: "./src/index.ts",
        },
        emptyOutDir: true,
        rollupOptions: {
            external: [
                "clsx",
                "solid-js",
                "solid-js/web",
                "@ant-design/colors",
                "@ant-design/fast-color",
                "@ant-design/icons-svg",
                "@ant-design-solidjs/utils",
                "@solid-primitives/refs",
                "@solid-primitives/utils",
            ],
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

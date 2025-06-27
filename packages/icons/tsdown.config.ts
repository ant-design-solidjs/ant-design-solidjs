import { defineConfig } from "tsdown"

export default defineConfig({
    entry: "./src/index.ts",
    fromVite: true,
    platform: "neutral",
    dts: true,
    exports: {
        devExports: true,
    },
    minify: true,
})

import { defineConfig } from "tsdown"

export default defineConfig({
    entry: "./src/index.tsx",
    fromVite: true,
    platform: "neutral",
    unbundle: true,
    dts: true,
    exports: {
        devExports: true,
        customExports: (exports) => {
            return { ...exports, "./themes/default.css": "./dist/themes/default.css" }
        },
    },
    minify: true,
})

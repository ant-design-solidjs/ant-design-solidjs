import type { Options } from "tsup"
import { solidPlugin } from "esbuild-plugin-solid"
/**
 * Adapted from https://github.com/corvudev/corvu/blob/b1f36db096867a88ef5b62bec1e46cc0c8e09089/packages/corvu/tsup.config.ts
 */
import { defineConfig } from "tsup"

function generateConfig(jsx: boolean): Options {
    return {
        target: "esnext",
        platform: "browser",
        format: "esm",
        clean: true,
        dts: !jsx,
        entry: jsx ? ["src/index.tsx", "src/**/*.{ts,js,tsx}", "!src/**/*.css.ts"] : ["src/index.tsx", "src/**/*.css.ts", "src/*/*.{ts,js,tsx}"],
        outDir: "dist/",
        treeshake: { preset: "smallest" },
        replaceNodeEnv: true,
        splitting: false,
        minify: false,
        esbuildOptions(options) {
            if (jsx) {
                options.jsx = "preserve"
            }
            options.chunkNames = "[name]/[hash]"
            options.drop = ["console", "debugger"]
            options.bundle = false
        },
        outExtension() {
            return jsx ? { js: ".jsx" } : { js: ".js" }
        },
        // @ts-ignore
        esbuildPlugins: !jsx ? [solidPlugin({ solid: { generate: "dom" } })] : [],
    }
}

export default defineConfig([generateConfig(false), generateConfig(true)])

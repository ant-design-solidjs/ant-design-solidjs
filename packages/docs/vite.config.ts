import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import { defineConfig } from "vite"
import { plugin as Markdown, Mode } from "vite-plugin-markdown"
import solid from "vite-plugin-solid"

export default defineConfig({
    plugins: [
        solid(),
        vanillaExtractPlugin(),
        Markdown({
            mode: [Mode.HTML],
        }),
    ],
})

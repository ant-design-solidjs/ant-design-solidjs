import { createHighlighterCore } from "shiki/core"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"

const highlighter = createHighlighterCore({
    themes: [
        import("@shikijs/themes/light-plus"),
    ],
    langs: [
        import("@shikijs/langs/jsx"),
        import("@shikijs/langs/javascript"),
        import("@shikijs/langs/css"),
    ],
    engine: createOnigurumaEngine(import("shiki/wasm")),
})

export async function highlightCode(code: string, lang: string) {
    const instance = await highlighter
    return instance.codeToHtml(code, {
        lang,
        theme: "light-plus",
    })
}

import { mkdirSync, writeFileSync } from "node:fs"
import { genVars } from "@ant-design-solidjs/theme"
import { transformCss } from "@vanilla-extract/css/transformCss"

const css = transformCss({
    localClassNames: [],
    cssObjs: [
        {
            type: "local",
            selector: ":root",
            rule: {
                vars: genVars({}),
            },
        },
    ],
    composedClassLists: [],
})
const style = css[0]

if (style) {
    mkdirSync("dist/themes", { recursive: true })
    writeFileSync("dist/themes/default.css", style)
}

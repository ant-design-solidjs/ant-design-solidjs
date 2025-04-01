import { token } from "@ant-design-solidjs/theme"
import { fallbackVar } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import { cardVars } from "./var.css"

export const bodyCss = recipe({
    base: {
        padding: fallbackVar(cardVars.bodyPadding, token.size.lg),
    },
})

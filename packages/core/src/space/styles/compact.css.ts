import { prefix, token } from "@ant-design-solidjs/theme"
import { createGlobalThemeContract, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"

export const compactVars = createGlobalThemeContract({
    splitColor: `${prefix}-compact-split-color`,
})

export const compactItem = style({
    selectors: {
        "&:before": {
            position: "absolute",
            top: "0",
            insetInlineStart: calc(token.line.width).multiply(-1).toString(),
            content: "",
            width: token.line.width,
            height: "100%",
            backgroundColor: compactVars.splitColor,
        },
    },
})

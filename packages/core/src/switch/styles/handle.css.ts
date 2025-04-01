import { token } from "@ant-design-solidjs/theme"
import { style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { handleBg, handleShadow, handleSize, trackPadding } from "./var.css"

export const handleCss = style({
    position: "absolute",
    top: trackPadding,
    insetInlineStart: trackPadding,
    width: handleSize,
    height: handleSize,
    transition: `all ${token.motion.mid} ease-in-out`,
    selectors: {
        "&:before": {
            position: "absolute",
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            backgroundColor: handleBg,
            borderRadius: calc(handleSize).divide(2).toString(),
            boxShadow: handleShadow,
            content: "",
            transition: `all ${token.motion.mid} ease-in-out`,
        },
    },
})

export const loadingIconCss = style({
    position: "relative",
    top: calc(calc(handleSize).subtract(token.fontSize.default)).divide(2).toString(),
    verticalAlign: "top",
    color: `rgba(0, 0, 0, ${token.opacityLoading})`,
})

import { token } from "@ant-design-solidjs/theme/src"
import { globalStyle, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { switchCss } from "./switch.css"
import { handleSize, height, maxMargin, minMargin, trackPadding } from "./var.css"

export const innerCss = style({
    vars: {
        [minMargin]: calc(handleSize).divide(2).toString(),
        [maxMargin]: calc(handleSize).add(trackPadding).add(calc(trackPadding).multiply(2)).toString(),
    },
    display: "block",
    overflow: "hidden",
    borderRadius: "100px",
    height: "100%",
    paddingInlineStart: maxMargin,
    paddingInlineEnd: minMargin,
    transition: `padding-inline-start ${token.motion.mid} ease-in-out,padding-inline-end ${token.motion.mid} ease-in-out`,
})

globalStyle(`${switchCss.classNames.variants.checked.true} ${innerCss}`, {
    paddingInlineEnd: maxMargin,
    paddingInlineStart: minMargin,
})

export const innerChildren = style({
    display: "block",
    color: "white",
    fontSize: token.fontSize.sm,
    transition: `margin-inline-start ${token.motion.mid} ease-in-out,margin-inline-end ${token.motion.mid} ease-in-out`,
    pointerEvents: "none",
    minHeight: height,
})

export const innerChecked = style({
    marginInlineStart: calc("-100%").add(
        calc(handleSize).add(calc(trackPadding).multiply(2)),
    ).subtract(
        calc(maxMargin).multiply(2),
    ).toString(),
    marginInlineEnd: calc("100%").subtract(
        calc(handleSize).add(calc(trackPadding).multiply(2)),
    ).add(
        calc(maxMargin).multiply(2),
    ).toString(),
})

globalStyle(`${switchCss.classNames.variants.checked.true} ${innerChecked}`, {
    marginInlineStart: 0,
    marginInlineEnd: 0,
})

export const innerUnchecked = style({
    marginTop: calc(height).multiply(-1).toString(),
    marginInlineStart: 0,
    marginInlineEnd: 0,
})

globalStyle(`${switchCss.classNames.variants.checked.true} ${innerUnchecked}`, {
    marginInlineStart: calc(
        calc("100%").subtract(handleSize).add(trackPadding).multiply(2),
    ).add(
        calc(maxMargin).multiply(2),
    ).toString(),
    marginInlineEnd: calc(
        calc("-100%").add(handleSize).add(
            calc(trackPadding).multiply(2),
        ),
    ).subtract(
        calc(maxMargin).multiply(2),
    ).toString(),
})

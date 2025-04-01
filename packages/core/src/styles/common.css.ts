import { token } from "@ant-design-solidjs/theme"
import { style } from "@vanilla-extract/css"

export const resetStyle = style({
    color: token.colors.text.default,
    fontSize: token.fontSize.default,
    lineHeight: token.lineHeight.default,
    listStyle: "none",
    fontFamily: token.fontFamily,
    border: "none",
    margin: 0,
    padding: 0,
})

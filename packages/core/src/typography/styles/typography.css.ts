import { token } from "@ant-design-solidjs/theme"
import { globalStyle, style } from "@vanilla-extract/css"
import { titleToken } from "./vars.css"

export const typographyCss = style({
    vars: {
        [titleToken.markColor]: token.colors.warning.border,
    },
    color: token.colors.text.default,
    wordBreak: "break-word",
    lineHeight: token.lineHeight.default,
    fontFamily: token.fontFamily,
    fontSize: token.fontSize.default,
    boxSizing: "border-box",
})

globalStyle(`${typographyCss} mark`, {
    padding: "0",
    backgroundColor: titleToken.markColor,
})

globalStyle(`${typographyCss} code`, {
    margin: "0 0.2em",
    paddingInline: "0.4em",
    paddingBlock: "0.2em 0.1em",
    fontSize: "85%",
    fontFamily: token.fontFamilyCode,
    background: "rgba(150, 150, 150, 0.1)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderRadius: "3px",
})

globalStyle(`${typographyCss} kbd`, {
    margin: "0 0.2em",
    paddingInline: "0.4em",
    paddingBlock: "0.2em 0.1em",
    fontSize: "90%",
    fontFamily: token.fontFamilyCode,
    background: "rgba(150, 150, 150, 0.06)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderRadius: "3px",
    borderBottomWidth: "2px",
})

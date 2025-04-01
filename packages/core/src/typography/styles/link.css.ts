import { token } from "@ant-design-solidjs/theme"
import { style } from "@vanilla-extract/css"

export const linkStyles = style({
    color: token.colors.link.default,
    textDecoration: token.linkDecoration,
    outline: "none",
    cursor: "pointer",
    transition: `all ${token.motion.slow}`,
    border: 0,
    padding: 0,
    background: "none",
    userSelect: "text",
    wordBreak: "break-word",
    lineHeight: token.lineHeight.default,
    fontFamily: token.fontFamily,
    fontSize: token.fontSize.default,
    boxSizing: "border-box",
})

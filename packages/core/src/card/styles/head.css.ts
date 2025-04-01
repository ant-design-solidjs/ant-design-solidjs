import { token } from "@ant-design-solidjs/theme"
import { fallbackVar, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { cardVars } from "./var.css"

export const headCss = style({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: fallbackVar(
        cardVars.headerHeight,
        calc(
            calc(token.fontSize.lg).multiply(token.lineHeight.lg).toString(),
        ).add(
            calc(token.size.default).multiply(2),
        ).toString(),
    ),
    marginBottom: "-1px",
    padding: `0 ${fallbackVar(cardVars.headerPadding, token.size.lg)}`,
    color: token.colors.text.default,
    fontWeight: token.fontWeightStrong,
    fontSize: fallbackVar(cardVars.headerFontSize, token.fontSize.lg),
    background: fallbackVar(cardVars.headerBackground, "transparent"),
    borderBottom: `${token.line.width} ${token.line.type} ${token.colors.border.secondary}`,
    borderRadius: `${token.borderRadius.lg} ${token.borderRadius.lg} 0 0`,

    selectors: {
        "&:before": {
            display: "table",
            content: "",
        },
        "&:after": {
            display: "table",
            content: "",
            clear: "both",
        },
    },
})

export const wrapperCss = style({
    width: "100%",
    display: "flex",
    alignItems: "center",
})

export const titleCss = style({
    display: "inline-block",
    flex: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
})

export const extraCss = style({
    marginInlineStart: "auto",
    color: fallbackVar(cardVars.extraColor, token.colors.text.default),
    fontWeight: "normal",
    fontSize: token.fontSize.default,
})

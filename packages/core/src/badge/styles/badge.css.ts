import { token } from "@ant-design-solidjs/theme/src"
import { style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import { resetStyle } from "../../styles"

export const badgeCss = recipe({
    base: [resetStyle, {
        position: "relative",
        display: "inline-block",
        width: "fit-content",
    }],
})

export const badgeCountCss = style({
    display: "inline-flex",
    justifyContent: "center",
    zIndex: "var(--ant-badge-indicator-z-index)",
    minWidth: "var(--ant-badge-indicator-height)",
    height: "var(--ant-badge-indicator-height)",
    color: "var(--ant-color-text-light-solid)",
    fontWeight: "var(--ant-badge-text-font-weight)",
    fontSize: "var(--ant-badge-text-font-size)",
    lineHeight: "var(--ant-badge-indicator-height)",
    whiteSpace: "nowrap",
    textAlign: "center",
    background: "var(--ant-color-error)",
    borderRadius: "calc(var(--ant-badge-indicator-height) / 2)",
    boxShadow: `0 0 0 ${token.line.width} ${token.colors.border.bg}`,
    transition: `background ${token.motion.mid}`,
})

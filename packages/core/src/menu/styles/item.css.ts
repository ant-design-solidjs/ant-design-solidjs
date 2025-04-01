import { token } from "@ant-design-solidjs/theme/src"
import { globalStyle, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { submenuTitleCss } from "./submenu.css"
import { iconMarginInlineEnd, itemBorderRadius } from "./var.css"

const itemCommonStyle = style({
    position: "relative",
    display: "block",
    margin: 0,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: `border-color ${token.motion.slow},background ${token.motion.slow},padding ${calc(token.motion.slow).add("0.1s")} ${token.motion.easeInOut}`,

})

export const menuItemCss = style([itemCommonStyle, {
    borderRadius: itemBorderRadius,
}])

export const titleContentCss = style({
    transition: `color ${token.motion.slow}`,
})

export const itemIconCss = style({
    display: "inline-flex",
    alignItems: "center",
    color: "inherit",
    fontStyle: "normal",
    lineHeight: 0,
    textAlign: "center",
    textTransform: "none",
    verticalAlign: "-0.125em",
    textRendering: "optimizeLegibility",
})

globalStyle(`${menuItemCss} ${itemIconCss} +span,${submenuTitleCss} ${itemIconCss} +span,${menuItemCss} .anticon+span,${submenuTitleCss} .anticon +span`, {
    marginInlineStart: iconMarginInlineEnd,
    opacity: 1,
    transition: `opacity ${token.motion.slow} ${token.motion.easeInOut},margin ${token.motion.slow},color ${token.motion.slow}`,
})

export const itemSelectedCss = style({})

export const itemSubmenuSelectedCss = style({})

// .ant-menu-inline.ant-menu-root .ant-menu-item >.ant-menu-title-content,
// .ant-menu-inline.ant-menu-root .ant-menu-submenu-title >.ant-menu-title-content
globalStyle(`${menuItemCss}>${titleContentCss}, ${submenuTitleCss}>${titleContentCss}`, {
    flex: "auto",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
})

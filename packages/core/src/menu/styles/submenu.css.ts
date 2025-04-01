import { token } from "@ant-design-solidjs/theme"
import { globalStyle, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { menuItemCss } from "./item.css"
import { itemBorderRadius } from "./var.css"

export const submenuCss = style({
    borderRadius: itemBorderRadius,
    transition: `border-color ${token.motion.slow} ${token.motion.easeInOut},background ${token.motion.slow} ${token.motion.easeInOut},padding ${token.motion.mid} ${token.motion.easeInOut}`,
})

export const submenuTitleCss = style({})

export const submenuArrowCss = style({
    position: "absolute",
    top: "50%",
    insetInlineEnd: token.size.default,
    width: calc(token.fontSize.default).divide(7).multiply(5).toString(),
    color: "currentcolor",
    transform: "translateY(-50%)",
    transition: `transform ${token.motion.slow} ${token.motion.easeInOut},opacity ${token.motion.slow}`,
    selectors: {
        "&::before, &::after": {
            position: "absolute",
            width: `calc(calc(${token.fontSize.default} / 7 * 5) * 0.6)`,
            height: `calc(calc(${token.fontSize.default} / 7* 5)* 0.15)`,
            content: "",
            backgroundColor: "currentcolor",
            borderRadius: token.borderRadius.default,
            transition: `background ${token.motion.slow} ${token.motion.easeInOut} ,transform ${token.motion.slow} ${token.motion.easeInOut},top ${token.motion.slow} ${token.motion.easeInOut},color ${token.motion.slow} ${token.motion.easeInOut}`,
        },
        "&::before": {
            transform: `rotate(-45deg) translateX(calc(calc(${token.fontSize.default} / 7 * 5) * 0.25))`,
        },
        "&::after": {
            transform: `rotate(45deg) translateX(calc(calc(calc(${token.fontSize.default} / 7 * 5) * 0.25) * -1))`,
        },
    },
})

export const menuSubCss = style({
    padding: 0,
    border: 0,
    borderRadius: 0,
    boxShadow: "none",
})

export const subMenuOpenCss = style({})

export const subMenuHidden = style({
    display: "none",
})

globalStyle(`${subMenuOpenCss}>${menuItemCss}>${submenuArrowCss}:before`, {
    transform: `rotate(45deg) translateX(calc(calc(${token.fontSize.default} / 7 * 5) * 0.25))`,
})

globalStyle(`${subMenuOpenCss}>${menuItemCss}>${submenuArrowCss}:after`, {
    transform: `rotate(-45deg) translateX(calc(calc(calc(${token.fontSize.default} / 7 * 5) * 0.25) * -1))`,
})

globalStyle(`${submenuCss} ${menuSubCss}`, {
    cursor: "initial",
    transition: `background ${token.motion.slow} ${token.motion.easeInOut},padding ${token.motion.slow} ${token.motion.easeInOut}`,
})

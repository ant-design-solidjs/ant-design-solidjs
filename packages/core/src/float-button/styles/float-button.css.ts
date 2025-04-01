import { prefix, token } from "@ant-design-solidjs/theme"
import { createGlobalVar, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { recipe } from "@vanilla-extract/recipes"
import { resetStyle } from "../../styles"

export const buttonSize = createGlobalVar(`${prefix}-float-button-size`)

export const floatButtonBodyCss = style({
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: `all ${token.motion.mid}`,
})

export const floatButtonContent = style({
    overflow: "hidden",
    textAlign: "center",
    minHeight: buttonSize,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: `${calc(token.size.xxs).divide(2)} ${token.size.xxs}`,
})

export const floatButtonIconCss = style({
    textAlign: "center",
    margin: "auto",
    width: calc(token.fontSize.icon).multiply(1.35).toString(),
    fontSize: calc(token.fontSize.icon).multiply(1.35).toString(),
    lineHeight: 1,
})

export const floatButtonDescriptionCss = style({})

export const floatButtonCss = recipe({
    base: [
        resetStyle,
        {
            vars: {
                [buttonSize]: token.height.large,
            },
            position: "fixed",
            cursor: "pointer",
            display: "block",
            width: buttonSize,
            height: buttonSize,
            insetInlineEnd: token.size.lg,
            bottom: token.size.xxl,
            boxShadow: token.boxShadow.secondary,
        },
    ],
    variants: {
        variant: {
            default: {
                backgroundColor: token.colors.bg.elevated,
                transition: `background-color ${token.motion.mid}`,
            },
            primary: {
                backgroundColor: token.colors.primary.default,
                color: token.colors.white,
            },
        },
        shape: {
            circle: {
                borderRadius: "50%",

            },
            square: {
                height: "auto",
                minHeight: buttonSize,
                borderRadius: token.borderRadius.lg,
            },
        },
    },
    defaultVariants: {
        variant: "default",
        shape: "circle",
    },
})

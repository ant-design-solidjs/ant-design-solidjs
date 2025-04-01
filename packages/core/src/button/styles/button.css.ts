import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { createVar, fallbackVar } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { recipe } from "@vanilla-extract/recipes"
import { compactVars } from "../../space/styles/compact.css"
import { buttonVars } from "./var.css"

const btnSize = createVar()
export const buttonCss = recipe({
    base: {
        outline: "none",
        position: "relative",
        display: "inline-flex",
        gap: token.size.xs,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: fallbackVar(buttonVars.fontWeight, "400"),
        whiteSpace: "nowrap",
        textAlign: "center",
        backgroundImage: "none",
        background: "transparent",
        border: `${token.line.width} ${token.line.type} transparent`,
        cursor: "pointer",
        transition: `all ${token.motion.mid} ${token.motion.easeInOut}`,
        userSelect: "none",
        touchAction: "manipulation",
        color: token.colors.text.default,
        height: btnSize,
        selectors: {
            "&:disabled": {
                cursor: "not-allowed",
                boxShadow: "none",
            },
        },
    },
    variants: {
        variant: {
            solid: {
                color: fallbackVar(buttonVars.primary.text, token.colors.white),
                backgroundColor: token.colors.primary.default,
                selectors: {
                    "&:disabled": {
                        borderColor: token.colors.border.default,
                        color: token.colors.text.quaternary,
                        backgroundColor: token.colors.fill.tertiary,
                    },
                },
            },
            outlined: {
                borderColor: token.colors.border.default,
                backgroundColor: token.colors.bg.container,
                selectors: {
                    "&:disabled": {
                        borderColor: token.colors.border.default,
                        color: token.colors.text.quaternary,
                        backgroundColor: token.colors.fill.tertiary,
                    },
                },
            },
            dashed: {
                borderColor: token.colors.border.default,
                backgroundColor: token.colors.bg.container,
                borderStyle: "dashed",
                selectors: {
                    "&:disabled": {
                        borderColor: token.colors.border.default,
                        color: token.colors.text.quaternary,
                        backgroundColor: token.colors.fill.tertiary,
                    },
                },
            },
            filled: {
                selectors: {
                    "&:disabled": {
                        color: token.colors.text.quaternary,
                        backgroundColor: token.colors.fill.tertiary,
                    },
                },
            },
            text: {
                boxShadow: "none",
                color: token.colors.text.default,
                selectors: {
                    "&:disabled": {
                        color: token.colors.text.quaternary,
                    },
                },
            },
            link: {
                boxShadow: "none",
                color: token.colors.primary.default,
                selectors: {
                    "&:disabled": {
                        color: token.colors.text.quaternary,
                    },
                },
            },
        },
        color: {
            default: {},
            black: {
                vars: {
                    [compactVars.splitColor]: "transparent",
                },
            },
            primary: {
                vars: {
                    [compactVars.splitColor]: token.colors.primary.hover,
                },
                color: fallbackVar(buttonVars.primary.text, token.colors.primary.default),
                boxShadow: `0 ${calc(token.line.width).multiply(2)}px 0 ${token.colors.primary.outline}`,
            },
            danger: {
                vars: {
                    [compactVars.splitColor]: token.colors.danger.hover,
                },
                color: fallbackVar(buttonVars.danger.text, token.colors.danger.default),
                boxShadow: `0 ${calc(token.line.width).multiply(2)}px 0 ${token.colors.danger.outline}`,
            },
        },
        size: {
            small: {
                vars: {
                    [btnSize]: token.height.small,
                },
                fontSize: token.fontSize.sm,
                padding: `0 ${calc(token.size.sm).subtract(token.line.width)}`,
                borderRadius: token.borderRadius.sm,
            },
            middle: {
                vars: {
                    [btnSize]: token.height.middle,
                },
                fontSize: token.fontSize.default,
                padding: `0 ${calc(token.size.default).subtract(token.line.width)}`,
                borderRadius: token.borderRadius.default,
            },
            large: {
                vars: {
                    [btnSize]: token.height.large,
                },
                fontSize: token.fontSize.lg,
                padding: `0 ${calc(token.size.default).subtract(token.line.width)}`,
                borderRadius: token.borderRadius.lg,
            },
        },
        danger: {},
        ghost: {},
        block: {
            true: { width: "100%" },
            false: {},
        },
        loading: {
            true: {
                opacity: token.opacityLoading,
                cursor: "default",
            },
            false: {},
        },
        onlyIcon: {
            true: {
                width: btnSize,
            },
            false: {},
        },
    },
    compoundVariants: [
        {
            variants: { color: "default", variant: "filled" },
            style: {
                boxShadow: "none",
                backgroundColor: token.colors.fill.tertiary,
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: token.colors.fill.secondary,
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: token.colors.fill.default,
                    },
                },
            },
        },
        {
            variants: { color: "default", variant: "dashed" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.hover,
                        borderColor: token.colors.primary.hover,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.active,
                        borderColor: token.colors.primary.active,
                        backgroundColor: token.colors.bg.container,
                    },
                },
            },
        },
        {
            variants: { color: "default", variant: "outlined" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.hover,
                        borderColor: token.colors.primary.hover,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.active,
                        borderColor: token.colors.primary.active,
                        backgroundColor: token.colors.bg.container,
                    },
                },
            },
        },
        {
            variants: { color: "default", variant: "solid" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: token.colors.primary.hover,
                    },
                },
            },
        },
        {
            variants: { color: "default", variant: "text" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.text.default,
                        backgroundColor: token.colors.fill.tertiary,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.text.default,
                        backgroundColor: token.colors.fill.default,
                    },
                },
            },
        },
        {
            variants: { color: "default", variant: "link" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.link.hover,
                        backgroundColor: "transparent",
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.link.active,
                    },
                },
            },
        },
        {
            variants: { color: "black", variant: "solid" },
            style: {
                color: fallbackVar(buttonVars.solid.text, token.colors.white),
                backgroundColor: fallbackVar(buttonVars.solid.bg, token.colors.text.default),
            },
        },
        {
            variants: { color: "black", variant: "dashed" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.hover,
                        borderColor: token.colors.primary.hover,
                        backgroundColor: token.colors.bg.container,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.active,
                        borderColor: token.colors.primary.active,
                        backgroundColor: token.colors.bg.container,
                    },
                },
            },
        },
        {
            variants: { color: "black", variant: "outlined" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.hover,
                        borderColor: token.colors.primary.borderHover,
                        backgroundColor: token.colors.bg.container,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.active,
                        borderColor: token.colors.primary.active,
                        backgroundColor: token.colors.bg.container,
                    },
                },
            },
        },
        {
            variants: { color: "black", variant: "filled" },
            style: {
                boxShadow: "none",
                backgroundColor: token.colors.fill.tertiary,
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: token.colors.fill.secondary,
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: token.colors.fill.default,
                    },
                },
            },
        },
        {
            variants: { color: "black", variant: "text" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.text.default,
                        backgroundColor: token.colors.fill.tertiary,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.text.default,
                        backgroundColor: token.colors.fill.default,
                    },
                },
            },
        },
        {
            variants: { color: "black", variant: "link" },
            style: {
                boxShadow: "none",
                color: token.colors.text.default,
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.link.hover,
                        backgroundColor: "transparent",
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.link.active,
                    },
                },
            },
        },
        {
            variants: { color: "primary", variant: "solid" },
            style: {
                vars: {
                    [compactVars.splitColor]: token.colors.primary.hover,
                },
                color: fallbackVar(buttonVars.solid.text, token.colors.white),
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: token.colors.primary.hover,
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: token.colors.primary.active,
                    },
                },
            },
        },
        {
            variants: { color: "primary", variant: "outlined" },
            style: {
                borderColor: token.colors.primary.default,
                backgroundColor: token.colors.bg.container,
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.textHover,
                        borderColor: token.colors.primary.hover,
                        backgroundColor: token.colors.bg.container,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.textActive,
                        borderColor: token.colors.primary.active,
                        backgroundColor: token.colors.bg.container,
                    },
                },
            },
        },
        {
            variants: { color: "primary", variant: "dashed" },
            style: {
                borderColor: token.colors.primary.default,
                backgroundColor: token.colors.bg.container,
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.textHover,
                        borderColor: token.colors.primary.hover,
                        backgroundColor: token.colors.bg.container,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.textActive,
                        borderColor: token.colors.primary.active,
                        backgroundColor: token.colors.bg.container,
                    },
                },
            },
        },
        {
            variants: { color: "primary", variant: "filled" },
            style: {
                boxShadow: "none",
                backgroundColor: token.colors.primary.bg,
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: token.colors.primary.bgHover,
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: token.colors.primary.border,
                    },
                },
            },
        },
        {
            variants: { color: "primary", variant: "text" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.textHover,
                        backgroundColor: token.colors.primary.bg,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.textActive,
                        backgroundColor: token.colors.primary.border,
                    },
                },
            },
        },
        {
            variants: { color: "primary", variant: "link" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.primary.textHover,
                        backgroundColor: "transparent",
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.primary.textActive,
                    },
                },
            },
        },
        // danger
        {
            variants: { color: "danger", variant: "solid" },
            style: {
                color: fallbackVar(buttonVars.solid.text, token.colors.white),
                backgroundColor: token.colors.danger.default,
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: token.colors.danger.hover,
                    },
                    "&:active:not(:disabled)": {
                        backgroundColor: token.colors.danger.active,
                    },
                },
            },
        },
        {
            variants: { color: "danger", variant: "outlined" },
            style: {
                borderColor: token.colors.danger.default,
                backgroundColor: token.colors.bg.container,
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.danger.hover,
                        borderColor: token.colors.danger.borderHover,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.danger.active,
                        borderColor: token.colors.danger.active,
                    },
                },
            },
        },
        {
            variants: { color: "danger", variant: "dashed" },
            style: {
                borderColor: token.colors.danger.default,
                backgroundColor: token.colors.bg.container,
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.danger.hover,
                        borderColor: token.colors.danger.borderHover,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.danger.active,
                        borderColor: token.colors.danger.active,
                    },
                },
            },
        },
        {
            variants: { color: "danger", variant: "filled" },
            style: {
                boxShadow: "none",
                backgroundColor: token.colors.danger.bg,
                selectors: {
                    "&:hover:not(:disabled)": {
                        backgroundColor: token.colors.danger.bgFilledHover,
                    },
                },
            },
        },
        {
            variants: { color: "danger", variant: "text" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.danger.hover,
                        backgroundColor: token.colors.danger.bg,
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.danger.hover,
                        backgroundColor: token.colors.danger.bgActive,
                    },
                },
            },
        },
        {
            variants: { color: "danger", variant: "link" },
            style: {
                selectors: {
                    "&:hover:not(:disabled)": {
                        color: token.colors.danger.hover,
                        backgroundColor: "transparent",
                    },
                    "&:active:not(:disabled)": {
                        color: token.colors.danger.active,
                        backgroundColor: "transparent",
                    },
                },
            },
        },
    ],
    defaultVariants: {
        size: "middle",
        color: "default",
        variant: "solid",
        onlyIcon: false,
    },
})

export type ButtonVariants = Exclude<RecipeVariants<typeof buttonCss>, undefined>

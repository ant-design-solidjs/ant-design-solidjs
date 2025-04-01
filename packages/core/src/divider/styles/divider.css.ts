import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { createVar, fallbackVar } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { recipe } from "@vanilla-extract/recipes"
import { dividerVars } from "./vars.css"

export const innerTextCss = recipe({
    base: {
        display: "inline-block",
        paddingBlock: 0,
        paddingInline: "1em",
        color: token.colors.text.default,
    },
    variants: {
        plain: {
            true: {
                fontSize: token.fontSize.default,
                fontWeight: "normal",
            },
            false: {
                fontSize: token.fontSize.lg,
                fontWeight: 500,
            },
        },
    },
    defaultVariants: {
        plain: false,
    },
})

const borderType = createVar()
export const dividerCss = recipe({
    base: {
        color: token.colors.text.default,
        fontSize: token.fontSize.default,
        lineHeight: token.lineHeight.default,
        listStyle: "none",
        fontFamily: token.fontFamily,
        borderBlockStart: `${token.line.width} ${borderType} ${token.colors.split}`,
    },
    variants: {
        type: {
            horizontal: {
                display: "flex",
                clear: "both",
                width: "100%",
                minWidth: "100%",
                margin: `${token.size.lg} 0`,
            },
            vertical: {
                position: "relative",
                top: "-0.06em",
                display: "inline-block",
                height: "0.9em",
                marginInline: token.size.xs,
                marginBlock: 0,
                verticalAlign: "middle",
                borderTop: 0,
                borderInlineStart: `${token.line.width} solid ${token.colors.split}`,
            },
        },
        withText: {
            true: {},
            false: {},
        },
        orientation: {
            start: {},
            center: {},
            end: {},
        },
        variant: {
            solid: {
                vars: {
                    [borderType]: "solid",
                },
            },
            dashed: {
                vars: {
                    [borderType]: "dashed",
                },
            },
            dotted: {
                vars: {
                    [borderType]: "dotted",
                },
            },
        },
    },
    compoundVariants: [
        {
            variants: { type: "horizontal", withText: true },
            style: {
                display: "flex",
                alignItems: "center",
                margin: `${token.size.default} 0`,
                whiteSpace: "nowrap",
                textAlign: "center",
                borderBlockStart: `0 ${token.colors.split}`,
                selectors: {
                    "&:before, &:after": {
                        position: "relative",
                        width: "50%",
                        borderBlockStart: `${token.line.width} solid transparent`,
                        borderBlockStartColor: "inherit",
                        borderBlockEnd: 0,
                        transform: "translateY(50%)",
                        content: "",
                        borderStyle: borderType,
                    },
                },
            },
        },
        {
            variants: { type: "horizontal", withText: true, orientation: "start" },
            style: {
                selectors: {
                    "&:before": {
                        width: calc(fallbackVar(dividerVars.orientationMargin, "0.05")).multiply("100%").toString(),
                    },
                    "&:after": {
                        width: calc("100%").subtract(calc(fallbackVar(dividerVars.orientationMargin, "0.05")).multiply("100%")).toString(),
                    },
                },
            },
        },
        {
            variants: { type: "horizontal", withText: true, orientation: "end" },
            style: {
                selectors: {
                    "&:before": {
                        width: calc("100%").subtract(calc(fallbackVar(dividerVars.orientationMargin, "0.05")).multiply("100%")).toString(),
                    },
                    "&:after": {
                        width: calc(fallbackVar(dividerVars.orientationMargin, "0.05")).multiply("100%").toString(),
                    },
                },
            },
        },
    ],
    defaultVariants: {
        type: "horizontal",
        orientation: "center",
        variant: "solid",
    },
})

export type DividerVariants = Exclude<RecipeVariants<typeof dividerCss>, undefined>

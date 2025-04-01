import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { recipe } from "@vanilla-extract/recipes"

export const textCss = recipe({
    base: {},
    variants: {
        type: {
            secondary: {
                color: token.colors.text.tertiary,
            },
            success: {
                color: token.colors.success.default,
            },
            warning: {
                color: token.colors.warning.default,
            },
            danger: {
                color: token.colors.danger.default,
            },
        },
        disabled: {
            true: {
                cursor: "not-allowed",
                userSelect: "none",
                color: token.colors.text.quaternary,
            },
            false: {},
        },
    },
    defaultVariants: {

    },
})

export type TextVariants = Exclude<RecipeVariants<typeof textCss>, undefined>

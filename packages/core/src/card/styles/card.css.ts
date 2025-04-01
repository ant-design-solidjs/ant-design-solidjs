import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { recipe } from "@vanilla-extract/recipes"
import { resetStyle } from "../../styles"

export const cardCss = recipe({
    base: [resetStyle, {
        position: "relative",
        background: token.colors.bg.container,
        borderRadius: token.borderRadius.lg,
    }],
    variants: {
        variant: {
            outlined: {
                border: `${token.line.width} ${token.line.type} ${token.colors.border.secondary}`,
            },
            borderless: {
                border: "none",
                boxShadow: token.boxShadow.tertiary,
            },
        },
        size: {
            small: {},
            middle: {},
            large: {},
        },
    },
    defaultVariants: {
        variant: "outlined",
    },
})

export type CardVariants = Exclude<RecipeVariants<typeof cardCss>, undefined>

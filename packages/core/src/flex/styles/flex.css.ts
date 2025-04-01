import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { recipe } from "@vanilla-extract/recipes"

export const flexCss = recipe({
    base: {
        display: "flex",
    },
    variants: {
        vertical: {
            true: { flexDirection: "column" },
            false: { flexDirection: "row" },
        },
        align: {
            "flex-start": { alignItems: "flex-start" },
            "center": { alignItems: "center" },
            "flex-end": { alignItems: "flex-end" },
        },
        justify: {
            "flex-start": { justifyContent: "flex-start" },
            "center": { justifyContent: "center" },
            "flex-end": { justifyContent: "flex-end" },
            "space-between": { justifyContent: "space-between" },
            "space-around": { justifyContent: "space-around" },
            "space-evenly": { justifyContent: "space-evenly" },
        },
        gap: {
            small: {
                gap: token.size.sm,
            },
            middle: {
                gap: token.size.md,
            },
            large: {
                gap: token.size.lg,
            },
        },
        wrap: {
            true: { flexWrap: "wrap" },
            false: { flexWrap: "nowrap" },
        },
    },
    defaultVariants: {
        vertical: false,
        wrap: false,
        align: "center",
        gap: "middle",
    },
})

export type FlexVariants = Exclude<RecipeVariants<typeof flexCss>, undefined>

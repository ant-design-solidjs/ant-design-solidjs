import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { recipe } from "@vanilla-extract/recipes"

export const spaceVariant = recipe({
    base: {
        display: "flex",
    },
    variants: {
        align: {
            start: { alignItems: "start" },
            center: { alignItems: "center" },
            end: { alignItems: "end" },
            baseline: { alignItems: "baseline" },
        },
        direction: {
            vertical: { flexDirection: "column" },
            horizontal: { flexDirection: "row" },
        },
        rowSize: {
            small: { rowGap: token.size.xs },
            middle: { rowGap: token.size.default },
            large: { rowGap: token.size.lg },
        },
        colSize: {
            small: { columnGap: token.size.xs },
            middle: { columnGap: token.size.default },
            large: { columnGap: token.size.lg },
        },
        block: {
            true: { width: "100%" },
            false: {},
        },
    },
    defaultVariants: {
        align: "center",
        direction: "horizontal",
    },
})

export type SpaceVariants = Exclude<RecipeVariants<typeof spaceVariant>, undefined>

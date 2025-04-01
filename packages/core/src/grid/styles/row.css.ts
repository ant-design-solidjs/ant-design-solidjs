import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { recipe } from "@vanilla-extract/recipes"

export const rowCss = recipe({
    base: {
        display: "flex",
        minWidth: 0,
        flexFlow: "row",
        fontFamily: token.fontFamily,
        fontSize: token.fontSize.default,
        boxSizing: "border-box",
    },
    variants: {
        align: {
            top: {
                alignItems: "flex-start",
            },
            middle: {
                alignItems: "center",
            },
            bottom: {
                alignItems: "flex-end",
            },
            stretch: {
                alignItems: "stretch",
            },
        },
        justify: {
            "start": {
                justifyContent: "flex-start",
            },
            "end": {
                justifyContent: "flex-end",
            },
            "center": {
                justifyContent: "center",
            },
            "space-around": {
                justifyContent: "space-around",
            },
            "space-between": {
                justifyContent: "space-between",
            },
            "space-evenly": {
                justifyContent: "space-evenly",
            },
        },
        wrap: {
            true: { flexWrap: "wrap" },
            false: { flexWrap: "nowrap" },
        },
    },
    defaultVariants: {
        align: "top",
        justify: "start",
        wrap: true,
    },
})

export type RowVariants = Exclude<RecipeVariants<typeof rowCss>, undefined>

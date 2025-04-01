import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { globalStyle, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { recipe } from "@vanilla-extract/recipes"
import { resetStyle } from "../../styles"
import { handleCss, loadingIconCss } from "./handle.css"
import { handleBg, handleShadow, handleSize, height, trackPadding } from "./var.css"

const disableCss = style({
    cursor: "not-allowed",
    opacity: token.opacityLoading,
})

export const switchCss = recipe({
    base: [resetStyle, {
        vars: {
            [trackPadding]: "2px",
            // [heightSM]: calc(token.height.middle).divide(2).toString(),

            // [handleSizeSM]: calc(heightSM).subtract(calc(trackPadding).multiply(2)).toString(),
            [handleBg]: "#fff",
            [handleShadow]: "0 2px 4px 0 rgba(0,35,11,0.2)",
        },
        position: "relative",
        display: "inline-block",
        verticalAlign: "middle",
        background: token.colors.text.quaternary,
        border: 0,
        borderRadius: "100px",
        transition: `all ${token.motion.mid}`,
        userSelect: "none",
        margin: 0,
        padding: 0,
        height,
        lineHeight: height,
    }],
    variants: {
        checked: {
            false: {},
            true: {
                background: token.colors.primary.default,
            },
        },
        loading: {
            true: [disableCss],
            false: {},
        },
        disabled: {
            true: [disableCss],
            false: {},
        },
        size: {
            default: {
                vars: {
                    [height]: calc(token.fontSize.default).multiply(token.lineHeight.default).toString(),
                    [handleSize]: calc(height).subtract(calc(trackPadding).multiply(2)).toString(),
                },
                minWidth: calc(calc(handleSize).multiply(2)).add(calc(trackPadding).multiply(4)).toString(),
            },
            small: {
                vars: {
                    [height]: calc(token.height.middle).divide(2).toString(),
                    [handleSize]: calc(height).subtract(calc(trackPadding).multiply(2)).toString(),
                },
                minWidth: calc(calc(handleSize).multiply(2)).add(calc(trackPadding).multiply(2)).toString(),
            },
        },
    },
    defaultVariants: {
        checked: false,
        loading: false,
        disabled: false,
        size: "default",
    },
})

globalStyle(`${switchCss.classNames.variants.checked.true} ${handleCss}`, {
    insetInlineStart: calc("100%").subtract(calc(handleSize).add(trackPadding)).toString(),
})

globalStyle(`${switchCss.classNames.base}:not(${switchCss.classNames.variants.disabled.true}):not(${switchCss.classNames.variants.loading.true})`, {
    cursor: "pointer",
})

globalStyle(`${switchCss.classNames.variants.checked.true} ${loadingIconCss}`, {
    color: token.colors.primary.default,
})

globalStyle(`${switchCss.classNames.variants.size.small} ${loadingIconCss}`, {
    top: calc(calc(handleSize).subtract(calc(token.fontSize.icon).multiply(0.75))).divide(2).toString(),
    fontSize: calc(token.fontSize.icon).multiply(0.75).toString(),
})

export type SwitchRecipes = Exclude<RecipeVariants<typeof switchCss>, undefined>

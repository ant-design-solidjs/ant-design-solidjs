import { token } from "@ant-design-solidjs/theme"
import { recipe } from "@vanilla-extract/recipes"
import { titleToken } from "./vars.css"

export const titleCss = recipe({
    base: [{
        vars: {
            [titleToken.titleMarginTop]: "1.2em",
            [titleToken.titleMarginBottom]: "0.5em",
            [titleToken.headingFontWeight]: "600",
            [titleToken.heading1LineHeight]: token.lineHeight.heading.h1,
            [titleToken.heading1FontSize]: token.fontSize.heading.h1,
            [titleToken.heading2LineHeight]: token.lineHeight.heading.h2,
            [titleToken.heading2FontSize]: token.fontSize.heading.h2,
            [titleToken.heading3LineHeight]: token.lineHeight.heading.h3,
            [titleToken.heading3FontSize]: token.fontSize.heading.h3,
            [titleToken.heading4LineHeight]: token.lineHeight.heading.h4,
            [titleToken.heading4FontSize]: token.fontSize.heading.h4,
            [titleToken.heading5LineHeight]: token.lineHeight.heading.h5,
            [titleToken.heading5FontSize]: token.fontSize.heading.h5,
        },
        wordBreak: "break-word",
        marginBottom: titleToken.titleMarginBottom,
        color: token.colors.text.default,
        fontWeight: titleToken.headingFontWeight,
    }],
    variants: {
        level: {
            1: {
                lineHeight: titleToken.heading1LineHeight,
                fontSize: titleToken.heading1FontSize,
            },
            2: {
                lineHeight: titleToken.heading2LineHeight,
                fontSize: titleToken.heading2FontSize,
            },
            3: {
                lineHeight: titleToken.heading3LineHeight,
                fontSize: titleToken.heading3FontSize,
            },
            4: {
                lineHeight: titleToken.heading4LineHeight,
                fontSize: titleToken.heading4FontSize,
            },
            5: {
                lineHeight: titleToken.heading5LineHeight,
                fontSize: titleToken.heading5FontSize,
            },
        },
    },
    defaultVariants: {
        level: 1,
    },
})

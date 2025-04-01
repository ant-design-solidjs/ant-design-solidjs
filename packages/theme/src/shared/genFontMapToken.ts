import { token } from "../contracts"

export function genFontMapToken(fontSizePairs: Array<{ size: number, lineHeight: number }>): Record<string, string> {
    const fontSizes = fontSizePairs.map(pair => pair.size)
    const lineHeights = fontSizePairs.map(pair => pair.lineHeight)

    const fontSizeMD = fontSizes[1]
    const fontSizeSM = fontSizes[0]
    const fontSizeLG = fontSizes[2]
    const lineHeight = lineHeights[1]
    const lineHeightSM = lineHeights[0]
    const lineHeightLG = lineHeights[2]

    return {
        [token.linkDecoration]: "none",

        [token.fontSize.sm]: `${fontSizeSM}px`,
        [token.fontSize.default]: `${fontSizeMD}px`,
        [token.fontSize.lg]: `${fontSizeLG}px`,
        [token.fontSize.xl]: `${fontSizes[3]}px`,

        [token.fontSize.heading.h1]: `${fontSizes[6]}px`,
        [token.fontSize.heading.h2]: `${fontSizes[5]}px`,
        [token.fontSize.heading.h3]: `${fontSizes[4]}px`,
        [token.fontSize.heading.h4]: `${fontSizes[3]}px`,
        [token.fontSize.heading.h5]: `${fontSizes[2]}px`,

        [token.lineHeight.default]: `${lineHeight}`,
        [token.lineHeight.lg]: `${lineHeightLG}`,
        [token.lineHeight.sm]: `${lineHeightSM}`,

        [token.fontHeight.default]: `${Math.round(lineHeight * fontSizeMD)}px`,
        [token.fontHeight.lg]: `${Math.round(lineHeightLG * fontSizeLG)}px`,
        [token.fontHeight.sm]: `${Math.round(lineHeightSM * fontSizeSM)}px`,

        [token.lineHeight.heading.h1]: `${lineHeights[6]}`,
        [token.lineHeight.heading.h2]: `${lineHeights[5]}`,
        [token.lineHeight.heading.h3]: `${lineHeights[4]}`,
        [token.lineHeight.heading.h4]: `${lineHeights[3]}`,
        [token.lineHeight.heading.h5]: `${lineHeights[2]}`,

        [token.fontSize.icon]: token.fontSize.sm,

        [token.fontWeightStrong]: "600",
    }
}

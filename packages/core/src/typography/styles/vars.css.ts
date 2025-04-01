import { prefix } from "@ant-design-solidjs/theme"
import { createGlobalThemeContract } from "@vanilla-extract/css"

export const titleToken = createGlobalThemeContract({
    titleMarginTop: `${prefix}-title-margin-top`,
    titleMarginBottom: `${prefix}-title-margin-bottom`,
    headingFontWeight: `${prefix}-heading-font-weight`,
    heading1FontSize: `${prefix}-heading-1-font-size`,
    heading1LineHeight: `${prefix}-heading-1-line-height`,
    heading2FontSize: `${prefix}-heading-2-font-size`,
    heading2LineHeight: `${prefix}-heading-2-line-height`,
    heading3FontSize: `${prefix}-heading-3-font-size`,
    heading3LineHeight: `${prefix}-heading-3-line-height`,
    heading4FontSize: `${prefix}-heading-4-font-size`,
    heading4LineHeight: `${prefix}-heading-4-line-height`,
    heading5FontSize: `${prefix}-heading-5-font-size`,
    heading5LineHeight: `${prefix}-heading-5-line-height`,
    markColor: `${prefix}-mark-color`,
})

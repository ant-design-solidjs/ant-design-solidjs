import { prefix } from "@ant-design-solidjs/theme"
import { createGlobalThemeContract } from "@vanilla-extract/css"

export const cardVars = createGlobalThemeContract({
    bodyPadding: `${prefix}-card-body-padding`,
    headerHeight: `${prefix}-card-header-height`,
    headerPadding: `${prefix}-card-header-padding`,
    headerFontSize: `${prefix}-card-header-font-size`,
    headerBackground: `${prefix}-card-header-background`,
    extraColor: `${prefix}-card-extra-color`,
})

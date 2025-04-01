import { prefix } from "@ant-design-solidjs/theme"
import { createGlobalThemeContract } from "@vanilla-extract/css"

export const dividerVars = createGlobalThemeContract({
    orientationMargin: `${prefix}-orientation-margin`,
})

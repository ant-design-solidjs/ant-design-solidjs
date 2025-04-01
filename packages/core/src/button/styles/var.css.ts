import { prefix } from "@ant-design-solidjs/theme"
import { createGlobalThemeContract } from "@vanilla-extract/css"

export const buttonVars = createGlobalThemeContract({
    fontWeight: `${prefix}-btn-font-weight`,

    solid: {
        bg: `${prefix}-btn-solid-bg-color`,
        text: `${prefix}-btn-solid-text-color`,
    },

    primary: {
        text: `${prefix}-btn-primary-text-color`,
    },

    danger: {
        text: `${prefix}-btn-danger-text-color`,
    },
})

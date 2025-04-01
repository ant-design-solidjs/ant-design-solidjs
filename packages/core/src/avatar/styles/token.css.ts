import { prefix } from "@ant-design-solidjs/theme"
import { createGlobalThemeContract } from "@vanilla-extract/css"

export const avatarToken = createGlobalThemeContract({
    avatarContainerSize: `${prefix}-avatar-container-size`,
    avatarContainerSizeLg: `${prefix}-avatar-container-size-lg`,
    avatarContainerSizeSm: `${prefix}-avatar-container-size-sm`,
    avatarTextFontSize: `${prefix}-avatar-text-font-size`,
    avatarTextFontSizeLg: `${prefix}-avatar-text-font-size-lg`,
    avatarTextFontSizeSm: `${prefix}-avatar-text-font-size-sm`,
    avatarGroupSpace: `${prefix}-avatar-group-space`,
    avatarGroupOverlapping: `${prefix}-avatar-group-overlapping`,
    avatarGroupBorderColor: `${prefix}-avatar-group-border-color`,
})

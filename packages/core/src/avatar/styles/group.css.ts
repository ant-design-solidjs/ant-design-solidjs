import { token } from "@ant-design-solidjs/theme"
import { globalStyle, style } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { avatarCss } from "./avatar.css"
import { avatarToken } from "./token.css"

export const groupStyles = style({
    vars: {
        [avatarToken.avatarGroupOverlapping]: calc(token.size.xs).multiply(-1).toString(),
        [avatarToken.avatarGroupBorderColor]: token.colors.white,
    },
    display: "inline-flex",
})

globalStyle(`${groupStyles} >*:not(:first-child)`, {
    marginInlineStart: avatarToken.avatarGroupOverlapping,
})

globalStyle(`${groupStyles} ${avatarCss.classNames.base}`, {
    borderColor: avatarToken.avatarGroupBorderColor,
})

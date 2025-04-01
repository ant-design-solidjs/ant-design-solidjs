import { token } from "@ant-design-solidjs/theme/src"
import { style } from "@vanilla-extract/css"
import { groupTitleFontSize, groupTitleLineHeight } from "./var.css"

export const groupListCss = style({
    margin: 0,
    padding: 0,
})

export const groupTitle = style({
    padding: `${token.size.xs} ${token.size.default}`,
    fontSize: groupTitleFontSize,
    lineHeight: groupTitleLineHeight,
    transition: `all ${token.motion.slow}`,
    color: token.colors.text.description,
})

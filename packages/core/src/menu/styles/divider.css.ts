import { token } from "@ant-design-solidjs/theme/src"
import { style } from "@vanilla-extract/css"

export const dividerCss = style({
    overflow: "hidden",
    lineHeight: 0,
    borderColor: token.colors.split,
    borderStyle: token.line.type,
    borderWidth: 0,
    borderTopWidth: token.line.width,
    marginBlock: token.line.width,
    padding: 0,
})

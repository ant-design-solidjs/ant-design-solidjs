import { token } from "@ant-design-solidjs/theme/src"
import { style } from "@vanilla-extract/css"
import { resetStyle } from "../../styles"

export const groupCss = style([resetStyle, {
    display: "inline-flex",
    flexWrap: "wrap",
    columnGap: token.size.xs,
}])

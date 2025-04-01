import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { globalStyle } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import { resetStyle } from "../../styles"
import { avatarToken } from "./token.css"

export const avatarCss = recipe({
    base: [resetStyle, {
        vars: {
            [avatarToken.avatarContainerSizeSm]: token.height.small,
            [avatarToken.avatarContainerSize]: token.height.middle,
            [avatarToken.avatarContainerSizeLg]: token.height.large,
            [avatarToken.avatarTextFontSizeSm]: token.fontSize.default,
            [avatarToken.avatarTextFontSize]: "18px",
            [avatarToken.avatarTextFontSizeLg]: "24px",
        },
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textAlign: "center",
        verticalAlign: "middle",
        backgroundColor: token.colors.text.quaternary,
        border: `${token.line.width} ${token.line.type} transparent`,
        color: token.colors.white,
    }],
    variants: {
        size: {
            small: {
                width: avatarToken.avatarContainerSizeSm,
                height: avatarToken.avatarContainerSizeSm,
                fontSize: avatarToken.avatarTextFontSizeSm,
            },
            middle: {
                width: avatarToken.avatarContainerSize,
                height: avatarToken.avatarContainerSize,
                fontSize: avatarToken.avatarTextFontSize,
            },
            large: {
                width: avatarToken.avatarContainerSizeLg,
                height: avatarToken.avatarContainerSizeLg,
                fontSize: avatarToken.avatarTextFontSizeLg,
            },
        },
        shape: {
            circle: {
                borderRadius: "50%",
            },
            square: {
                borderRadius: token.borderRadius.default,
            },
        },
    },
    defaultVariants: {
        size: "middle",
        shape: "circle",
    },
})

export type AvatarVariants = Exclude<RecipeVariants<typeof avatarCss>, undefined>

globalStyle(`${avatarCss.classNames.base} > img`, {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
})

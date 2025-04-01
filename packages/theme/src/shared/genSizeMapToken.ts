import type { genSizes } from "./genFontSizes.ts"
import { token } from "../contracts"

export default function genSizeMapToken(sizes: ReturnType<typeof genSizes>) {
    return {
        [token.borderRadius.sm]: "4px",
        [token.borderRadius.default]: "6px",
        [token.borderRadius.lg]: "8px",

        [token.size.xxs]: `${sizes.sizeXXS}px`,
        [token.size.xs]: `${sizes.sizeXS}px`,
        [token.size.sm]: `${sizes.sizeSM}px`,
        [token.size.default]: `${sizes.size}px`,
        [token.size.md]: `${sizes.sizeMD}px`,
        [token.size.lg]: `${sizes.sizeLG}px`,
        [token.size.xl]: `${sizes.sizeXL}px`,
        [token.size.xxl]: `${sizes.sizeXXL}px`,
    }
}

import type { SeedToken } from "./interface/seeds.ts"
import { genColors } from "./shared/genColor.ts"
import { genCommonToken } from "./shared/genCommonToken.ts"
import { genControlHeight } from "./shared/genControlHeight.ts"
import { genFontMapToken } from "./shared/genFontMapToken.ts"
import genFontSizes, { genSizes } from "./shared/genFontSizes.ts"
import genSizeMapToken from "./shared/genSizeMapToken.ts"
import { defaultSeedToken } from "./vars.ts"

export function genVars(tokens: Partial<SeedToken> = {}): Record<string, string> {
    const token: SeedToken = { ...defaultSeedToken, ...tokens }

    const { controlHeight, sizeUnit, sizeStep } = token

    const fontSizePairs = genFontSizes(token.fontSize)

    const sizes = genSizes(sizeUnit, sizeStep)

    return {

        ...genCommonToken(token),

        ...genControlHeight(controlHeight),

        ...genColors(token),

        ...genFontMapToken(fontSizePairs),

        ...genSizeMapToken(sizes),
    }
}

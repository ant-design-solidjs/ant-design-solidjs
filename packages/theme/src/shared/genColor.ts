import type { SeedToken } from "../interface/seeds.ts"
import { FastColor } from "@ant-design/fast-color"
import { token } from "../contracts"
import { genAlphaColor, generateColorPalettes, getAlphaColor, getSolidColor } from "../utils/color.ts"

export function genColors(seeds: SeedToken) {
    const primaryColors = genPrimaryColor(seeds.colorPrimary)
    const dangerColors = genDangerColor(seeds.colorError)
    const successColors = genSuccessColor(seeds.colorSuccess)
    const warningColor = genWarningColor(seeds.colorWarning)
    const infoColor = genInfoColor(seeds.colorInfo)
    const palettes = generateNeutralColorPalettes(seeds?.colorBgBase, seeds?.colorTextBase)

    return {
        ...primaryColors,
        ...dangerColors,
        ...successColors,
        ...warningColor,
        ...infoColor,
        ...palettes,
        ...genLinkColor(seeds.colorInfo),
        [token.colors.split]: genAlphaColor(palettes[token.colors.border.secondary], palettes[token.colors.bg.container]),
        [token.colors.primary.outline]: genAlphaColor(primaryColors[token.colors.primary.bg], palettes[token.colors.bg.container]),
        [token.colors.danger.outline]: genAlphaColor(dangerColors[token.colors.danger.bg], dangerColors[token.colors.bg.container]),
    }
}

function genPrimaryColor(baseColorPrimary: string) {
    const primaryColors = generateColorPalettes(baseColorPrimary)

    return {
        [token.colors.primary.bg]: primaryColors[1],
        [token.colors.primary.bgHover]: primaryColors[2],
        [token.colors.primary.border]: primaryColors[3],
        [token.colors.primary.borderHover]: primaryColors[4],
        [token.colors.primary.hover]: primaryColors[5],
        [token.colors.primary.default]: primaryColors[6],
        [token.colors.primary.active]: primaryColors[7],
        [token.colors.primary.textHover]: primaryColors[8],
        [token.colors.primary.text]: primaryColors[9],
        [token.colors.primary.textActive]: primaryColors[10],
    }
}

function genDangerColor(baseColor: string) {
    const colors = generateColorPalettes(baseColor)

    const colorErrorBgFilledHover = new FastColor(colors[1])
        .mix(new FastColor(colors[3]), 50)
        .toHexString()

    return {
        [token.colors.danger.bg]: colors[1],
        [token.colors.danger.bgHover]: colors[2],
        [token.colors.danger.bgFilledHover]: colorErrorBgFilledHover,
        [token.colors.danger.bgActive]: colors[3],
        [token.colors.danger.border]: colors[3],
        [token.colors.danger.borderHover]: colors[4],
        [token.colors.danger.hover]: colors[5],
        [token.colors.danger.default]: colors[6],
        [token.colors.danger.active]: colors[7],
        [token.colors.danger.textHover]: colors[8],
        [token.colors.danger.text]: colors[9],
        [token.colors.danger.textActive]: colors[10],
    }
}

function genSuccessColor(baseColor: string) {
    const colors = generateColorPalettes(baseColor)

    return {
        [token.colors.success.bg]: colors[1],
        [token.colors.success.bgHover]: colors[2],
        [token.colors.success.border]: colors[3],
        [token.colors.success.borderHover]: colors[4],
        [token.colors.success.hover]: colors[4],
        [token.colors.success.default]: colors[6],
        [token.colors.success.active]: colors[7],
        [token.colors.success.textHover]: colors[8],
        [token.colors.success.text]: colors[9],
        [token.colors.success.textActive]: colors[10],
    }
}

function genInfoColor(baseColor: string) {
    const colors = generateColorPalettes(baseColor)

    return {
        [token.colors.info.bg]: colors[1],
        [token.colors.info.bgHover]: colors[2],
        [token.colors.info.border]: colors[3],
        [token.colors.info.borderHover]: colors[4],
        [token.colors.info.hover]: colors[4],
        [token.colors.info.default]: colors[6],
        [token.colors.info.active]: colors[7],
        [token.colors.info.textHover]: colors[8],
        [token.colors.info.text]: colors[9],
        [token.colors.info.textActive]: colors[10],
    }
}
function genWarningColor(baseColor: string) {
    const colors = generateColorPalettes(baseColor)

    return {
        [token.colors.warning.bg]: colors[1],
        [token.colors.warning.bgHover]: colors[2],
        [token.colors.warning.border]: colors[3],
        [token.colors.warning.borderHover]: colors[4],
        [token.colors.warning.hover]: colors[4],
        [token.colors.warning.default]: colors[6],
        [token.colors.warning.active]: colors[7],
        [token.colors.warning.textHover]: colors[8],
        [token.colors.warning.text]: colors[9],
        [token.colors.warning.textActive]: colors[10],
    }
}

function genLinkColor(baseColor: string) {
    const colors = generateColorPalettes(baseColor)

    return {
        [token.colors.link.hover]: colors[4],
        [token.colors.link.default]: colors[6],
        [token.colors.link.active]: colors[7],
    }
}

export function generateNeutralColorPalettes(bgBaseColor?: string, textBaseColor?: string) {
    const colorBgBase = bgBaseColor || "#fff"
    const colorTextBase = textBaseColor || "#000"

    return {
        colorBgBase,
        colorTextBase,

        [token.colors.text.default]: getAlphaColor(colorTextBase, 0.88),
        [token.colors.text.secondary]: getAlphaColor(colorTextBase, 0.65),
        [token.colors.text.tertiary]: getAlphaColor(colorTextBase, 0.45),
        [token.colors.text.quaternary]: getAlphaColor(colorTextBase, 0.25),
        [token.colors.text.description]: token.colors.text.tertiary,
        [token.colors.text.disabled]: token.colors.text.quaternary,

        [token.colors.fill.default]: getAlphaColor(colorTextBase, 0.15),
        [token.colors.fill.secondary]: getAlphaColor(colorTextBase, 0.06),
        [token.colors.fill.tertiary]: getAlphaColor(colorTextBase, 0.04),
        [token.colors.fill.quaternary]: getAlphaColor(colorTextBase, 0.02),

        [token.colors.bg.solid.default]: getAlphaColor(colorTextBase, 1),
        [token.colors.bg.solid.hover]: getAlphaColor(colorTextBase, 0.75),
        [token.colors.bg.solid.active]: getAlphaColor(colorTextBase, 0.95),

        [token.colors.bg.layout]: getSolidColor(colorBgBase, 4),
        [token.colors.bg.container]: getSolidColor(colorBgBase, 0),
        [token.colors.bg.containerDisabled]: token.colors.fill.tertiary,
        [token.colors.bg.elevated]: getSolidColor(colorBgBase, 0),
        [token.colors.bg.spotlight]: getAlphaColor(colorTextBase, 0.85),
        [token.colors.bg.blur]: "transparent",

        [token.colors.border.bg]: token.colors.bg.container,
        [token.colors.border.default]: getSolidColor(colorBgBase, 15),
        [token.colors.border.secondary]: getSolidColor(colorBgBase, 6),

        [token.colors.white]: "#fff",
    }
}

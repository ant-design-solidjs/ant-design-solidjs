import type { GenerateColorMap } from "../interface/ColorMap.ts"
import { generate } from "@ant-design/colors"
import { FastColor } from "@ant-design/fast-color"

function isStableColor(color: number): boolean {
    return color >= 0 && color <= 255
}

export function genAlphaColor(frontColor: string, backgroundColor: string): string {
    const { r: fR, g: fG, b: fB, a: originAlpha } = new FastColor(frontColor).toRgb()
    if (originAlpha < 1) {
        return frontColor
    }

    const { r: bR, g: bG, b: bB } = new FastColor(backgroundColor).toRgb()

    for (let fA = 0.01; fA <= 1; fA += 0.01) {
        const r = Math.round((fR - bR * (1 - fA)) / fA)
        const g = Math.round((fG - bG * (1 - fA)) / fA)
        const b = Math.round((fB - bB * (1 - fA)) / fA)
        if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
            return new FastColor({ r, g, b, a: Math.round(fA * 100) / 100 }).toRgbString()
        }
    }

    // fallback
    /* istanbul ignore next */
    return new FastColor({ r: fR, g: fG, b: fB, a: 1 }).toRgbString()
}

export function getAlphaColor(baseColor: string, alpha: number) {
    return new FastColor(baseColor).setA(alpha).toRgbString()
}

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
    const colors = generate(baseColor)
    return {
        1: colors[0],
        2: colors[1],
        3: colors[2],
        4: colors[3],
        5: colors[4],
        6: colors[5],
        7: colors[6],
        8: colors[4],
        9: colors[5],
        10: colors[6],
    }
}

export function getSolidColor(baseColor: string, brightness: number) {
    const instance = new FastColor(baseColor)
    return instance.darken(brightness).toHexString()
}

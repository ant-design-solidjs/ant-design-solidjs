export function getLineHeight(fontSize: number) {
    return (fontSize + 8) / fontSize
}

// https://zhuanlan.zhihu.com/p/32746810
export default function getFontSizes(base: number) {
    const fontSizes = Array.from({ length: 10 }).map((_, index) => {
        const i = index - 1
        const baseSize = base * Math.E ** (i / 5)
        const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize)

        // Convert to even
        return Math.floor(intSize / 2) * 2
    })

    fontSizes[1] = base

    return fontSizes.map(size => ({
        size,
        lineHeight: getLineHeight(size),
    }))
}

export function genSizes(sizeUnit: number, sizeStep: number) {
    return {
        sizeXXL: sizeUnit * (sizeStep + 8), // 48
        sizeXL: sizeUnit * (sizeStep + 4), // 32
        sizeLG: sizeUnit * (sizeStep + 2), // 24
        sizeMD: sizeUnit * (sizeStep + 1), // 20
        sizeMS: sizeUnit * sizeStep, // 16
        size: sizeUnit * sizeStep, // 16
        sizeSM: sizeUnit * (sizeStep - 1), // 12
        sizeXS: sizeUnit * (sizeStep - 2), // 8
        sizeXXS: sizeUnit * (sizeStep - 3), // 4
    }
}

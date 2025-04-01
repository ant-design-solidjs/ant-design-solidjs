import type { SeedToken } from "../interface/seeds.ts"
import { token } from "../contracts"

export function genCommonToken(tokens: SeedToken): Record<string, string> {
    const {
        lineType,
        lineWidth,
        motionBase,
        motionUnit,
        motionEaseOutBack,
        motionEaseOutCirc,
        motionEaseInOutCirc,
        motionEaseOut,
        motionEaseInOut,
        motionEaseInQuint,
        motionEaseInBack,
        motionEaseOutQuint,
        fontFamily,
        fontFamilyCode,
    } = tokens

    return {
        [token.fontFamily]: fontFamily,
        [token.fontFamilyCode]: fontFamilyCode,

        [token.line.width]: `${lineWidth}px`,
        [token.line.type]: lineType,

        [token.motion.unit]: `${motionUnit}`,
        [token.motion.base]: `${motionBase}`,

        [token.motion.fast]: `${(motionBase + motionUnit).toFixed(1)}s`,
        [token.motion.mid]: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
        [token.motion.slow]: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

        [token.motion.easeOutCirc]: motionEaseOutCirc,
        [token.motion.easeInOutCirc]: motionEaseInOutCirc,
        [token.motion.easeOut]: motionEaseOut,
        [token.motion.easeInOut]: motionEaseInOut,
        [token.motion.easeOutBack]: motionEaseOutBack,
        [token.motion.easeInBack]: motionEaseInBack,
        [token.motion.easeOutQuint]: motionEaseOutQuint,
        [token.motion.easeInQuint]: motionEaseInQuint,

        // line
        [token.line.widthBold]: `${lineWidth + 1}px`,
        [token.opacityLoading]: "0.65",

        [token.boxShadow.default]: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
        [token.boxShadow.secondary]: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
        [token.boxShadow.tertiary]: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    }
}

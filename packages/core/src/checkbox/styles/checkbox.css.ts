import { token } from "@ant-design-solidjs/theme/src"
import { globalStyle, style } from "@vanilla-extract/css"
import { resetStyle } from "../../styles"

export const wrapperCss = style([resetStyle, {
    display: "inline-flex",
    alignItems: "baseline",
    cursor: "pointer",
    selectors: {
        "&:after": {
            content: "\\a0",
            overflow: "hidden",
            width: 0,
            display: "inline-block",
        },
    },
}])

export const checkboxCss = style([resetStyle, {
    lineHeight: 1,
    position: "relative",
    whiteSpace: "nowrap",
    cursor: "pointer",
    borderRadius: token.borderRadius.sm,
    alignSelf: "center",
}])

globalStyle(`${checkboxCss}+span`, {
    paddingInlineStart: token.size.xs,
    paddingInlineEnd: token.size.xs,
})

export const checkboxInputCss = style({
    position: "absolute",
    inset: 0,
    zIndex: 1,
    cursor: "pointer",
    opacity: 0,
    margin: 0,
})

export const checkboxInnerCss = style({
    boxSizing: "border-box",
    display: "block",
    width: token.control.interactive,
    height: token.control.interactive,
    direction: "ltr",
    backgroundColor: token.colors.bg.container,
    border: `${token.line.width} ${token.line.type} ${token.colors.border.default}`,
    borderRadius: token.borderRadius.sm,
    borderCollapse: "separate",
    transition: `all ${token.motion.slow}`,
    selectors: {
        "&:after": {
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            insetInlineStart: "25%",
            display: "table",
            width: `calc(${token.control.interactive} / 14* 5)`,
            height: `calc(${token.control.interactive} / 14* 8)`,
            border: `${token.line.widthBold} solid #fff`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%, -50%)",
            opacity: 0,
            content: "",
            transition: `all ${token.motion.fast} ${token.motion.easeInBack}, opacity ${token.motion.fast}`,
        },
    },
})

export const checkboxLabelCss = style({

})

export const checkedCss = style({})

globalStyle(`${checkedCss} ${checkboxInnerCss}`, {
    backgroundColor: token.colors.primary.default,
    borderColor: token.colors.primary.default,
})

globalStyle(`${checkedCss} ${checkboxInnerCss}:after`, {
    opacity: 1,
    transform: "rotate(45deg) scale(1) translate(-50%, -50%)",
    transition: `all ${token.motion.mid} ${token.motion.easeOutBack} ${token.motion.fast}`,
})

export const disabledCss = style({
    cursor: "not-allowed",
})

globalStyle(`${disabledCss}+span`, {
    color: token.colors.text.disabled,
})

globalStyle(`${disabledCss} ${checkboxInputCss}`, {
    cursor: "not-allowed",
    pointerEvents: "none",
})

globalStyle(`${disabledCss} ${checkboxInnerCss}`, {
    backgroundColor: token.colors.bg.containerDisabled,
    borderColor: token.colors.border.default,
})

globalStyle(`${disabledCss} ${checkboxInnerCss}:after`, {
    borderColor: token.colors.text.disabled,
})

export const indeterminateCss = style({
})

globalStyle(`${indeterminateCss} ${checkboxInnerCss}:after`, {
    top: "50%",
    insetInlineStart: "50%",
    width: ` calc(${token.fontSize.lg} / 2)`,
    height: ` calc(${token.fontSize.lg} / 2)`,
    backgroundColor: token.colors.primary.default,
    border: 0,
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 1,
    content: "",
})

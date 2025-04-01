import type { MaybeAccessor } from "@solid-primitives/utils"
import type { ComponentProps, JSX } from "solid-js"
import type { SizeType } from "../config-provider"
import type { AvatarVariants } from "./styles/avatar.css"
import { combineStyle } from "@solid-primitives/props"
import { useWindowSize } from "@solid-primitives/resize-observer"
import { access } from "@solid-primitives/utils"
import { clsx } from "clsx"
import { createEffect, createMemo, createSignal, Show, useContext } from "solid-js"
import { unit } from "../utils"
import { avatarGroupContext } from "./context"
import { avatarCss } from "./styles/avatar.css"

export interface AvatarProps extends ComponentProps<"span"> {
    size?: MaybeAccessor<SizeType | number>
    shape?: MaybeAccessor<AvatarVariants["shape"]>
    icon?: JSX.Element
    src?: MaybeAccessor<JSX.Element>
    gap?: MaybeAccessor<number>
}

export function Avatar({ size, icon, shape, children, gap, src, ...spanProps }: AvatarProps) {
    const groupProps = useContext(avatarGroupContext)
    const [scale, setScale] = createSignal(1)

    let [avatarChildrenRef, setAvatarChildrenRef] = createSignal<HTMLSpanElement | undefined>(undefined)
    let [avatarNodeRef, setAvatarNodeRef] = createSignal<HTMLSpanElement | undefined>(undefined)
    const windowSize = useWindowSize()
    const setScaleParam = () => {
        const avatarRef = avatarChildrenRef()
        const nodeRef = avatarNodeRef()
        if (!avatarRef || !nodeRef) {
            return
        }
        const childrenWidth = avatarRef.offsetWidth // offsetWidth avoid affecting be transform scale
        const nodeWidth = nodeRef.offsetWidth
        // denominator is 0 is no meaning
        if (childrenWidth !== 0 && nodeWidth !== 0) {
            const gapValue = access(gap) || 4
            if (gapValue * 2 < nodeWidth) {
                setScale(nodeWidth - gapValue * 2 < childrenWidth ? (nodeWidth - gapValue * 2) / childrenWidth : 1)
            }
        }
    }
    createEffect(() => {
        // eslint-disable-next-line ts/no-unused-expressions
        windowSize.width
        setScaleParam()
    })

    const classes = createMemo(() => {
        const sizeValue = access(size)
        const groupSizeValue = access(groupProps.size)
        const variants: AvatarVariants = {
            shape: access(shape) || access(groupProps.shape),
        }

        if (groupSizeValue && typeof groupSizeValue !== "number") {
            variants.size = groupSizeValue
        }

        if (sizeValue && typeof sizeValue !== "number") {
            variants.size = sizeValue
        }

        return clsx(avatarCss(variants), spanProps.class)
    })

    const styles = createMemo<JSX.CSSProperties>(() => {
        const sizeValue = access(size)
        const groupSizeValue = access(groupProps.size)
        let style: JSX.CSSProperties = {}
        if (typeof groupSizeValue === "number") {
            style = { ...{
                "width": unit(groupSizeValue),
                "height": unit(groupSizeValue),
                "font-size": unit(groupSizeValue && (icon || children) ? groupSizeValue / 2 : 18),
            } }
        }
        if (typeof sizeValue === "number") {
            style = { ...{
                "width": unit(sizeValue),
                "height": unit(sizeValue),
                "font-size": unit(sizeValue && (icon || children) ? sizeValue / 2 : 18),
            } }
        }
        if (access(src)) {
            style.background = "transparent"
        }
        return style
    })

    const srcNode = createMemo(() => {
        const srcValue = access(src)
        return typeof srcValue === "string" ? <img src={srcValue} alt="" /> : srcValue
    })

    return (
        <>
            <span
                {...spanProps}
                class={classes()}
                style={combineStyle(spanProps.style, styles())}
                ref={setAvatarNodeRef}
            >
                <Show when={!src} fallback={srcNode()}>
                    <span ref={setAvatarChildrenRef} style={{ transform: `scale(${scale()})` }}>
                        <Show when={!children} fallback={children}>
                            {icon}
                        </Show>
                    </span>
                </Show>
            </span>
        </>
    )
}

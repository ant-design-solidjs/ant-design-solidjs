import type { MaybeAccessor } from "@solid-primitives/utils"
import type { ComponentProps, JSX, ParentProps } from "solid-js"
import { FileTextOutlined } from "@ant-design-solidjs/icons"
import { combineStyle } from "@solid-primitives/props"
import { resolveElements } from "@solid-primitives/refs"
import { access } from "@solid-primitives/utils"
import { createMemo, Show } from "solid-js"
import { unit } from "../utils"
import { floatButtonBodyCss, floatButtonContent, floatButtonCss, floatButtonIconCss } from "./styles/float-button.css"

export type FloatButtonType = "default" | "primary"
export type FloatButtonShape = "circle" | "square"

export interface FloatButtonProps extends ParentProps<Omit<ComponentProps<"button">, "size">> {
    /** 按钮变体类型 */
    variant?: MaybeAccessor<FloatButtonType>
    /** 按钮图标 */
    icon?: JSX.Element
    /** 按钮位置偏移量，可以是单个数字或者 [right, bottom] 数组 */
    offset?: MaybeAccessor<number | [number, number]>
    /** 按钮形状 */
    shape?: MaybeAccessor<FloatButtonShape>
    /** 描述文本 */
    description?: MaybeAccessor<string>
}

export function FloatButton({
    children,
    variant,
    icon = <FileTextOutlined />,
    description,
    offset,
    shape,
    style,
    title,
    ...rest
}: FloatButtonProps) {
    const styles = createMemo<JSX.CSSProperties>(() => {
        const offsetValue = access(offset)
        if (!offsetValue)
            return {}

        if (typeof offsetValue === "number") {
            return {
                "inset-inline-end": unit(offsetValue),
                "inset-block-end": unit(offsetValue),
            }
        }

        return {
            "inset-inline-end": unit(offsetValue[0]),
            "inset-block-end": unit(offsetValue[1]),
        }
    })

    return (
        <button
            class={floatButtonCss({
                variant: access(variant),
                shape: access(shape),
            })}
            style={combineStyle(style, styles())}
            title={title ?? access(description)}
            aria-label={access(description)}
            {...rest}
        >
            <div class={floatButtonBodyCss}>
                <Show when={!children} fallback={children}>
                    <div class={floatButtonContent}>
                        <WithIcon icon={icon} />
                        <Show when={access(description)}>
                            <span class="float-button-description">{access(description)}</span>
                        </Show>
                    </div>
                </Show>
            </div>
        </button>
    )
}

function WithIcon({ icon }: { icon: JSX.Element }) {
    const child = resolveElements(() => icon)

    child.toArray().forEach((ele) => {
        if (ele.classList.contains("anticon")) {
            ele.classList.add(floatButtonIconCss)
        }
    })

    return <>{child()}</>
}

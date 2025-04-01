import type { ComponentProps, JSX } from "solid-js"
import type { SwitchRecipes } from "./styles/switch.css"
import { LoadingOutlined } from "@ant-design-solidjs/icons"
import { clsx } from "clsx"
import { createMemo, mergeProps, Show, splitProps } from "solid-js"
import { createControllableSignal } from "../primitives/controlable-signal"
import { handleCss, loadingIconCss } from "./styles/handle.css"
import { innerChecked, innerChildren, innerCss, innerUnchecked } from "./styles/inner.css"
import { switchCss } from "./styles/switch.css"

export interface SwitchProps extends Omit<ComponentProps<"button">, "onChange">, SwitchRecipes {
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    checkedChildren?: JSX.Element
    unCheckedChildren?: JSX.Element
}

export function Switch(_props: SwitchProps) {
    const props = mergeProps({}, _props)
    const [local, rest] = splitProps(props, ["checked", "defaultChecked", "onChange", "disabled", "loading", "size", "checkedChildren", "unCheckedChildren"])

    const [checked, setChecked] = createControllableSignal({
        onChange: props.onChange,
        defaultValue: () => local.defaultChecked,
    })

    const handleClick = () => {
        setChecked(prev => !prev)
    }

    const disabled = createMemo(() => {
        return local.disabled || local.loading
    })

    return (
        <button
            {...rest}
            type="button"
            role="switch"
            class={switchCss({
                checked: checked(),
                disabled: local.disabled,
                loading: local.loading,
                size: local.size,
            })}
            onClick={handleClick}
            disabled={disabled()}
            aria-checked={checked()}
        >
            <div class={handleCss}>
                <Show when={local.loading}>
                    <LoadingOutlined class={loadingIconCss} />
                </Show>
            </div>
            <div class={innerCss}>
                <Show when={local.checkedChildren}>
                    <div class={clsx(innerChildren, innerChecked)}>{local.checkedChildren}</div>
                </Show>
                <Show when={local.unCheckedChildren}>
                    <div class={clsx(innerChildren, innerUnchecked)}>{local.unCheckedChildren}</div>
                </Show>
            </div>
        </button>
    )
}

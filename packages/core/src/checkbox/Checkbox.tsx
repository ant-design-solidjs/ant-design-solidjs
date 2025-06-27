import type { ComponentProps, JSX } from "solid-js"
import { clsx } from "clsx"
import { createMemo, mergeProps, splitProps, useContext } from "solid-js"
import { DisabledContext } from "../config-provider/contexts/DisableContext"
import { createControllableSignal } from "../primitives/controlable-signal"
import { GroupContext } from "./GroupContext"
import {
    checkboxCss,
    checkboxInnerCss,
    checkboxInputCss,
    checkboxLabelCss,
    checkedCss,
    disabledCss,
    indeterminateCss,
    wrapperCss,
} from "./styles/checkbox.css"

export interface CheckboxProps extends Omit<ComponentProps<"input">, "onChange"> {
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    indeterminate?: boolean
    onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>
    value?: any
}

export function Checkbox(_props: CheckboxProps) {
    const props = mergeProps({ }, _props)
    const [local, rest] = splitProps(props, ["checked", "defaultChecked", "indeterminate", "onChange", "disabled", "children", "indeterminate"])

    const [checked, setChecked] = createControllableSignal({
        value: () => local.checked,
        defaultValue: () => local.defaultChecked,
    })

    const { toggleOption, disabled } = useContext(GroupContext)
    const handleCheckedChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (e) => {
        const newChecked = e.target.checked
        local.onChange && local.onChange(e)
        setChecked(newChecked)
        toggleOption && toggleOption({ label: local.children, value: rest.value })
    }

    const contextDisabled = useContext(DisabledContext)
    const memDisabled = createMemo(() => {
        return (disabled || local.disabled) ?? contextDisabled
    })

    return (
        <label class={wrapperCss}>
            <span
                class={clsx(
                    checkboxCss,
                    checked() && checkedCss,
                    memDisabled() && disabledCss,
                    local.indeterminate && indeterminateCss,
                )}
            >
                <input
                    type="checkbox"
                    class={checkboxInputCss}
                    onChange={handleCheckedChange}
                    checked={checked()}
                    disabled={memDisabled()}
                />
                <span class={checkboxInnerCss} />
            </span>
            <span class={checkboxLabelCss}>
                {local.children}
            </span>
        </label>
    )
}

import type { JSX } from "solid-js"
import type { IGroupContext } from "./GroupContext"
import { createMemo, For, Show, splitProps } from "solid-js"
import { createControllableSignal } from "../primitives/controlable-signal"
import { Checkbox } from "./Checkbox"
import { GroupContext } from "./GroupContext"
import { groupCss } from "./styles/group.css"

export interface CheckboxOptionType<T = any> {
    label: JSX.Element
    value: T
    style?: JSX.CSSProperties
    disabled?: boolean
    title?: string
    id?: string
    onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>
    required?: boolean
}

export interface AbstractCheckboxGroupProps<T = any> {
    prefixCls?: string
    class?: string
    rootClass?: string
    options?: (CheckboxOptionType<T> | string | number)[]
    disabled?: boolean
    style?: JSX.CSSProperties
}

export interface CheckboxGroupProps<T = any> extends AbstractCheckboxGroupProps<T> {
    name?: string
    defaultValue?: T[]
    value?: T[]
    onChange?: (checkedValue: T[]) => void
    children?: JSX.Element
}
type InternalCheckboxValueType = string | number | boolean

export function Group<T extends InternalCheckboxValueType = InternalCheckboxValueType>(_props: CheckboxGroupProps) {
    const [local, rest] = splitProps(_props, ["children", "options", "value", "defaultValue", "onChange", "name", "disabled"])

    const memoizedOptions = createMemo<CheckboxOptionType<T>[]>(() => {
        if (!local.options)
            return []
        return local.options.map<CheckboxOptionType<T>>((option: any) => {
            if (typeof option === "string" || typeof option === "number") {
                return { label: option, value: option }
            }
            return option
        })
    })

    const [value, setValue] = createControllableSignal({
        value: () => local.value,
        defaultValue: () => local.defaultValue,
        onChange: local.onChange,
    })

    const toggleOption: IGroupContext<T>["toggleOption"] = (option) => {
        const val = value() || []
        const optionIndex = val.indexOf(option.value)
        const newValue = [...val]
        if (optionIndex === -1) {
            newValue.push(option.value)
        }
        else {
            newValue.splice(optionIndex, 1)
        }
        if (!("value" in rest)) {
            setValue(newValue)
        }
        setValue(
            newValue
                // .filter((val) => registeredValues.includes(val))
                .sort((a, b) => {
                    const indexA = memoizedOptions().findIndex(opt => opt.value === a)
                    const indexB = memoizedOptions().findIndex(opt => opt.value === b)
                    return indexA - indexB
                }),
        )
    }

    return (
        <div class={groupCss} {...rest}>
            <GroupContext.Provider value={{ name: local.name, value, disabled: local.disabled, toggleOption }}>
                <Show when={!local.children} fallback={local.children}>
                    <For each={memoizedOptions()}>
                        {option => (
                            <Checkbox
                                value={option.value}
                                disabled={"disabled" in option ? option.disabled : local.disabled}
                                checked={value()?.includes(option.value)}
                                onChange={option.onChange}
                                style={option.style}
                                title={option.title}
                                id={option.id}
                                required={option.required}
                            >
                                {option.label}
                            </Checkbox>
                        )}
                    </For>
                </Show>
            </GroupContext.Provider>
        </div>
    )
}

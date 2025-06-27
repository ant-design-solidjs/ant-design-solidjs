import { Checkbox as InternalCheckbox } from "./Checkbox"
import { Group } from "./Group"

export type { CheckboxProps } from "./Checkbox"
export type { CheckboxGroupProps, CheckboxOptionType } from "./Group"

type CompoundedComponent = typeof InternalCheckbox & {
    Group: typeof Group
}

const Checkbox = InternalCheckbox as CompoundedComponent

Checkbox.Group = Group

export { Checkbox }

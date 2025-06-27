import type { Accessor } from "solid-js"
import type { CheckboxOptionType } from "./Group"
import { createContext } from "solid-js"

export interface IGroupContext<T = any> {
    name?: string
    toggleOption?: (option: CheckboxOptionType<T>) => void
    value?: Accessor<any>
    disabled?: boolean
    // registerValue: (val: T) => void
    // cancelValue: (val: T) => void
}

export const GroupContext = createContext<IGroupContext>({})

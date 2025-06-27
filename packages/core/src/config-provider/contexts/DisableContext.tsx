import type { JSX } from "solid-js"
import { createContext, useContext } from "solid-js"

export const DisabledContext = createContext<boolean>(false)

export interface DisabledContextProps {
    disabled?: boolean
    children?: JSX.Element
}

export function DisabledContextProvider(props: DisabledContextProps) {
    const originDisabled = useContext(DisabledContext)

    return (
        <DisabledContext.Provider value={props.disabled ?? originDisabled}>
            {props.children}
        </DisabledContext.Provider>
    )
}

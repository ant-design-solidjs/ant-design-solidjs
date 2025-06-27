import type { ThemeConfig } from "@ant-design-solidjs/theme"
import type { ParentProps } from "solid-js"
import { ConfigContext } from "./context"
import { DisabledContextProvider } from "./contexts/DisableContext"

export interface ConfigProviderProps {
    theme?: ThemeConfig
    componentDisabled?: boolean
}

export function ConfigProvider(props: ParentProps<ConfigProviderProps>) {
    return (
        <ConfigContext.Provider value={{}}>
            <DisabledContextProvider disabled={props.componentDisabled}>
                <div>
                    {props.children}
                </div>
            </DisabledContextProvider>
        </ConfigContext.Provider>
    )
}

import type { ThemeConfig } from "@ant-design-solidjs/theme"
import type { ParentProps } from "solid-js"
import { ConfigContext } from "./context"

export interface ConfigProviderProps {
    theme?: ThemeConfig
}

export function ConfigProvider({ children }: ParentProps<ConfigProviderProps>) {
    return (
        <ConfigContext.Provider value={{}}>
            <div>
                {children}
            </div>
        </ConfigContext.Provider>
    )
}

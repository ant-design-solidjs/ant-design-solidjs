import type { Accessor } from "solid-js"
import type { MenuKey } from "./Menu"
import { createContext } from "solid-js"

export interface MenuContext {
    openKeys: Accessor<MenuKey[] | undefined>
    openMenu: (key: MenuKey) => void
    selectedKeys: Accessor<MenuKey[] | undefined>
}

export const menuContext = createContext<MenuContext>({
    openKeys: () => [],
    openMenu: (key: MenuKey) => {},
    selectedKeys: () => [],
})

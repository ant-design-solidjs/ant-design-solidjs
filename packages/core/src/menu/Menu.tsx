import type { ComponentProps } from "solid-js"
import type { MenuVariants } from "./styles/menu.css"
import type { ItemType, MenuInfo } from "./types/menu"
import { clsx } from "clsx"
import { For, splitProps } from "solid-js"
import { createControllableSignal } from "../primitives/controlable-signal"
import { menuContext } from "./context"
import { MenuItem } from "./MenuItem"
import { menuCss } from "./styles/menu.css"

export type MenuKey = string | number

export interface MenuProps extends Omit<ComponentProps<"ul">, "onClick">, MenuVariants {
    items?: Array<ItemType>
    onClick?: (info: MenuInfo) => void
    selectedKeys?: MenuKey[]
    defaultSelectedKeys?: MenuKey[]
    onSelectedChange?: (selectedKeys: MenuKey[]) => void
    openKeys?: MenuKey[]
    defaultOpenKeys?: MenuKey[]
    onOpenChange?: (openKeys: MenuKey[]) => void
}

export function Menu(_props: MenuProps) {
    const [local, rest] = splitProps(_props, [
        "items",
        "onClick",
        "mode",
        "defaultSelectedKeys",
        "selectedKeys",
        "onSelectedChange",
        "openKeys",
        "defaultOpenKeys",
        "onOpenChange",
    ])

    const [selectedKeys, setSelectedKeys] = createControllableSignal({
        value: () => local.selectedKeys,
        defaultValue: () => local.defaultSelectedKeys,
        onChange: local.onSelectedChange,
    })

    const [openKeys, setOpenKeys] = createControllableSignal({
        value: () => local.openKeys,
        defaultValue: () => local.defaultOpenKeys,
        onChange: local.onOpenChange,
    })

    const openMenu = (key: MenuKey) => {
        setOpenKeys((prev) => {
            const index = prev.indexOf(key)
            if (index !== -1) {
                return prev.filter((_, i) => i !== index)
            }
            else {
                return [...prev, key]
            }
        })
    }

    return (
        <ul
            {...rest}
            class={clsx(rest.class, menuCss({ mode: local.mode }))}
        >
            <menuContext.Provider value={{ selectedKeys, openKeys, openMenu }}>
                <For each={local.items}>
                    {item => <MenuItem item={item} />}
                </For>
            </menuContext.Provider>
        </ul>
    )
}

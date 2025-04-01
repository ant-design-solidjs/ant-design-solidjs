import type { SubMenuType } from "./types/menu"
import { destructure } from "@solid-primitives/destructure"
import { createMemo, For, useContext } from "solid-js"
import { menuContext } from "./context"
import { MenuItem } from "./MenuItem"
import { menuItemCss, titleContentCss } from "./styles/item.css"
import { menuSubCss, submenuArrowCss, submenuCss, subMenuHidden, subMenuOpenCss } from "./styles/submenu.css"

export interface SubMenuProps {
    submenu: SubMenuType
}

export function SubMenu(props: SubMenuProps) {
    const { label, children, icon, key } = destructure(() => props.submenu, { lazy: true })

    const { openKeys, openMenu } = useContext(menuContext)
    const isOpen = createMemo(() => {
        const keys = openKeys()
        return keys && keys.includes(key())
    })

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation()
        openMenu(key())
    }

    return (
        <li
            classList={{ [subMenuOpenCss]: isOpen(), [submenuCss]: true }}
            role="none"
            onClick={handleClick}
        >
            <div role="menuitem" class={menuItemCss}>
                {icon()}
                <span class={titleContentCss}>{label()}</span>
                <i class={submenuArrowCss} />
            </div>

            <ul class={menuSubCss} classList={{ [subMenuHidden]: !isOpen() }}>
                <For each={children()}>
                    {item => <MenuItem item={item} />}
                </For>
            </ul>
        </li>
    )
}

import type { ItemType, MenuDividerType, MenuItemGroupType, MenuItemType, SubMenuType } from "./types/menu"
import { clsx } from "clsx"
import { children, createMemo, splitProps, useContext } from "solid-js"
import { menuContext } from "./context"
import { ItemDivider } from "./ItemDivider"
import { ItemGroup } from "./ItemGroup"
import { itemIconCss, itemSelectedCss, menuItemCss, titleContentCss } from "./styles/item.css"
import { SubMenu } from "./SubMenu"

export interface MenuItemProps {
    item: ItemType
}

export function MenuItem(_props: MenuItemProps) {
    const [local, rest] = splitProps(_props, ["item"])

    if (!local.item) {
        return null
    }

    const groupItem = local.item as MenuItemGroupType
    if (groupItem.type === "group") {
        return <ItemGroup {...rest} group={groupItem} />
    }

    const dividerItem = local.item as MenuDividerType
    if (dividerItem.type === "divider") {
        return <ItemDivider {...rest} divider={dividerItem} />
    }

    const subMenuItem = local.item as SubMenuType
    if (subMenuItem.type === "submenu" || (subMenuItem.children && subMenuItem.children.length > 0)) {
        return <SubMenu {...rest} submenu={subMenuItem} />
    }

    const { label, icon, key } = local.item as MenuItemType

    const resolvedIcon = children(() => icon).toArray().map((icon) => {
        if (icon instanceof HTMLElement && !icon.classList.contains(itemIconCss)) {
            icon.classList.add(itemIconCss)
        }
        return icon
    })

    const { selectedKeys } = useContext(menuContext)
    const selected = createMemo(() => {
        const keys = selectedKeys()
        return keys && keys.includes(key)
    })

    const handleClick = (event: MouseEvent) => {

    }

    return (
        <li
            class={clsx(menuItemCss, {
                [itemSelectedCss]: selected(),
            })}
            onClick={handleClick}
        >
            {resolvedIcon}
            <span class={titleContentCss}>{label}</span>
        </li>
    )
}

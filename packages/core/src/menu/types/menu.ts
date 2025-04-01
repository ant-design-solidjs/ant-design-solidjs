import type { JSX } from "solid-js"
import type { Key } from "../../primitives/type"

export interface MenuInfo {
    key: string
    keyPath: string[]
    domEvent: MouseEvent | KeyboardEvent
}

export interface ItemSharedProps {
    ref?: HTMLLIElement
    style?: JSX.CSSProperties
    class?: string
}

export interface RenderIconInfo {
    isSelected?: boolean
    isOpen?: boolean
    isSubMenu?: boolean
    disabled?: boolean
}
export type RenderIconType = JSX.Element | ((props: RenderIconInfo) => JSX.Element)

export type MenuHoverEventHandler = (info: { key: string, domEvent: MouseEvent }) => void
export interface SelectInfo extends MenuInfo {
    selectedKeys: string[]
}
export type SelectEventHandler = (info: SelectInfo) => void
export type MenuClickEventHandler = (info: MenuInfo) => void

export interface MenuItemType {
    type?: "item"
    key: Key
    icon?: JSX.Element
    title?: string
    label?: JSX.Element
    disabled?: boolean
    itemIcon?: RenderIconType
    extra?: JSX.Element
    onMouseEnter?: MenuHoverEventHandler
    onMouseLeave?: MenuHoverEventHandler
    onClick?: MenuClickEventHandler
}

export interface MenuTitleInfo {
    key: string
    domEvent: MouseEvent | KeyboardEvent
}

export interface SubMenuType<T extends MenuItemType = MenuItemType> extends ItemSharedProps {
    icon?: JSX.Element
    theme?: "dark" | "light"
    children: ItemType<T>[]
    type?: "submenu"
    label?: JSX.Element
    disabled?: boolean
    key: string
    rootClassName?: string
    itemIcon?: RenderIconType
    expandIcon?: RenderIconType
    onMouseEnter?: MenuHoverEventHandler
    onMouseLeave?: MenuHoverEventHandler
    popupClassName?: string
    popupOffset?: number[]
    popupStyle?: JSX.CSSProperties
    onClick?: MenuClickEventHandler
    onTitleClick?: (info: MenuTitleInfo) => void
    onTitleMouseEnter?: MenuHoverEventHandler
    onTitleMouseLeave?: MenuHoverEventHandler
}

export interface MenuItemGroupType<T extends MenuItemType = MenuItemType> extends ItemSharedProps {
    type: "group"
    label?: JSX.Element
    children?: ItemType<T>[]
    key?: Key
}

export interface MenuDividerType extends Omit<ItemSharedProps, "ref"> {
    type: "divider"
    dashed?: boolean
    key?: Key
}

export type ItemType<T extends MenuItemType = MenuItemType> =
  | T
  | SubMenuType<T>
  | MenuItemGroupType<T>
  | MenuDividerType
  | null

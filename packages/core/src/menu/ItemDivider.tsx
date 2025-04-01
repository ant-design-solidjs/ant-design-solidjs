import type { MenuDividerType } from "./types/menu"
import { dividerCss } from "./styles/divider.css"

export interface ItemDividerProps {
    divider: MenuDividerType
}

export function ItemDivider(props: ItemDividerProps) {
    return <li role="separator" class={dividerCss} />
}

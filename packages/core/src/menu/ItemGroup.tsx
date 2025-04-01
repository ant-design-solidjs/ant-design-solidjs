import type { MenuItemGroupType } from "./types/menu"
import { destructure } from "@solid-primitives/destructure"
import { For } from "solid-js"
import { MenuItem } from "./MenuItem"
import { groupListCss, groupTitle } from "./styles/group.css"

export interface ItemGroupProps {
    group: MenuItemGroupType
}
export function ItemGroup(props: ItemGroupProps) {
    const { label } = destructure(() => props.group, { lazy: true })

    return (
        <li>
            <div
                role="presentation"
                title={typeof label() === "string" ? label() as string : ""}
                class={groupTitle}
            >
                {label()}
            </div>

            <ul role="group" class={groupListCss}>
                <For each={props.group.children}>
                    {item => <MenuItem item={item} />}
                </For>
            </ul>
        </li>
    )
}

import type { MaybeAccessor } from "@solid-primitives/utils"
import type { JSX, ParentProps } from "solid-js"
import type { GroupProps } from "./context.tsx"
import { access } from "@solid-primitives/utils"
import { Show } from "solid-js"
import { Avatar } from "./Avatar"
import { avatarGroupContext } from "./context"
import { groupStyles } from "./styles/group.css"

export interface AvatarGroupProps extends GroupProps {
    more?: MaybeAccessor<number>
    moreStyle?: MaybeAccessor<JSX.CSSProperties>
}

export function Group(props: ParentProps<AvatarGroupProps>) {
    return (
        <avatarGroupContext.Provider value={props}>
            <div class={groupStyles}>
                {props.children}
                <Show when={access(props.more)}>
                    <Avatar style={access(props.moreStyle)}>{`+${access(props.more)}`}</Avatar>
                </Show>
            </div>
        </avatarGroupContext.Provider>
    )
}

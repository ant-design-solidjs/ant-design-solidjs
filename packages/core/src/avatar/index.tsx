import { Avatar as InternalAvatar } from "./Avatar"
import { Group as AvatarGroup } from "./Group"

type CompoundedComponent = typeof InternalAvatar & {
    Group: typeof AvatarGroup
}

const Avatar = InternalAvatar as CompoundedComponent

Avatar.Group = AvatarGroup

export { Avatar }

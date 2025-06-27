import { Badge as InternalBadge } from "./Badge"
import { Ribbon } from "./Ribbon"

type CompoundedComponent = typeof InternalBadge & {
    Ribbon: typeof Ribbon
}

export const Badge = InternalBadge as CompoundedComponent

Badge.Ribbon = Ribbon

import type { SpaceProps } from "./Space"
import { Compact } from "./Compact"
import { Space as InternalSpace } from "./Space"

export * from "./Space"

type CompoundedComponent = typeof InternalSpace & {
    Compact: typeof Compact
}

const Space = InternalSpace as CompoundedComponent

Space.Compact = Compact

export { Space }
export type { SpaceProps }

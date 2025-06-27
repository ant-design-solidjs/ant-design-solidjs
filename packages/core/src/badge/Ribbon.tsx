import type { JSX } from "solid-js"
import type { PresetColorType } from "../primitives/colors"
import type { LiteralUnion } from "../primitives/type"

type RibbonPlacement = "start" | "end"

export interface RibbonProps {
    class?: string
    style?: JSX.CSSProperties // style of ribbon element, not the wrapper
    text?: JSX.Element
    color?: LiteralUnion<PresetColorType>
    children?: JSX.Element
    placement?: RibbonPlacement
    rootClass?: string
}

export function Ribbon(props: RibbonProps) {
    return <span>1</span>
}

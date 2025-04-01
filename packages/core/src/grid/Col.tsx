import type { ComponentProps, JSX } from "solid-js"
import { combineStyle } from "@solid-primitives/props"
import { createMemo, mergeProps, splitProps, useContext } from "solid-js"
import { RowContext } from "./Row"

export interface ColProps extends ComponentProps<"div"> {
    span?: number
}

export function Col(_props: ColProps) {
    const props = mergeProps({ span: 1 }, _props)
    const [local, rest] = splitProps(props, ["children", "span"])
    const { colGap } = useContext(RowContext)

    const styles = createMemo<JSX.CSSProperties>(() => {
        const val = (local.span / 24) * 100
        const css: JSX.CSSProperties = {
            "display": "block",
            "flex": `0 0 ${val}%`,
            "max-width": `${val}%`,
        }
        const gap = colGap()
        if (!gap)
            return css

        css.padding = `0 ${gap / 2}px`
        return css
    })

    return (
        <div {...rest} style={combineStyle(styles(), rest.style)}>
            {local.children}
        </div>
    )
}

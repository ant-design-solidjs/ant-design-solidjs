import type { ComponentProps, ParentProps } from "solid-js"
import type { DividerVariants } from "./styles/divider.css"
import { combineStyle } from "@solid-primitives/props"
import { assignInlineVars } from "@vanilla-extract/dynamic"
import { createMemo, mergeProps, Show, splitProps } from "solid-js"
import { dividerCss, innerTextCss } from "./styles/divider.css"
import { dividerVars } from "./styles/vars.css"

export interface DividerProps extends ParentProps<ComponentProps<"div">>, Omit<DividerVariants, "orientation"> {
    orientation?: DividerVariants["orientation"] | "left" | "right"
    plain?: boolean
}

export function Divider(props: DividerProps) {
    const _props = mergeProps({ orientationMargin: 0.05 }, props)

    const [local, rest] = splitProps(_props, ["children", "type", "orientation", "plain", "orientationMargin", "variant"])

    const classes = createMemo(() => {
        let orientation = local.orientation === "left"
            ? "start"
            : (local.orientation === "right" ? "end" : local.orientation)

        return dividerCss({
            type: local.type,
            withText: !!local.children,
            variant: local.variant,
            orientation,
        })
    })

    const styles = createMemo(() => {
        return combineStyle(rest.style, assignInlineVars({
            [dividerVars.orientationMargin]: local.orientationMargin.toString(),
        }))
    })

    return (
        <div class={classes()} style={styles()} role="separator" {...rest}>
            <Show when={local.children}>
                <span class={innerTextCss({ plain: local.plain })}>{local.children}</span>
            </Show>
        </div>
    )
}

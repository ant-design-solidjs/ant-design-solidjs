import type { MaybeAccessor } from "@solid-primitives/utils"
import type { ComponentProps, JSX, ParentProps } from "solid-js"
import type { SizeType } from "../config-provider"
import type { SpaceVariants } from "./styles/style.css.ts"
import { combineStyle } from "@solid-primitives/props"
import { access } from "@solid-primitives/utils"
import { clsx } from "clsx"
import { createMemo } from "solid-js"
import { spaceVariant } from "./styles/style.css"

type Size = SizeType | number

export interface SpaceProps extends ParentProps<ComponentProps<"div">> {
    align?: MaybeAccessor<SpaceVariants["align"]>
    direction?: MaybeAccessor<SpaceVariants["direction"]>
    wrap?: MaybeAccessor<boolean>
    block?: MaybeAccessor<boolean>
    size?: MaybeAccessor<Size | Size[]>
}

export function Space({ children, align, direction, wrap, size = "middle", style, block, ...rest }: SpaceProps) {
    const styles = createMemo(() => {
        const styles: JSX.CSSProperties = {}
        if (access(wrap)) {
            styles["flex-wrap"] = "wrap"
        }

        const sizes = access(size)
        if (sizes) {
            if (Array.isArray(sizes)) {
                if (typeof sizes[1] === "number") {
                    styles["row-gap"] = `${sizes[0]}px`
                }
                if (typeof sizes[1] === "number") {
                    styles["column-gap"] = `${sizes[1]}px`
                }
            }
            if (Number.isInteger(sizes)) {
                styles.gap = `${sizes}px`
            }
        }

        return combineStyle(styles, style)
    })

    const classes = createMemo(() => {
        const variants: SpaceVariants = {
            align: access(align),
            direction: access(direction),
            block: access(block),
        }

        const sizes = access(size)
        if (typeof sizes === "string") {
            variants.rowSize = sizes
            variants.colSize = sizes
        }

        if (Array.isArray(sizes)) {
            if (typeof sizes[0] === "string") {
                variants.rowSize = sizes[0]
            }
            if (typeof sizes[1] === "string") {
                variants.colSize = sizes[1]
            }
        }

        return clsx(spaceVariant(variants), rest.class)
    })

    return (
        <div {...rest} style={styles()} class={classes()}>
            {children}
        </div>
    )
}

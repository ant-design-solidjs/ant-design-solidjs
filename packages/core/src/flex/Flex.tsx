import type { MaybeAccessor } from "@solid-primitives/utils"
import type { ComponentProps, ParentProps } from "solid-js"
import type { FlexVariants } from "./styles/flex.css.ts"
import { access } from "@solid-primitives/utils"
import { clsx } from "clsx"
import { flexCss } from "./styles/flex.css"

export interface FlexProps extends ComponentProps<"div"> {
    vertical?: MaybeAccessor<boolean>
    align?: MaybeAccessor<FlexVariants["align"]>
    justify?: MaybeAccessor<FlexVariants["justify"]>
    gap?: MaybeAccessor<FlexVariants["gap"]>
    wrap?: MaybeAccessor<boolean>
}

export function Flex({ children, vertical, align, justify, gap, wrap, ...divProps }: ParentProps<FlexProps>) {
    return (
        <div
            {...divProps}
            class={clsx(
                flexCss({
                    vertical: access(vertical),
                    align: access(align),
                    justify: access(justify),
                    gap: access(gap),
                    wrap: access(wrap),
                }),
                divProps.class,
            )}
        >
            {children}
        </div>
    )
}

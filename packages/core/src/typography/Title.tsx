import type { ComponentProps } from "solid-js"
import { clsx } from "clsx"
import { createMemo } from "solid-js"
import { Dynamic } from "solid-js/web"
import { titleCss } from "./styles/title.css"

export interface TitleProps extends ComponentProps<"h1"> {
    level?: 1 | 2 | 3 | 4 | 5
}

export function Title({ children, level = 1, ...props }: TitleProps) {
    const tagName = createMemo(() => {
        return `h${level}`
    })

    return (
        <Dynamic
            {...props}
            class={clsx(props.class, titleCss({ level }))}
            component={tagName()}
        >
            {children}
        </Dynamic>
    )
}

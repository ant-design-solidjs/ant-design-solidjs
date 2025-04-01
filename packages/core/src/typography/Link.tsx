import type { ComponentProps } from "solid-js"
import { clsx } from "clsx"
import { linkStyles } from "./styles/link.css"

export interface LinkProps extends ComponentProps<"a"> {

}

export function Link({ children, ...props }: LinkProps) {
    return <a {...props} class={clsx(linkStyles, props.class)}>{children}</a>
}

import type { ComponentProps } from "solid-js"
import { typographyCss } from "./styles/typography.css"

export interface TypographyProps extends ComponentProps<"article"> {

}

export function Typography({ children }: TypographyProps) {
    return <article class={typographyCss}>{children}</article>
}

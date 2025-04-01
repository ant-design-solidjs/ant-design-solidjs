import type { ComponentProps } from "solid-js"
import { typographyCss } from "./styles/typography.css"

export interface ParagraphProps extends ComponentProps<"p"> {

}

export function Paragraph({ children }: ParagraphProps) {
    return <div class={typographyCss}>{children}</div>
}

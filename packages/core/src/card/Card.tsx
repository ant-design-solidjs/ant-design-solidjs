import type { ComponentProps, JSX } from "solid-js"
import type { SizeType } from "../config-provider"
import type { CardVariants } from "./styles/card.css"
import { destructure } from "@solid-primitives/destructure"
import { access } from "@solid-primitives/utils"
import { Show, splitProps } from "solid-js"
import { bodyCss } from "./styles/body.css"
import { cardCss } from "./styles/card.css"
import { extraCss, headCss, titleCss, wrapperCss } from "./styles/head.css"

export interface CardProps extends Omit<ComponentProps<"div">, "title"> {
    variant?: CardVariants["variant"]
    title?: JSX.Element
    extra?: JSX.Element
    size?: SizeType
    block?: boolean
}

export function Card(_props: CardProps) {
    const [local, rest] = splitProps(_props, ["title", "variant", "extra", "children"])
    const { title, variant, extra, children } = destructure(local, { lazy: true })

    return (
        <div class={cardCss({ variant: access(variant) })} {...rest}>
            <Show when={title()}>
                <div class={headCss}>
                    <div class={wrapperCss}>
                        <div class={titleCss}>{title()}</div>
                        <div class={extraCss}>{extra()}</div>
                    </div>
                </div>
            </Show>

            <div class={bodyCss()}>
                {children()}
            </div>
        </div>
    )
}

import type { ComponentProps, JSX } from "solid-js"
import { badgeCountCss, badgeCss } from "./styles/badge.css"

export interface BadgeProps extends ComponentProps<"span"> {
    count?: JSX.Element
    showZero?: boolean
    dot?: boolean
    text?: JSX.Element
    status?: string
    size?: string
    offset?: [number, number]
    overflowCount?: number
}

export function Badge(props: BadgeProps) {
    return (
        <span class={badgeCss()}>
            {props.children}

            <sup class={badgeCountCss}>{props.count}</sup>
        </span>
    )
}

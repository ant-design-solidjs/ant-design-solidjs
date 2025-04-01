import type { ComponentProps, JSX, ParentProps } from "solid-js"
import type { ButtonVariants } from "./styles/button.css"
import { LoadingOutlined } from "@ant-design-solidjs/icons"
import { destructure } from "@solid-primitives/destructure"
import { clsx } from "clsx"
import { createMemo, mergeProps, Show, splitProps } from "solid-js"
import { buttonCss } from "./styles/button.css"

type HTMLButtonProps = Omit<ComponentProps<"button">, "color">
export interface ButtonProps extends ParentProps<HTMLButtonProps>, ButtonVariants {
    loadingIcon?: JSX.Element
    iconPosition?: "start" | "end"
    icon?: JSX.Element
}

export const xBtnSlug = "x-btn"

export function Button(_props: ButtonProps) {
    const props = mergeProps({ iconPosition: "start" }, _props)
    const [local, rest] = splitProps(props, ["children", "size", "color", "variant", "block", "loading", "loadingIcon", "iconPosition", "icon"])
    const { size, color, variant, block, loading, loadingIcon, iconPosition, children, icon } = destructure(local, { lazy: true })

    const classes = createMemo(() => {
        const onlyIcon = !children() && !!icon()
        return clsx(rest.class, buttonCss({
            size: size(),
            color: color(),
            variant: variant(),
            block: block(),
            loading: loading(),
            onlyIcon,
        }))
    })

    const loadIcon = createMemo(() => {
        return loadingIcon() || <LoadingOutlined />
    })

    const child = createMemo(() => {
        if (iconPosition() === "start") {
            return (
                <>
                    <Show when={loading()} fallback={icon()}>
                        {loadIcon()}
                    </Show>
                    {children()}
                </>
            )
        }
        return (
            <>
                {children()}
                <Show when={loading()} fallback={icon()}>
                    {loadIcon()}
                </Show>
            </>
        )
    })

    return (
        <button {...rest} class={classes()} {...{ [xBtnSlug]: "" }}>
            {child()}
        </button>
    )
}

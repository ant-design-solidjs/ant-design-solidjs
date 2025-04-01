import type { MaybeAccessor } from "@solid-primitives/utils"
import type { ComponentProps, ParentProps } from "solid-js"
import type { TextVariants } from "./styles/text.css"
import { access } from "@solid-primitives/utils"
import { clsx } from "clsx"
import { Show } from "solid-js"
import { textCss } from "./styles/text.css"
import { typographyCss } from "./styles/typography.css"

export interface TextProps extends ComponentProps<"span"> {
    type?: MaybeAccessor<TextVariants["type"]>
    disabled?: MaybeAccessor<boolean>
    mark?: MaybeAccessor<boolean>
    italic?: MaybeAccessor<boolean>
    keyboard?: MaybeAccessor<boolean>
    code?: MaybeAccessor<boolean>
    delete?: MaybeAccessor<boolean>
    underline?: MaybeAccessor<boolean>
    strong?: MaybeAccessor<boolean>
}
export function Text({ children, type, disabled, mark, italic, keyboard, code, delete: del, underline, strong, ...spanProps }: TextProps) {
    function WithItalic({ children }: ParentProps) {
        return (
            <Show when={access(italic)} fallback={children}>
                <i>
                    {children}
                </i>
            </Show>
        )
    }

    function WithKeyboard({ children }: ParentProps) {
        return (
            <Show when={access(keyboard)} fallback={children}>
                <kbd>
                    {children}
                </kbd>
            </Show>
        )
    }

    function WithMark({ children }: ParentProps) {
        return (
            <Show when={access(mark)} fallback={children}>
                <mark>
                    {children}
                </mark>
            </Show>
        )
    }

    function WithCode({ children }: ParentProps) {
        return (
            <Show when={access(code)} fallback={children}>
                <code>
                    {children}
                </code>
            </Show>
        )
    }

    function WithDelete({ children }: ParentProps) {
        return (
            <Show when={access(del)} fallback={children}>
                <del>
                    {children}
                </del>
            </Show>
        )
    }

    function WithUnderline({ children }: ParentProps) {
        return (
            <Show when={access(underline)} fallback={children}>
                <u>
                    {children}
                </u>
            </Show>
        )
    }

    function WithStrong({ children }: ParentProps) {
        return (
            <Show when={access(strong)} fallback={children}>
                <strong>
                    {children}
                </strong>
            </Show>
        )
    }

    return (
        <span
            {...spanProps}
            class={clsx(
                typographyCss,
                textCss({
                    type: access(type),
                    disabled: access(disabled),
                }),
            )}
        >
            <WithItalic>
                <WithKeyboard>
                    <WithMark>
                        <WithCode>
                            <WithDelete>
                                <WithUnderline>
                                    <WithStrong>
                                        {children}
                                    </WithStrong>
                                </WithUnderline>
                            </WithDelete>
                        </WithCode>
                    </WithMark>
                </WithKeyboard>
            </WithItalic>
        </span>
    )
}

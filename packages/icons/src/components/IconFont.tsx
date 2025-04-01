import type { Component } from 'solid-js'
import type { IconBaseProps } from './Icon'
import { Show, splitProps } from 'solid-js'
import Icon from './Icon'

const customCache = new Set<string>()

export interface CustomIconOptions {
    scriptUrl?: string | string[]
    extraCommonProps?: Record<string, unknown>
}

export interface IconFontProps<T extends string = string> extends IconBaseProps {
    type: T
}

function isValidCustomScriptUrl(scriptUrl: string): boolean {
    return Boolean(
        typeof scriptUrl === 'string'
        && scriptUrl.length
        && !customCache.has(scriptUrl),
    )
}

function createScriptUrlElements(scriptUrls: string[], index: number = 0): void {
    const currentScriptUrl = scriptUrls[index]
    if (isValidCustomScriptUrl(currentScriptUrl)) {
        const script = document.createElement('script')
        script.setAttribute('src', currentScriptUrl)
        script.setAttribute('data-namespace', currentScriptUrl)
        if (scriptUrls.length > index + 1) {
            script.onload = () => {
                createScriptUrlElements(scriptUrls, index + 1)
            }
            script.onerror = () => {
                createScriptUrlElements(scriptUrls, index + 1)
            }
        }
        customCache.add(currentScriptUrl)
        document.body.appendChild(script)
    }
}

export default function create<T extends string = string>(
    options: CustomIconOptions = {},
): Component<IconFontProps<T>> {
    const { scriptUrl, extraCommonProps = {} } = options

    /**
     * DOM API required.
     * Make sure in browser environment.
     * The Custom Icon will create a <script/>
     * that loads SVG symbols and insert the SVG Element into the document body.
     */
    if (
        scriptUrl
        && typeof document !== 'undefined'
        && typeof window !== 'undefined'
        && typeof document.createElement === 'function'
    ) {
        if (Array.isArray(scriptUrl)) {
            // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
            createScriptUrlElements(scriptUrl.reverse())
        }
        else {
            createScriptUrlElements([scriptUrl])
        }
    }

    const Iconfont = (_props: IconFontProps) => {
        const [local, restProps] = splitProps(_props, ['type', 'children'])

        return (
            <Icon {...extraCommonProps} {...restProps}>
                <Show when={local.type} fallback={local.children}>
                    {/* @ts-ignore */}
                    <use xlinkHref={`#${local.type}`} />
                </Show>
            </Icon>
        )
    }

    Iconfont.displayName = 'Iconfont'

    return Iconfont
}

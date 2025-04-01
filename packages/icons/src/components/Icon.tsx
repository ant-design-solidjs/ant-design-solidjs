import type { Component, ComponentProps, JSX } from 'solid-js'
import { mergeRefs } from '@solid-primitives/refs'
import classNames from 'clsx'

import { children, splitProps, useContext } from 'solid-js'
import { Dynamic } from 'solid-js/web'
// Seems this is used for iconFont
import { svgBaseProps, useInsertStyles, warning } from '../utils'
import Context from './Context'

export interface IconBaseProps extends ComponentProps<'span'> {
    spin?: boolean
    rotate?: number
}

export interface CustomIconComponentProps {
    width: string | number
    height: string | number
    fill?: string
    viewBox?: string
    className?: string
    style?: JSX.CSSProperties
}
export interface IconComponentProps extends IconBaseProps {
    viewBox?: string
    component?: Component<CustomIconComponentProps | JSX.SvgSVGAttributes<SVGSVGElement>>
    ariaLabel?: JSX.AriaAttributes['aria-label']
}

const Icon: Component<IconComponentProps> = (_props: IconComponentProps) => {
    const [local, restProps] = splitProps(_props, [
        'class',
        'component',
        'viewBox',
        'spin',
        'rotate',
        'tabIndex',
        'onClick',
        'children',
        'ref',
    ])

    let iconRef: HTMLElement = null

    warning(
        Boolean(local.component || local.children),
        'Should have `component` prop or `children`.',
    )

    useInsertStyles(iconRef)

    const { prefixCls = 'anticon', rootClassName } = useContext(Context)

    const classString = () => classNames(
        rootClassName,
        prefixCls,
        {
            [`${prefixCls}-spin`]: !!local.spin && !!local.component,
        },
        local.class,
    )

    const innerSvgProps = () => {
        const svgClassString = classNames({
            [`${prefixCls}-spin`]: !!local.spin,
        })

        const svgStyle = local.rotate
            ? {
                msTransform: `rotate(${local.rotate}deg)`,
                transform: `rotate(${local.rotate}deg)`,
            }
            : undefined

        const innerSvgProps: CustomIconComponentProps = {
            ...svgBaseProps,
            className: svgClassString,
            style: svgStyle,
            viewBox: local.viewBox,
        }

        if (!local.viewBox) {
            delete innerSvgProps.viewBox
        }
        return innerSvgProps
    }

    // component > children
    const renderInnerNode = () => {
        if (local.component) {
            return <Dynamic component={local.component} {...innerSvgProps()}>{local.children}</Dynamic>
        }

        if (local.children) {
            const child = children(() => local.children).toArray()

            warning(
                Boolean(local.viewBox)
                || (child.length === 1
                  && local.children
                // @ts-ignore
                  && (child[0] as HTMLElement).nodeName === 'use'),
                'Make sure that you provide correct `viewBox`'
                + ' prop (default `0 0 1024 1024`) to the icon.',
            )

            return (
                <svg {...innerSvgProps()} viewBox={local.viewBox}>
                    {local.children}
                </svg>
            )
        }

        return null
    }

    const iconTabIndex = () => {
        let iconTabIndex = local.tabIndex
        if (iconTabIndex === undefined && local.onClick) {
            iconTabIndex = -1
        }
        return iconTabIndex
    }

    return (
        <span
            role="img"
            {...restProps}
            ref={mergeRefs(iconRef, local.ref)}
            tabIndex={iconTabIndex()}
            onClick={local.onClick}
            class={classString()}
        >
            {renderInnerNode()}
        </span>
    )
}

export default Icon

// Seems this is used for iconFont
import clsx from 'clsx';
import { composeRef } from '@ant-design-solidjs/util';
import Context from './Context';

import { svgBaseProps, warning, useInsertStyles } from '../utils';
import { Component, JSX, splitProps, useContext, children as Children } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export interface IconBaseProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    spin?: boolean;
    rotate?: number;
}

export interface CustomIconComponentProps {
    width: string | number;
    height: string | number;
    fill: string;
    viewBox?: string;
    className?: string;
    style?: JSX.CSSProperties;
    ref?: any;
}
export interface IconComponentProps extends IconBaseProps {
    viewBox?: string;
    component?:
        | Component<CustomIconComponentProps | JSX.SvgSVGAttributes<SVGSVGElement>>
        | Component<CustomIconComponentProps>;
    ariaLabel?: JSX.AriaAttributes['aria-label'];
}

const Icon = (_props: IconComponentProps) => {
    const [props, restProps] = splitProps(_props, [
        'class',
        'component',
        'viewBox',
        'spin',
        'rotate',
        'tabIndex',
        'onClick',
        'children',
    ]);

    let iconRef: HTMLElement;
    const mergedRef = composeRef(iconRef, restProps.ref);

    warning(Boolean(props.component || props.component), 'Should have `component` prop or `children`.');

    useInsertStyles(iconRef);

    const { prefixCls = 'anticon', rootClass } = useContext(Context);

    // component > children
    const renderInnerNode = () => {
        const svgClassString = clsx({
            [`${prefixCls}-spin`]: !!props.spin,
        });

        const svgStyle = props.rotate
            ? {
                  msTransform: `rotate(${props.rotate}deg)`,
                  transform: `rotate(${props.rotate}deg)`,
              }
            : undefined;

        const innerSvgProps: CustomIconComponentProps = {
            ...svgBaseProps,
            className: svgClassString,
            style: svgStyle,
            viewBox: props.viewBox,
        };

        if (!props.viewBox) {
            delete innerSvgProps.viewBox;
        }

        if (props.component) {
            return (
                <Dynamic component={props.component} {...innerSvgProps}>
                    {props.children}
                </Dynamic>
            );
        }

        if (props.children) {
            // React.Children.only(children).type === 'use'
            warning(
                Boolean(props.viewBox) || (Children(() => props.children).toArray().length === 1 && !!props.component),
                'Make sure that you provide correct `viewBox`' + ' prop (default `0 0 1024 1024`) to the icon.',
            );

            return (
                <svg {...innerSvgProps} viewBox={props.viewBox}>
                    {props.children}
                </svg>
            );
        }

        return null;
    };

    return (
        <span
            role="img"
            {...restProps}
            ref={mergedRef}
            tabIndex={props.tabIndex === undefined && props.onClick ? -1 : props.tabIndex}
            onClick={props.onClick}
            class={clsx(rootClass, prefixCls, props.class)}
        >
            {renderInnerNode()}
        </span>
    );
};

Icon.displayName = 'AntdIcon';

export default Icon;

import clsx from 'clsx';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import { Component, createMemo, JSX, mergeProps, splitProps, useContext } from 'solid-js';

export interface DividerProps {
    prefixCls?: string;
    type?: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right' | 'center';
    orientationMargin?: string | number;
    class?: string;
    rootClass?: string;
    children?: JSX.Element;
    dashed?: boolean;
    style?: JSX.CSSProperties;
    plain?: boolean;
}

export const Divider: Component<DividerProps> = _props => {
    const { getPrefixCls, direction, divider } = useContext(ConfigContext);

    const [ps, restProps] = splitProps(_props, [
        'prefixCls',
        'type',
        'orientationMargin',
        'orientation',
        'class',
        'rootClass',
        'children',
        'dashed',
        'plain',
        'style',
    ]);

    const props = mergeProps({ type: 'horizontal', orientation: 'center' }, ps);

    const prefixCls = getPrefixCls('divider', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

    const classString = createMemo(() => {
        const orientationPrefix = props.orientation.length > 0 ? `-${props.orientation}` : props.orientation;
        const hasChildren = !!props.children;
        const hasCustomMarginLeft = props.orientation === 'left' && props.orientationMargin != null;
        const hasCustomMarginRight = props.orientation === 'right' && props.orientationMargin != null;
        return clsx(
            prefixCls,
            divider?.class,
            hashId,
            cssVarCls,
            `${prefixCls}-${props.type}`,
            {
                [`${prefixCls}-with-text`]: hasChildren,
                [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
                [`${prefixCls}-dashed`]: !!props.dashed,
                [`${prefixCls}-plain`]: !!props.plain,
                [`${prefixCls}-rtl`]: direction === 'rtl',
                [`${prefixCls}-no-default-orientation-margin-left`]: hasCustomMarginLeft,
                [`${prefixCls}-no-default-orientation-margin-right`]: hasCustomMarginRight,
            },
            props.class,
            props.rootClass,
        );
    });

    const memoizedOrientationMargin = createMemo<string | number>(() => {
        if (typeof props.orientationMargin === 'number') {
            return props.orientationMargin;
        }
        if (/^\d+$/.test(props.orientationMargin!)) {
            return Number(props.orientationMargin);
        }
        return props.orientationMargin!;
    });

    const innerStyle = createMemo<JSX.CSSProperties>(() => {
        const hasCustomMarginLeft = props.orientation === 'left' && props.orientationMargin != null;
        const hasCustomMarginRight = props.orientation === 'right' && props.orientationMargin != null;
        return {
            ...(hasCustomMarginLeft && { 'margin-left': `${memoizedOrientationMargin()}px` }),
            ...(hasCustomMarginRight && { 'margin-right': `${memoizedOrientationMargin()}px` }),
        };
    });

    // Warning children not work in vertical mode
    if (process.env.NODE_ENV !== 'production') {
        const warning = devUseWarning('Divider');

        warning(!props.children || props.type !== 'vertical', 'usage', '`children` not working in `vertical` mode.');
    }
    console.log(222);
    return wrapCSSVar(
        <div class={classString()} style={{ ...divider?.style, ...props.style }} {...restProps} role="separator">
            {props.children && props.type !== 'vertical' && (
                <span class={`${prefixCls}-inner-text`} style={innerStyle()}>
                    {props.children}
                </span>
            )}
        </div>,
    );
};

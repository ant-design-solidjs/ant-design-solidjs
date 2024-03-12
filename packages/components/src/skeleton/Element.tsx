import clsx from 'clsx';
import { Component, createMemo, JSX } from 'solid-js';

export interface SkeletonElementProps {
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    style?: JSX.CSSProperties;
    size?: 'large' | 'small' | 'default' | number;
    shape?: 'circle' | 'square' | 'round' | 'default';
    active?: boolean;
}

const Element: Component<SkeletonElementProps> = props => {
    const sizeStyle = createMemo<JSX.CSSProperties>(() =>
        typeof props.size === 'number'
            ? {
                  width: `${props.size}px`,
                  height: `${props.size}px`,
                  lineHeight: `${props.size}px`,
              }
            : {},
    );

    return (
        <span
            class={clsx(
                props.prefixCls,
                clsx({
                    [`${props.prefixCls}-lg`]: props.size === 'large',
                    [`${props.prefixCls}-sm`]: props.size === 'small',
                }),
                clsx({
                    [`${props.prefixCls}-circle`]: props.shape === 'circle',
                    [`${props.prefixCls}-square`]: props.shape === 'square',
                    [`${props.prefixCls}-round`]: props.shape === 'round',
                }),
                props.class,
            )}
            style={{ ...sizeStyle(), ...props.style }}
        />
    );
};

export default Element;

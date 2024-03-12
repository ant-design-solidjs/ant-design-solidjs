import clsx from 'clsx';
import { Component, JSX } from 'solid-js';

export interface SkeletonTitleProps {
    prefixCls?: string;
    class?: string;
    style?: JSX.CSSProperties;
    width?: number | string;
}

const Title: Component<SkeletonTitleProps> = props => (
    <h3 class={clsx(props.prefixCls, props.class)} style={{ width: `${props.width}`, ...props.style }} />
);

export default Title;

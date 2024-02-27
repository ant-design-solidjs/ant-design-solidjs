import clsx from 'clsx';
import { JSX, Ref } from 'solid-js';

export type IconWrapperProps = {
    prefixCls: string;
    class?: string;
    style?: JSX.CSSProperties;
    children?: JSX.Element;
    ref?: Ref<HTMLSpanElement>;
};

const IconWrapper = (props: IconWrapperProps) => {
    return (
        <span ref={props.ref} class={clsx(`${props.prefixCls}-icon`, props.class)} style={props.style}>
            {props.children}
        </span>
    );
};

export default IconWrapper;

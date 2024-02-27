import FileTextOutlined from '@ant-design-solidjs/icons/es/icons/FileTextOutlined';
import clsx from 'clsx';
import type { FloatButtonContentProps } from './interface';
import { Component } from 'solid-js';

const FloatButtonContent: Component<FloatButtonContentProps> = props => {
    const defaultElement = () => (
        <div class={`${props.prefixCls}-icon`}>
            <FileTextOutlined />
        </div>
    );
    return (
        <div
            onClick={props.onClick}
            onFocus={props.onFocus}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            class={clsx(props.class, `${props.prefixCls}-content`)}
        >
            {props.icon || props.description ? (
                <>
                    {props.icon && <div class={`${props.prefixCls}-icon`}>{props.icon}</div>}
                    {props.description && <div class={`${props.prefixCls}-description`}>{props.description}</div>}
                </>
            ) : (
                defaultElement()
            )}
        </div>
    );
};

export default FloatButtonContent;

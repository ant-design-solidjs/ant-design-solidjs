import LoadingOutlined from '@ant-design-solidjs/icons/es/icons/LoadingOutlined';
import classNames from 'clsx';
import CSSMotion from '../motion';
import IconWrapper from './IconWrapper';
import { Component, JSX, Show } from 'solid-js';

type InnerLoadingIconProps = {
    prefixCls: string;
    class?: string;
    style?: JSX.CSSProperties;
    iconClassName?: string;
    ref?: (node: any) => any;
};

const InnerLoadingIcon = (props: InnerLoadingIconProps) => {
    const bindRef = (el: HTMLSpanElement) => {
        if (!props.ref) return;
        props.ref(el);
    };

    return (
        <IconWrapper
            prefixCls={props.prefixCls}
            class={classNames(`${props.prefixCls}-loading-icon`, props.class)}
            style={props.style}
            ref={bindRef}
        >
            <LoadingOutlined class={props.iconClassName} />
        </IconWrapper>
    );
};

export interface LoadingIconProps {
    prefixCls: string;
    existIcon: boolean;
    loading?: boolean | object;
    class?: string;
    style?: JSX.CSSProperties;
}

const getCollapsedWidth = (): JSX.CSSProperties => ({
    width: '0',
    opacity: '0',
    transform: 'scale(0)',
});

const getRealWidth = (node: HTMLElement): JSX.CSSProperties => ({
    width: `${node.scrollWidth}px`,
    opacity: 1,
    transform: 'scale(1)',
});

const LoadingIcon: Component<LoadingIconProps> = props => {
    return (
        <Show
            when={!props.existIcon}
            fallback={<InnerLoadingIcon prefixCls={props.prefixCls} class={props.class} style={props.style} />}
        >
            <CSSMotion
                visible={!!props.loading}
                // We do not really use this motionName
                motionName={`${props.prefixCls}-loading-icon-motion`}
                motionLeave={!!props.loading}
                removeOnLeave
                onAppearStart={getCollapsedWidth}
                onAppearActive={getRealWidth}
                onEnterStart={getCollapsedWidth}
                onEnterActive={getRealWidth}
                onLeaveStart={getRealWidth}
                onLeaveActive={getCollapsedWidth}
            >
                {(ps, ref) => (
                    <InnerLoadingIcon
                        prefixCls={props.prefixCls}
                        class={props.class}
                        style={{ ...props.style, ...ps.style }}
                        ref={ref}
                        iconClassName={ps.class}
                    />
                )}
            </CSSMotion>
        </Show>
    );
};

export default LoadingIcon;

import { DotChartOutlined } from '@ant-design-solidjs/icons';
import clsx from 'clsx';
import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import useStyle from './style';
import { Component, JSX, Show, useContext } from 'solid-js';

export interface SkeletonNodeProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
    fullSize?: boolean;
    children?: JSX.Element;
}

const SkeletonNode: Component<SkeletonNodeProps> = props => {
    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('skeleton', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

    return wrapCSSVar(
        <div
            class={clsx(
                prefixCls,
                `${prefixCls}-element`,
                {
                    [`${prefixCls}-active`]: props.active,
                },
                hashId,
                props.class,
                props.rootClass,
                cssVarCls,
            )}
        >
            <div class={clsx(`${prefixCls}-image`, props.class)} style={props.style}>
                <Show when={props.children} fallback={<DotChartOutlined />}>
                    {props.children}
                </Show>
            </div>
        </div>,
    );
};

export default SkeletonNode;

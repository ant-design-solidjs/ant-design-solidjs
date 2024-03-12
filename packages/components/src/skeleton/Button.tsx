import clsx from 'clsx';
import { omit } from '@ant-design-solidjs/util';
import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import Element from './Element';

import useStyle from './style';
import { Component, mergeProps, useContext } from 'solid-js';

export interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'size'> {
    size?: 'large' | 'small' | 'default';
    block?: boolean;
}

const SkeletonButton: Component<SkeletonButtonProps> = _props => {
    const props = mergeProps({ block: false, size: 'default' }, _props);
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
                    [`${prefixCls}-block`]: props.block,
                },
                props.class,
                props.rootClass,
                hashId,
                cssVarCls,
            )}
        >
            <Element prefixCls={`${prefixCls}-button`} size={props.size} {...omit(props, ['prefixCls'])} />
        </div>,
    );
};

export default SkeletonButton;

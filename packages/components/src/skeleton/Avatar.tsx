import classNames from 'clsx';
import { omit } from '@ant-design-solidjs/util';
import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import Element from './Element';
import useStyle from './style';
import { Component, mergeProps, useContext } from 'solid-js';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
    shape?: 'circle' | 'square';
}

const SkeletonAvatar: Component<AvatarProps> = _props => {
    const props = mergeProps({ shape: 'circle', size: 'default' }, _props);

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('skeleton', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

    return wrapCSSVar(
        <div
            class={classNames(
                prefixCls,
                `${prefixCls}-element`,
                {
                    [`${prefixCls}-active`]: props.active,
                },
                props.class,
                props.rootClass,
                hashId,
                cssVarCls,
            )}
        >
            <Element
                prefixCls={`${prefixCls}-avatar`}
                shape={props.shape}
                size={props.size}
                {...omit(props, ['prefixCls', 'class'])}
            />
        </div>,
    );
};

export default SkeletonAvatar;

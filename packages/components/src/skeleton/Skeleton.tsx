import clsx from 'clsx';
import { ConfigContext } from '../config-provider';
import type { AvatarProps } from './Avatar';
import SkeletonAvatar from './Avatar';
import SkeletonButton from './Button';
import Element from './Element';
import SkeletonImage from './Image';
import SkeletonInput from './Input';
import SkeletonNode from './Node';
import type { SkeletonParagraphProps } from './Paragraph';
import Paragraph from './Paragraph';
import type { SkeletonTitleProps } from './Title';
import Title from './Title';

import useStyle from './style';
import { Component, JSX, mergeProps, Show, useContext } from 'solid-js';

/* This only for skeleton internal. */
type SkeletonAvatarProps = Omit<AvatarProps, 'active'>;

export interface SkeletonProps {
    active?: boolean;
    loading?: boolean;
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    style?: JSX.CSSProperties;
    children?: JSX.Element;
    avatar?: SkeletonAvatarProps | boolean;
    title?: SkeletonTitleProps | boolean;
    paragraph?: SkeletonParagraphProps | boolean;
    round?: boolean;
}

function getComponentProps<T>(prop?: T | boolean): T | {} {
    if (prop && typeof prop === 'object') {
        return prop;
    }
    return {};
}

function getAvatarBasicProps(hasTitle: boolean, hasParagraph: boolean): SkeletonAvatarProps {
    if (hasTitle && !hasParagraph) {
        // Square avatar
        return { size: 'large', shape: 'square' };
    }

    return { size: 'large', shape: 'circle' };
}

function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean): SkeletonTitleProps {
    if (!hasAvatar && hasParagraph) {
        return { width: '38%' };
    }

    if (hasAvatar && hasParagraph) {
        return { width: '50%' };
    }

    return {};
}

function getParagraphBasicProps(hasAvatar: boolean, hasTitle: boolean): SkeletonParagraphProps {
    const basicProps: SkeletonParagraphProps = {};

    // Width
    if (!hasAvatar || !hasTitle) {
        basicProps.width = '61%';
    }

    // Rows
    if (!hasAvatar && hasTitle) {
        basicProps.rows = 3;
    } else {
        basicProps.rows = 2;
    }

    return basicProps;
}

type CompoundedComponent = {
    Button: typeof SkeletonButton;
    Avatar: typeof SkeletonAvatar;
    Input: typeof SkeletonInput;
    Image: typeof SkeletonImage;
    Node: typeof SkeletonNode;
};

const Skeleton: Component<SkeletonProps> & CompoundedComponent = _props => {
    const props = mergeProps({ avatar: false, title: true, paragraph: true }, _props);

    const { getPrefixCls, direction, skeleton } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('skeleton', props.prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

    return (
        <span>
            <Show
                when={props.loading || !('loading' in props)}
                fallback={<Show when={typeof props.children !== 'undefined'}>{props.children}</Show>}
            >
                {wrapCSSVar(
                    <div
                        class={clsx(
                            prefixCls,
                            {
                                [`${prefixCls}-with-avatar`]: !!props.avatar,
                                [`${prefixCls}-active`]: props.active,
                                [`${prefixCls}-rtl`]: direction === 'rtl',
                                [`${prefixCls}-round`]: props.round,
                            },
                            skeleton?.class,
                            props.class,
                            props.rootClass,
                            hashId,
                            cssVarCls,
                        )}
                        style={{ ...skeleton?.style, ...props.style }}
                    >
                        <Show when={!!props.avatar}>
                            <div class={`${prefixCls}-header`}>
                                <Element
                                    {...{
                                        prefixCls: `${prefixCls}-avatar`,
                                        ...getAvatarBasicProps(!!props.title, !!props.paragraph),
                                        ...getComponentProps(props.avatar),
                                    }}
                                />
                            </div>
                        </Show>
                        <Show when={!!props.title || !!props.paragraph}>
                            <div class={`${prefixCls}-content`}>
                                <Show when={!!props.title}>
                                    <Title
                                        {...{
                                            prefixCls: `${prefixCls}-title`,
                                            ...getTitleBasicProps(!!props.avatar, !!props.paragraph),
                                            ...getComponentProps(props.title),
                                        }}
                                    />
                                </Show>
                                <Show when={!!props.paragraph}>
                                    <Paragraph
                                        {...{
                                            prefixCls: `${prefixCls}-paragraph`,
                                            ...getParagraphBasicProps(!!props.avatar, !!props.title),
                                            ...getComponentProps(props.paragraph),
                                        }}
                                    />
                                </Show>
                            </div>
                        </Show>
                    </div>,
                )}
            </Show>
        </span>
    );
};

Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;

export default Skeleton;

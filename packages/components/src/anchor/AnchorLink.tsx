import clsx from 'clsx';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { AntAnchor } from './Anchor';
import AnchorContext from './context';
import { Component, createEffect, JSX, onCleanup, useContext } from 'solid-js';

export interface AnchorLinkBaseProps {
    prefixCls?: string;
    href: string;
    target?: string;
    title: JSX.Element;
    class?: string;
    replace?: boolean;
}

export interface AnchorLinkProps extends AnchorLinkBaseProps {
    children?: JSX.Element;
}

const AnchorLink: Component<AnchorLinkProps> = props => {
    const context = useContext<AntAnchor | undefined>(AnchorContext);

    const { registerLink, unregisterLink, scrollTo, onClick, activeLink, direction } = context || {};

    createEffect(() => {
        registerLink?.(props.href);
        onCleanup(() => {
            unregisterLink?.(props.href);
        });
    });

    const handleClick = (e: JSX.MouseEvent) => {
        if (props.replace) {
            e.preventDefault();
            window.location.replace(props.href);
        }
        onClick?.(e, { title: props.title, href: props.href });
        scrollTo?.(props.href);
    };

    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
        const warning = devUseWarning('Anchor.Link');

        warning(
            !props.children || direction !== 'horizontal',
            'usage',
            '`Anchor.Link children` is not supported when `Anchor` direction is horizontal',
        );
    }

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('anchor', props.prefixCls);

    return (
        <div
            class={clsx(`${prefixCls}-link`, props.class, {
                [`${prefixCls}-link-active`]: activeLink === props.href,
            })}
        >
            <a
                class={clsx(`${prefixCls}-link-title`, {
                    [`${prefixCls}-link-title-active`]: activeLink === props.href,
                })}
                href={props.href}
                title={typeof props.title === 'string' ? props.title : ''}
                target={props.target}
                onClick={handleClick}
            >
                {props.title}
            </a>

            {direction !== 'horizontal' ? props.children : null}
        </div>
    );
};

export default AnchorLink;

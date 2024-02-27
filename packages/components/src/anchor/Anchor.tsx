import clsx from 'clsx';
import scrollIntoView from 'scroll-into-view-if-needed';

import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import { Affix } from '../affix';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { AnchorLinkBaseProps } from './AnchorLink';
import AnchorLink from './AnchorLink';
import AnchorContext from './context';
import useStyle from './style';
import { Component, createEffect, createMemo, createSignal, JSX, onCleanup, Show, useContext } from 'solid-js';

export interface AnchorLinkItemProps extends AnchorLinkBaseProps {
    children?: AnchorLinkItemProps[];
}

export type AnchorContainer = HTMLElement | Window;

function getDefaultContainer() {
    return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
    if (!element.getClientRects().length) {
        return 0;
    }

    const rect = element.getBoundingClientRect();

    if (rect.width || rect.height) {
        if (container === window) {
            container = element.ownerDocument!.documentElement!;
            return rect.top - container.clientTop;
        }
        return rect.top - (container as HTMLElement).getBoundingClientRect().top;
    }

    return rect.top;
}

const sharpMatcherRegex = /#([\S ]+)$/;

interface Section {
    link: string;
    top: number;
}

export interface AnchorProps {
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    style?: JSX.CSSProperties;
    offsetTop?: number;
    bounds?: number;
    affix?: boolean;
    showInkInFixed?: boolean;
    getContainer?: () => AnchorContainer;
    /** Return customize highlight anchor */
    getCurrentAnchor?: (activeLink: string) => string;
    onClick?: (e: JSX.MouseEvent, link: { title: JSX.Element; href: string }) => void;
    /** Scroll to target offset value, if none, it's offsetTop prop value or 0. */
    targetOffset?: number;
    /** Listening event when scrolling change active link */
    onChange?: (currentActiveLink: string) => void;
    items?: AnchorLinkItemProps[];
    direction?: AnchorDirection;
    replace?: boolean;
}

export interface AnchorState {
    activeLink: null | string;
}

export interface AnchorDefaultProps extends AnchorProps {
    prefixCls: string;
    affix: boolean;
    showInkInFixed: boolean;
    getContainer: () => AnchorContainer;
}

export type AnchorDirection = 'vertical' | 'horizontal';

export interface AntAnchor {
    registerLink: (link: string) => void;
    unregisterLink: (link: string) => void;
    activeLink: string | null;
    scrollTo: (link: string) => void;
    onClick?: (e: JSX.MouseEvent, link: { title: JSX.Element; href: string }) => void;
    direction: AnchorDirection;
}

const Anchor: Component<AnchorProps> = props => {
    const [links, setLinks] = createSignal<string[]>([]);
    const [activeLink, setActiveLink] = createSignal<string | null>(null);

    // eslint-disable-next-line solid/reactivity
    let activeLinkRef: string | null = activeLink();

    let wrapperRef: HTMLDivElement = null;
    let spanLinkNode: HTMLSpanElement = null;
    let animating: boolean = false;

    const { direction, anchor, getTargetContainer, getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

    const prefixCls = getPrefixCls('anchor', props.prefixCls);

    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    const getCurrentContainer = () => {
        const getter = props.getContainer ?? getTargetContainer ?? getDefaultContainer;
        return getter();
    };

    const registerLink: AntAnchor['registerLink'] = link => {
        if (!links().includes(link)) {
            setLinks(prev => [...prev, link]);
        }
    };

    const unregisterLink: AntAnchor['unregisterLink'] = link => {
        if (links().includes(link)) {
            setLinks(prev => prev.filter(i => i !== link));
        }
    };

    const updateInk = () => {
        const linkNode = wrapperRef?.querySelector<HTMLElement>(`.${prefixCls}-link-title-active`);
        if (linkNode && spanLinkNode) {
            const { style: inkStyle } = spanLinkNode;
            const horizontalAnchor = props.direction === 'horizontal';
            inkStyle.top = horizontalAnchor ? '' : `${linkNode.offsetTop + linkNode.clientHeight / 2}px`;
            inkStyle.height = horizontalAnchor ? '' : `${linkNode.clientHeight}px`;
            inkStyle.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : '';
            inkStyle.width = horizontalAnchor ? `${linkNode.clientWidth}px` : '';
            if (horizontalAnchor) {
                scrollIntoView(linkNode, { scrollMode: 'if-needed', block: 'nearest' });
            }
        }
    };

    const getInternalCurrentAnchor = (_links: string[], _offsetTop = 0, _bounds = 5): string => {
        const linkSections: Section[] = [];
        const container = getCurrentContainer();
        _links.forEach(link => {
            const sharpLinkMatch = sharpMatcherRegex.exec(link?.toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = document.getElementById(sharpLinkMatch[1]);
            if (target) {
                const top = getOffsetTop(target, container);
                if (top < _offsetTop + _bounds) {
                    linkSections.push({ link, top });
                }
            }
        });

        if (linkSections.length) {
            const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
            return maxSection.link;
        }
        return '';
    };

    const setCurrentActiveLink = (link: string) => {
        // FIXME: Seems a bug since this compare is not equals
        // `activeLinkRef` is parsed value which will always trigger `onChange` event.
        if (activeLinkRef === link) {
            return;
        }

        // https://github.com/ant-design/ant-design/issues/30584
        const newLink = typeof props.getCurrentAnchor === 'function' ? props.getCurrentAnchor(link) : link;
        setActiveLink(newLink);
        activeLinkRef = newLink;

        // onChange should respect the original link (which may caused by
        // window scroll or user click), not the new link
        props.onChange?.(link);
    };

    const handleScroll = () => {
        if (animating) {
            return;
        }

        const currentActiveLink = getInternalCurrentAnchor(
            links(),
            props.targetOffset !== undefined ? props.targetOffset : props.offsetTop || 0,
            props.bounds,
        );

        setCurrentActiveLink(currentActiveLink);
    };

    const handleScrollTo = (link: string) => {
        setCurrentActiveLink(link);
        const sharpLinkMatch = sharpMatcherRegex.exec(link);
        if (!sharpLinkMatch) {
            return;
        }
        const targetElement = document.getElementById(sharpLinkMatch[1]);
        if (!targetElement) {
            return;
        }

        const container = getCurrentContainer();
        const scrollTop = getScroll(container, true);
        const eleOffsetTop = getOffsetTop(targetElement, container);
        let y = scrollTop + eleOffsetTop;
        y -= props.targetOffset !== undefined ? props.targetOffset : props.offsetTop || 0;
        animating = true;
        scrollTo(y, {
            getContainer: getCurrentContainer,
            callback() {
                animating = false;
            },
        });
    };

    const createNestedLink = (options?: AnchorLinkItemProps[]) =>
        Array.isArray(options)
            ? options.map(item => (
                  <AnchorLink replace={props.replace} {...item}>
                      {props.direction === 'vertical' && createNestedLink(item.children)}
                  </AnchorLink>
              ))
            : null;

    const anchorContent = (
        <div
            ref={wrapperRef}
            class={clsx(
                hashId,
                cssVarCls,
                rootCls,
                props.rootClass,
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-wrapper-horizontal`]: props.direction === 'horizontal',
                    [`${prefixCls}-rtl`]: direction === 'rtl',
                },
                props.class,
                anchor?.class,
            )}
            style={{
                'max-height': props.offsetTop ? `calc(100vh - ${props.offsetTop}px)` : '100vh',
                ...anchor?.style,
                ...props.style,
            }}
        >
            <div
                class={clsx(prefixCls, {
                    [`${prefixCls}-fixed`]: !props.affix && !props.showInkInFixed,
                })}
            >
                <span
                    class={clsx(`${prefixCls}-ink`, {
                        [`${prefixCls}-ink-visible`]: activeLink,
                    })}
                    ref={spanLinkNode}
                />
                {createNestedLink(props.items)}
            </div>
        </div>
    );

    createEffect(() => {
        const scrollContainer = getCurrentContainer();
        handleScroll();
        scrollContainer?.addEventListener('scroll', handleScroll);

        onCleanup(() => {
            scrollContainer?.removeEventListener('scroll', handleScroll);
        });
    });

    createEffect(() => {
        if (typeof props.getCurrentAnchor === 'function') {
            setCurrentActiveLink(props.getCurrentAnchor(activeLinkRef || ''));
        }
    });

    createEffect(() => {
        updateInk();
    });

    const memoizedContextValue = createMemo<AntAnchor>(() => ({
        registerLink,
        unregisterLink,
        scrollTo: handleScrollTo,
        activeLink: activeLink(),
        onClick: props.onClick,
        direction: props.direction,
    }));

    return wrapCSSVar(
        <AnchorContext.Provider value={memoizedContextValue()}>
            <Show when={props.affix} fallback={anchorContent}>
                <Affix offsetTop={props.offsetTop} target={getCurrentContainer}>
                    {anchorContent}
                </Affix>
            </Show>
        </AnchorContext.Provider>,
    );
};

export default Anchor;

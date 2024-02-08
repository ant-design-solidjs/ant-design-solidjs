import classNames from 'clsx';
import { omit } from '@ant-design-solidjs/util';
import { createResizeObserver } from '@solid-primitives/resize-observer';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import { getFixedBottom, getFixedTop, getTargetRect } from './utils';
import { createEffect, createSignal, JSX, onCleanup, onMount, useContext } from 'solid-js';

const TRIGGER_EVENTS = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'] as const;

function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}

// Affix
export interface AffixProps {
    /** Triggered when the specified offset is reached from the top of the window */
    offsetTop?: number;
    /** Triggered when the specified offset is reached from the bottom of the window */
    offsetBottom?: number;
    style?: JSX.CSSProperties;
    /** Callback function triggered when fixed state changes */
    onChange?: (affixed?: boolean) => void;
    /** Set the element that Affix needs to listen to its scroll event, the value is a function that returns the corresponding DOM element */
    target?: () => Window | HTMLElement | null;
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    children: JSX.Element;
}

enum AffixStatus {
    None,
    Prepare,
}

interface AffixState {
    affixStyle?: JSX.CSSProperties;
    placeholderStyle?: JSX.CSSProperties;
    status: AffixStatus;
    lastAffix: boolean;
    prevTarget: Window | HTMLElement | null;
}

// interface AffixRef {
//     updatePosition: ReturnType<typeof throttleByAnimationFrame>;
// }

export const Affix = (props: AffixProps) => {
    const { getPrefixCls, getTargetContainer } = useContext<ConfigConsumerProps>(ConfigContext);

    const affixPrefixCls = getPrefixCls('affix', props.prefixCls);

    const [lastAffix, setLastAffix] = createSignal(false);
    const [affixStyle, setAffixStyle] = createSignal<JSX.CSSProperties>();
    const [placeholderStyle, setPlaceholderStyle] = createSignal<JSX.CSSProperties>();

    let status: AffixStatus = AffixStatus.None;

    let prevTarget: Window | HTMLElement | null = null;
    let prevListener: EventListener;

    let placeholderNodeRef: HTMLDivElement = null;
    let fixedNodeRef: HTMLDivElement = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const targetFunc = props.target ?? getTargetContainer ?? getDefaultTarget;

    const internalOffsetTop = props.offsetBottom === undefined && props.offsetTop === undefined ? 0 : props.offsetTop;

    // =================== Measure ===================
    const measure = () => {
        if (status !== AffixStatus.Prepare || !fixedNodeRef || !placeholderNodeRef || !targetFunc) {
            return;
        }

        const targetNode = targetFunc();
        if (targetNode) {
            const newState: Partial<AffixState> = {
                status: AffixStatus.None,
            };
            const placeholderRect = getTargetRect(placeholderNodeRef);

            if (
                placeholderRect.top === 0 &&
                placeholderRect.left === 0 &&
                placeholderRect.width === 0 &&
                placeholderRect.height === 0
            ) {
                return;
            }

            const targetRect = getTargetRect(targetNode);
            const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop);
            const fixedBottom = getFixedBottom(placeholderRect, targetRect, props.offsetBottom);

            if (fixedTop !== undefined) {
                newState.affixStyle = {
                    position: 'fixed',
                    top: `${fixedTop}px`,
                    width: `${placeholderRect.width}px`,
                    height: `${placeholderRect.height}px`,
                };
                newState.placeholderStyle = {
                    width: `${placeholderRect.width}px`,
                    height: `${placeholderRect.height}px`,
                };
            } else if (fixedBottom !== undefined) {
                newState.affixStyle = {
                    position: 'fixed',
                    bottom: `${fixedBottom}px`,
                    width: `${placeholderRect.width}px`,
                    height: `${placeholderRect.height}px`,
                };
                newState.placeholderStyle = {
                    width: `${placeholderRect.width}px`,
                    height: `${placeholderRect.height}px`,
                };
            }

            newState.lastAffix = !!newState.affixStyle;

            if (lastAffix() !== newState.lastAffix) {
                props.onChange?.(newState.lastAffix);
            }

            status = newState.status!;
            setAffixStyle(newState.affixStyle);
            setPlaceholderStyle(newState.placeholderStyle);
            setLastAffix(newState.lastAffix);
        }
    };

    const prepareMeasure = () => {
        status = AffixStatus.Prepare;
        measure();
        if (process.env.NODE_ENV === 'test') {
            (props as any)?.onTestUpdatePosition?.();
        }
    };

    const updatePosition = throttleByAnimationFrame(() => {
        prepareMeasure();
    });

    const lazyUpdatePosition = throttleByAnimationFrame(() => {
        // Check position change before measure to make Safari smooth
        if (targetFunc && affixStyle()) {
            const targetNode = targetFunc();
            if (targetNode && placeholderNodeRef) {
                const targetRect = getTargetRect(targetNode);
                const placeholderRect = getTargetRect(placeholderNodeRef);
                const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop);
                const fixedBottom = getFixedBottom(placeholderRect, targetRect, props.offsetBottom);

                if (
                    (fixedTop !== undefined && affixStyle().top === fixedTop) ||
                    (fixedBottom !== undefined && affixStyle().bottom === fixedBottom)
                ) {
                    return;
                }
            }
        }

        // Directly call prepare measure since it's already throttled.
        prepareMeasure();
    });

    const addListeners = () => {
        const listenerTarget = targetFunc?.();
        if (!listenerTarget) {
            return;
        }
        TRIGGER_EVENTS.forEach(eventName => {
            if (prevListener) {
                prevTarget?.removeEventListener(eventName, prevListener);
            }
            listenerTarget?.addEventListener(eventName, lazyUpdatePosition);
        });
        prevTarget = listenerTarget;
        prevListener = lazyUpdatePosition;
    };

    const removeListeners = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        const newTarget = targetFunc?.();
        TRIGGER_EVENTS.forEach(eventName => {
            newTarget?.removeEventListener(eventName, lazyUpdatePosition);
            if (prevListener) {
                prevTarget?.removeEventListener(eventName, prevListener);
            }
        });
        updatePosition.cancel();
        lazyUpdatePosition.cancel();
    };

    // React.useImperativeHandle(ref, () => ({ updatePosition }));

    // mount & unmount
    onMount(() => {
        // [Legacy] Wait for parent component ref has its value.
        // We should use target as directly element instead of function which makes element check hard.
        timer = setTimeout(addListeners);
        onCleanup(() => removeListeners());
    });

    createEffect(() => {
        addListeners();
    });

    createEffect(() => {
        updatePosition();
    });

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(affixPrefixCls);

    const rootCls = classNames(props.rootClass, hashId, affixPrefixCls, cssVarCls);

    const mergedCls = classNames({ [rootCls]: affixStyle });

    let otherProps = omit(props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange', 'rootClass']);

    // if (process.env.NODE_ENV === 'test') {
    //     otherProps = omit(otherProps, ['onTestUpdatePosition' as any]);
    // }

    createResizeObserver(placeholderNodeRef, updatePosition);

    return wrapCSSVar(
        <div style={props.style} class={props.class} ref={placeholderNodeRef} {...otherProps}>
            {affixStyle && <div style={placeholderStyle()} aria-hidden="true" />}
            <div class={mergedCls} ref={fixedNodeRef} style={affixStyle()}>
                {props.children}
            </div>
        </div>,
    );
};

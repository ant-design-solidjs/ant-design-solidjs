import clsx from 'clsx';
import { fillRef } from '@ant-design-solidjs/util';
import { Context } from './context.tsx';
import DomWrapper from './DomWrapper';
import useStatus from './hooks/useStatus';
import { isActive } from './hooks/useStepQueue';
import type { MotionEndEventHandler, MotionEventHandler, MotionPrepareEventHandler } from './interface';
import { STATUS_NONE, STEP_PREPARE, STEP_START } from './interface';
import { getTransitionName, supportTransition } from './util/motion';
import { Component, createEffect, createMemo, createSignal, JSX, mergeProps, useContext } from 'solid-js';

export type CSSMotionConfig =
    | boolean
    | {
          transitionSupport?: boolean;
          /** @deprecated, no need this anymore since `rc-motion` only support latest react */
          forwardRef?: boolean;
      };

export type MotionName =
    | string
    | {
          appear?: string;
          enter?: string;
          leave?: string;
          appearActive?: string;
          enterActive?: string;
          leaveActive?: string;
      };

export interface CSSMotionProps {
    motionName?: MotionName;
    visible?: boolean;
    motionAppear?: boolean;
    motionEnter?: boolean;
    motionLeave?: boolean;
    motionLeaveImmediately?: boolean;
    motionDeadline?: number;
    /**
     * Create element in view even the element is invisible.
     * Will patch `display: none` style on it.
     */
    forceRender?: boolean;
    /**
     * Remove element when motion end. This will not work when `forceRender` is set.
     */
    removeOnLeave?: boolean;
    leavedClass?: string;
    /** @private Used by CSSMotionList. Do not use in your production. */
    eventProps?: object;

    // Prepare groups
    /** Prepare phase is used for measure element info. It will always trigger even motion is off */
    onAppearPrepare?: MotionPrepareEventHandler;
    /** Prepare phase is used for measure element info. It will always trigger even motion is off */
    onEnterPrepare?: MotionPrepareEventHandler;
    /** Prepare phase is used for measure element info. It will always trigger even motion is off */
    onLeavePrepare?: MotionPrepareEventHandler;

    // Normal motion groups
    onAppearStart?: MotionEventHandler;
    onEnterStart?: MotionEventHandler;
    onLeaveStart?: MotionEventHandler;

    onAppearActive?: MotionEventHandler;
    onEnterActive?: MotionEventHandler;
    onLeaveActive?: MotionEventHandler;

    onAppearEnd?: MotionEndEventHandler;
    onEnterEnd?: MotionEndEventHandler;
    onLeaveEnd?: MotionEndEventHandler;

    // Special
    /** This will always trigger after final visible changed. Even if no motion configured. */
    onVisibleChanged?: (visible: boolean) => void;

    internalRef?: any;

    children?: (
        props: {
            visible?: boolean;
            class?: string;
            style?: JSX.CSSProperties;
            [key: string]: any;
        },
        ref: (node: any) => void,
    ) => JSX.Element;
    ref?: any;
}

/**
 * `transitionSupport` is used for none transition test case.
 * Default we use browser transition event support check.
 */
export function genCSSMotion(config: CSSMotionConfig): Component<CSSMotionProps & { ref?: any }> {
    let transitionSupport = config;

    if (typeof config === 'object') {
        ({ transitionSupport } = config);
    }

    function isSupportTransition(props: CSSMotionProps, contextMotion?: boolean) {
        return !!(props.motionName && transitionSupport && contextMotion !== false);
    }

    const CSSMotion = (_props: CSSMotionProps) => {
        const props = mergeProps({ visible: true, removeOnLeave: true }, _props);

        const { motion: contextMotion } = useContext(Context);

        const supportMotion = createMemo(() => isSupportTransition(props, contextMotion));

        // Ref to the react node, it may be a HTMLElement
        const [eleRef, setEleRef] = createSignal<HTMLElement>();
        // Ref to the dom wrapper in case ref can not pass to HTMLElement
        let wrapperNodeRef;

        const [status, statusStep, statusStyle, mergedVisible] = useStatus(supportMotion, eleRef, props);

        // Record whether content has rendered
        // Will return null for un-rendered even when `removeOnLeave={false}`
        let renderedRef = mergedVisible();
        createEffect(() => {
            if (mergedVisible()) {
                renderedRef = true;
            }
        });

        // ====================== Refs ======================
        const setNodeRef = (node: any) => {
            setEleRef(node);
            fillRef(props.ref, node);
        };

        // ===================== Render =====================

        const motionChildren = createMemo(() => {
            const mergedProps = { ...props.eventProps, visible: props.visible };

            let motionChildren: JSX.Element = null;

            if (!props.children) {
                // No children
                motionChildren = null;
            } else if (status() === STATUS_NONE) {
                // Stable children
                if (mergedVisible()) {
                    motionChildren = props.children({ ...mergedProps }, setNodeRef);
                } else if (!props.removeOnLeave && renderedRef && props.leavedClass) {
                    motionChildren = props.children({ ...mergedProps, class: props.leavedClass }, setNodeRef);
                } else if (props.forceRender || (!props.removeOnLeave && !props.leavedClass)) {
                    motionChildren = props.children({ ...mergedProps, style: { display: 'none' } }, setNodeRef);
                } else {
                    motionChildren = null;
                }
            } else {
                // In motion
                let statusSuffix: string;
                if (statusStep() === STEP_PREPARE) {
                    statusSuffix = 'prepare';
                } else if (isActive(statusStep())) {
                    statusSuffix = 'active';
                } else if (statusStep() === STEP_START) {
                    statusSuffix = 'start';
                }

                const motionCls = getTransitionName(props.motionName, `${status()}-${statusSuffix}`);
                motionChildren = props.children(
                    {
                        ...mergedProps,
                        class: clsx(getTransitionName(props.motionName, status()), {
                            [motionCls]: motionCls && statusSuffix,
                            [props.motionName as string]: typeof props.motionName === 'string',
                        }),
                        style: statusStyle(),
                    },
                    setNodeRef,
                );
            }

            return motionChildren;
        });

        // // Auto-inject ref if child node not have `ref` props
        // if (React.isValidElement(motionChildren) && supportRef(motionChildren)) {
        //     const { ref: originNodeRef } = motionChildren as any;
        //
        //     if (!originNodeRef) {
        //         motionChildren = React.cloneElement<any>(motionChildren, {
        //             ref: setNodeRef,
        //         });
        //     }
        // }

        return <DomWrapper ref={wrapperNodeRef}>{motionChildren()}</DomWrapper>;
    };

    return CSSMotion;
}

export default genCSSMotion(supportTransition);

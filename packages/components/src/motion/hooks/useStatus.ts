import type { CSSMotionProps } from '../CSSMotion';
import type {
    MotionEvent,
    MotionEventHandler,
    MotionPrepareEventHandler,
    MotionStatus,
    StepStatus,
} from '../interface';
import {
    STATUS_APPEAR,
    STATUS_ENTER,
    STATUS_LEAVE,
    STATUS_NONE,
    STEP_ACTIVE,
    STEP_PREPARE,
    STEP_PREPARED,
    STEP_START,
} from '../interface';
import useDomMotionEvents from './useDomMotionEvents';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useStepQueue, { DoStep, isActive, SkipStep } from './useStepQueue';
import { useSafeState } from '@ant-design-solidjs/util';
import { createEffect, createMemo, JSX, mergeProps, onCleanup } from 'solid-js';

export default function useStatus(
    supportMotion: JSX.Accessor<boolean>,
    element: JSX.Accessor<HTMLElement>,
    _props: CSSMotionProps,
): [JSX.Accessor<MotionStatus>, JSX.Accessor<StepStatus>, JSX.Accessor<JSX.CSSProperties>, JSX.Accessor<boolean>] {
    const props = mergeProps({ motionEnter: true, motionAppear: true, motionLeave: true }, _props);

    // Used for outer render usage to avoid `visible: false & status: none` to render nothing
    const [asyncVisible, setAsyncVisible] = useSafeState<boolean>();
    const [status, setStatus] = useSafeState<MotionStatus>(STATUS_NONE);
    const [style, setStyle] = useSafeState<JSX.CSSProperties | undefined>(null);

    let mountedRef = false;
    let deadlineRef = null;

    // ========================== Motion End ==========================
    let activeRef = false;

    /**
     * Clean up status & style
     */
    function updateMotionEndStatus() {
        setStatus(STATUS_NONE, true);
        setStyle(null, true);
    }

    function onInternalMotionEnd(event: MotionEvent) {
        if (event && !event.deadline && event.target !== element()) {
            // event exists
            // not initiated by deadline
            // transitionEnd not fired by inner elements
            return;
        }

        const currentActive = activeRef;

        let canEnd: boolean | void;
        if (status() === STATUS_APPEAR && currentActive) {
            canEnd = props.onAppearEnd?.(element(), event);
        } else if (status() === STATUS_ENTER && currentActive) {
            canEnd = props.onEnterEnd?.(element(), event);
        } else if (status() === STATUS_LEAVE && currentActive) {
            canEnd = props.onLeaveEnd?.(element(), event);
        }

        // Only update status when `canEnd` and not destroyed
        if (status() !== STATUS_NONE && currentActive && canEnd !== false) {
            updateMotionEndStatus();
        }
    }

    const [patchMotionEvents] = useDomMotionEvents(onInternalMotionEnd);

    // ============================= Step =============================
    const getEventHandlers = (targetStatus: MotionStatus) => {
        switch (targetStatus) {
            case STATUS_APPEAR:
                return {
                    [STEP_PREPARE]: props.onAppearPrepare,
                    [STEP_START]: props.onAppearStart,
                    [STEP_ACTIVE]: props.onAppearActive,
                };

            case STATUS_ENTER:
                return {
                    [STEP_PREPARE]: props.onEnterPrepare,
                    [STEP_START]: props.onEnterStart,
                    [STEP_ACTIVE]: props.onEnterActive,
                };

            case STATUS_LEAVE:
                return {
                    [STEP_PREPARE]: props.onLeavePrepare,
                    [STEP_START]: props.onLeaveStart,
                    [STEP_ACTIVE]: props.onLeaveActive,
                };

            default:
                return {};
        }
    };

    const eventHandlers = createMemo<{
        [STEP_PREPARE]?: MotionPrepareEventHandler;
        [STEP_START]?: MotionEventHandler;
        [STEP_ACTIVE]?: MotionEventHandler;
    }>(() => getEventHandlers(status()));

    const [startStep, step] = useStepQueue(status, !supportMotion(), newStep => {
        // Only prepare step can be skipped
        if (newStep === STEP_PREPARE) {
            const onPrepare = eventHandlers[STEP_PREPARE];
            if (!onPrepare) {
                return SkipStep;
            }

            return onPrepare(element());
        }

        // Rest step is sync update
        if (step() in eventHandlers()) {
            setStyle(eventHandlers[step()]?.(element(), null) || null);
        }

        if (step() === STEP_ACTIVE) {
            // Patch events when motion needed
            patchMotionEvents(element());

            if (props.motionDeadline > 0) {
                clearTimeout(deadlineRef);
                deadlineRef = setTimeout(() => {
                    onInternalMotionEnd({
                        deadline: true,
                    } as MotionEvent);
                }, props.motionDeadline);
            }
        }

        if (step() === STEP_PREPARED) {
            updateMotionEndStatus();
        }

        return DoStep;
    });

    createEffect(() => {
        activeRef = isActive(step());
    });

    // ============================ Status ============================
    // Update with new status
    useIsomorphicLayoutEffect(() => {
        setAsyncVisible(props.visible);

        const isMounted = mountedRef;
        mountedRef = true;

        // if (!supportMotion) {
        //   return;
        // }

        let nextStatus: MotionStatus;

        // Appear
        if (!isMounted && props.visible && props.motionAppear) {
            nextStatus = STATUS_APPEAR;
        }

        // Enter
        if (isMounted && props.visible && props.motionEnter) {
            nextStatus = STATUS_ENTER;
        }

        // Leave
        if (
            (isMounted && !props.visible && props.motionLeave) ||
            (!isMounted && props.motionLeaveImmediately && !props.visible && props.motionLeave)
        ) {
            nextStatus = STATUS_LEAVE;
        }

        const nextEventHandlers = getEventHandlers(nextStatus);

        // Update to next status
        if (nextStatus && (supportMotion() || nextEventHandlers[STEP_PREPARE])) {
            setStatus(nextStatus);
            startStep();
        } else {
            // Set back in case no motion but prev status has prepared step
            setStatus(STATUS_NONE);
        }
    }, [props.visible]);

    // ============================ Effect ============================
    // Reset when motion changed
    createEffect(() => {
        if (
            // Cancel appear
            (status() === STATUS_APPEAR && !props.motionAppear) ||
            // Cancel enter
            (status() === STATUS_ENTER && !props.motionEnter) ||
            // Cancel leave
            (status() === STATUS_LEAVE && !props.motionLeave)
        ) {
            setStatus(STATUS_NONE);
        }
    });

    onCleanup(() => {
        mountedRef = false;
        clearTimeout(deadlineRef);
    });

    // Trigger `onVisibleChanged`
    let firstMountChangeRef = false;
    createEffect(() => {
        // [visible & motion not end] => [!visible & motion end] still need trigger onVisibleChanged
        if (asyncVisible()) {
            firstMountChangeRef = true;
        }

        if (asyncVisible() !== undefined && status() === STATUS_NONE) {
            // Skip first render is invisible since it's nothing changed
            if (firstMountChangeRef || asyncVisible()) {
                props.onVisibleChanged?.(asyncVisible());
            }
            firstMountChangeRef = true;
        }
    });

    const mergedStyle = createMemo(() => {
        if (eventHandlers()[STEP_PREPARE] && step() === STEP_START) {
            return {
                transition: 'none',
                ...style(),
            };
        }
        return style();
    });

    return [status, step, mergedStyle, asyncVisible];
}

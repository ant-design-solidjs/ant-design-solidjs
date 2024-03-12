import type { CSSMotionProps } from '../../motion';
import type { NotificationsProps, NotificationsRef } from '../Notifications';
import Notifications from '../Notifications';
import type { OpenConfig, Placement, StackConfig } from '../interface';
import { createEffect, createSignal, JSX } from 'solid-js';

const defaultGetContainer = () => document.getElementById('root');

type OptionalConfig = Partial<OpenConfig>;

export interface NotificationConfig {
    prefixCls?: string;
    /** Customize container. It will repeat call which means you should return same container element. */
    getContainer?: () => HTMLElement | ShadowRoot;
    motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
    closeIcon?: JSX.Element;
    closable?: boolean;
    maxCount?: number;
    duration?: number;
    /** @private. Config for notification holder style. Safe to remove if refactor */
    className?: (placement: Placement) => string;
    /** @private. Config for notification holder style. Safe to remove if refactor */
    style?: (placement: Placement) => JSX.CSSProperties;
    /** @private Trigger when all the notification closed. */
    onAllRemoved?: VoidFunction;
    stack?: StackConfig;
    /** @private Slot for style in Notifications */
    renderNotifications?: NotificationsProps['renderNotifications'];
}

export interface NotificationAPI {
    open: (config: OptionalConfig) => void;
    close: (key: JSX.Key) => void;
    destroy: () => void;
}

interface OpenTask {
    type: 'open';
    config: OpenConfig;
}

interface CloseTask {
    type: 'close';
    key: JSX.Key;
}

interface DestroyTask {
    type: 'destroy';
}

type Task = OpenTask | CloseTask | DestroyTask;

let uniqueKey = 0;

function mergeConfig<T>(...objList: Partial<T>[]): T {
    const clone: T = {} as T;

    objList.forEach(obj => {
        if (obj) {
            Object.keys(obj).forEach(key => {
                const val = obj[key];

                if (val !== undefined) {
                    clone[key] = val;
                }
            });
        }
    });

    return clone;
}

export default function useNotification(rootConfig: NotificationConfig = {}): [NotificationAPI, JSX.Element] {
    const {
        getContainer = defaultGetContainer,
        motion,
        prefixCls,
        maxCount,
        className,
        style,
        onAllRemoved,
        stack,
        renderNotifications,
        ...shareConfig
    } = rootConfig;

    const [container, setContainer] = createSignal<HTMLElement | ShadowRoot>();
    let notificationsRef: NotificationsRef;

    const contextHolder = (
        <Notifications
            container={container()}
            ref={notificationsRef}
            prefixCls={prefixCls}
            motion={motion}
            maxCount={maxCount}
            class={className}
            style={style}
            onAllRemoved={onAllRemoved}
            stack={stack}
            renderNotifications={renderNotifications}
        />
    );

    const [taskQueue, setTaskQueue] = createSignal<Task[]>([]);

    // ========================= Refs =========================
    const api: NotificationAPI = {
        open: config => {
            const mergedConfig = mergeConfig(shareConfig, config);
            if (mergedConfig.key === null || mergedConfig.key === undefined) {
                mergedConfig.key = `rc-notification-${uniqueKey}`;
                uniqueKey += 1;
            }

            setTaskQueue(queue => [...queue, { type: 'open', config: mergedConfig }]);
        },
        close: key => {
            setTaskQueue(queue => [...queue, { type: 'close', key }]);
        },
        destroy: () => {
            setTaskQueue(queue => [...queue, { type: 'destroy' }]);
        },
    };

    // ======================= Container ======================
    // React 18 should all in effect that we will check container in each render
    // Which means getContainer should be stable.
    createEffect(() => {
        setContainer(getContainer());
    });

    // ======================== Effect ========================
    createEffect(() => {
        // Flush task when node ready
        if (notificationsRef && taskQueue().length) {
            taskQueue().forEach(task => {
                switch (task.type) {
                    case 'open':
                        notificationsRef.open(task.config);
                        break;

                    case 'close':
                        notificationsRef.close(task.key);
                        break;

                    case 'destroy':
                        notificationsRef.destroy();
                        break;
                }
            });

            // React 17 will mix order of effect & setState in async
            // - open: setState[0]
            // - effect[0]
            // - open: setState[1]
            // - effect setState([]) * here will clean up [0, 1] in React 17
            setTaskQueue(oriQueue => oriQueue.filter(task => !taskQueue().includes(task)));
        }
    });

    // ======================== Return ========================
    return [api, contextHolder];
}

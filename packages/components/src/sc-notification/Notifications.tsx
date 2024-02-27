import type { CSSMotionProps } from '../motion';
import type { InnerOpenConfig, OpenConfig, Placement, Placements, StackConfig } from './interface';
import NoticeList from './NoticeList';
import { createEffect, createSignal, For, JSX, mergeProps, Ref, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { fillRef } from '@ant-design-solidjs/util';

export interface NotificationsProps {
    prefixCls?: string;
    motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
    container?: HTMLElement | ShadowRoot;
    maxCount?: number;
    class?: (placement: Placement) => string;
    style?: (placement: Placement) => JSX.CSSProperties;
    onAllRemoved?: VoidFunction;
    stack?: StackConfig;
    renderNotifications?: (node: JSX.Element, info: { prefixCls: string; key: JSX.Key }) => JSX.Element;
    ref?: Ref<NotificationsRef>;
}

export interface NotificationsRef {
    open: (config: OpenConfig) => void;
    close: (key: JSX.Key) => void;
    destroy: () => void;
}

// ant-notification ant-notification-topRight NotificationsRef
const Notifications = (_props: NotificationsProps) => {
    const props = mergeProps({ prefixCls: 'rc-notification' }, _props);

    const [configList, setConfigList] = createSignal<OpenConfig[]>([]);

    // ======================== Close =========================
    const onNoticeClose = (key: JSX.Key) => {
        // Trigger close event
        const config = configList().find(item => item.key === key);
        config?.onClose?.();

        setConfigList(list => list.filter(item => item.key !== key));
    };

    // ========================= Refs =========================
    fillRef(props.ref, {
        open: config => {
            setConfigList(list => {
                let clone = [...list];

                // Replace if exist
                const index = clone.findIndex(item => item.key === config.key);
                const innerConfig: InnerOpenConfig = { ...config };
                if (index >= 0) {
                    innerConfig.times = ((list[index] as InnerOpenConfig)?.times || 0) + 1;
                    clone[index] = innerConfig;
                } else {
                    innerConfig.times = 0;
                    clone.push(innerConfig);
                }

                if (props.maxCount > 0 && clone.length > props.maxCount) {
                    clone = clone.slice(-props.maxCount);
                }
                return clone;
            });
        },
        close: key => {
            onNoticeClose(key);
        },
        destroy: () => {
            setConfigList([]);
        },
    });

    // ====================== Placements ======================
    const [placements, setPlacements] = createSignal<Placements>({});

    createEffect(() => {
        const nextPlacements: Placements = {};

        configList().forEach(config => {
            const { placement = 'topRight' } = config;

            if (placement) {
                nextPlacements[placement] = nextPlacements[placement] || [];
                nextPlacements[placement].push(config);
            }
        });

        // Fill exist placements to avoid empty list causing remove without motion
        Object.keys(placements).forEach(placement => {
            nextPlacements[placement] = nextPlacements[placement] || [];
        });

        setPlacements(nextPlacements);
    });

    // Clean up container if all notices fade out
    const onAllNoticeRemoved = (placement: Placement) => {
        setPlacements(originPlacements => {
            const clone = {
                ...originPlacements,
            };
            const list = clone[placement] || [];

            if (!list.length) {
                delete clone[placement];
            }

            return clone;
        });
    };

    // Effect tell that placements is empty now
    let emptyRef = false;
    createEffect(() => {
        if (Object.keys(placements()).length > 0) {
            emptyRef = true;
        } else if (emptyRef) {
            // Trigger only when from exist to empty
            props.onAllRemoved?.();
            emptyRef = false;
        }
    });

    return (
        <Show when={props.container}>
            <Portal mount={props.container}>
                <For each={Object.keys(placements()) as Placement[]}>
                    {placement => {
                        const list = () => (
                            <NoticeList
                                configList={placements()[placement]}
                                placement={placement}
                                prefixCls={props.prefixCls}
                                class={props.class?.(placement)}
                                style={props.style?.(placement)}
                                motion={props.motion}
                                onNoticeClose={onNoticeClose}
                                onAllNoticeRemoved={onAllNoticeRemoved}
                                stack={props.stack}
                            />
                        );
                        return (
                            <Show when={props.renderNotifications} fallback={list()}>
                                {props.renderNotifications(list(), { prefixCls: props.prefixCls, key: placement })}
                            </Show>
                        );
                    }}
                </For>
            </Portal>
        </Show>
    );
};

export default Notifications;

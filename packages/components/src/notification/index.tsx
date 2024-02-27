import { createSignal, JSX, onMount, Ref, Show, useContext } from 'solid-js';

import { AppConfigContext } from '../app/context';
import ConfigProvider, { ConfigContext, globalConfig, warnContext } from '../config-provider';
import type { ArgsProps, GlobalConfigProps, NotificationInstance } from './interface';
import PurePanel from './PurePanel';
import useNotification, { useInternalNotification } from './useNotification';
import { Portal } from 'solid-js/web';
import { fillRef } from '@ant-design-solidjs/util';

export type { ArgsProps };

let notification: GlobalNotification | null = null;

let act: (callback: VoidFunction) => Promise<void> | void = (callback: VoidFunction) => callback();

interface GlobalNotification {
    fragment: DocumentFragment;
    instance?: NotificationInstance | null;
    sync?: VoidFunction;
}

type Task =
    | {
          type: 'open';
          config: ArgsProps;
      }
    | {
          type: 'destroy';
          key: JSX.Key;
      };

let taskQueue: Task[] = [];

let defaultGlobalConfig: GlobalConfigProps = {};

function getGlobalContext() {
    const { getContainer, rtl, maxCount, top, bottom } = defaultGlobalConfig;
    const mergedContainer = getContainer?.() || document.body;

    return { getContainer: () => mergedContainer, rtl, maxCount, top, bottom };
}

interface GlobalHolderRef {
    instance: NotificationInstance;
    sync: () => void;
}

const GlobalHolder = (props: {
    notificationConfig: GlobalConfigProps;
    sync: () => void;
    ref: Ref<GlobalHolderRef>;
}) => {
    const { notificationConfig, sync } = props;

    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls('notification');
    const appConfig = useContext(AppConfigContext);

    const [api, holder] = useInternalNotification({
        ...notificationConfig,
        prefixCls,
        ...appConfig.notification,
    });

    onMount(sync);

    const instance: NotificationInstance = { ...api };

    Object.keys(instance).forEach((method: keyof NotificationInstance) => {
        instance[method] = (...args: any[]) => {
            sync();
            return (api as any)[method](...args);
        };
    });

    fillRef(props.ref, {
        instance,
        sync,
    });

    return holder;
};

const GlobalHolderWrapper = (props: { ref: Ref<GlobalHolderRef> }) => {
    const [notificationConfig, setNotificationConfig] = createSignal<GlobalConfigProps>(getGlobalContext());

    const sync = () => {
        setNotificationConfig(getGlobalContext);
    };

    onMount(sync);

    const global = globalConfig();
    const rootPrefixCls = global.getRootPrefixCls();
    const rootIconPrefixCls = global.getIconPrefixCls();
    const theme = global.getTheme();

    const dom = <GlobalHolder ref={props.ref} sync={sync} notificationConfig={notificationConfig()} />;
    return (
        <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={rootIconPrefixCls} theme={theme}>
            <Show when={global.holderRender} fallback={dom}>
                {global.holderRender(dom)}
            </Show>
        </ConfigProvider>
    );
};

function flushNotice() {
    if (!notification) {
        const holderFragment = document.createDocumentFragment();

        const newNotification: GlobalNotification = {
            fragment: holderFragment,
        };

        notification = newNotification;

        // Delay render to avoid sync issue
        act(() => {
            return (
                <Portal mount={holderFragment}>
                    <GlobalHolderWrapper
                        ref={node => {
                            const { instance, sync } = node || {};

                            Promise.resolve().then(() => {
                                if (!newNotification.instance && instance) {
                                    newNotification.instance = instance;
                                    newNotification.sync = sync;
                                    flushNotice();
                                }
                            });
                        }}
                    />
                </Portal>
            );
        });

        return;
    }

    // Notification not ready
    if (!notification.instance) {
        return;
    }

    // >>> Execute task
    taskQueue.forEach(task => {
        // eslint-disable-next-line default-case
        switch (task.type) {
            case 'open': {
                act(() => {
                    notification!.instance!.open({
                        ...defaultGlobalConfig,
                        ...task.config,
                    });
                });
                break;
            }

            case 'destroy':
                act(() => {
                    notification?.instance!.destroy(task.key);
                });
                break;
        }
    });

    // Clean up
    taskQueue = [];
}

// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================

function setNotificationGlobalConfig(config: GlobalConfigProps) {
    defaultGlobalConfig = {
        ...defaultGlobalConfig,
        ...config,
    };

    // Trigger sync for it
    act(() => {
        notification?.sync?.();
    });
}

function open(config: ArgsProps) {
    const global = globalConfig();

    if (process.env.NODE_ENV !== 'production' && !global.holderRender) {
        warnContext('notification');
    }

    taskQueue.push({
        type: 'open',
        config,
    });

    flushNotice();
}

function destroy(key: JSX.Key) {
    taskQueue.push({
        type: 'destroy',
        key,
    });
    flushNotice();
}

interface BaseMethods {
    open: (config: ArgsProps) => void;
    destroy: (key?: JSX.Key) => void;
    config: (config: GlobalConfigProps) => void;
    useNotification: typeof useNotification;
    /** @private Internal Component. Do not use in your production. */
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
}

type StaticFn = (config: ArgsProps) => void;

interface NoticeMethods {
    success: StaticFn;
    info: StaticFn;
    warning: StaticFn;
    error: StaticFn;
}

const methods: (keyof NoticeMethods)[] = ['success', 'info', 'warning', 'error'];

const baseStaticMethods: BaseMethods = {
    open,
    destroy,
    config: setNotificationGlobalConfig,
    useNotification,
    _InternalPanelDoNotUseOrYouWillBeFired: PurePanel,
};

const staticMethods = baseStaticMethods as NoticeMethods & BaseMethods;

methods.forEach((type: keyof NoticeMethods) => {
    staticMethods[type] = config => open({ ...config, type });
});

// ==============================================================================
// ==                                   Test                                   ==
// ==============================================================================
const noop = () => {};

/** @internal Only Work in test env */
export let actWrapper: (wrapper: any) => void = noop;

if (process.env.NODE_ENV === 'test') {
    actWrapper = wrapper => {
        act = wrapper;
    };
}

/** @internal Only Work in test env */
export let actDestroy = noop;

if (process.env.NODE_ENV === 'test') {
    actDestroy = () => {
        notification = null;
    };
}

export default staticMethods;

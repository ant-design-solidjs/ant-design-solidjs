import { Component, JSX, Ref, useContext } from 'solid-js';
import clsx from 'clsx';
import { NotificationProvider, useNotification as useRcNotification } from '../sc-notification';
import type { NotificationAPI, NotificationConfig as RcNotificationConfig } from '../sc-notification';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { NotificationConfig as CPNotificationConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import type { ArgsProps, NotificationConfig, NotificationInstance, NotificationPlacement } from './interface';
import { getCloseIcon, PureContent } from './PurePanel';
import useStyle from './style';
import { getMotion, getPlacementStyle } from './util';
import { fillRef } from '@ant-design-solidjs/util';

const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;
const DEFAULT_PLACEMENT: NotificationPlacement = 'topRight';

// ==============================================================================
// ==                                  Holder                                  ==
// ==============================================================================
type HolderProps = NotificationConfig & {
    onAllRemoved?: VoidFunction;
    ref?: Ref<HolderRef>;
};

interface HolderRef extends NotificationAPI {
    prefixCls: string;
    notification?: CPNotificationConfig;
}

const Wrapper: Component<{ prefixCls: string; children?: JSX.Element }> = props => {
    const rootCls = useCSSVarCls(props.prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(props.prefixCls, rootCls);
    return wrapCSSVar(
        <NotificationProvider classes={{ list: clsx(hashId, cssVarCls, rootCls) }}>
            {props.children}
        </NotificationProvider>,
    );
};

const renderNotifications: RcNotificationConfig['renderNotifications'] = (node, { prefixCls }) => (
    <Wrapper prefixCls={prefixCls}>{node}</Wrapper>
);

const Holder = (props: HolderProps) => {
    const { getPrefixCls, getPopupContainer, notification, direction } = useContext(ConfigContext);
    const [, token] = useToken();

    const prefixCls = props.prefixCls || getPrefixCls('notification');

    // =============================== Style ===============================
    const getStyle = (placement: NotificationPlacement): JSX.CSSProperties =>
        getPlacementStyle(placement, props.top ?? DEFAULT_OFFSET, props.bottom ?? DEFAULT_OFFSET);

    const getClassName = () => clsx({ [`${prefixCls}-rtl`]: props.rtl ?? direction === 'rtl' });

    // ============================== Motion ===============================
    const getNotificationMotion = () => getMotion(prefixCls);

    // ============================== Origin ===============================
    const [api, holder] = useRcNotification({
        prefixCls,
        style: getStyle,
        className: getClassName,
        motion: getNotificationMotion,
        closable: true,
        closeIcon: getCloseIcon(prefixCls),
        duration: props.duration ?? DEFAULT_DURATION,
        getContainer: () => props.getContainer?.() || getPopupContainer?.() || document.body,
        maxCount: props.maxCount,
        onAllRemoved: props.onAllRemoved,
        renderNotifications,
        stack:
            props.stack === false
                ? false
                : {
                      threshold: typeof props.stack === 'object' ? props.stack?.threshold : undefined,
                      offset: 8,
                      gap: token.margin,
                  },
    });

    // ================================ Ref ================================
    // React.useImperativeHandle(ref, () => ({ ...api, prefixCls, notification }));
    fillRef(props.ref, { ...api, prefixCls, notification });

    return holder;
};

// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
export function useInternalNotification(
    notificationConfig?: HolderProps,
): readonly [NotificationInstance, JSX.Element] {
    let holderRef: HolderRef = null;

    const warning = devUseWarning('Notification');

    // >>> Open
    const open = (config: ArgsProps) => {
        if (!holderRef) {
            warning(
                false,
                'usage',
                'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
            );
            return;
        }

        const { open: originOpen, prefixCls, notification } = holderRef;

        const noticePrefixCls = `${prefixCls}-notice`;

        const {
            message,
            description,
            icon,
            type,
            btn,
            className,
            style,
            role = 'alert',
            closeIcon,
            ...restConfig
        } = config;

        const realCloseIcon = getCloseIcon(
            noticePrefixCls,
            typeof closeIcon !== 'undefined' ? closeIcon : notification?.closeIcon,
        );

        return originOpen({
            // use placement from props instead of hard-coding "topRight"
            placement: notificationConfig?.placement ?? DEFAULT_PLACEMENT,
            ...restConfig,
            content: (
                <PureContent
                    prefixCls={noticePrefixCls}
                    icon={icon}
                    type={type}
                    message={message}
                    description={description}
                    btn={btn}
                    role={role}
                />
            ),
            class: clsx(type && `${noticePrefixCls}-${type}`, className, notification?.class),
            style: { ...notification?.style, ...style },
            closeIcon: realCloseIcon,
            closable: !!realCloseIcon,
        });
    };

    // >>> destroy
    const destroy = (key?: JSX.Key) => {
        if (key !== undefined) {
            holderRef?.close(key);
        } else {
            holderRef?.destroy();
        }
    };

    // ================================ API ================================
    const wrapAPI = {
        open,
        destroy,
    } as NotificationInstance;

    const keys = ['success', 'info', 'warning', 'error'] as const;
    keys.forEach(type => {
        wrapAPI[type] = config =>
            open({
                ...config,
                type,
            });
    });

    // ============================== Return ===============================
    return [wrapAPI, <Holder {...notificationConfig} ref={holderRef} />] as const;
}

export default function useNotification(notificationConfig?: NotificationConfig) {
    return useInternalNotification(notificationConfig);
}

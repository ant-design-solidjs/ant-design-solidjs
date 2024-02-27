import CloseOutlined from '@ant-design-solidjs/icons/es/icons/CloseOutlined';
import clsx from 'clsx';
import { NotificationProvider, useNotification as useRcNotification } from 'rc-notification';
import type { NotificationAPI, NotificationConfig as RcNotificationConfig } from 'rc-notification';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { ComponentStyleConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { ArgsProps, ConfigOptions, MessageInstance, MessageType, NoticeType, TypeOpen } from './interface';
import { PureContent } from './PurePanel';
import useStyle from './style';
import { getMotion, wrapPromiseFn } from './util';
import { Component, JSX, useContext } from 'solid-js';

const DEFAULT_OFFSET = 8;
const DEFAULT_DURATION = 3;

// ==============================================================================
// ==                                  Holder                                  ==
// ==============================================================================
type HolderProps = ConfigOptions & {
    onAllRemoved?: VoidFunction;
};

interface HolderRef extends NotificationAPI {
    prefixCls: string;
    message?: ComponentStyleConfig;
}

const Wrapper: Component<{ prefixCls: string; children?: JSX.Element }> = props => {
    const rootCls = useCSSVarCls(props.prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(props.prefixCls, rootCls);
    return wrapCSSVar(
        <NotificationProvider classNames={{ list: clsx(hashId, cssVarCls, rootCls) }}>
            {props.children}
        </NotificationProvider>,
    );
};

const renderNotifications: RcNotificationConfig['renderNotifications'] = (node, { prefixCls }) => (
    <Wrapper prefixCls={prefixCls}>{node}</Wrapper>
);

const Holder = React.forwardRef<HolderRef, HolderProps>((props, ref) => {
    const {
        top,
        prefixCls: staticPrefixCls,
        getContainer: staticGetContainer,
        maxCount,
        duration = DEFAULT_DURATION,
        rtl,
        transitionName,
        onAllRemoved,
    } = props;
    const { getPrefixCls, getPopupContainer, message, direction } = useContext(ConfigContext);

    const prefixCls = staticPrefixCls || getPrefixCls('message');

    // =============================== Style ===============================
    const getStyle = (): JSX.CSSProperties => ({
        left: '50%',
        transform: 'translateX(-50%)',
        top: top ?? DEFAULT_OFFSET,
    });

    const getClassName = () => clsx({ [`${prefixCls}-rtl`]: rtl ?? direction === 'rtl' });

    // ============================== Motion ===============================
    const getNotificationMotion = () => getMotion(prefixCls, transitionName);

    // ============================ Close Icon =============================
    const mergedCloseIcon = (
        <span class={`${prefixCls}-close-x`}>
            <CloseOutlined class={`${prefixCls}-close-icon`} />
        </span>
    );

    // ============================== Origin ===============================
    const [api, holder] = useRcNotification({
        prefixCls,
        style: getStyle,
        className: getClassName,
        motion: getNotificationMotion,
        closable: false,
        closeIcon: mergedCloseIcon,
        duration,
        getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
        maxCount,
        onAllRemoved,
        renderNotifications,
    });

    // ================================ Ref ================================
    React.useImperativeHandle(ref, () => ({
        ...api,
        prefixCls,
        message,
    }));

    return holder;
});

// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
let keyIndex = 0;

export function useInternalMessage(messageConfig?: HolderProps): readonly [MessageInstance, JSX.Element] {
    let holderRef: HolderRef = null;

    const warning = devUseWarning('Message');

    // ================================ API ================================
    const wrapAPI = React.useMemo<MessageInstance>(() => {
        // Wrap with notification content

        // >>> close
        const close = (key: Jsx.Key) => {
            holderRef?.close(key);
        };

        // >>> Open
        const open = (config: ArgsProps): MessageType => {
            if (!holderRef) {
                warning(
                    false,
                    'usage',
                    'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
                );

                const fakeResult: any = () => {};
                fakeResult.then = () => {};
                return fakeResult;
            }

            const { open: originOpen, prefixCls, message } = holderRef;
            const noticePrefixCls = `${prefixCls}-notice`;

            const { content, icon, type, key, className, style, onClose, ...restConfig } = config;

            let mergedKey: Jsx.Key = key!;
            if (mergedKey === undefined || mergedKey === null) {
                keyIndex += 1;
                mergedKey = `antd-message-${keyIndex}`;
            }

            return wrapPromiseFn(resolve => {
                originOpen({
                    ...restConfig,
                    key: mergedKey,
                    content: (
                        <PureContent prefixCls={prefixCls} type={type} icon={icon}>
                            {content}
                        </PureContent>
                    ),
                    placement: 'top',
                    className: clsx(type && `${noticePrefixCls}-${type}`, className, message?.class),
                    style: { ...message?.style, ...style },
                    onClose: () => {
                        onClose?.();
                        resolve();
                    },
                });

                // Return close function
                return () => {
                    close(mergedKey);
                };
            });
        };

        // >>> destroy
        const destroy = (key?: Jsx.Key) => {
            if (key !== undefined) {
                close(key);
            } else {
                holderRef?.destroy();
            }
        };

        const clone = {
            open,
            destroy,
        } as MessageInstance;

        const keys: NoticeType[] = ['info', 'success', 'warning', 'error', 'loading'];
        keys.forEach(type => {
            const typeOpen: TypeOpen = (jointContent, duration, onClose) => {
                let config: ArgsProps;
                if (jointContent && typeof jointContent === 'object' && 'content' in jointContent) {
                    config = jointContent;
                } else {
                    config = {
                        content: jointContent,
                    };
                }

                // Params
                let mergedDuration: number | undefined;
                let mergedOnClose: VoidFunction | undefined;
                if (typeof duration === 'function') {
                    mergedOnClose = duration;
                } else {
                    mergedDuration = duration;
                    mergedOnClose = onClose;
                }

                const mergedConfig = {
                    onClose: mergedOnClose,
                    duration: mergedDuration,
                    ...config,
                    type,
                };

                return open(mergedConfig);
            };

            clone[type] = typeOpen;
        });

        return clone;
    }, []);

    // ============================== Return ===============================
    return [wrapAPI, <Holder key="message-holder" {...messageConfig} ref={holderRef} />] as const;
}

export default function useMessage(messageConfig?: ConfigOptions) {
    return useInternalMessage(messageConfig);
}

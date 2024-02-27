import { useContext, JSX, Component, createMemo } from 'solid-js';
import clsx from 'clsx';

import type { AnyObject, CustomComponent } from '../_util/type';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useMessage from '../message/useMessage';
import useModal from '../modal/useModal';
import useNotification from '../notification/useNotification';
import type { AppConfig, useAppProps } from './context';
import AppContext, { AppConfigContext } from './context';
import useStyle from './style';

export interface AppProps<P = AnyObject> extends AppConfig {
    style?: JSX.CSSProperties;
    className?: string;
    rootClassName?: string;
    prefixCls?: string;
    children?: ReactNode;
    component?: CustomComponent<P> | false;
}

const useApp = () => useContext<useAppProps>(AppContext);

const App: Component<AppProps> & { useApp: () => useAppProps } = props => {
    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        rootClassName,
        message,
        notification,
        style,
        component = 'div',
    } = props;
    const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
    const prefixCls = getPrefixCls('app', customizePrefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
    const customClassName = clsx(hashId, prefixCls, className, rootClassName, cssVarCls);

    const appConfig = useContext<AppConfig>(AppConfigContext);

    const mergedAppConfig = createMemo<AppConfig>(() => ({
        message: { ...appConfig.message, ...message },
        notification: { ...appConfig.notification, ...notification },
    }));

    const [messageApi, messageContextHolder] = useMessage(mergedAppConfig.message);
    const [notificationApi, notificationContextHolder] = useNotification(mergedAppConfig.notification);
    const [ModalApi, ModalContextHolder] = useModal();

    const memoizedContextValue = createMemo<useAppProps>(() => ({
        message: messageApi,
        notification: notificationApi,
        modal: ModalApi,
    }));

    // ============================ Render ============================
    const Component = component === false ? React.Fragment : component;
    const rootProps: AppProps = {
        className: customClassName,
        style,
    };

    return wrapCSSVar(
        <AppContext.Provider value={memoizedContextValue()}>
            <AppConfigContext.Provider value={mergedAppConfig()}>
                <Component {...(component === false ? undefined : rootProps)}>
                    {ModalContextHolder}
                    {messageContextHolder}
                    {notificationContextHolder}
                    {children}
                </Component>
            </AppConfigContext.Provider>
        </AppContext.Provider>,
    );
};

App.useApp = useApp;

export default App;

import {
    CheckCircleFilled,
    CloseCircleFilled,
    CloseOutlined,
    InfoCircleFilled,
    ExclamationCircleFilled,
} from '@ant-design-solidjs/icons';
import clsx from 'clsx';
import CSSMotion from '../motion';

import { ConfigContext } from '../config-provider';
import useStyle from './style';
import { Component, createMemo, createSignal, JSX, Show, splitProps, useContext } from 'solid-js';
import { pickAttrs } from '@ant-design-solidjs/util';
import { Dynamic } from 'solid-js/web';
import { callHandler } from '../_util/event.ts';

export interface AlertProps {
    /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
    type?: 'success' | 'info' | 'warning' | 'error';
    /** Whether Alert can be closed */
    closable?: boolean;
    /** Content of Alert */
    message?: JSX.Element;
    /** Additional content of Alert */
    description?: JSX.Element;
    /** Callback when close Alert */
    onClose?: JSX.MouseEventHandler<HTMLButtonElement>;
    /** Trigger when animation ending of Alert */
    afterClose?: () => void;
    /** Whether to show icon */
    showIcon?: boolean;
    /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
    role?: string;
    style?: JSX.CSSProperties;
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    banner?: boolean;
    icon?: JSX.Element;
    /** Custom closeIcon */
    closeIcon?: JSX.Element;
    action?: JSX.Element;
    onMouseEnter?: JSX.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: JSX.MouseEventHandler<HTMLDivElement>;
    onClick?: JSX.MouseEventHandler<HTMLDivElement>;
}

const iconMapFilled = {
    success: CheckCircleFilled,
    info: InfoCircleFilled,
    error: CloseCircleFilled,
    warning: ExclamationCircleFilled,
};

interface IconNodeProps {
    type: AlertProps['type'];
    icon: AlertProps['icon'];
    prefixCls: AlertProps['prefixCls'];
    description: AlertProps['description'];
}

const IconNode: Component<IconNodeProps> = props => {
    return (
        <Show
            when={!!props.icon}
            fallback={<Dynamic component={iconMapFilled[props.type] || null} class={`${props.prefixCls}-icon`} />}
        >
            <span class={`${props.prefixCls}-icon`}>{props.icon}</span>
        </Show>
    );
};

interface CloseIconProps {
    isClosable: boolean;
    prefixCls: AlertProps['prefixCls'];
    closeIcon: AlertProps['closeIcon'];
    handleClose: AlertProps['onClose'];
}

const CloseIconNode: Component<CloseIconProps> = props => {
    return (
        <Show when={props.isClosable}>
            <button type="button" onClick={props.handleClose} class={`${props.prefixCls}-close-icon`} tabIndex={0}>
                {props.closeIcon === true || props.closeIcon === undefined ? <CloseOutlined /> : props.closeIcon}
            </button>
        </Show>
    );
};

const Alert: Component<AlertProps> = _props => {
    const [props, otherProps] = splitProps(_props, [
        'description',
        'prefixCls',
        'message',
        'banner',
        'class',
        'rootClass',
        'style',
        'onMouseEnter',
        'onMouseLeave',
        'onClick',
        'afterClose',
        'showIcon',
        'closeIcon',
        'action',
        'closable',
    ]);

    const [closed, setClosed] = createSignal(false);

    const { getPrefixCls, direction, alert } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('alert', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

    const handleClose: JSX.MouseEventHandler<HTMLButtonElement> = e => {
        setClosed(true);
        callHandler(e, _props.onClose);
    };

    const type = createMemo<AlertProps['type']>(() => {
        if (_props.type !== undefined) {
            return _props.type;
        }
        // banner mode defaults to 'warning'
        return props.banner ? 'warning' : 'info';
    });

    // closeable when closeText or closeIcon is assigned
    const isClosable = createMemo<boolean>(() => {
        if (typeof props.closable === 'boolean') {
            return props.closable;
        }
        // should be true when closeIcon is 0 or ''
        return props.closeIcon !== false && props.closeIcon !== null && props.closeIcon !== undefined;
    });

    // banner mode defaults to Icon
    const isShowIcon = createMemo(() => {
        return props.banner && props.showIcon === undefined ? true : props.showIcon;
    });

    const alertCls = createMemo(() => {
        return clsx(
            prefixCls,
            `${prefixCls}-${type()}`,
            {
                [`${prefixCls}-with-description`]: !!props.description,
                [`${prefixCls}-no-icon`]: !isShowIcon(),
                [`${prefixCls}-banner`]: !!props.banner,
                [`${prefixCls}-rtl`]: direction === 'rtl',
            },
            alert?.class,
            props.class,
            props.rootClass,
            cssVarCls,
            hashId,
        );
    });

    const restProps = pickAttrs(otherProps, { aria: true, data: true });

    return wrapCSSVar(
        <CSSMotion
            visible={!closed()}
            motionName={`${prefixCls}-motion`}
            motionAppear={false}
            motionEnter={false}
            onLeaveStart={node => ({ maxHeight: node.offsetHeight })}
            onLeaveEnd={props.afterClose}
        >
            {({ class: motionClass, style }, setRef) => (
                <div
                    ref={setRef}
                    data-show={!closed()}
                    class={clsx(alertCls(), motionClass)}
                    style={{ ...alert?.style, ...props.style, ...style }}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                    onClick={props.onClick}
                    role="alert"
                    {...restProps}
                >
                    <Show when={isShowIcon()}>
                        <IconNode
                            description={props.description}
                            icon={_props.icon}
                            prefixCls={prefixCls}
                            type={type()}
                        />
                    </Show>

                    <div class={`${prefixCls}-content`}>
                        <Show when={props.message}>
                            <div class={`${prefixCls}-message`}>{props.message}</div>
                        </Show>
                        <Show when={props.description}>
                            <div class={`${prefixCls}-description`}>{props.description}</div>
                        </Show>
                    </div>
                    <Show when={props.action}>
                        <div class={`${prefixCls}-action`}>{props.action}</div>
                    </Show>
                    <CloseIconNode
                        isClosable={isClosable()}
                        prefixCls={prefixCls}
                        closeIcon={props.closeIcon ?? alert?.closeIcon}
                        handleClose={handleClose}
                    />
                </div>
            )}
        </CSSMotion>,
    );
};

export default Alert;

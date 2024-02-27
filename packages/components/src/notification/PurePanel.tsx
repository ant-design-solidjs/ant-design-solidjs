import CheckCircleFilled from '@ant-design-solidjs/icons/es/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design-solidjs/icons/es/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design-solidjs/icons/es/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design-solidjs/icons/es/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design-solidjs/icons/es/icons/InfoCircleFilled';
import clsx from 'clsx';
import { Notice, NoticeProps } from '../sc-notification';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { IconType } from './interface';
import useStyle from './style';
import PurePanelStyle from './style/pure-panel';
import { Component, createMemo, JSX, Match, mergeProps, Show, splitProps, Switch, useContext } from 'solid-js';
import { AntdIconProps } from '@ant-design-solidjs/icons';

export function getCloseIcon(prefixCls: string, closeIcon?: JSX.Element): JSX.Element {
    if (closeIcon === null || closeIcon === false) {
        return null;
    }
    return (
        closeIcon || (
            <span class={`${prefixCls}-close-x`}>
                <CloseOutlined class={`${prefixCls}-close-icon`} />
            </span>
        )
    );
}

export interface PureContentProps {
    prefixCls: string;
    icon?: JSX.Element;
    message?: JSX.Element;
    description?: JSX.Element;
    btn?: JSX.Element;
    type?: IconType;
    role?: 'alert' | 'status';
}

const typeToIcon = {
    success: (props: AntdIconProps) => <CheckCircleFilled {...props} />,
    info: (props: AntdIconProps) => <InfoCircleFilled {...props} />,
    error: (props: AntdIconProps) => <CloseCircleFilled {...props} />,
    warning: (props: AntdIconProps) => <ExclamationCircleFilled {...props} />,
};

export const PureContent: Component<PureContentProps> = _props => {
    const props = mergeProps({ role: 'alert' }, _props);

    return (
        <div class={clsx({ [`${props.prefixCls}-with-icon`]: props.icon || props.type })} role={props.role}>
            <Switch>
                <Match when={props.icon}>
                    <span class={`${props.prefixCls}-icon`}>{props.icon}</span>;
                </Match>
                <Match when={props.type}>
                    {typeToIcon[props.type]({
                        class: clsx(`${props.prefixCls}-icon`, `${props.prefixCls}-icon-${props.type}`),
                    })}
                </Match>
            </Switch>
            <div class={`${props.prefixCls}-message`}>{props.message}</div>
            <div class={`${props.prefixCls}-description`}>{props.description}</div>
            <Show when={props.btn}>
                <div class={`${props.prefixCls}-btn`}>{props.btn}</div>
            </Show>
        </div>
    );
};

export interface PurePanelProps
    extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
        Omit<PureContentProps, 'prefixCls' | 'children'> {
    prefixCls?: string;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: Component<PurePanelProps> = _props => {
    const mergedProps = mergeProps({ closable: true }, _props);
    const [props, restProps] = splitProps(mergedProps, [
        'prefixCls',
        'class',
        'icon',
        'type',
        'message',
        'description',
        'btn',
        'closable',
        'closeIcon',
        'class',
    ]);

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = createMemo(() => props.prefixCls || getPrefixCls('notification'));

    const rootCls = useCSSVarCls(prefixCls());
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls(), rootCls);

    return wrapCSSVar(
        <div class={clsx(`${prefixCls()}-notice-pure-panel`, hashId, props.class, cssVarCls, rootCls)}>
            <PurePanelStyle prefixCls={prefixCls()} />
            <Notice
                {...restProps}
                prefixCls={prefixCls()}
                eventKey="pure"
                duration={null}
                closable={props.closable}
                class={clsx({ notificationClassName: props.class })}
                closeIcon={getCloseIcon(prefixCls(), props.closeIcon)}
                content={
                    <PureContent
                        prefixCls={`${prefixCls()}-notice`}
                        icon={props.icon}
                        type={props.type}
                        message={props.message}
                        description={props.description}
                        btn={props.btn}
                    />
                }
            />
        </div>,
    );
};

export default PurePanel;

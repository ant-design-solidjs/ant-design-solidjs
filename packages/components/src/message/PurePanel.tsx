import CheckCircleFilled from '@ant-design-solidjs/icons/es/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design-solidjs/icons/es/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design-solidjs/icons/es/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design-solidjs/icons/es/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design-solidjs/icons/es/icons/LoadingOutlined';
import clsx from 'clsx';
import { Notice } from 'rc-notification';
import type { NoticeProps } from 'rc-notification/lib/Notice';
import { ConfigContext } from '../config-provider';
import type { NoticeType } from './interface';
import useStyle from './style';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { Component, JSX, useContext } from 'solid-js';

export const TypeIcon = {
    info: <InfoCircleFilled />,
    success: <CheckCircleFilled />,
    error: <CloseCircleFilled />,
    warning: <ExclamationCircleFilled />,
    loading: <LoadingOutlined />,
};

export interface PureContentProps {
    prefixCls: string;
    type?: NoticeType;
    icon?: JSX.Element;
    children: JSX.Element;
}

export const PureContent: Component<PureContentProps> = props => (
    <div class={clsx(`${props.prefixCls}-custom-content`, `${props.prefixCls}-${props.type}`)}>
        {props.icon || TypeIcon[props.type!]}
        <span>{props.children}</span>
    </div>
);

export interface PurePanelProps
    extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
        Omit<PureContentProps, 'prefixCls' | 'children'> {
    prefixCls?: string;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: Component<PurePanelProps> = props => {
    const { prefixCls: staticPrefixCls, className, type, icon, content, ...restProps } = props;
    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = staticPrefixCls || getPrefixCls('message');

    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    return wrapCSSVar(
        <Notice
            {...restProps}
            prefixCls={prefixCls}
            class={clsx(className, hashId, `${prefixCls}-notice-pure-panel`, cssVarCls, rootCls)}
            eventKey="pure"
            duration={null}
            content={
                <PureContent prefixCls={prefixCls} type={type} icon={icon}>
                    {content}
                </PureContent>
            }
        />,
    );
};

export default PurePanel;

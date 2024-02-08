import classNames from 'clsx';
import { ConfigContext } from '../config-provider';
import BackTop from './BackTop';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import type { FloatButtonGroupProps, FloatButtonProps } from './interface';
import { Component, createMemo, For, Show, splitProps, useContext } from 'solid-js';

export interface PureFloatButtonProps extends Omit<FloatButtonProps, 'target'> {
    backTop?: boolean;
}

export interface PurePanelProps extends PureFloatButtonProps, Omit<FloatButtonGroupProps, 'children'> {
    /** Convert to FloatGroup when configured */
    items?: PureFloatButtonProps[];
}

const PureFloatButton: Component<PureFloatButtonProps> = _props => {
    const [props, rest] = splitProps(_props, ['backTop']);

    return (
        <Show when={props.backTop} fallback={<FloatButton {...rest} />}>
            <BackTop {...rest} visibilityHeight={0} />
        </Show>
    );
};

/** @private Internal Component. Do not use in your production. */
const PurePanel: Component<PurePanelProps> = _props => {
    const [props, rest] = splitProps(_props, ['class', 'items']);

    const { getPrefixCls } = useContext(ConfigContext);
    const pureCls = createMemo(() => {
        const prefixCls = getPrefixCls(floatButtonPrefixCls, rest.prefixCls);
        return `${prefixCls}-pure`;
    });

    return (
        <Show when={props.items} fallback={<PureFloatButton class={classNames(props.class, pureCls())} {...rest} />}>
            <FloatButtonGroup class={classNames(props.class, pureCls())} {...rest}>
                <For each={props.items}>{item => <PureFloatButton {...item} />}</For>
            </FloatButtonGroup>
        </Show>
    );
};

export default PurePanel;

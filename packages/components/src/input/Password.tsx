import EyeInvisibleOutlined from '@ant-design-solidjs/icons/es/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design-solidjs/icons/es/icons/EyeOutlined';
import clsx from 'clsx';
import { omit, composeRef } from '@ant-design-solidjs/util';

import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import type { InputProps, InputRef } from './Input';
import Input from './Input';
import { createEffect, createMemo, createSignal, JSX, mergeProps, Show, splitProps, useContext } from 'solid-js';

const defaultIconRender: PasswordProps['iconRender'] = props => (
    <Show when={props.visible} fallback={<EyeInvisibleOutlined />}>
        <EyeOutlined />
    </Show>
);

interface VisibilityToggle {
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
}

export interface PasswordProps extends InputProps {
    readonly inputPrefixCls?: string;
    readonly action?: 'click' | 'hover';
    visibilityToggle?: boolean | VisibilityToggle;
    iconRender?: (props: { visible: boolean; [key: string]: any }) => JSX.Element;
}

const actionMap: Record<PropertyKey, keyof JSX.DOMAttributes<HTMLSpanElement>> = {
    click: 'onClick',
    hover: 'onMouseOver',
};

type IconPropsType = JSX.HTMLAttributes<HTMLSpanElement>;

const Password = (_props: PasswordProps) => {
    const props = mergeProps({ visibilityToggle: true }, _props);

    const [visible, setVisible] = createSignal(
        typeof props.visibilityToggle === 'object' && props.visibilityToggle.visible !== undefined
            ? props.visibilityToggle.visible!
            : false,
    );
    let inputRef: InputRef = null;

    createEffect(() => {
        if (typeof props.visibilityToggle === 'object' && props.visibilityToggle.visible !== undefined) {
            setVisible(props.visibilityToggle.visible!);
        }
    });

    // Remove Password value
    const removePasswordTimeout = useRemovePasswordTimeout(inputRef);

    const onVisibleChange = () => {
        if (props.disabled) {
            return;
        }
        if (visible) {
            removePasswordTimeout();
        }
        setVisible(prevState => {
            const newState = !prevState;
            if (typeof props.visibilityToggle === 'object') {
                props.visibilityToggle.onVisibleChange?.(newState);
            }
            return newState;
        });
    };

    const getIcon = (prefixCls: string) => {
        const { action = 'click', iconRender = defaultIconRender } = props;
        const iconTrigger = actionMap[action] || '';
        const iconProps: IconPropsType = {
            [iconTrigger]: onVisibleChange,
            class: `${prefixCls}-icon`,
            onMouseDown: (e: JSX.MouseEvent<HTMLSpanElement>) => {
                // Prevent focused state lost
                // https://github.com/ant-design/ant-design/issues/15173
                e.preventDefault();
            },
            onMouseUp: (e: JSX.MouseEvent<HTMLSpanElement>) => {
                // Prevent caret position change
                // https://github.com/ant-design/ant-design/issues/23524
                e.preventDefault();
            },
        };
        return iconRender({ visible: visible(), ...iconProps });
    };

    const [ps, restProps] = splitProps(props, ['class', 'prefixCls', 'inputPrefixCls', 'size']);

    const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

    const omittedProps = createMemo(() => {
        const inputPrefixCls = getPrefixCls('input', ps.prefixCls);
        const prefixCls = getPrefixCls('input-password', ps.prefixCls);
        const suffixIcon = props.visibilityToggle && getIcon(prefixCls);

        const inputClassName = clsx(prefixCls, ps.class, {
            [`${prefixCls}-${ps.size}`]: !!ps.size,
        });

        const omittedProps: InputProps = {
            ...omit(restProps, ['suffix', 'iconRender', 'visibilityToggle']),
            type: visible ? 'text' : 'password',
            class: inputClassName,
            prefixCls: inputPrefixCls,
            suffix: suffixIcon,
        };

        if (ps.size) {
            omittedProps.size = ps.size;
        }
        return omittedProps;
    });

    return <Input ref={composeRef(props.ref, inputRef)} {...omittedProps()} />;
};

if (process.env.NODE_ENV !== 'production') {
    Password.displayName = 'Input.Password';
}

export default Password;

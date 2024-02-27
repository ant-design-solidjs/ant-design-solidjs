import {
    children as Children,
    createEffect,
    createMemo,
    createSignal,
    JSX,
    mergeProps,
    onCleanup,
    Show,
    splitProps,
    useContext,
} from 'solid-js';
import {
    ButtonHTMLType,
    ButtonShape,
    ButtonType,
    isTwoCNChar,
    isUnBorderedButtonType,
    spaceChildren,
} from './buttonHelpers';
import { SizeType } from '../config-provider/SizeContext';
import clsx from 'clsx';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import useSize from '../config-provider/hooks/useSize';
import Group, { GroupSizeContext } from './button-group';
import { useCompactItemContext } from '../space/Compact';
import { fillRef, omit } from '@ant-design-solidjs/util';
import DisabledContext from '../config-provider/DisabledContext';
import CompactCmp from './style/compactCmp';
import IconWrapper from './IconWrapper.tsx';
import LoadingIcon from './LoadingIcon.tsx';
import Wave from '../_util/wave';

export interface BaseButtonProps {
    type?: ButtonType;
    icon?: JSX.Element;
    shape?: ButtonShape;
    size?: SizeType;
    disabled?: boolean;
    loading?: boolean | { delay?: number };
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    [key: `data-${string}`]: string;
    classes?: { icon: string };
    styles?: { icon: JSX.CSSProperties };
    children?: JSX.Element;
    style?: JSX.CSSProperties;
    onClick?: JSX.EventHandler<HTMLElement, MouseEvent>;
}

type MergedHTMLAttributes = Omit<
    JSX.HTMLAttributes<HTMLElement> &
        JSX.ButtonHTMLAttributes<HTMLButtonElement> &
        JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
    'type' | 'style' | 'onClick' | 'ref'
>;

export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
    href?: string;
    htmlType?: ButtonHTMLType;
    ref?: HTMLButtonElement | HTMLAnchorElement;
}
type LoadingConfigType = {
    loading: boolean;
    delay: number;
};

function getLoadingConfig(loading: BaseButtonProps['loading']): LoadingConfigType {
    if (typeof loading === 'object' && loading) {
        let delay = loading?.delay;
        delay = !Number.isNaN(delay) && typeof delay === 'number' ? delay : 0;
        return {
            loading: delay <= 0,
            delay,
        };
    }

    return {
        loading: !!loading,
        delay: 0,
    };
}

const Button = (_props: ButtonProps) => {
    const mergedProps = mergeProps(
        {
            loading: false,
            type: 'default',
            shape: 'default',
            ghost: false,
            block: false,
            htmlType: 'button',
            size: 'middle',
        },
        _props,
    );

    let btnRef: HTMLButtonElement | HTMLAnchorElement;

    const [props, rest] = splitProps(mergedProps, [
        'htmlType',
        'loading',
        'prefixCls',
        'type',
        'danger',
        'shape',
        'size',
        'styles',
        'class',
        'rootClass',
        'children',
        'icon',
        'ghost',
        'htmlType',
        'block',
        'classes',
        'style',
        'onClick',
        'ref',
    ]);

    const { getPrefixCls, autoInsertSpaceInButton, direction, button } = useContext(ConfigContext);

    const prefixCls = createMemo(() => getPrefixCls('btn', props.prefixCls));

    const [hasTwoCNChar, setHasTwoCNChar] = createSignal<boolean>(false);

    const { compactSize, compactItemClasses } = useCompactItemContext(prefixCls(), direction);

    const loadingOrDelay = createMemo<LoadingConfigType>(() => getLoadingConfig(props.loading));

    const [innerLoading, setLoading] = createSignal<boolean>(loadingOrDelay().loading);

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls());

    const disabled = useContext(DisabledContext);
    const mergedDisabled = createMemo(() => rest.disabled ?? disabled);

    const linkButtonRestProps = createMemo(() => omit(rest as ButtonProps & { navigate: any }, ['navigate']));

    createEffect(() => {
        let delayTimer: ReturnType<typeof setTimeout> | null = null;
        if (loadingOrDelay().delay > 0) {
            delayTimer = setTimeout(() => {
                delayTimer = null;
                setLoading(true);
            }, loadingOrDelay().delay);
        } else {
            setLoading(loadingOrDelay().loading);
        }

        onCleanup(() => {
            if (delayTimer) {
                clearTimeout(delayTimer);
                delayTimer = null;
            }
        });
    });

    createEffect(() => {
        // FIXME: for HOC usage like <FormatMessage />
        if (!btnRef || autoInsertSpaceInButton === false) {
            return;
        }
        const buttonText = btnRef.textContent;
        if (needInserted() && isTwoCNChar(buttonText)) {
            if (!hasTwoCNChar()) {
                setHasTwoCNChar(true);
            }
        } else if (hasTwoCNChar()) {
            setHasTwoCNChar(false);
        }
    });

    const classes = createMemo(() => {
        const sizeClassMap = { large: 'lg', small: 'sm', middle: undefined };

        const groupSize = useContext(GroupSizeContext);

        const sizeFullName = useSize(ctxSize => props.size ?? compactSize ?? groupSize ?? ctxSize);

        const sizeCls = sizeFullName ? sizeClassMap[sizeFullName()] || '' : '';

        const iconType = innerLoading ? 'loading' : props.icon;

        return clsx(
            prefixCls(),
            hashId,
            cssVarCls,
            {
                [`${prefixCls()}-${props.shape}`]: props.shape !== 'default' && props.shape,
                [`${prefixCls()}-${props.type}`]: props.type,
                [`${prefixCls()}-${sizeCls}`]: sizeCls,
                [`${prefixCls()}-icon-only`]:
                    !props.children && Children(() => props.children).toArray().length !== 0 && !!iconType,
                [`${prefixCls()}-background-ghost`]: props.ghost && !isUnBorderedButtonType(props.type),
                [`${prefixCls()}-loading`]: innerLoading(),
                [`${prefixCls()}-two-chinese-chars`]: hasTwoCNChar() && autoInsertSpaceInButton && !innerLoading(),
                [`${prefixCls()}-block`]: props.block,
                [`${prefixCls()}-dangerous`]: !!props.danger,
                [`${prefixCls()}-rtl`]: direction === 'rtl',
            },
            compactItemClasses(),
            props.class,
            props.rootClass,
            button?.class,
        );
    });

    const iconNode = createMemo(() => {
        const iconClasses = clsx(props.classes?.icon, button?.classes?.icon);
        const iconStyle: JSX.CSSProperties = {
            ...(props.styles?.icon || {}),
            ...(button?.styles?.icon || {}),
        };

        return (
            <Show
                when={props.icon && !innerLoading()}
                fallback={<LoadingIcon existIcon={!!props.icon} prefixCls={prefixCls()} loading={!!innerLoading()} />}
            >
                <IconWrapper prefixCls={prefixCls()} class={iconClasses} style={iconStyle}>
                    {props.icon}
                </IconWrapper>
            </Show>
        );
    });

    const fullStyle = createMemo<JSX.CSSProperties>(() => ({ ...button?.style, ...props.style }));

    const handleClick = e => {
        // FIXME: https://github.com/ant-design/ant-design/issues/30207
        if (innerLoading() || mergedDisabled()) {
            e.preventDefault();
            return;
        }
        props.onClick?.(e);
    };
    const needInserted = createMemo(() => {
        return (
            Children(() => props.children).toArray().length === 1 && !props.icon && !isUnBorderedButtonType(props.type)
        );
    });

    const kids = createMemo(() => {
        return props.children || Children(() => props.children).toArray().length === 0
            ? spaceChildren(props.children, needInserted() && autoInsertSpaceInButton)
            : null;
    });

    const linkNode = () => (
        <a
            {...linkButtonRestProps()}
            class={clsx(classes(), {
                [`${prefixCls()}-disabled`]: mergedDisabled(),
            })}
            href={mergedDisabled() ? undefined : linkButtonRestProps().href}
            style={fullStyle()}
            onClick={handleClick}
            tabIndex={mergedDisabled() ? -1 : 0}
            ref={el => (btnRef = el) && fillRef(props.ref, el)}
        >
            {iconNode()}
            {kids()}
        </a>
    );

    const ButtonNode = (ps: { ref?: HTMLButtonElement }) => (
        <button
            {...rest}
            type={props.htmlType}
            class={classes()}
            style={fullStyle()}
            onClick={handleClick}
            disabled={mergedDisabled()}
            ref={el => {
                btnRef = el;
                fillRef(props.ref, el);
                fillRef(ps.ref, el);
            }}
        >
            {iconNode()}
            {kids()}

            {/* Styles: compact */}
            {!!compactItemClasses() && <CompactCmp prefixCls={prefixCls()} />}
        </button>
    );

    const waveButtonNode = () => (
        <Show when={!isUnBorderedButtonType(props.type)} fallback={<ButtonNode />}>
            <Wave component="Button" disabled={!!innerLoading()}>
                {(_, ref) => <ButtonNode ref={ref} />}
            </Wave>
        </Show>
    );

    return (
        <Show fallback={wrapCSSVar(waveButtonNode())} when={linkButtonRestProps().href !== undefined}>
            {wrapCSSVar(linkNode())}
        </Show>
    );
};

Button.Group = Group;
Button.__ANT_BUTTON = true;

export default Button;

import {
    useContext,
    createEffect,
    Component,
    onCleanup,
    createMemo,
    JSX,
    splitProps,
    mergeProps,
    Show,
} from 'solid-js';
import CloseOutlined from '@ant-design-solidjs/icons/es/icons/CloseOutlined';
import FileTextOutlined from '@ant-design-solidjs/icons/es/icons/FileTextOutlined';
import classNames from 'clsx';
import CSSMotion from '../motion';
import { useMergedState } from '@ant-design-solidjs/util';

import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { FloatButtonGroupProvider } from './context';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { FloatButtonGroupProps, FloatButtonRef } from './interface';
import useStyle from './style';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';

const FloatButtonGroup: Component<FloatButtonGroupProps> = _props => {
    const [ps, floatButtonProps] = splitProps(_props, [
        'prefixCls',
        'class',
        'style',
        'shape',
        'type',
        'icon',
        'closeIcon',
        'description',
        'trigger',
        'closeIcon',
        'children',
        'onOpenChange',
        'open',
    ]);
    const props = mergeProps(
        { shape: 'circle', type: 'default', icon: <FileTextOutlined />, closeIcon: <CloseOutlined /> },
        ps,
    );

    const { direction, getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
    const prefixCls = getPrefixCls(floatButtonPrefixCls, props.prefixCls);
    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
    const groupPrefixCls = `${prefixCls}-group`;

    const groupCls = createMemo(() => {
        return classNames(groupPrefixCls, hashId, cssVarCls, rootCls, props.class, {
            [`${groupPrefixCls}-rtl`]: direction === 'rtl',
            [`${groupPrefixCls}-${props.shape}`]: props.shape,
            [`${groupPrefixCls}-${props.shape}-shadow`]: !props.trigger,
        });
    });

    const wrapperCls = classNames(hashId, `${groupPrefixCls}-wrap`);

    const [open, setOpen] = useMergedState(false, { value: props.open });

    let floatButtonGroupRef: HTMLDivElement = null;

    let floatButtonRef: FloatButtonRef['nativeElement'] = null;

    const hoverAction = createMemo<JSX.DOMAttributes<HTMLDivElement>>(() => {
        const hoverTypeAction = {
            onMouseEnter() {
                setOpen(true);
                props.onOpenChange?.(true);
            },
            onMouseLeave() {
                setOpen(false);
                props.onOpenChange?.(false);
            },
        };
        return props.trigger === 'hover' ? hoverTypeAction : {};
    });

    const handleOpenChange = () => {
        setOpen(prevState => {
            props.onOpenChange?.(!prevState);
            return !prevState;
        });
    };

    const onClick = (e: MouseEvent) => {
        if (floatButtonGroupRef?.contains(e.target as Node)) {
            if (floatButtonRef?.contains(e.target as Node)) {
                handleOpenChange();
            }
            return;
        }
        setOpen(false);
        props.onOpenChange?.(false);
    };

    createEffect(() => {
        if (props.trigger === 'click') {
            document.addEventListener('click', onClick);
            onCleanup(() => {
                document.removeEventListener('click', onClick);
            });
        }
    });

    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
        const warning = devUseWarning('FloatButton.Group');

        warning(!('open' in props) || !!props.trigger, 'usage', '`open` need to be used together with `trigger`');
    }

    return wrapCSSVar(
        <FloatButtonGroupProvider value={props.shape}>
            <div ref={floatButtonGroupRef} class={groupCls()} style={props.style} {...hoverAction()}>
                <Show when={props.trigger && ['click', 'hover'].includes(props.trigger)} fallback={props.children}>
                    <>
                        <CSSMotion visible={open} motionName={`${groupPrefixCls}-wrap`}>
                            {({ className: motionClassName }) => (
                                <div class={classNames(motionClassName, wrapperCls)}>{props.children}</div>
                            )}
                        </CSSMotion>
                        <FloatButton
                            ref={floatButtonRef}
                            type={props.type}
                            shape={props.shape}
                            icon={open ? props.closeIcon : props.icon}
                            description={props.description}
                            aria-label={props['aria-label']}
                            {...floatButtonProps}
                        />
                    </>
                </Show>
            </div>
        </FloatButtonGroupProvider>,
    );
};

export default FloatButtonGroup;

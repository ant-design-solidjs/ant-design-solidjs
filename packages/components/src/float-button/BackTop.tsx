import VerticalAlignTopOutlined from '@ant-design-solidjs/icons/es/icons/VerticalAlignTopOutlined';
import classNames from 'clsx';
import CSSMotion from '../motion';

import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import FloatButtonGroupContext from './context';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { BackTopProps, FloatButtonElement, FloatButtonRef, FloatButtonShape } from './interface';
import { createEffect, createSignal, JSX, mergeProps, onCleanup, splitProps, useContext } from 'solid-js';
import { fillRef } from '@ant-design-solidjs/util';

const BackTop = (_props: BackTopProps) => {
    const [ps, restProps] = splitProps(_props, [
        'prefixCls',
        'class',
        'type',
        'shape',
        'visibilityHeight',
        'icon',
        'target',
        'onClick',
        'duration',
    ]);
    const props = mergeProps(
        { type: 'default', shape: 'circle', visibilityHeight: 400, icon: <VerticalAlignTopOutlined />, duration: 450 },
        ps,
    );

    const [visible, setVisible] = createSignal<boolean>(props.visibilityHeight === 0);

    let internalRef: FloatButtonRef['nativeElement'] = null;

    // React.useImperativeHandle(ref, () => ({
    //     nativeElement: internalRef.current,
    // }));

    const getDefaultTarget = (): HTMLElement | Document | Window =>
        internalRef && internalRef.ownerDocument ? internalRef.ownerDocument : window;

    const handleScroll = throttleByAnimationFrame((e: JSX.EventHandler<HTMLElement, UIEvent> | { target: any }) => {
        // @ts-expect-error
        const scrollTop = getScroll(e.target, true);
        setVisible(scrollTop >= props.visibilityHeight);
    });

    createEffect(() => {
        const getTarget = props.target || getDefaultTarget;
        const container = getTarget();
        handleScroll({ target: container });
        container?.addEventListener('scroll', handleScroll);
        onCleanup(() => {
            handleScroll.cancel();
            container?.removeEventListener('scroll', handleScroll);
        });
    });

    const scrollToTop: JSX.EventHandler<FloatButtonElement, MouseEvent> = e => {
        scrollTo(0, { getContainer: props.target || getDefaultTarget, duration: props.duration });
        props.onClick?.(e);
    };

    const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

    const groupShape = useContext<FloatButtonShape | undefined>(FloatButtonGroupContext);

    return (
        <CSSMotion visible={visible()} motionName={`${getPrefixCls()}-fade`}>
            {({ className: motionClassName }, ref) => (
                <FloatButton
                    ref={el => (internalRef = el) && fillRef(ref, el)}
                    {...{
                        prefixCls: getPrefixCls(floatButtonPrefixCls, props.prefixCls),
                        icon: props.icon,
                        type: props.type,
                        shape: groupShape || props.shape,
                        ...restProps,
                    }}
                    onClick={scrollToTop}
                    class={classNames(props.class, motionClassName)}
                />
            )}
        </CSSMotion>
    );
};

export default BackTop;

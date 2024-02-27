import clsx from 'clsx';
import { KeyCode } from '@ant-design-solidjs/util';
import type { NoticeConfig } from './interface';
import { createEffect, createSignal, JSX, mergeProps, onCleanup, Ref, Show } from 'solid-js';
import { callHandler } from '../_util/event.ts';

export interface NoticeProps extends Omit<NoticeConfig, 'onClose'> {
    prefixCls: string;
    class?: string;
    style?: JSX.CSSProperties;
    eventKey: JSX.Key;

    onClick?: JSX.MouseEventHandler<HTMLDivElement>;
    onNoticeClose?: (key: JSX.Key) => void;
    hovering?: boolean;
    ref?: Ref<HTMLDivElement>;
}

const Notify = (_props: NoticeProps & { times?: number }) => {
    const props = mergeProps({ duration: 4.5, closeIcon: 'x' }, _props);

    const [hovering, setHovering] = createSignal(false);

    // ======================== Close =========================
    const onInternalClose = () => {
        props.onNoticeClose(props.eventKey);
    };

    const onCloseKeyDown: JSX.KeyboardEventHandler<HTMLAnchorElement> = e => {
        if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === KeyCode.ENTER) {
            onInternalClose();
        }
    };

    // ======================== Effect ========================
    createEffect(() => {
        if ((props.hovering || hovering()) && props.duration > 0) {
            const timeout = setTimeout(() => {
                onInternalClose();
            }, props.duration * 1000);

            onCleanup(() => {
                clearTimeout(timeout);
            });
        }
    });

    return (
        <div
            {...props.props}
            ref={props.ref}
            class={clsx(`${props.prefixCls}-notice`, props.class, {
                [`${props.prefixCls}-notice-closable`]: props.closable,
            })}
            style={props.style}
            onMouseEnter={e => {
                setHovering(true);
                callHandler(e, props.props?.onMouseEnter);
            }}
            onMouseLeave={e => {
                setHovering(false);
                callHandler(e, props.props?.onMouseLeave);
            }}
            onClick={props.onClick}
        >
            {/* Content */}
            <div class={`${props.prefixCls}-notice-content`}>{props.content}</div>

            {/* Close Icon */}
            <Show when={props.closable}>
                <a
                    tabIndex={0}
                    class={`${props.prefixCls}-notice-close`}
                    onKeyDown={onCloseKeyDown}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onInternalClose();
                    }}
                >
                    {props.closeIcon}
                </a>
            </Show>
        </div>
    );
};

export default Notify;

import clsx from 'clsx';
import { isVisible, raf } from '@ant-design-solidjs/util';
import { Component, createEffect, JSX, onCleanup, Show, useContext } from 'solid-js';
import type { ConfigConsumerProps } from '../../config-provider';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import useToken from '../../theme/useToken.ts';
import { type ShowWave, TARGET_CLS } from './interface.ts';
import showWaveEffect from './WaveEffect';

export interface WaveProps {
    disabled?: boolean;
    children?: (props: any, ref: any) => JSX.Element;
    component?: string;
}

const Wave: Component<WaveProps> = props => {
    const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

    let containerRef: HTMLElement;

    // ============================== Style ===============================
    const prefixCls = getPrefixCls('wave');
    const [, hashId] = useStyle(prefixCls);

    const { wave } = useContext(ConfigContext);
    const [, token, hid] = useToken();

    const showWave = event => {
        if (wave?.disabled || !containerRef) {
            return;
        }

        const targetNode = containerRef.querySelector<HTMLElement>(`.${TARGET_CLS}`) || containerRef;

        const { showEffect } = wave || {};

        // Customize wave effect
        (showEffect || showWaveEffect)(targetNode, {
            class: clsx(prefixCls, hashId),
            token,
            component: props.component,
            event,
            hashId: hid,
        });
    };

    let rafId: number;

    // Merge trigger event into one for each frame
    const showDebounceWave: ShowWave = event => {
        raf.cancel(rafId!);

        rafId = raf(() => {
            showWave(event);
        });
    };

    // ============================== Effect ==============================
    createEffect(() => {
        const node = containerRef;

        if (!node || node.nodeType !== 1 || props.disabled) {
            return;
        }

        // Click handler
        const onClick = (e: MouseEvent) => {
            // Fix radio button click twice
            if (
                !isVisible(e.target as HTMLElement) ||
                // No need wave
                !node.getAttribute ||
                node.getAttribute('disabled') ||
                (node as HTMLInputElement).disabled ||
                node.className.includes('disabled') ||
                node.className.includes('-leave')
            ) {
                return;
            }
            showDebounceWave(e);
        };

        // Bind events
        node.addEventListener('click', onClick, true);

        onCleanup(() => node.removeEventListener('click', onClick, true));
    });

    return <Show when={props.children}>{props.children({}, el => (containerRef = el))}</Show>;
};

export default Wave;

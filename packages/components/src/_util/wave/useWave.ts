import { raf } from '@ant-design-solidjs/util';
import showWaveEffect from './WaveEffect';
import { ConfigContext } from '../../config-provider';
import useToken from '../../theme/useToken';
import { TARGET_CLS, type ShowWave } from './interface';
import { useContext } from 'solid-js';

export default function useWave(nodeRef: HTMLElement, className: string, component?: string) {
    const { wave } = useContext(ConfigContext);
    const [, token, hashId] = useToken();

    const showWave = event => {
        const node = nodeRef;

        if (wave?.disabled || !node) {
            return;
        }

        const targetNode = node.querySelector<HTMLElement>(`.${TARGET_CLS}`) || node;

        const { showEffect } = wave || {};

        // Customize wave effect
        (showEffect || showWaveEffect)(targetNode, { class: className, token, component, event, hashId });
    };

    let rafId: number;

    // Merge trigger event into one for each frame
    const showDebounceWave: ShowWave = event => {
        raf.cancel(rafId!);

        rafId = raf(() => {
            showWave(event);
        });
    };

    return showDebounceWave;
}

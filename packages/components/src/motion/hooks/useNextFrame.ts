import { raf } from '@ant-design-solidjs/util';
import { onCleanup } from 'solid-js';

export default (): [(callback: (info: { isCanceled: () => boolean }) => void) => void, () => void] => {
    let nextFrameRef: number | null = null;

    function cancelNextFrame() {
        raf.cancel(nextFrameRef);
    }

    function nextFrame(callback: (info: { isCanceled: () => boolean }) => void, delay = 2) {
        cancelNextFrame();

        const nextFrameId = raf(() => {
            if (delay <= 1) {
                callback({ isCanceled: () => nextFrameId !== nextFrameRef });
            } else {
                nextFrame(callback, delay - 1);
            }
        });

        nextFrameRef = nextFrameId;
    }

    onCleanup(() => {
        cancelNextFrame();
    });

    return [nextFrame, cancelNextFrame];
};

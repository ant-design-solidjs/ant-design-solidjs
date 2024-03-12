import { raf } from '@ant-design-solidjs/util';

/**
 * Callback will only execute last one for each raf
 */
export default function useRafDebounce(callback: VoidFunction) {
    let executeRef = false;
    // @ts-ignore
    let rafRef: number;

    const wrapperCallback = callback;

    return () => {
        if (executeRef) {
            return;
        }

        executeRef = true;
        wrapperCallback();

        rafRef = raf(() => {
            executeRef = false;
        });
    };
}

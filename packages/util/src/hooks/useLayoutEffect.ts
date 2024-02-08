import { canUseDom } from '../dom';
import { createEffect, createRenderEffect } from 'solid-js';

/**
 * Wrap `React.useLayoutEffect` which will not throw warning message in test env
 */
const useInternalLayoutEffect = process.env.NODE_ENV !== 'test' && canUseDom() ? createRenderEffect : createEffect;

export const useLayoutEffect = (callback: (mount: boolean) => void | VoidFunction) => {
    let firstMountRef = true;

    useInternalLayoutEffect(() => {
        return callback(firstMountRef);
    });

    // We tell react that first mount has passed
    useInternalLayoutEffect(() => {
        firstMountRef = false;
        return () => {
            firstMountRef = true;
        };
    }, []);
};

export const useLayoutUpdateEffect: typeof createEffect = callback => {
    useLayoutEffect(firstMount => {
        if (!firstMount) {
            return callback();
        }
    });
};

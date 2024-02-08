import { warning } from '@ant-design-solidjs/util';
import { onCleanup, onMount } from 'solid-js';

// DO NOT register functions in useEffect cleanup function, or functions that registered will never be called.
const useEffectCleanupRegister = () => {
    const effectCleanups: (() => void)[] = [];
    let cleanupFlag = false;
    function register(fn: () => void) {
        if (cleanupFlag) {
            if (process.env.NODE_ENV !== 'production') {
                warning(
                    false,
                    '[Ant Design CSS-in-JS] You are registering a cleanup function after unmount, which will not have any effect.',
                );
            }
            return;
        }
        effectCleanups.push(fn);
    }

    onMount(() => (cleanupFlag = false));

    onCleanup(() => {
        cleanupFlag = true;
        if (effectCleanups.length) {
            effectCleanups.forEach(fn => fn());
        }
    });

    return register;
};

export default useEffectCleanupRegister;

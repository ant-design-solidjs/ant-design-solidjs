import type { InputRef } from '../Input';
import { onCleanup, onMount } from 'solid-js';

export default function useRemovePasswordTimeout(inputRef: InputRef, triggerOnMount?: boolean) {
    let removePasswordTimeoutRef: ReturnType<typeof setTimeout>[] = [];

    const removePasswordTimeout = () => {
        removePasswordTimeoutRef.push(
            setTimeout(() => {
                if (
                    inputRef?.input &&
                    inputRef?.input.getAttribute('type') === 'password' &&
                    inputRef?.input.hasAttribute('value')
                ) {
                    inputRef?.input.removeAttribute('value');
                }
            }),
        );
    };

    onMount(() => {
        if (triggerOnMount) {
            removePasswordTimeout();
        }

        onCleanup(() =>
            removePasswordTimeoutRef.forEach(timer => {
                if (timer) {
                    clearTimeout(timer);
                }
            }),
        );
    });

    return removePasswordTimeout;
}

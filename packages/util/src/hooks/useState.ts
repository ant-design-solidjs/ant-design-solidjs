import { createSignal, JSX, onCleanup, onMount, Setter } from 'solid-js';

type Updater<T> = T | ((prevValue: T) => T);

export type SetState<T> = (
    nextValue: Updater<T>,
    /**
     * Will not update state when destroyed.
     * Developer should make sure this is safe to ignore.
     */
    ignoreDestroy?: boolean,
) => void;

/**
 * Same as React.useState but `setState` accept `ignoreDestroy` param to not to setState after destroyed.
 * We do not make this auto is to avoid real memory leak.
 * Developer should confirm it's safe to ignore themselves.
 */
export function useSafeState<T>(defaultValue?: T | (() => T)): [JSX.Accessor<T>, SetState<T>] {
    let destroyRef = false;

    const val = !defaultValue
        ? (defaultValue as T)
        : typeof defaultValue === 'function' && defaultValue
          ? (defaultValue as () => T)()
          : (defaultValue as T);
    const [value, setValue] = createSignal(val);

    onMount(() => {
        destroyRef = false;
    });
    onCleanup(() => (destroyRef = true));

    function safeSetState(updater: Setter<T>, ignoreDestroy?: boolean) {
        if (ignoreDestroy && destroyRef) {
            return;
        }

        setValue(updater);
    }

    return [value, safeSetState];
}

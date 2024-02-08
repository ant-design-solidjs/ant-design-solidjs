import { Ref } from 'solid-js';

export type FnRef<T> = (el: T) => void;

export function fillRef<T>(ref: Ref<T>, node: T) {
    if (typeof ref === 'function') {
        (ref as (val: T) => void)(node);
    } else {
        (ref as T) = node;
    }
}

export function extractRef<T>(ref: Ref<T>): T {
    if (typeof ref === 'function') return (ref as () => T)();
    return ref;
}

/**
 * Merge refs into one ref function to support ref passing.
 */
export function composeRef<T>(...refs: Ref<T>[]): Ref<T> {
    const refList = refs.filter(ref => ref);
    if (refList.length <= 1) {
        return refList[0];
    }

    return (node: T) => {
        refs.forEach(ref => {
            fillRef(ref, node);
        });
    };
}

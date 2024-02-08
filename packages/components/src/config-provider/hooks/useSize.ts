import { createMemo, JSX, useContext } from 'solid-js';
import type { SizeType } from '../SizeContext';
import SizeContext from '../SizeContext';

const useSize = <T>(customSize?: T | ((ctxSize: SizeType) => T)): JSX.Accessor<T> => {
    const size = useContext<SizeType>(SizeContext);
    const mergedSize = createMemo<T>(() => {
        if (!customSize) {
            return size as T;
        }
        if (typeof customSize === 'string') {
            return (customSize ?? size) as T;
        }
        if (customSize instanceof Function) {
            return customSize(size);
        }
        return size as T;
    });
    return mergedSize;
};

export default useSize;

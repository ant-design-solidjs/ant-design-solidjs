import { JSX } from 'solid-js';

export function triggerEvent<T, E extends Event = Event>(
    handler: JSX.EventHandlerUnion<T, E>,
    e: E & {
        currentTarget: T;
        target: Element;
    },
) {
    if (typeof handler === 'function') {
        return handler(e);
    }
}

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

/** Call a JSX.EventHandlerUnion with the event. */
export function callHandler<T, E extends Event>(
    event: E & { currentTarget: T; target: Element },
    handler: JSX.EventHandlerUnion<T, E> | undefined,
) {
    if (handler) {
        if (typeof handler === 'function') {
            handler(event);
        } else {
            handler[0](handler[1], event);
        }
    }

    // return event?.defaultPrevented;
}

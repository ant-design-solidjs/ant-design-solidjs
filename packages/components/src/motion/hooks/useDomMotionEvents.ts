import type { MotionEvent } from '../interface';
import { animationEndName, transitionEndName } from '../util/motion';
import { onCleanup } from 'solid-js';

export default (
    callback: (event: MotionEvent) => void,
): [(element: HTMLElement) => void, (element: HTMLElement) => void] => {
    let cacheElementRef: HTMLElement;

    // Internal motion event handler
    const onInternalMotionEnd = (event: MotionEvent) => {
        callback(event);
    };

    // Remove events
    function removeMotionEvents(element: HTMLElement) {
        if (element) {
            element.removeEventListener(transitionEndName, onInternalMotionEnd);
            element.removeEventListener(animationEndName, onInternalMotionEnd);
        }
    }

    // Patch events
    function patchMotionEvents(element: HTMLElement) {
        if (cacheElementRef && cacheElementRef !== element) {
            removeMotionEvents(cacheElementRef);
        }

        if (element && element !== cacheElementRef) {
            element.addEventListener(transitionEndName, onInternalMotionEnd);
            element.addEventListener(animationEndName, onInternalMotionEnd);

            // Save as cache in case dom removed trigger by `motionDeadline`
            cacheElementRef = element;
        }
    }

    // Clean up when removed
    onCleanup(() => {
        removeMotionEvents(cacheElementRef);
    });

    return [patchMotionEvents, removeMotionEvents];
};

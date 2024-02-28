// declare namespace Jsx {
//     type Key = string | number;
//
//     type UIEvent<T extends Event, E> = T & {
//         currentTarget: E;
//         target: Element;
//     };
//
//     type MouseEvent<E extends Element> = UIEvent<MouseEvent, E>;
//     type KeyboardEvent<E extends Element> = UIEvent<KeyboardEvent, E>;
//
//     type MouseEventHandler<E extends Element> = EventHandler<E, UIEvent<MouseEvent, E>>;
//     type FocusEventHandler<E extends Element> = EventHandler<E, UIEvent<FocusEvent, E>>;
//     type KeyboardEventHandler<E extends Element> = EventHandler<E, UIEvent<KeyboardEvent, E>>;
// }
//
// interface EventHandler<T, E extends Event> {
//     (
//         e: E & {
//             currentTarget: T;
//             target: Element;
//         },
//     ): void;
// }

import { ChangeEventHandlerUnion, EventHandlerUnion } from 'solid-js/types/jsx';

type NativeAnimationEvent = AnimationEvent;
type NativeClipboardEvent = ClipboardEvent;
type NativeCompositionEvent = CompositionEvent;
type NativeDragEvent = DragEvent;
type NativeFocusEvent = FocusEvent;
type NativeKeyboardEvent = KeyboardEvent;
type NativeMouseEvent = MouseEvent;
type NativeTouchEvent = TouchEvent;
type NativePointerEvent = PointerEvent;
type NativeTransitionEvent = TransitionEvent;
type NativeUIEvent = UIEvent;
type NativeWheelEvent = WheelEvent;

import { FocusEvent, JSX } from 'solid-js';
declare module 'solid-js' {
    namespace JSX {
        type Key = string | number;

        type CustomEvent<T extends Event, E> = T & {
            currentTarget: E;
            target: E;
        };
        type ChangeEvent<E extends Element> = CustomEvent<Event, E>;
        type FocusEvent<E extends Element> = CustomEvent<NativeFocusEvent, E>;
        type MouseEvent<E extends Element> = CustomEvent<NativeMouseEvent, E>;
        type KeyboardEvent<E extends Element> = CustomEvent<NativeKeyboardEvent, E>;
        type CompositionEvent<E extends Element> = CustomEvent<NativeCompositionEvent, E>;

        type ChangeEventHandler<E = Element> = JSX.ChangeEventHandlerUnion<E, Event>;
        type MouseEventHandler<E = Element> = JSX.EventHandlerUnion<E, MouseEvent<E>>;
        type KeyboardEventHandler<E = Element> = JSX.EventHandlerUnion<E, KeyboardEvent<E>>;
        type CompositionEventHandler<E = Element> = JSX.EventHandlerUnion<E, CompositionEvent>;

        type PropsWithChildren<P extends object> = p & { children?: JSX.Element };
    }
}

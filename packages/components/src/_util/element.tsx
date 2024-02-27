import { AnyObject } from './type.ts';
import { createMemo, JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type RenderProps = AnyObject | ((originProps: AnyObject) => AnyObject | void);

interface ReplaceElementProps {
    renderProps: RenderProps;
    element: JSX.Element;
    replacement: JSX.Element;
}
export function ReplaceElement(props: ReplaceElementProps): JSX.Element {
    const ps = createMemo(() => {
        return typeof props.renderProps === 'function' ? props.renderProps({}) : props.renderProps;
    });

    return (
        <Show when={props.element} fallback={props.replacement}>
            <Dynamic component={props.element} {...ps()} />
        </Show>
    );
}

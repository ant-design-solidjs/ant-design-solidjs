import { SpaceContext } from './context';
import type { SpaceContextType } from './context';
import { Component, JSX, Show, useContext } from 'solid-js';

export interface ItemProps {
    class: string;
    children: JSX.Element;
    index: number;
    split?: JSX.Element;
    style?: JSX.CSSProperties;
}

const Item: Component<ItemProps> = props => {
    const { latestIndex } = useContext<SpaceContextType>(SpaceContext);

    return (
        <Show when={props.children}>
            <div class={props.class} style={props.style}>
                {props.children}
            </div>
            {props.index < latestIndex && props.split && <span class={`${props.class}-split`}>{props.split}</span>}
        </Show>
    );
};

export default Item;

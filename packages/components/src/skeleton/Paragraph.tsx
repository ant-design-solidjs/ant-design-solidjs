import classNames from 'clsx';
import { Component, For, JSX } from 'solid-js';

type widthUnit = number | string;

export interface SkeletonParagraphProps {
    prefixCls?: string;
    class?: string;
    style?: JSX.CSSProperties;
    width?: widthUnit | Array<widthUnit>;
    rows?: number;
}

const Paragraph: Component<SkeletonParagraphProps> = props => {
    const getWidth = (index: number) => {
        const { width, rows = 2 } = props;
        if (Array.isArray(width)) {
            return width[index];
        }
        // last paragraph
        if (rows - 1 === index) {
            return width;
        }
        return undefined;
    };

    return (
        <ul class={classNames(props.prefixCls, props.class)} style={props.style}>
            <For each={[...Array(props.rows)]}>{(_, idx) => <li style={{ width: `${getWidth(idx())}px` }} />}</For>
        </ul>
    );
};

export default Paragraph;

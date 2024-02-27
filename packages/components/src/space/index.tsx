import clsx from 'clsx';
import { isPresetSize, isValidGapNumber } from '../_util/gapSize';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import Compact from './Compact';
import { SpaceContextProvider } from './context';
import type { SpaceContextType } from './context';
import Item from './Item';
import useStyle from './style';
import { children, Component, createMemo, JSX, mergeProps, Ref, Show, splitProps, useContext } from 'solid-js';

export { SpaceContext } from './context';

export type SpaceSize = SizeType | number;

export interface SpaceProps extends JSX.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    style?: JSX.CSSProperties;
    size?: SpaceSize | [SpaceSize, SpaceSize];
    direction?: 'horizontal' | 'vertical';
    // No `stretch` since many components do not support that.
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: JSX.Element;
    wrap?: boolean;
    classes?: { item: string };
    styles?: { item: JSX.CSSProperties };
    ref?: Ref<HTMLDivElement>;
}

const Space = (_props: SpaceProps) => {
    const { getPrefixCls, space, direction: directionConfig } = useContext(ConfigContext);
    const mergedProps = mergeProps({ size: space?.size || 'small', direction: 'horizontal', wrap: false }, _props);
    const [props, otherProps] = splitProps(mergedProps, [
        'size',
        'align',
        'class',
        'rootClass',
        'children',
        'direction',
        'prefixCls',
        'split',
        'style',
        'wrap',
        'classes',
        'styles',
        'ref',
    ]);

    const [horizontalSize, verticalSize] = Array.isArray(props.size) ? props.size : ([props.size, props.size] as const);

    const isPresetVerticalSize = isPresetSize(verticalSize);

    const isPresetHorizontalSize = isPresetSize(horizontalSize);

    const isValidVerticalSize = isValidGapNumber(verticalSize);

    const isValidHorizontalSize = isValidGapNumber(horizontalSize);

    const childNodes = children(() => props.children).toArray();

    const mergedAlign = createMemo(() =>
        props.align === undefined && props.direction === 'horizontal' ? 'center' : props.align,
    );
    const prefixCls = createMemo(() => getPrefixCls('space', props.prefixCls));
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls());

    // Calculate latest one
    let latestIndex = 0;
    const nodes = childNodes.map<JSX.Element>((child, i) => {
        if (child !== null && child !== undefined) {
            latestIndex = i;
        }

        return (
            <Item
                class={clsx(`${prefixCls()}-item`, props.classes?.item ?? space?.classes?.item)}
                index={i}
                split={props.split}
                style={props.styles?.item ?? space?.styles?.item}
            >
                {child}
            </Item>
        );
    });

    const spaceContext = createMemo<SpaceContextType>(() => ({ latestIndex }));

    // =========================== Render ===========================
    const gapStyle = createMemo(() => {
        let style: JSX.CSSProperties = {};
        if (props.wrap) {
            style['flex-wrap'] = 'wrap';
        }

        if (!isPresetHorizontalSize && isValidHorizontalSize) {
            style['column-gap'] = `${horizontalSize}px`;
        }

        if (!isPresetVerticalSize && isValidVerticalSize) {
            style['row-gap'] = `${verticalSize}px`;
        }
        return style;
    });

    return (
        <Show when={childNodes.length > 0}>
            {wrapCSSVar(
                <div
                    ref={props.ref}
                    class={clsx(
                        prefixCls,
                        space?.class,
                        hashId,
                        `${prefixCls()}-${props.direction}`,
                        {
                            [`${prefixCls()}-rtl`]: directionConfig === 'rtl',
                            [`${prefixCls()}-align-${mergedAlign()}`]: mergedAlign(),
                            [`${prefixCls()}-gap-row-${verticalSize}`]: isPresetVerticalSize,
                            [`${prefixCls()}-gap-col-${horizontalSize}`]: isPresetHorizontalSize,
                        },
                        props.class,
                        props.rootClass,
                        cssVarCls,
                    )}
                    style={{ ...gapStyle(), ...space?.style, ...props.style }}
                    {...otherProps}
                >
                    <SpaceContextProvider value={spaceContext()}>{nodes}</SpaceContextProvider>
                </div>,
            )}
        </Show>
    );
};

type CompoundedComponent = Component<SpaceProps> & {
    Compact: typeof Compact;
};

const CompoundedSpace = Space as unknown as CompoundedComponent;

CompoundedSpace.Compact = Compact;

export default CompoundedSpace;

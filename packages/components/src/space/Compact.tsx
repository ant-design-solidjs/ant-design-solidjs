import clsx from 'clsx';
import type { DirectionType } from '../config-provider';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import useSize from '../config-provider/hooks/useSize';
import useStyle from './style';
import { Component, createContext, createMemo, For, JSX, Show, splitProps, useContext } from 'solid-js';

export interface SpaceCompactItemContextType {
    compactSize?: SizeType;
    compactDirection?: 'horizontal' | 'vertical';
    isFirstItem?: boolean;
    isLastItem?: boolean;
}

export const SpaceCompactItemContext = createContext<SpaceCompactItemContextType | null>(null);

export const useCompactItemContext = (prefixCls: string, direction: DirectionType) => {
    const compactItemContext = useContext(SpaceCompactItemContext);
    console.log(compactItemContext);
    const compactItemClasses = createMemo<string>(() => {
        // console.log(compactItemContext);
        if (!compactItemContext) {
            return '';
        }
        const { compactDirection, isFirstItem, isLastItem } = compactItemContext;
        const separator = compactDirection === 'vertical' ? '-vertical-' : '-';

        return clsx(`${prefixCls}-compact${separator}item`, {
            [`${prefixCls}-compact${separator}first-item`]: isFirstItem,
            [`${prefixCls}-compact${separator}last-item`]: isLastItem,
            [`${prefixCls}-compact${separator}item-rtl`]: direction === 'rtl',
        });
    });

    return {
        compactSize: compactItemContext?.compactSize,
        compactDirection: compactItemContext?.compactDirection,
        compactItemClasses,
    };
};

export const NoCompactStyle: Component<{ children?: JSX.Element }> = props => (
    <SpaceCompactItemContext.Provider value={null}>{props.children}</SpaceCompactItemContext.Provider>
);

export interface SpaceCompactProps extends JSX.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    size?: SizeType;
    direction?: 'horizontal' | 'vertical';
    block?: boolean;
    rootClass?: string;
    children?: JSX.Element[];
}

const CompactItem: Component<JSX.PropsWithChildren<SpaceCompactItemContextType>> = _props => {
    const [props, otherProps] = splitProps(_props, ['children']);
    return <SpaceCompactItemContext.Provider value={otherProps}>{props.children}</SpaceCompactItemContext.Provider>;
};

const Compact: Component<SpaceCompactProps> = _props => {
    const { getPrefixCls, direction: directionConfig } = useContext(ConfigContext);

    const [props, restProps] = splitProps(_props, [
        'prefixCls',
        'direction',
        'size',
        'block',
        'class',
        'rootClass',
        'children',
    ]);

    const mergedSize = useSize(ctx => props.size ?? ctx);

    const prefixCls = getPrefixCls('space-compact', props.prefixCls);
    const [wrapCSSVar, hashId] = useStyle(prefixCls);

    const compactItemContext = useContext(SpaceCompactItemContext);

    // =========================== Render ===========================
    return (
        <Show when={props.children.length > 0}>
            {wrapCSSVar(
                <div
                    class={clsx(
                        prefixCls,
                        hashId,
                        {
                            [`${prefixCls}-rtl`]: directionConfig === 'rtl',
                            [`${prefixCls}-block`]: props.block,
                            [`${prefixCls}-vertical`]: props.direction === 'vertical',
                        },
                        props.class,
                        props.rootClass,
                    )}
                    {...restProps}
                >
                    <For each={props.children}>
                        {(child, i) => (
                            <CompactItem
                                compactSize={mergedSize()}
                                compactDirection={props.direction}
                                isFirstItem={i() === 0 && (!compactItemContext || compactItemContext?.isFirstItem)}
                                isLastItem={
                                    i() === props.children.length - 1 &&
                                    (!compactItemContext || compactItemContext?.isLastItem)
                                }
                            >
                                {/*{child}*/}
                                <Test />
                            </CompactItem>
                        )}
                    </For>
                </div>,
            )}
        </Show>
    );
};

export default Compact;

function Test() {
    useCompactItemContext('', 'ltr');

    return <div>test</div>;
}

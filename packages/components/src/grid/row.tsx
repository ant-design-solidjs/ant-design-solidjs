import clsx from 'clsx';

import type { Breakpoint, ScreenMap } from '../_util/responsiveObserver';
import useResponsiveObserver, { responsiveArray } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
import RowContext from './RowContext';
import type { RowContextState } from './RowContext';
import { useRowStyle } from './style';
import { createEffect, createMemo, createSignal, JSX, mergeProps, onCleanup, splitProps, useContext } from 'solid-js';

const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const;
const RowJustify = ['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'] as const;

type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type ResponsiveLike<T> = {
    [key in Responsive]?: T;
};

type Gap = number | undefined;
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;

type ResponsiveAligns = ResponsiveLike<(typeof RowAligns)[number]>;
type ResponsiveJustify = ResponsiveLike<(typeof RowJustify)[number]>;
export interface RowProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    gutter?: Gutter | [Gutter, Gutter];
    align?: (typeof RowAligns)[number] | ResponsiveAligns;
    justify?: (typeof RowJustify)[number] | ResponsiveJustify;
    prefixCls?: string;
    wrap?: boolean;
    style?: JSX.CSSProperties;
}

function useMergePropByScreen(oriProp: RowProps['align'] | RowProps['justify'], screen: ScreenMap) {
    const [prop, setProp] = createSignal(typeof oriProp === 'string' ? oriProp : '');

    const calcMergeAlignOrJustify = () => {
        if (typeof oriProp === 'string') {
            setProp(oriProp);
        }
        if (typeof oriProp !== 'object') {
            return;
        }
        for (let i = 0; i < responsiveArray.length; i++) {
            const breakpoint: Breakpoint = responsiveArray[i];
            // if do not match, do nothing
            if (!screen[breakpoint]) {
                continue;
            }
            const curVal = oriProp[breakpoint];
            if (curVal !== undefined) {
                setProp(curVal);
                return;
            }
        }
    };

    createEffect(() => {
        calcMergeAlignOrJustify();
    });

    return prop;
}

const Row = (_props: RowProps) => {
    const [ps, others] = splitProps(_props, [
        'prefixCls',
        'justify',
        'align',
        'class',
        'style',
        'children',
        'gutter',
        'wrap',
    ]);
    const props = mergeProps({ gutter: 0 }, ps);

    const { getPrefixCls, direction } = useContext(ConfigContext);

    const [screens, setScreens] = createSignal<ScreenMap>({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
    });
    // to save screens info when responsiveObserve callback had been call
    const [curScreens, setCurScreens] = createSignal<ScreenMap>({
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
    });

    const responsiveObserver = useResponsiveObserver();

    // ================================== Effect ==================================
    createEffect(() => {
        const token = responsiveObserver().subscribe(screen => {
            setCurScreens(screen);
            const currentGutter = props.gutter || 0;
            if (
                (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
                (Array.isArray(currentGutter) &&
                    (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
            ) {
                setScreens(screen);
            }
        });
        onCleanup(() => responsiveObserver().unsubscribe(token));
    });

    // ================================== Render ==================================
    const getGutter = (): [Gap, Gap] => {
        const results: [Gap, Gap] = [undefined, undefined];
        const normalizedGutter = Array.isArray(props.gutter) ? props.gutter : [props.gutter, undefined];
        normalizedGutter.forEach((g, index) => {
            if (typeof g === 'object') {
                for (let i = 0; i < responsiveArray.length; i++) {
                    const breakpoint: Breakpoint = responsiveArray[i];
                    if (screens[breakpoint] && g[breakpoint] !== undefined) {
                        results[index] = g[breakpoint] as number;
                        break;
                    }
                }
            } else {
                results[index] = g;
            }
        });
        return results;
    };

    const prefixCls = getPrefixCls('row', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useRowStyle(prefixCls);

    const classes = createMemo(() => {
        const mergeAlign = useMergePropByScreen(props.align, curScreens());
        const mergeJustify = useMergePropByScreen(props.justify, curScreens());
        return clsx(
            prefixCls,
            {
                [`${prefixCls}-no-wrap`]: props.wrap === false,
                [`${prefixCls}-${mergeJustify}`]: mergeJustify(),
                [`${prefixCls}-${mergeAlign}`]: mergeAlign(),
                [`${prefixCls}-rtl`]: direction === 'rtl',
            },
            props.class,
            hashId,
            cssVarCls,
        );
    });

    const rowStyle = createMemo(() => {
        // Add gutter related style
        const gutters = getGutter();
        const rowStyle: JSX.CSSProperties = {};
        const horizontalGutter = gutters[0] != null && gutters[0] > 0 ? gutters[0] / -2 : undefined;

        if (horizontalGutter) {
            rowStyle['margin-left'] = `${horizontalGutter}px`;
            rowStyle['margin-right'] = `${horizontalGutter}px`;
        }

        rowStyle['row-gap'] = `${gutters[1]}px`;
        return rowStyle;
    });

    const rowContext = createMemo<RowContextState>(() => {
        // "gutters" is a new array in each rendering phase, it'll make 'React.useMemo' effectless.
        // So we deconstruct "gutters" variable here.
        const gutters = getGutter();
        const [gutterH, gutterV] = gutters;
        return { gutter: [gutterH, gutterV] as [number, number], wrap: props.wrap };
    });

    return wrapCSSVar(
        <RowContext.Provider value={rowContext()}>
            <div {...others} class={classes()} style={{ ...rowStyle(), ...props.style }}>
                {props.children}
            </div>
        </RowContext.Provider>,
    );
};

if (process.env.NODE_ENV !== 'production') {
    Row.displayName = 'Row';
}

export default Row;

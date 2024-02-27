import clsx from 'clsx';

import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import RowContext from './RowContext';
import { useColStyle } from './style';
import { createMemo, createSignal, JSX, splitProps, useContext } from 'solid-js';

// https://github.com/ant-design/ant-design/issues/14324
type ColSpanType = number | string;

type FlexType = number | LiteralUnion<'none' | 'auto'>;

export interface ColSize {
    flex?: FlexType;
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
}

export interface ColProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    flex?: FlexType;
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
    xs?: ColSpanType | ColSize;
    sm?: ColSpanType | ColSize;
    md?: ColSpanType | ColSize;
    lg?: ColSpanType | ColSize;
    xl?: ColSpanType | ColSize;
    xxl?: ColSpanType | ColSize;
    prefixCls?: string;
    style?: JSX.CSSProperties;
}

function parseFlex(flex: FlexType): string {
    if (typeof flex === 'number') {
        return `${flex} ${flex} auto`;
    }

    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
    }

    return flex;
}
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
const Col = (_props: ColProps) => {
    const { getPrefixCls, direction } = useContext(ConfigContext);
    const { gutter, wrap } = useContext(RowContext);

    const [props, others] = splitProps(_props, [
        'prefixCls',
        'span',
        'order',
        'offset',
        'push',
        'pull',
        'class',
        'children',
        'flex',
        'style',
    ]);

    const prefixCls = getPrefixCls('col', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useColStyle(prefixCls);

    const [sizeClassObj, setSizeClassObj] = createSignal<Record<string, boolean | ColSpanType>>({});

    // ===================== Size ======================
    const sizeStyle = createMemo(() => {
        const sizeStyle: Record<string, string> = {};

        let sizeClassObj: Record<string, boolean | ColSpanType> = {};
        sizes.forEach(size => {
            let sizeProps: ColSize = {};
            const propSize = props[size];
            if (typeof propSize === 'number') {
                sizeProps.span = propSize;
            } else if (typeof propSize === 'object') {
                sizeProps = propSize || {};
            }

            delete others[size];

            sizeClassObj = {
                ...sizeClassObj,
                [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
                [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
                [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
                [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
                [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
                [`${prefixCls}-rtl`]: direction === 'rtl',
            };

            // Responsive flex layout
            if (sizeProps.flex) {
                sizeClassObj[`${prefixCls}-${size}-flex`] = true;
                sizeStyle[`--${prefixCls}-${size}-flex`] = parseFlex(sizeProps.flex);
            }
        });
        setSizeClassObj(sizeClassObj);
        return sizeStyle;
    });

    // ==================== Normal =====================
    const classes = createMemo(() => {
        return clsx(
            prefixCls,
            {
                [`${prefixCls}-${props.span}`]: props.span !== undefined,
                [`${prefixCls}-order-${props.order}`]: props.order,
                [`${prefixCls}-offset-${props.offset}`]: props.offset,
                [`${prefixCls}-push-${props.push}`]: props.push,
                [`${prefixCls}-pull-${props.pull}`]: props.pull,
            },
            props.class,
            sizeClassObj(),
            hashId,
            cssVarCls,
        );
    });

    const mergedStyle = createMemo(() => {
        const mergedStyle: JSX.CSSProperties = {};
        // Horizontal gutter use padding
        if (gutter && gutter[0] > 0) {
            const horizontalGutter = gutter[0] / 2;
            mergedStyle['padding-left'] = `${horizontalGutter}px`;
            mergedStyle['padding-right'] = `${horizontalGutter}px`;
        }

        if (props.flex) {
            mergedStyle.flex = parseFlex(props.flex);

            // Hack for Firefox to avoid size issue
            // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
            if (wrap === false && !mergedStyle['min-width']) {
                mergedStyle['min-width'] = 0;
            }
        }
        return mergedStyle;
    });

    // ==================== Render =====================
    return wrapCSSVar(
        <div {...others} style={{ ...mergedStyle(), ...props.style, ...sizeStyle }} class={classes()}>
            {props.children}
        </div>,
    );
};

export default Col;

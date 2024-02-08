import { createMemo, JSX, mergeProps, Show, splitProps } from 'solid-js';
import clsx from 'clsx';
import { dividerStyle, innerDividerStyle } from './style/divider';

export interface DividerProps {
    prefixCls?: string;
    type?: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right' | 'center';
    orientationMargin?: string | number;
    class?: string;
    rootClass?: string;
    children?: JSX.Element;
    dashed?: boolean;
    style?: JSX.CSSProperties;
    plain?: boolean;
}

export function Divider(_props: DividerProps) {
    const ps = mergeProps(
        {
            dashed: false,
            type: 'horizontal',
        },
        _props,
    );
    const [props, restProps] = splitProps(ps, [
        'type',
        'orientationMargin',
        'orientation',
        'class',
        'rootClass',
        'children',
        'dashed',
        'plain',
    ]);

    const innerStyle = createMemo<JSX.CSSProperties>(() => {
        const hasCustomMarginLeft = props.orientation === 'left' && props.orientationMargin != null;
        const hasCustomMarginRight = props.orientation === 'right' && props.orientationMargin != null;

        let orientationMargin: number;
        if (typeof props.orientationMargin === 'number') {
            orientationMargin = props.orientationMargin;
        }
        if (/^\d+$/.test(props.orientationMargin as string)) {
            orientationMargin = Number(orientationMargin);
        }
        return {
            ...(hasCustomMarginLeft && { marginLeft: orientationMargin }),
            ...(hasCustomMarginRight && { marginRight: orientationMargin }),
            'padding-block': 0,
        };
    });

    const classes = createMemo(() =>
        clsx(
            dividerStyle({
                type: props.type,
                dashed: props.dashed,
                withText: props.children && props.type !== 'vertical',
            }),
        ),
    );

    const innerClasses = createMemo(() => clsx(innerDividerStyle({})));

    return (
        <div class={classes()} {...restProps} role="separator">
            <Show when={props.children && props.type !== 'vertical'}>
                <span style={innerStyle()} class={innerClasses()}>
                    {props.children}
                </span>
            </Show>
        </div>
    );
}

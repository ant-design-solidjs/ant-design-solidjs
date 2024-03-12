import clsx from 'clsx';
import { omit } from '@ant-design-solidjs/util';
import { debounce } from 'throttle-debounce';

import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style/index';
import {
    Component,
    createEffect,
    createMemo,
    createSignal,
    JSX,
    mergeProps,
    onCleanup,
    Show,
    splitProps,
    useContext,
} from 'solid-js';

const SpinSizes = ['small', 'default', 'large'] as const;
export type SpinSize = (typeof SpinSizes)[number];
export type SpinIndicator = (props: any) => JSX.Element;

export interface SpinProps {
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    spinning?: boolean;
    style?: JSX.CSSProperties;
    size?: SpinSize;
    tip?: JSX.Element;
    delay?: number;
    wrapperClass?: string;
    indicator?: SpinIndicator;
    children?: JSX.Element;
    fullscreen?: boolean;
}

export type SpinType = Component<SpinProps> & {
    setDefaultIndicator: (indicator: SpinIndicator) => void;
};

// Render indicator
let defaultIndicator: SpinIndicator = null;

function renderIndicator(prefixCls: string, props: SpinProps): JSX.Element {
    const { indicator } = props;
    const dotClass = `${prefixCls}-dot`;

    // should not be render default indicator when indicator value is null
    if (indicator === null) {
        return null;
    }

    if (indicator) {
        return indicator({
            class: dotClass,
        });
    }

    if (defaultIndicator) {
        return defaultIndicator({
            class: dotClass,
        });
    }

    return (
        <span class={clsx(dotClass, `${prefixCls}-dot-spin`)}>
            <i class={`${prefixCls}-dot-item`} />
            <i class={`${prefixCls}-dot-item`} />
            <i class={`${prefixCls}-dot-item`} />
            <i class={`${prefixCls}-dot-item`} />
        </span>
    );
}

function shouldDelay(spinning?: boolean, delay?: number): boolean {
    return !!spinning && !!delay && !isNaN(Number(delay));
}

const Spin: SpinType = _props => {
    const mergedProps = mergeProps({ spinning: true, delay: 0, size: 'default', fullscreen: false }, _props);
    const [props, restProps] = splitProps(mergedProps, [
        'prefixCls',
        'spinning',
        'delay',
        'class',
        'rootClass',
        'size',
        'tip',
        'wrapperClass',
        'style',
        'children',
        'fullscreen',
    ]);

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('spin', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

    const [spinning, setSpinning] = createSignal<boolean>(props.spinning && !shouldDelay(props.spinning, props.delay));

    createEffect(() => {
        if (props.spinning) {
            const showSpinning = debounce(props.delay, () => {
                setSpinning(true);
            });
            showSpinning();
            onCleanup(() => {
                showSpinning?.cancel?.();
            });
        }

        setSpinning(false);
    });

    const isNestedPattern = createMemo<boolean>(() => typeof props.children !== 'undefined' && !props.fullscreen);

    if (process.env.NODE_ENV !== 'production') {
        const warning = devUseWarning('Spin');

        warning(
            !props.tip || isNestedPattern() || props.fullscreen,
            'usage',
            '`tip` only work in nest or fullscreen pattern.',
        );
    }

    const { direction, spin } = useContext<ConfigConsumerProps>(ConfigContext);

    const spinElement = () => (
        <div
            {...omit(restProps, ['indicator'])}
            style={{ ...spin?.style, ...props.style }}
            class={clsx(
                prefixCls,
                spin?.class,
                {
                    [`${prefixCls}-sm`]: props.size === 'small',
                    [`${prefixCls}-lg`]: props.size === 'large',
                    [`${prefixCls}-spinning`]: spinning(),
                    [`${prefixCls}-show-text`]: !!props.tip,
                    [`${prefixCls}-fullscreen`]: props.fullscreen,
                    [`${prefixCls}-fullscreen-show`]: props.fullscreen && spinning(),
                    [`${prefixCls}-rtl`]: direction === 'rtl',
                },
                props.class,
                props.rootClass,
                hashId,
                cssVarCls,
            )}
            aria-live="polite"
            aria-busy={spinning()}
        >
            {renderIndicator(prefixCls, restProps)}
            {props.tip && (isNestedPattern() || props.fullscreen) ? (
                <div class={`${prefixCls}-text`}>{props.tip}</div>
            ) : null}
        </div>
    );

    return (
        <Show when={isNestedPattern()} fallback={wrapCSSVar(spinElement())}>
            {wrapCSSVar(
                <div
                    {...omit(restProps, ['indicator'])}
                    class={clsx(`${prefixCls}-nested-loading`, props.wrapperClass, hashId, cssVarCls)}
                >
                    {spinning && <div>{spinElement()}</div>}
                    <div
                        class={clsx(`${prefixCls}-container`, {
                            [`${prefixCls}-blur`]: spinning(),
                        })}
                    >
                        {props.children}
                    </div>
                </div>,
            )}
        </Show>
    );
};

Spin.setDefaultIndicator = (indicator: SpinIndicator) => {
    defaultIndicator = indicator;
};

export default Spin;

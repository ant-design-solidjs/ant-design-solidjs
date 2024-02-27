import clsx from 'clsx';
import { fillRef, omit } from '@ant-design-solidjs/util';
import BaseInput from './BaseInput';
import type { ChangeEventInfo, CountConfig, InputProps, ShowCountFormatter } from './interface';
import type { InputFocusOptions } from './utils/commonUtils';
import { resolveOnChange, triggerFocus } from './utils/commonUtils';
import { createEffect, createMemo, createSignal, JSX, mergeProps, splitProps } from 'solid-js';
import { callHandler } from '../_util/event.ts';

type ForcedCountConfig = Omit<CountConfig, 'show'> &
    Pick<Required<CountConfig>, 'strategy'> & {
        show: boolean;
        showFormatter?: ShowCountFormatter;
    };
const Input = (_props: InputProps) => {
    const mergedProp = mergeProps({ prefixCls: 'rc-input', type: 'text' }, _props);
    const [props, rest] = splitProps(mergedProp, [
        'autoComplete',
        'onChange',
        'onFocus',
        'onBlur',
        'onPressEnter',
        'onKeyDown',
        'prefixCls',
        'disabled',
        'htmlSize',
        'class',
        'maxLength',
        'suffix',
        'showCount',
        'count',
        'type',
        'classes',
        'styles',
        'onCompositionStart',
        'onCompositionEnd',
    ]);

    const [focused, setFocused] = createSignal<boolean>(false);

    let compositionRef = false;
    let inputRef: HTMLInputElement = null;

    const focus = (option?: InputFocusOptions) => {
        if (inputRef) {
            triggerFocus(inputRef, option);
        }
    };

    // ====================== Value =======================
    const [value, setValue] = createSignal(rest.value);
    const formatValue = value === undefined || value === null ? '' : String(value);

    // =================== Select Range ===================
    const [selection, setSelection] = createSignal<[start: number, end: number] | null>(null);

    // ====================== Count =======================
    const countConfig = createMemo<ForcedCountConfig>(() => {
        let mergedConfig: CountConfig = {};

        if (props.showCount) {
            mergedConfig.show =
                typeof props.showCount === 'object' && props.showCount.formatter
                    ? props.showCount.formatter
                    : !!props.showCount;
        }

        mergedConfig = {
            ...mergedConfig,
            ...props.count,
        };

        const { show, ...rest } = mergedConfig!;

        return {
            ...rest,
            show: !!show,
            showFormatter: typeof show === 'function' ? show : undefined,
            strategy: rest.strategy || (value => value.length),
        };
    });
    const mergedMax = createMemo(() => countConfig().max || Number(props.maxLength));
    const valueLength = createMemo(() => countConfig().strategy(formatValue));

    // ======================= Ref ========================
    fillRef(rest.ref, {
        focus,
        blur: () => {
            inputRef?.blur();
        },
        setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => {
            inputRef?.setSelectionRange(start, end, direction);
        },
        select: () => {
            inputRef?.select();
        },
        input: inputRef,
    });

    createEffect(() => {
        setFocused(prev => (prev && props.disabled ? false : prev));
    });

    const triggerChange = (
        e: JSX.ChangeEvent<HTMLInputElement> | JSX.CompositionEvent<HTMLInputElement>,
        currentValue: string,
        info: ChangeEventInfo,
    ) => {
        let cutValue = currentValue;

        if (
            !compositionRef &&
            countConfig().exceedFormatter &&
            countConfig().max &&
            countConfig().strategy(currentValue) > countConfig().max
        ) {
            cutValue = countConfig().exceedFormatter(currentValue, {
                max: countConfig().max,
            });

            if (currentValue !== cutValue) {
                setSelection([inputRef?.selectionStart || 0, inputRef?.selectionEnd || 0]);
            }
        } else if (info.source === 'compositionEnd') {
            // Avoid triggering twice
            // https://github.com/ant-design/ant-design/issues/46587
            return;
        }
        setValue(cutValue);

        if (inputRef) {
            resolveOnChange(inputRef, e, props.onChange, cutValue);
        }
    };

    createEffect(() => {
        if (selection()) {
            inputRef?.setSelectionRange(...selection());
        }
    });

    const onInternalChange: JSX.ChangeEventHandler<HTMLInputElement, JSX.ChangeEvent<HTMLInputElement>> = e => {
        triggerChange(e, e.target.value, {
            source: 'change',
        });
    };

    const onInternalCompositionEnd: JSX.CompositionEventHandler<HTMLInputElement> = e => {
        compositionRef = false;
        triggerChange(e, e.target.value, {
            source: 'compositionEnd',
        });
        callHandler(e, props.onCompositionEnd);
    };

    const handleKeyDown: JSX.KeyboardEventHandler<HTMLInputElement> = e => {
        if (props.onPressEnter && e.key === 'Enter') {
            callHandler(e, props.onPressEnter);
        }
        callHandler(e, props.onKeyDown);
    };

    const handleFocus: JSX.FocusEventHandler<HTMLInputElement, FocusEvent> = e => {
        setFocused(true);
        callHandler(e, props.onFocus);
    };

    const handleBlur: JSX.FocusEventHandler<HTMLInputElement, FocusEvent> = e => {
        setFocused(false);
        callHandler(e, props.onFocus);
    };

    const handleReset: JSX.MouseEventHandler<HTMLElement> = e => {
        setValue('');
        focus();
        if (inputRef) {
            resolveOnChange(inputRef, e, props.onChange);
        }
    };

    const getInputElement = (ps: any) => {
        // Fix https://fb.me/react-unknown-prop
        const otherProps = omit(
            props as Omit<InputProps, 'value'> & {
                value?: JSX.InputHTMLAttributes<HTMLInputElement>['value'];
            },
            [
                'prefixCls',
                'onPressEnter',
                'addonBefore',
                'addonAfter',
                'prefix',
                'suffix',
                'allowClear',
                'showCount',
                'count',
                'classes',
                'htmlSize',
                'styles',
            ],
        );
        return (
            <input
                autocomplete={props.autoComplete}
                {...otherProps}
                onChange={onInternalChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                class={clsx(
                    props.prefixCls,
                    {
                        [`${props.prefixCls}-disabled`]: props.disabled,
                    },
                    props.classes?.input,
                )}
                style={props.styles?.input}
                ref={inputRef}
                size={props.htmlSize}
                type={props.type}
                onCompositionStart={e => {
                    compositionRef = true;
                    callHandler(e, props.onCompositionStart);
                }}
                onCompositionEnd={onInternalCompositionEnd}
                {...ps}
            />
        );
    };

    const getSuffix = () => {
        // Max length value
        const hasMaxLength = Number(mergedMax()) > 0;

        if (props.suffix || countConfig().show) {
            const dataCount = countConfig().showFormatter
                ? countConfig().showFormatter({
                      value: formatValue,
                      count: valueLength(),
                      maxLength: mergedMax(),
                  })
                : `${valueLength()}${hasMaxLength ? ` / ${mergedMax()}` : ''}`;

            return (
                <>
                    {countConfig().show && (
                        <span
                            class={clsx(
                                `${props.prefixCls}-show-count-suffix`,
                                {
                                    [`${props.prefixCls}-show-count-has-suffix`]: !!props.suffix,
                                },
                                props.classes?.count,
                            )}
                            style={{
                                ...props.styles?.count,
                            }}
                        >
                            {dataCount}
                        </span>
                    )}
                    {props.suffix}
                </>
            );
        }
        return null;
    };

    // ====================== Render ======================
    return (
        <BaseInput
            {...rest}
            prefixCls={props.prefixCls}
            class={clsx(props.class, !!mergedMax() && valueLength() > mergedMax() && `${props.prefixCls}-out-of-range`)}
            handleReset={handleReset}
            value={formatValue}
            focused={focused()}
            triggerFocus={focus}
            suffix={getSuffix()}
            disabled={props.disabled}
            classes={props.classes}
            styles={props.styles}
        >
            {getInputElement}
        </BaseInput>
    );
};

export default Input;

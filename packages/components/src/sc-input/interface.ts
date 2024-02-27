import type { InputFocusOptions } from './utils/commonUtils';
import type { LiteralUnion } from './utils/types';
import { JSX, Ref } from 'solid-js';

export interface CommonInputProps {
    prefix?: JSX.Element;
    suffix?: JSX.Element;
    addonBefore?: JSX.Element;
    addonAfter?: JSX.Element;
    classes?: {
        affixWrapper?: string;
        prefix?: string;
        suffix?: string;
        groupWrapper?: string;
        wrapper?: string;
        variant?: string;
    };
    styles?: {
        affixWrapper?: JSX.CSSProperties;
        prefix?: JSX.CSSProperties;
        suffix?: JSX.CSSProperties;
    };
    allowClear?: boolean | { clearIcon?: JSX.Element };
}

type DataAttr = Record<`data-${string}`, string>;

export type ValueType = JSX.InputHTMLAttributes<HTMLInputElement>['value'] | bigint;

export interface BaseInputProps extends CommonInputProps {
    value?: ValueType;
    prefixCls?: string;
    class?: string;
    style?: JSX.CSSProperties;
    disabled?: boolean;
    focused?: boolean;
    triggerFocus?: () => void;
    readOnly?: boolean;
    handleReset?: JSX.MouseEventHandler<Element>;
    hidden?: boolean;
    dataAttrs?: {
        affixWrapper?: DataAttr;
    };
    components?: {
        affixWrapper?: 'span' | 'div';
        groupWrapper?: 'span' | 'div';
        wrapper?: 'span' | 'div';
        groupAddon?: 'span' | 'div';
    };
    children: (props: any) => JSX.Element;
}

export type ShowCountFormatter = (args: { value: string; count: number; maxLength?: number }) => JSX.Element;

export type ExceedFormatter = (value: string, config: { max: number }) => string;

export interface CountConfig {
    max?: number;
    strategy?: (value: string) => number;
    show?: boolean | ShowCountFormatter;
    /** Trigger when content larger than the `max` limitation */
    exceedFormatter?: ExceedFormatter;
}

export interface InputProps
    extends CommonInputProps,
        Omit<
            JSX.InputHTMLAttributes<HTMLInputElement>,
            'size' | 'prefix' | 'type' | 'value' | 'ref' | 'style' | 'hidden'
        > {
    value?: ValueType;
    prefixCls?: string;
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types
    type?: LiteralUnion<
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'reset'
        | 'search'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week',
        string
    >;
    onPressEnter?: JSX.KeyboardEventHandler<HTMLInputElement>;
    /** It's better to use `count.show` instead */
    showCount?:
        | boolean
        | {
              formatter: ShowCountFormatter;
          };
    autoComplete?: string;
    htmlSize?: number;
    classes?: CommonInputProps['classes'] & {
        input?: string;
        count?: string;
    };
    styles?: CommonInputProps['styles'] & {
        input?: JSX.CSSProperties;
        count?: JSX.CSSProperties;
    };
    count?: CountConfig;
    ref?: Ref<InputRef>;
    style?: JSX.CSSProperties;
    hidden?: boolean;
}

export interface InputRef {
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => void;
    select: () => void;
    input: HTMLInputElement | null;
}

export interface ChangeEventInfo {
    source: 'compositionEnd' | 'change';
}

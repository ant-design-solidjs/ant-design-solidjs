import type { InputProps } from './Input';
import { JSX } from 'solid-js';

export function hasPrefixSuffix(props: {
    prefix?: JSX.Element;
    suffix?: JSX.Element;
    allowClear?: InputProps['allowClear'];
    showCount?: InputProps['showCount'];
}) {
    return !!(props.prefix || props.suffix || props.allowClear || props.showCount);
}

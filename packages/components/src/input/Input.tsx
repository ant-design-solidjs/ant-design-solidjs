import clsx from 'clsx';
import type { InputProps as RcInputProps, InputRef } from '../sc-input';
import RcInput from '../sc-input';
import { composeRef } from '@ant-design-solidjs/util';

import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import { NoCompactStyle, useCompactItemContext } from '../space/Compact';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import useStyle from './style';
import { hasPrefixSuffix } from './utils';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { Variant } from '../form/hooks/useVariants';
import useVariant from '../form/hooks/useVariants';
import getAllowClear from '../_util/getAllowClear';
import { createEffect, JSX, Ref, splitProps, useContext } from 'solid-js';
import { callHandler } from '../_util/event.ts';

export interface InputFocusOptions extends FocusOptions {
    cursor?: 'start' | 'end' | 'all';
}

export type { InputRef };

export function triggerFocus(element?: HTMLInputElement | HTMLTextAreaElement, option?: InputFocusOptions) {
    if (!element) {
        return;
    }

    element.focus(option);

    // Selection content
    const { cursor } = option || {};
    if (cursor) {
        const len = element.value.length;

        switch (cursor) {
            case 'start':
                element.setSelectionRange(0, 0);
                break;
            case 'end':
                element.setSelectionRange(len, len);
                break;
            default:
                element.setSelectionRange(0, len);
                break;
        }
    }
}

export interface InputProps
    extends Omit<RcInputProps, 'wrapperClassName' | 'groupClassName' | 'inputClassName' | 'affixWrapperClassName'> {
    rootClass?: string;
    size?: SizeType;
    disabled?: boolean;
    status?: InputStatus;
    /**
     * @since 5.13.0
     * @default "outlined"
     */
    variant?: Variant;
    [key: `data-${string}`]: string | undefined;
    ref?: Ref<InputRef>;
}

const Input = (_props: InputProps) => {
    const [props, rest] = splitProps(_props, [
        'prefixCls',
        'status',
        'size',
        'disabled',
        'onBlur',
        'onFocus',
        'suffix',
        'allowClear',
        'addonAfter',
        'addonBefore',
        'class',
        'styles',
        'rootClass',
        'onChange',
        'style',
        'classes',
        'variant',
        'ref',
    ]);

    const { getPrefixCls, direction, input } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('input', props.prefixCls);
    let inputRef: InputRef = null;

    // Style
    const rootCls = useCSSVarCls(prefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

    // ===================== Compact Item =====================
    const { compactSize, compactItemClasses } = useCompactItemContext(prefixCls, direction);

    // ===================== Size =====================
    const mergedSize = useSize(ctx => props.size ?? compactSize ?? ctx);

    // ===================== Disabled =====================
    const disabled = useContext(DisabledContext);
    const mergedDisabled = props.disabled ?? disabled;

    // ===================== Status =====================
    const { status: contextStatus, hasFeedback, feedbackIcon } = useContext(FormItemInputContext);
    const mergedStatus = getMergedStatus(contextStatus, props.status);

    // ===================== Focus warning =====================
    const inputHasPrefixSuffix = hasPrefixSuffix(props) || !!hasFeedback;
    let prevHasPrefixSuffix: boolean = inputHasPrefixSuffix;

    if (process.env.NODE_ENV !== 'production') {
        const warning = devUseWarning('Input');

        createEffect(() => {
            if (inputHasPrefixSuffix && !prevHasPrefixSuffix) {
                warning(
                    document.activeElement === inputRef?.input,
                    'usage',
                    `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`,
                );
            }
            prevHasPrefixSuffix = inputHasPrefixSuffix;
        });
    }
    /* eslint-enable */

    // ===================== Remove Password value =====================
    const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);

    const handleBlur: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent> = e => {
        removePasswordTimeout();
        callHandler(e, props.onBlur);
    };

    const handleFocus: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent> = e => {
        removePasswordTimeout();
        callHandler(e, props.onFocus);
    };

    const handleChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, JSX.ChangeEvent<HTMLInputElement>> = e => {
        removePasswordTimeout();
        callHandler(e, props.onChange);
    };

    const suffixNode = (hasFeedback || props.suffix) && (
        <>
            {props.suffix}
            {hasFeedback && feedbackIcon}
        </>
    );

    const mergedAllowClear = getAllowClear(props.allowClear);
    const [variant, enableVariantCls] = useVariant(props.variant);

    return wrapCSSVar(
        <RcInput
            ref={composeRef(props.ref, inputRef)}
            prefixCls={prefixCls}
            autoComplete={input?.autoComplete}
            {...rest}
            disabled={mergedDisabled}
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{ ...input?.style, ...props.style }}
            styles={{ ...input?.styles, ...props.styles }}
            suffix={suffixNode}
            allowClear={mergedAllowClear}
            class={clsx(props.class, props.rootClass, cssVarCls, rootCls, compactItemClasses(), input?.class)}
            onChange={handleChange}
            addonAfter={
                props.addonAfter && (
                    <NoCompactStyle>
                        <NoFormStyle override status>
                            {props.addonAfter}
                        </NoFormStyle>
                    </NoCompactStyle>
                )
            }
            addonBefore={
                props.addonBefore && (
                    <NoCompactStyle>
                        <NoFormStyle override status>
                            {props.addonBefore}
                        </NoFormStyle>
                    </NoCompactStyle>
                )
            }
            classes={{
                ...props.classes,
                ...input?.classes,
                input: clsx(
                    {
                        [`${prefixCls}-sm`]: mergedSize() === 'small',
                        [`${prefixCls}-lg`]: mergedSize() === 'large',
                        [`${prefixCls}-rtl`]: direction === 'rtl',
                    },
                    props.classes?.input,
                    input?.classes?.input,
                    hashId,
                ),
                variant: clsx(
                    {
                        [`${prefixCls}-${variant}`]: enableVariantCls,
                    },
                    getStatusClassNames(prefixCls, mergedStatus),
                ),
                affixWrapper: clsx(
                    {
                        [`${prefixCls}-affix-wrapper-sm`]: mergedSize() === 'small',
                        [`${prefixCls}-affix-wrapper-lg`]: mergedSize() === 'large',
                        [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
                    },
                    hashId,
                ),
                wrapper: clsx(
                    {
                        [`${prefixCls}-group-rtl`]: direction === 'rtl',
                    },
                    hashId,
                ),
                groupWrapper: clsx(
                    {
                        [`${prefixCls}-group-wrapper-sm`]: mergedSize() === 'small',
                        [`${prefixCls}-group-wrapper-lg`]: mergedSize() === 'large',
                        [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
                        [`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls,
                    },
                    getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback),
                    hashId,
                ),
            }}
        />,
    );
};

export default Input;

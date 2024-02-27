import clsx from 'clsx';
import type { BaseInputProps } from './interface';
import { hasAddon, hasPrefixSuffix } from './utils/commonUtils';
import { Component, createMemo, JSX, mergeProps, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const BaseInput: Component<BaseInputProps> = _props => {
    const props = mergeProps(
        { components: { affixWrapper: 'span', groupWrapper: 'span', wrapper: 'span', groupAddon: 'span' } },
        _props,
    );

    let containerRef: HTMLDivElement = null;

    const onInputClick: JSX.MouseEventHandler = e => {
        if (containerRef?.contains(e.target as Element)) {
            props.triggerFocus?.();
        }
    };

    const hasAffix = hasPrefixSuffix(props);

    const element = createMemo(() => {
        let element = props.children({
            value: props.value,
            class: clsx(!hasAffix && props.classes?.variant) || null,
            hidden: props.hidden,
            style: {
                ...props.style,
            },
        });

        // ================== Prefix & Suffix ================== //
        if (hasAffix) {
            // ================== Clear Icon ================== //
            let clearIcon: JSX.Element = null;
            if (props.allowClear) {
                const needClear = !props.disabled && !props.readOnly && props.value;
                const clearIconCls = `${props.prefixCls}-clear-icon`;
                const iconNode =
                    typeof props.allowClear === 'object' && props.allowClear?.clearIcon
                        ? props.allowClear.clearIcon
                        : '✖';

                clearIcon = (
                    <span
                        onClick={props.handleReset}
                        // Do not trigger onBlur when clear input
                        // https://github.com/ant-design/ant-design/issues/31200
                        onMouseDown={e => e.preventDefault()}
                        class={clsx(clearIconCls, {
                            [`${clearIconCls}-hidden`]: !needClear,
                            [`${clearIconCls}-has-suffix`]: !!props.suffix,
                        })}
                        role="button"
                        tabIndex={-1}
                    >
                        {iconNode}
                    </span>
                );
            }

            const affixWrapperPrefixCls = `${props.prefixCls}-affix-wrapper`;
            const affixWrapperCls = clsx(
                affixWrapperPrefixCls,
                {
                    [`${props.prefixCls}-disabled`]: props.disabled,
                    [`${affixWrapperPrefixCls}-disabled`]: props.disabled, // Not used, but keep it
                    [`${affixWrapperPrefixCls}-focused`]: props.focused, // Not used, but keep it
                    [`${affixWrapperPrefixCls}-readonly`]: props.readOnly,
                    [`${affixWrapperPrefixCls}-input-with-clear-btn`]: props.suffix && props.allowClear && props.value,
                },
                props.classes?.affixWrapper,
                props.classes?.variant,
            );

            const suffixNode = (props.suffix || props.allowClear) && (
                <span class={clsx(`${props.prefixCls}-suffix`, props.classes?.suffix)} style={props.styles?.suffix}>
                    {clearIcon}
                    {props.suffix}
                </span>
            );

            element = (
                <Dynamic
                    component={props.components.affixWrapper}
                    class={affixWrapperCls}
                    onClick={onInputClick}
                    {...props.dataAttrs?.affixWrapper}
                    ref={containerRef}
                    hidden={props.hidden}
                    style={{
                        ...props.styles?.affixWrapper,
                        ...props.style,
                    }}
                >
                    {props.prefix && (
                        <span
                            class={clsx(`${props.prefixCls}-prefix`, props.classes?.prefix)}
                            style={props.styles?.prefix}
                        >
                            {props.prefix}
                        </span>
                    )}
                    {element}
                    {suffixNode}
                </Dynamic>
            );
        }

        // ================== Addon ================== //
        if (hasAddon(props)) {
            const wrapperCls = `${props.prefixCls}-group`;
            const addonCls = `${wrapperCls}-addon`;
            const groupWrapperCls = `${wrapperCls}-wrapper`;

            const mergedWrapperClassName = clsx(`${props.prefixCls}-wrapper`, wrapperCls, props.classes?.wrapper);

            const mergedGroupClassName = clsx(
                groupWrapperCls,
                {
                    [`${groupWrapperCls}-disabled`]: props.disabled,
                },
                props.classes?.groupWrapper,
                !hasAffix && props.classes?.variant,
            );

            // Need another wrapper for changing display:table to display:inline-block
            // and put style prop in wrapper
            element = (
                <Dynamic
                    component={props.components.groupWrapper}
                    class={mergedGroupClassName}
                    hidden={props.hidden}
                    style={{
                        ...props.style,
                    }}
                >
                    <Dynamic component={props.components.wrapper} class={mergedWrapperClassName}>
                        <Show when={props.addonBefore}>
                            <Dynamic component={props.components.groupAddon} class={addonCls}>
                                {props.addonBefore}
                            </Dynamic>
                        </Show>

                        {element}

                        <Show when={props.addonAfter}>
                            <Dynamic component={props.components.groupAddon} class={addonCls}>
                                {props.addonAfter}
                            </Dynamic>
                        </Show>
                    </Dynamic>
                </Dynamic>
            );
        }
        return element;
    });

    return <>{element()}</>;
};

export default BaseInput;

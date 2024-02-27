import clsx from 'clsx';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { FormItemInputContext } from '../form/context';
import useStyle from './style';
import { Component, JSX, useContext } from 'solid-js';

export interface GroupProps {
    class?: string;
    size?: 'large' | 'small' | 'default';
    children?: JSX.Element;
    style?: JSX.CSSProperties;
    onMouseEnter?: JSX.MouseEventHandler<HTMLSpanElement>;
    onMouseLeave?: JSX.MouseEventHandler<HTMLSpanElement>;
    onFocus?: JSX.FocusEventHandler<HTMLSpanElement, FocusEvent>;
    onBlur?: JSX.FocusEventHandler<HTMLSpanElement, FocusEvent>;
    prefixCls?: string;
    compact?: boolean;
}

const Group: Component<GroupProps> = props => {
    const { getPrefixCls, direction } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('input-group', props.prefixCls);
    const inputPrefixCls = getPrefixCls('input');
    const [wrapCSSVar, hashId] = useStyle(inputPrefixCls);
    const formItemContext = useContext(FormItemInputContext);

    if (process.env.NODE_ENV !== 'production') {
        const warning = devUseWarning('Input.Group');

        warning.deprecated(false, 'Input.Group', 'Space.Compact');
    }

    return wrapCSSVar(
        <span
            class={clsx(
                prefixCls,
                {
                    [`${prefixCls}-lg`]: props.size === 'large',
                    [`${prefixCls}-sm`]: props.size === 'small',
                    [`${prefixCls}-compact`]: props.compact,
                    [`${prefixCls}-rtl`]: direction === 'rtl',
                },
                hashId,
                props.class,
            )}
            style={props.style}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
        >
            <FormItemInputContext.Provider
                value={{
                    ...formItemContext,
                    isFormItemInput: false,
                }}
            >
                {props.children}
            </FormItemInputContext.Provider>
        </span>,
    );
};

export default Group;

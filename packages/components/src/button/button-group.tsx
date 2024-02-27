import clsx from 'clsx';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import { useToken } from '../theme/internal';
import { createContext, createMemo, JSX, onMount, splitProps, useContext } from 'solid-js';

export interface ButtonGroupProps {
    size?: SizeType;
    style?: JSX.CSSProperties;
    class?: string;
    prefixCls?: string;
    children?: JSX.Element;
}

export const GroupSizeContext = createContext<SizeType>(undefined);

export function ButtonGroup(_props: ButtonGroupProps) {
    const { getPrefixCls, direction } = useContext(ConfigContext);

    const [props, others] = splitProps(_props, ['prefixCls', 'size', 'class']);

    const prefixCls = createMemo(() => getPrefixCls('btn-group', props.prefixCls));

    const [, , hashId] = useToken();

    const sizeCls = createMemo(() => {
        switch (props.size) {
            case 'large':
                return 'lg';
            case 'small':
                return 'sm';
            case 'middle':
            default:
                return '';
        }
    });

    onMount(() => {
        if (process.env.NODE_ENV !== 'production') {
            const warning = devUseWarning('Button.Group');

            warning(!props.size || ['large', 'small', 'middle'].includes(props.size), 'usage', 'Invalid prop `size`.');
        }
    });

    return (
        <GroupSizeContext.Provider value={props.size}>
            <div
                {...others}
                class={clsx(
                    prefixCls(),
                    {
                        [`${prefixCls()}-${sizeCls()}`]: sizeCls(),
                        [`${prefixCls()}-rtl`]: direction === 'rtl',
                    },
                    props.class,
                    hashId,
                )}
            />
        </GroupSizeContext.Provider>
    );
}

export default ButtonGroup;

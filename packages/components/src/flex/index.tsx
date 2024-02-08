import classNames from 'clsx';
import { omit } from '@ant-design-solidjs/util';

import { isPresetSize } from '../_util/gapSize';
import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import type { FlexProps } from './interface';
import useStyle from './style';
import createFlexClassNames from './utils';
import { createMemo, JSX, mergeProps, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export const Flex = (_props: FlexProps) => {
    const [ps, othersProps] = splitProps(_props, [
        'prefixCls',
        'rootClass',
        'class',
        'style',
        'flex',
        'gap',
        'children',
        'vertical',
        'component',
    ]);
    const props = mergeProps({ vertical: false, component: 'div' }, ps);

    const { flex: ctxFlex, direction: ctxDirection, getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

    const prefixCls = getPrefixCls('flex', props.prefixCls);

    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

    const mergedCls = createMemo(() => {
        const mergedVertical = props.vertical ?? ctxFlex?.vertical;
        return classNames(
            props.class,
            props.rootClass,
            ctxFlex?.class,
            prefixCls,
            hashId,
            cssVarCls,
            createFlexClassNames(prefixCls, _props),
            {
                [`${prefixCls}-rtl`]: ctxDirection === 'rtl',
                [`${prefixCls}-gap-${props.gap}`]: isPresetSize(props.gap),
                [`${prefixCls}-vertical`]: mergedVertical,
            },
        );
    });

    const mergedStyle = createMemo<JSX.CSSProperties>(() => {
        const style = { ...ctxFlex?.style, ...props.style };

        if (props.flex) {
            style.flex = props.flex;
        }

        if (props.gap && !isPresetSize(props.gap)) {
            style.gap = props.gap;
        }

        return style;
    });

    return wrapCSSVar(
        <Dynamic
            component={props.component}
            class={mergedCls()}
            style={mergedStyle()}
            {...omit(othersProps, ['justify', 'wrap', 'align'])}
        >
            {props.children}
        </Dynamic>,
    );
};

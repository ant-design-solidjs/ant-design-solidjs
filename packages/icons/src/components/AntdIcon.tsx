'use client';

import clsx from 'clsx';
import type { IconDefinition } from '@ant-design/icons-svg/lib/types';
import { blue } from '@ant-design/colors';

import Context from './Context';
import type { IconBaseProps } from './Icon';
import ReactIcon from './IconBase';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
import type { TwoToneColor } from './twoTonePrimaryColor';
import { normalizeTwoToneColors } from '../utils';
import { Component, createMemo, JSX, Ref, splitProps, useContext } from 'solid-js';

export interface AntdIconProps extends IconBaseProps {
    twoToneColor?: TwoToneColor;
}

export interface IconComponentProps extends AntdIconProps {
    icon: IconDefinition;
}

// Initial setting
// should move it to antd main repo?
setTwoToneColor(blue.primary);

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
interface IconBaseComponent<Props> extends Component<Props & { ref?: Ref<HTMLSpanElement> }> {
    getTwoToneColor: typeof getTwoToneColor;
    setTwoToneColor: typeof setTwoToneColor;
}
//React.forwardRef<HTMLSpanElement>
const Icon = ((_props: IconComponentProps) => {
    const [props, restProps] = splitProps(_props, [
        'class',
        'icon',
        'spin',
        'rotate',
        'tabIndex',
        'onClick',
        'twoToneColor',
    ]);

    const { prefixCls = 'anticon', rootClass } = useContext(Context);

    const iconTabIndex = createMemo(() => {
        if (props.tabIndex === undefined && props.onClick) {
            return -1;
        }
        return props.tabIndex;
    });

    const classString = createMemo(() => {
        return clsx(
            rootClass,
            prefixCls,
            {
                [`${prefixCls}-${props.icon.name}`]: !!props.icon.name,
                [`${prefixCls}-spin`]: !!props.spin || props.icon.name === 'loading',
            },
            props.class,
        );
    });

    const svgStyle = createMemo<JSX.CSSProperties>(() => {
        return props.rotate
            ? {
                  '-ms-transform': `rotate(${props.rotate}deg)`,
                  transform: `rotate(${props.rotate}deg)`,
              }
            : undefined;
    });

    const [primaryColor, secondaryColor] = normalizeTwoToneColors(props.twoToneColor);

    return (
        <span
            role="img"
            aria-label={props.icon.name}
            {...restProps}
            tabIndex={iconTabIndex()}
            onClick={props.onClick}
            class={classString()}
        >
            <ReactIcon
                icon={props.icon}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                style={svgStyle()}
            />
        </span>
    );
}) as IconBaseComponent<IconComponentProps>;

Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;

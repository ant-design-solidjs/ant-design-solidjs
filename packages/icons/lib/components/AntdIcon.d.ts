import type { IconDefinition } from '@ant-design/icons-svg/lib/types';
import type { IconBaseProps } from './Icon';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
import type { TwoToneColor } from './twoTonePrimaryColor';
import { Component, Ref } from 'solid-js';
export interface AntdIconProps extends IconBaseProps {
    twoToneColor?: TwoToneColor;
}
export interface IconComponentProps extends AntdIconProps {
    icon: IconDefinition;
}
interface IconBaseComponent<Props> extends Component<Props & {
    ref?: Ref<HTMLSpanElement>;
}> {
    getTwoToneColor: typeof getTwoToneColor;
    setTwoToneColor: typeof setTwoToneColor;
}
declare const Icon: IconBaseComponent<IconComponentProps>;
export default Icon;

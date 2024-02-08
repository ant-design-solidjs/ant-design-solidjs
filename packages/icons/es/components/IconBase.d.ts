import type { IconDefinition } from '@ant-design/icons-svg/lib/types';
import { Component, JSX } from 'solid-js';
export interface IconProps {
    icon: IconDefinition;
    className?: string;
    onClick?: JSX.EventHandler<SVGSVGElement, MouseEvent>;
    style?: JSX.CSSProperties;
    primaryColor?: string;
    secondaryColor?: string;
    focusable?: string;
}
export interface TwoToneColorPaletteSetter {
    primaryColor: string;
    secondaryColor?: string;
}
export interface TwoToneColorPalette extends TwoToneColorPaletteSetter {
    calculated?: boolean;
}
declare function setTwoToneColors({ primaryColor, secondaryColor }: TwoToneColorPaletteSetter): void;
declare function getTwoToneColors(): TwoToneColorPalette;
interface IconBaseComponent<P> extends Component<P> {
    getTwoToneColors: typeof getTwoToneColors;
    setTwoToneColors: typeof setTwoToneColors;
}
declare const IconBase: IconBaseComponent<IconProps>;
export default IconBase;

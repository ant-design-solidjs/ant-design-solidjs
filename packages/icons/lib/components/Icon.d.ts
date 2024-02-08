import { Component, JSX } from 'solid-js';
export interface IconBaseProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    spin?: boolean;
    rotate?: number;
}
export interface CustomIconComponentProps {
    width: string | number;
    height: string | number;
    fill: string;
    viewBox?: string;
    className?: string;
    style?: JSX.CSSProperties;
    ref?: any;
}
export interface IconComponentProps extends IconBaseProps {
    viewBox?: string;
    component?: Component<CustomIconComponentProps | JSX.SvgSVGAttributes<SVGSVGElement>> | Component<CustomIconComponentProps>;
    ariaLabel?: JSX.AriaAttributes['aria-label'];
}
declare const Icon: {
    (_props: IconComponentProps): JSX.Element;
    displayName: string;
};
export default Icon;

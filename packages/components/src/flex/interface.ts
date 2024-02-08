import type { AnyObject, CustomComponent } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';
import { JSX } from 'solid-js';

export interface FlexProps<P = AnyObject> extends Omit<JSX.HTMLAttributes<HTMLElement>, 'style'> {
    prefixCls?: string;
    rootClass?: string;
    vertical?: boolean;
    wrap?: JSX.CSSProperties['flex-wrap'];
    justify?: JSX.CSSProperties['justify-content'];
    align?: JSX.CSSProperties['align-items'];
    flex?: JSX.CSSProperties['flex'];
    gap?: JSX.CSSProperties['gap'] | SizeType;
    children: JSX.Element;
    component?: CustomComponent<P>;
    style?: JSX.CSSProperties;
}

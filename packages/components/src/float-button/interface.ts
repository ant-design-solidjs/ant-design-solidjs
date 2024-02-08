import type { BadgeProps } from '../badge';
import type { TooltipProps } from '../tooltip';
import type BackTop from './BackTop';
import type Group from './FloatButtonGroup';
import type PurePanel from './PurePanel';
import { JSX } from 'solid-js';

export type FloatButtonElement = HTMLAnchorElement & HTMLButtonElement;

export interface FloatButtonRef {
    nativeElement: FloatButtonElement | null;
}

export type FloatButtonType = 'default' | 'primary';

export type FloatButtonShape = 'circle' | 'square';

export type FloatButtonGroupTrigger = 'click' | 'hover';

export type FloatButtonBadgeProps = Omit<BadgeProps, 'status' | 'text' | 'title' | 'children'>;

export interface FloatButtonProps extends JSX.DOMAttributes<FloatButtonElement> {
    prefixCls?: string;
    class?: string;
    rootClass?: string;
    style?: JSX.CSSProperties;
    icon?: JSX.Element;
    description?: JSX.Element;
    type?: FloatButtonType;
    shape?: FloatButtonShape;
    tooltip?: TooltipProps['title'];
    href?: string;
    target?: JSX.HTMLAttributes<HTMLAnchorElement>;
    badge?: FloatButtonBadgeProps;
    ['aria-label']?: JSX.HTMLAttributes<HTMLElement>['aria-label'];
}

export interface FloatButtonContentProps extends JSX.DOMAttributes<HTMLDivElement> {
    class?: string;
    icon?: FloatButtonProps['icon'];
    description?: FloatButtonProps['description'];
    prefixCls: FloatButtonProps['prefixCls'];
}

export interface FloatButtonGroupProps extends FloatButtonProps {
    // 包含的 Float Button
    children: JSX.Element;
    // 触发方式 (有触发方式为菜单模式）
    trigger?: FloatButtonGroupTrigger;
    // 受控展开
    open?: boolean;
    // 关闭按钮自定义图标
    closeIcon?: JSX.Element;
    // 展开收起的回调
    onOpenChange?: (open: boolean) => void;
}

export interface BackTopProps extends Omit<FloatButtonProps, 'target'> {
    visibilityHeight?: number;
    onClick?: JSX.EventHandler<FloatButtonElement, MouseEvent>;
    target?: () => HTMLElement | Window | Document;
    prefixCls?: string;
    children?: JSX.Element;
    class?: string;
    rootClass?: string;
    style?: JSX.CSSProperties;
    duration?: number;
}

export type CompoundedComponent = JSX.ForwardRefExoticComponent<
    FloatButtonProps & JSX.RefAttributes<FloatButtonElement>
> & {
    Group: typeof Group;
    BackTop: typeof BackTop;
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

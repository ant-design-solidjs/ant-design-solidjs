import { JSX } from 'solid-js';

interface DivProps extends JSX.HTMLAttributes<HTMLDivElement> {
    'data-testid'?: string;
}

export const NotificationPlacements = ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'] as const;
export type NotificationPlacement = (typeof NotificationPlacements)[number];

export type IconType = 'success' | 'info' | 'error' | 'warning';

export interface ArgsProps {
    message: JSX.Element;
    description?: JSX.Element;
    btn?: JSX.Element;
    key?: JSX.Key;
    onClose?: () => void;
    duration?: number | null;
    icon?: JSX.Element;
    placement?: NotificationPlacement;
    style?: JSX.CSSProperties;
    className?: string;
    readonly type?: IconType;
    onClick?: () => void;
    closeIcon?: JSX.Element;
    props?: DivProps;
    role?: 'alert' | 'status';
}

type StaticFn = (args: ArgsProps) => void;

export interface NotificationInstance {
    success: StaticFn;
    error: StaticFn;
    info: StaticFn;
    warning: StaticFn;
    open: StaticFn;
    destroy(key?: JSX.Key): void;
}

export interface GlobalConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement | ShadowRoot;
    placement?: NotificationPlacement;
    closeIcon?: JSX.Element;
    rtl?: boolean;
    maxCount?: number;
    props?: DivProps;
}

export interface NotificationConfig {
    top?: number;
    bottom?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement | ShadowRoot;
    placement?: NotificationPlacement;
    maxCount?: number;
    rtl?: boolean;
    stack?: boolean | { threshold?: number };
    duration?: number;
}

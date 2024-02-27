import { JSX } from 'solid-js';

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface ConfigOptions {
    top?: number;
    duration?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    maxCount?: number;
    rtl?: boolean;
}

export interface ArgsProps {
    content: JSX.Element;
    duration?: number;
    type?: NoticeType;
    onClose?: () => void;
    icon?: JSX.Element;
    key?: string | number;
    style?: JSX.CSSProperties;
    className?: string;
    onClick?: (e: Jsx.MouseEvent<HTMLDivElement>) => void;
}

export type JointContent = JSX.Element | ArgsProps;

export interface MessageType extends PromiseLike<boolean> {
    (): void;
}

export type TypeOpen = (
    content: JointContent,
    duration?: number | VoidFunction, // Also can use onClose directly
    onClose?: VoidFunction,
) => MessageType;

export interface MessageInstance {
    info: TypeOpen;
    success: TypeOpen;
    error: TypeOpen;
    warning: TypeOpen;
    loading: TypeOpen;
    open(args: ArgsProps): MessageType;
    destroy(key?: Jsx.Key): void;
}

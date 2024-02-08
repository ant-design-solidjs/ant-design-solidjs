import type { IconBaseProps } from './Icon';
import { Component } from 'solid-js';
export interface CustomIconOptions {
    scriptUrl?: string | string[];
    extraCommonProps?: Record<string, unknown>;
}
export interface IconFontProps<T extends string = string> extends IconBaseProps {
    ref?: any;
    type: T;
}
export default function create<T extends string = string>(options?: CustomIconOptions): Component<IconFontProps<T>>;

import type { CSSMotionProps } from '../motion';
import type { NotificationPlacement } from './interface';
import { JSX } from 'solid-js';

export function getPlacementStyle(placement: NotificationPlacement, top: number, bottom: number) {
    let style: JSX.CSSProperties;

    switch (placement) {
        case 'top':
            style = {
                left: '50%',
                transform: 'translateX(-50%)',
                right: 'auto',
                top: `${top}px`,
                bottom: 'auto',
            };
            break;

        case 'topLeft':
            style = {
                left: 0,
                top: `${top}px`,
                bottom: 'auto',
            };
            break;

        case 'topRight':
            style = {
                right: 0,
                top: `${top}px`,
                bottom: 'auto',
            };
            break;

        case 'bottom':
            style = {
                left: '50%',
                transform: 'translateX(-50%)',
                right: 'auto',
                top: 'auto',
                bottom: `${bottom}px`,
            };
            break;

        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: `${bottom}px`,
            };
            break;

        default:
            style = {
                right: 0,
                top: 'auto',
                bottom: `${bottom}px`,
            };
            break;
    }
    return style;
}

export function getMotion(prefixCls: string): CSSMotionProps {
    return {
        motionName: `${prefixCls}-fade`,
    };
}

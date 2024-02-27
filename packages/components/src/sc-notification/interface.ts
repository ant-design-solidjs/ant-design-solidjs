import { JSX } from 'solid-js';

export type Placement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';

type NoticeSemanticProps = 'wrapper';

export interface NoticeConfig {
    content?: JSX.Element;
    duration?: number | null;
    closeIcon?: JSX.Element;
    closable?: boolean;
    class?: string;
    style?: JSX.CSSProperties;
    classes?: {
        [key in NoticeSemanticProps]?: string;
    };
    styles?: {
        [key in NoticeSemanticProps]?: JSX.CSSProperties;
    };
    /** @private Internal usage. Do not override in your code */
    props?: JSX.HTMLAttributes<HTMLDivElement> & Record<string, any>;

    onClose?: VoidFunction;
    onClick?: JSX.MouseEventHandler<HTMLDivElement>;
}

export interface OpenConfig extends NoticeConfig {
    key: JSX.Key;
    placement?: Placement;
    content?: JSX.Element;
    duration?: number | null;
}

export type InnerOpenConfig = OpenConfig & { times?: number };

export type Placements = Partial<Record<Placement, OpenConfig[]>>;

export type StackConfig =
    | boolean
    | {
          /**
           * When number is greater than threshold, notifications will be stacked together.
           * @default 3
           */
          threshold?: number;
          /**
           * Offset when notifications are stacked together.
           * @default 8
           */
          offset?: number;
          /**
           * Spacing between each notification when expanded.
           */
          gap?: number;
      };

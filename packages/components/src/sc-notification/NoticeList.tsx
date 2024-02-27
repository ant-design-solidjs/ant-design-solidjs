import { Component, createEffect, createMemo, createSignal, JSX, useContext } from 'solid-js';
import clsx from 'clsx';
import type { CSSMotionProps } from '../motion';
import { CSSMotionList } from '../motion';
import type { InnerOpenConfig, NoticeConfig, OpenConfig, Placement, StackConfig } from './interface';
import Notice from './Notice';
import { NotificationContext } from './NotificationProvider';
import useStack from './hooks/useStack';

export interface NoticeListProps {
    configList?: OpenConfig[];
    placement?: Placement;
    prefixCls?: string;
    motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
    stack?: StackConfig;

    // Events
    onAllNoticeRemoved?: (placement: Placement) => void;
    onNoticeClose?: (key: JSX.Key) => void;

    // Common
    class?: string;
    style?: JSX.CSSProperties;
}

const NoticeList: Component<NoticeListProps> = props => {
    const { classes: ctxCls } = useContext(NotificationContext);

    let dictRef: Record<string, HTMLDivElement> = {};
    const [latestNotice, setLatestNotice] = createSignal<HTMLDivElement>(null);
    const [hoverKeys, setHoverKeys] = createSignal<string[]>([]);

    const [stack, { offset, threshold, gap }] = useStack(props.stack);

    // const placementMotion = typeof motion === 'function' ? motion(placement) : motion;
    const keys = createMemo(() => {
        if (!props.configList) return [];

        return props.configList.map(config => ({
            config,
            key: String(config.key),
        }));
    });

    const expanded = createMemo(() => stack && (hoverKeys().length > 0 || keys().length <= threshold));

    // Clean hover key
    createEffect(() => {
        if (stack && hoverKeys().length > 1) {
            setHoverKeys(prev => prev.filter(key => keys().some(({ key: dataKey }) => key === dataKey)));
        }
    });

    // Force update latest notice
    createEffect(() => {
        if (stack && dictRef[keys()[keys().length - 1]?.key]) {
            setLatestNotice(dictRef[keys()[keys().length - 1]?.key]);
        }
    });

    return (
        <CSSMotionList
            class={clsx(props.prefixCls, `${props.prefixCls}-${props.placement}`, ctxCls?.list, props.class, {
                [`${props.prefixCls}-stack`]: !!stack,
                [`${props.prefixCls}-stack-expanded`]: expanded(),
            })}
            style={props.style}
            keys={keys()}
            motionAppear
            {...(typeof props.motion === 'function' ? props.motion(props.placement) : props.motion)}
            onAllRemoved={() => {
                props.onAllNoticeRemoved(props.placement);
            }}
        >
            {({ config, class: motionClassName, style: motionStyle, index: motionIndex }, nodeRef) => {
                const { key, times } = config as InnerOpenConfig;
                const strKey = String(key);
                const {
                    class: configClassName,
                    style: configStyle,
                    classes: configClassNames,
                    styles: configStyles,
                    ...restConfig
                } = config as NoticeConfig;
                const dataIndex = keys().findIndex(item => item.key === strKey);

                // If dataIndex is -1, that means this notice has been removed in data, but still in dom
                // Should minus (motionIndex - 1) to get the correct index because keys.length is not the same as dom length
                const stackStyle: JSX.CSSProperties = {};
                if (stack) {
                    const index = keys().length - 1 - (dataIndex > -1 ? dataIndex : motionIndex - 1);
                    const transformX = props.placement === 'top' || props.placement === 'bottom' ? '-50%' : '0';
                    if (index > 0) {
                        stackStyle.height = `${expanded() ? dictRef[strKey]?.offsetHeight : latestNotice()?.offsetHeight}px`;

                        // Transform
                        let verticalOffset = 0;
                        for (let i = 0; i < index; i++) {
                            verticalOffset += dictRef[keys()[keys().length - 1 - i].key]?.offsetHeight + gap;
                        }

                        const transformY =
                            (expanded() ? verticalOffset : index * offset) *
                            (props.placement.startsWith('top') ? 1 : -1);
                        const scaleX =
                            !expanded() && latestNotice()?.offsetWidth && dictRef[strKey]?.offsetWidth
                                ? (latestNotice()?.offsetWidth - offset * 2 * (index < 3 ? index : 3)) /
                                  dictRef[strKey]?.offsetWidth
                                : 1;
                        stackStyle.transform = `translate3d(${transformX}, ${transformY}px, 0) scaleX(${scaleX})`;
                    } else {
                        stackStyle.transform = `translate3d(${transformX}, 0, 0)`;
                    }
                }

                return (
                    <div
                        ref={nodeRef}
                        class={clsx(`${props.prefixCls}-notice-wrapper`, motionClassName, configClassNames?.wrapper)}
                        style={{
                            ...motionStyle,
                            ...stackStyle,
                            ...configStyles?.wrapper,
                        }}
                        onMouseEnter={() => setHoverKeys(prev => (prev.includes(strKey) ? prev : [...prev, strKey]))}
                        onMouseLeave={() => setHoverKeys(prev => prev.filter(k => k !== strKey))}
                    >
                        <Notice
                            {...restConfig}
                            ref={node => {
                                if (dataIndex > -1) {
                                    dictRef[strKey] = node;
                                } else {
                                    delete dictRef[strKey];
                                }
                            }}
                            prefixCls={props.prefixCls}
                            classes={configClassNames}
                            styles={configStyles}
                            class={clsx(configClassName, ctxCls?.notice)}
                            style={configStyle}
                            times={times}
                            eventKey={key}
                            onNoticeClose={props.onNoticeClose}
                            hovering={stack && hoverKeys().length > 0}
                        />
                    </div>
                );
            }}
        </CSSMotionList>
    );
};

export default NoticeList;

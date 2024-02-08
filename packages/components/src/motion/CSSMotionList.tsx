import type { CSSMotionProps } from './CSSMotion';
import OriginCSSMotion from './CSSMotion';
import type { KeyObject, Key } from './util/diff';
import { STATUS_ADD, STATUS_KEEP, STATUS_REMOVED } from './util/diff';
import { Component, createMemo, createSignal, For, JSX, mergeProps, Show, splitProps, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const MOTION_PROP_NAMES = [
    'eventProps',
    'visible',
    'children',
    'motionName',
    'motionAppear',
    'motionEnter',
    'motionLeave',
    'motionLeaveImmediately',
    'motionDeadline',
    'removeOnLeave',
    'leavedClassName',
    'onAppearPrepare',
    'onAppearStart',
    'onAppearActive',
    'onAppearEnd',
    'onEnterStart',
    'onEnterActive',
    'onEnterEnd',
    'onLeaveStart',
    'onLeaveActive',
    'onLeaveEnd',
];

export interface CSSMotionListProps
    extends Omit<CSSMotionProps, 'onVisibleChanged' | 'children'>,
        Omit<JSX.HTMLAttributes<any>, 'children'> {
    keys: (Key | { key: Key; [name: string]: any })[];
    component?: string | false | ValidComponent;

    /** This will always trigger after final visible changed. Even if no motion configured. */
    onVisibleChanged?: (visible: boolean, info: { key: Key }) => void;
    /** All motion leaves in the screen */
    onAllRemoved?: () => void;
    children?: (
        props: {
            visible?: boolean;
            class?: string;
            style?: JSX.CSSProperties;
            index?: number;
            [key: string]: any;
        },
        ref: (node: any) => void,
    ) => JSX.Element;
}

/**
 * Generate a CSSMotionList component with config
 * @param CSSMotion CSSMotion component
 */
export function genCSSMotionList(CSSMotion = OriginCSSMotion): Component<CSSMotionListProps> {
    function CSSMotionList(_props: CSSMotionListProps) {
        const ps = mergeProps({ component: 'div' }, _props);
        const [props, restProps] = splitProps(ps, ['component', 'children', 'onVisibleChanged', 'onAllRemoved']);

        const [keyEntities, setKeyEntities] = createSignal<KeyObject[]>([]);

        const motionProps = createMemo(() => {
            const motionProps: CSSMotionProps = {};
            MOTION_PROP_NAMES.forEach(prop => {
                motionProps[prop] = restProps[prop];
                delete restProps[prop];
            });
            delete restProps.keys;
            return motionProps;
        });

        function removeKey(removeKey: Key) {
            const nextKeyEntities = keyEntities().map(entity => {
                if (entity.key !== removeKey) return entity;
                return {
                    ...entity,
                    status: STATUS_REMOVED,
                };
            });
            setKeyEntities(nextKeyEntities);

            return nextKeyEntities.filter(({ status }) => status !== STATUS_REMOVED).length;
        }

        const child = () => (
            <For each={keyEntities()}>
                {({ status, ...eventProps }, index) => (
                    <CSSMotion
                        {...motionProps()}
                        visible={status === STATUS_ADD || status === STATUS_KEEP}
                        eventProps={eventProps}
                        onVisibleChanged={changedVisible => {
                            props.onVisibleChanged?.(changedVisible, { key: eventProps.key });

                            if (!changedVisible) {
                                const restKeysCount = removeKey(eventProps.key);

                                if (restKeysCount === 0 && props.onAllRemoved) {
                                    props.onAllRemoved();
                                }
                            }
                        }}
                    >
                        {(props, ref) => props.children({ ...props, index: index() }, ref)}
                    </CSSMotion>
                )}
            </For>
        );

        return (
            <Show when={props.component !== false} fallback={<>{child()}</>}>
                <Dynamic component={props.component as string} {...restProps}>
                    {child()}
                </Dynamic>
            </Show>
        );
    }

    return CSSMotionList;
}

export default genCSSMotionList();

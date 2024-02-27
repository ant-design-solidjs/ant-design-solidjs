import type { CSSMotionProps } from './CSSMotion';
import OriginCSSMotion from './CSSMotion';
import { diffKeys, KeyObject, parseKeys } from './util/diff';
import { STATUS_ADD, STATUS_KEEP, STATUS_REMOVED, STATUS_REMOVE } from './util/diff';
import {
    Component,
    createEffect,
    createMemo,
    createSignal,
    For,
    JSX,
    mergeProps,
    Show,
    splitProps,
    untrack,
    ValidComponent,
} from 'solid-js';
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
    'leavedClass',
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
    keys: (JSX.Key | { key: JSX.Key; [name: string]: any })[];
    component?: string | false | ValidComponent;

    /** This will always trigger after final visible changed. Even if no motion configured. */
    onVisibleChanged?: (visible: boolean, info: { key: JSX.Key }) => void;
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
        const [props, restProps] = splitProps(ps, [
            'component',
            'children',
            'onVisibleChanged',
            'onAllRemoved',
            'keys',
        ]);

        const [keyEntities, setKeyEntities] = createSignal<KeyObject[]>([]);

        const motionProps = createMemo(() => {
            const motionProps: CSSMotionProps = {};
            MOTION_PROP_NAMES.forEach(prop => {
                motionProps[prop] = restProps[prop];
                delete restProps[prop];
            });
            return motionProps;
        });

        function removeKey(removeKey: JSX.Key) {
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

        createEffect(() => {
            if (!props.keys || props.keys.length === 0) return;
            const parsedKeyObjects = parseKeys(props.keys);
            const mixedKeyEntities = diffKeys(
                untrack(() => keyEntities()),
                parsedKeyObjects,
            );
            const keys = mixedKeyEntities.filter(entity => {
                const prevEntity = untrack(() => keyEntities()).find(({ key }) => entity.key === key);
                // Remove if already mark as removed
                return !(prevEntity && prevEntity.status === STATUS_REMOVED && entity.status === STATUS_REMOVE);
            });
            setKeyEntities(keys);
        });

        const Child = () => (
            <For each={keyEntities()}>
                {({ status, ...eventProps }, index) => {
                    return (
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
                            {(ps, ref) => props.children({ ...ps, index: index() }, ref)}
                        </CSSMotion>
                    );
                }}
            </For>
        );

        return (
            <Show when={props.component !== false} fallback={<Child />}>
                <Dynamic component={props.component as string} {...restProps}>
                    <Child />
                </Dynamic>
            </Show>
        );
    }

    return CSSMotionList;
}

export default genCSSMotionList();

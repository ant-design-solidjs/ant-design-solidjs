import classNames from 'clsx';
import CSSMotion from '../../motion';
import { fillRef, raf } from '@ant-design-solidjs/util';
import { getTargetWaveColor } from './util';
import { type ShowWaveEffect, TARGET_CLS } from './interface';
import { Component, createMemo, createSignal, JSX, onCleanup, onMount, Show } from 'solid-js';
import { render } from 'solid-js/web';

function validateNum(value: number) {
    return Number.isNaN(value) ? 0 : value;
}

export interface WaveEffectProps {
    class: string;
    target: HTMLElement;
    component?: string;
}

const WaveEffect: Component<WaveEffectProps> = props => {
    let divRef: HTMLDivElement = null;

    const [color, setWaveColor] = createSignal<string | null>(null);
    const [borderRadius, setBorderRadius] = createSignal<number[]>([]);
    const [left, setLeft] = createSignal(0);
    const [top, setTop] = createSignal(0);
    const [width, setWidth] = createSignal(0);
    const [height, setHeight] = createSignal(0);
    const [enabled, setEnabled] = createSignal(false);

    const waveStyle = createMemo(() => {
        const style: JSX.CSSProperties = {
            left: `${left()}px`,
            top: `${top()}px`,
            width: `${width()}px`,
            height: `${height()}px`,
            'border-radius': borderRadius()
                .map(radius => `${radius}px`)
                .join(' '),
        };
        if (color()) {
            style['--wave-color'] = color();
        }

        return style;
    });

    function syncPos() {
        const nodeStyle = getComputedStyle(props.target);
        // Get wave color from target
        setWaveColor(getTargetWaveColor(props.target));

        const isStatic = nodeStyle.position === 'static';

        // Rect
        const { borderLeftWidth, borderTopWidth } = nodeStyle;
        setLeft(isStatic ? props.target.offsetLeft : validateNum(-parseFloat(borderLeftWidth)));
        setTop(isStatic ? props.target.offsetTop : validateNum(-parseFloat(borderTopWidth)));
        setWidth(props.target.offsetWidth);
        setHeight(props.target.offsetHeight);

        // Get border radius
        const { borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius } =
            nodeStyle;

        setBorderRadius(
            [borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius].map(radius =>
                validateNum(parseFloat(radius)),
            ),
        );
    }

    onMount(() => {
        if (props.target) {
            // We need delay to check position here
            // since UI may change after click
            const id = raf(() => {
                syncPos();

                setEnabled(true);
            });

            // Add resize observer to follow size
            let resizeObserver: ResizeObserver;
            if (typeof ResizeObserver !== 'undefined') {
                resizeObserver = new ResizeObserver(syncPos);

                resizeObserver.observe(props.target);
            }

            onCleanup(() => {
                raf.cancel(id);
                resizeObserver?.disconnect();
            });
        }
    });

    return (
        <Show when={enabled()}>
            <CSSMotion
                visible
                motionAppear
                motionName="wave-motion"
                motionDeadline={5000}
                onAppearEnd={(_, event) => {
                    if (event.deadline || (event as TransitionEvent).propertyName === 'opacity') {
                        const holder = divRef?.parentElement;

                        holder?.remove();
                    }
                    return false;
                }}
            >
                {({ className: motionClassName }, ref) => {
                    return (
                        <div
                            ref={el => (divRef = el) && fillRef(ref, el)}
                            class={classNames(
                                props.class,
                                {
                                    'wave-quick':
                                        (props.component === 'Checkbox' || props.component === 'Radio') &&
                                        props.target?.classList.contains(TARGET_CLS),
                                },
                                motionClassName,
                            )}
                            style={waveStyle()}
                        />
                    );
                }}
            </CSSMotion>
        </Show>
    );
};
const showWaveEffect: ShowWaveEffect = (target, info) => {
    const { component } = info;

    // Skip for unchecked checkbox
    if (component === 'Checkbox' && !target.querySelector('input')?.checked) {
        return;
    }

    // Create holder
    const holder = document.createElement('div');
    holder.style.position = 'absolute';
    holder.style.left = '0px';
    holder.style.top = '0px';
    target?.insertBefore(holder, target?.firstChild);

    render(() => <WaveEffect {...info} target={target} />, holder);
};

export default showWaveEffect;

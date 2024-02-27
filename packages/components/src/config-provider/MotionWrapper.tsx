import { Provider as MotionProvider } from '../motion';
import { useToken } from '../theme/internal';
import { JSX, Show } from 'solid-js';

export interface MotionWrapperProps {
    children?: JSX.Element;
}

export default function MotionWrapper(props: MotionWrapperProps) {
    const [, token] = useToken();
    const { motion } = token;

    let needWrapMotionProviderRef = false;
    needWrapMotionProviderRef = needWrapMotionProviderRef || motion === false;

    return (
        <Show when={needWrapMotionProviderRef} fallback={props.children}>
            <MotionProvider motion={token.motion}>{props.children}</MotionProvider>;
        </Show>
    );
}

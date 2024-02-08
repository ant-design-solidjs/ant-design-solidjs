import { createContext, JSX, splitProps } from 'solid-js';

interface MotionContextProps {
    motion?: boolean;
}

export const Context = createContext<MotionContextProps>({});

export default function MotionProvider(_props: MotionContextProps & { children?: JSX.Element }) {
    const [props, other] = splitProps(_props, ['children']);
    return <Context.Provider value={other}>{props.children}</Context.Provider>;
}

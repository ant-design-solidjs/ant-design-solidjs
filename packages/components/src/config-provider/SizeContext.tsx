import { createContext, JSX, useContext } from 'solid-js';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

const SizeContext = createContext<SizeType>(undefined);

export interface SizeContextProps {
    size?: SizeType;
    children?: JSX.Element;
}

export function SizeContextProvider(props: SizeContextProps) {
    const originSize = useContext<SizeType>(SizeContext);
    return <SizeContext.Provider value={props.size || originSize}>{props.children}</SizeContext.Provider>;
}

export default SizeContext;

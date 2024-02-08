import { createContext, JSX, useContext } from 'solid-js';

export type DisabledType = boolean | undefined;

const DisabledContext = createContext<DisabledType>(false);

export interface DisabledContextProps {
    disabled?: DisabledType;
    children?: JSX.Element;
}

export function DisabledContextProvider(props: DisabledContextProps) {
    const originDisabled = useContext(DisabledContext);
    return (
        <DisabledContext.Provider value={props.disabled ?? originDisabled}>{props.children}</DisabledContext.Provider>
    );
}

export default DisabledContext;

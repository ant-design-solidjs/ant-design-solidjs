import { createContext } from 'solid-js';

export interface SpaceContextType {
    latestIndex: number;
}

export const SpaceContext = createContext<SpaceContextType>({
    latestIndex: 0,
});

export const SpaceContextProvider = SpaceContext.Provider;

import { createContext } from 'solid-js';

const zIndexContext = createContext<number | undefined>(undefined);

export default zIndexContext;

import type { InternalNamePath } from './interface';
import { createContext } from 'solid-js';

export interface ListContextProps {
    getKey: (namePath: InternalNamePath) => [InternalNamePath[number], InternalNamePath];
}

const ListContext = createContext<ListContextProps | null>(null);

export default ListContext;

import type { AntAnchor } from './Anchor';
import { createContext } from 'solid-js';

const AnchorContext = createContext<AntAnchor | undefined>(undefined);

export default AnchorContext;

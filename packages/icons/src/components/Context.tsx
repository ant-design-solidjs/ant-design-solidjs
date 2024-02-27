import { createContext } from 'solid-js';

export interface IconContextProps {
    prefixCls?: string;
    rootClass?: string;
    csp?: { nonce?: string };
}

const IconContext = createContext<IconContextProps>({});

export default IconContext;

import type { FloatButtonShape } from './interface';
import { createContext } from 'solid-js';

const FloatButtonGroupContext = createContext<FloatButtonShape | undefined>(undefined);

export const { Provider: FloatButtonGroupProvider } = FloatButtonGroupContext;

export default FloatButtonGroupContext;

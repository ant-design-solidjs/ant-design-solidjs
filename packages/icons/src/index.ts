import Context from './components/Context';
import type { AntdIconProps } from './components/AntdIcon';

export * from './icons';
export * from './components/twoTonePrimaryColor';
export { default as createFromIconfontCN } from './components/IconFont';
export { default as Icon } from './components/Icon';

const IconProvider = Context.Provider;
export { IconProvider, AntdIconProps };

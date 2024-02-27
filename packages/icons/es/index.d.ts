import type { AntdIconProps } from './components/AntdIcon';
export * from './icons';
export * from './components/twoTonePrimaryColor';
export { default as createFromIconfontCN } from './components/IconFont';
export { default as Icon } from './components/Icon';
declare const IconProvider: import("solid-js").ContextProviderComponent<import("./components/Context").IconContextProps>;
export { IconProvider, AntdIconProps };

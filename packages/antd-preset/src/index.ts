import { definePreset } from 'unocss';

import theme from './theme';
import prefight from './prefight';
import shortcuts from './shortcuts';

export interface AntdOptions {
    preflight?: boolean;
}

const defaultOptions: AntdOptions = {
    preflight: true,
};

export default definePreset((options?: AntdOptions) => {
    const opt = { ...defaultOptions, ...options };
    const preflights = opt.preflight ? [prefight()] : [];
    console.log(shortcuts);
    return {
        name: '@ant-design-solidjs/ant-preset',
        enforce: 'pre',
        shortcuts,
        preflights,
        theme,
    };
});

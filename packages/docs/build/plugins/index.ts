import autoImport from './autoImport.ts';
import icon from './icon.ts';
import solid from 'vite-plugin-solid';
export function setupPlugins() {
    return [solid(), icon(), autoImport()];
}

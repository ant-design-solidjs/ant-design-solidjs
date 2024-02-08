import autoImport from './autoImport';
import icon from './icon';
import solid from 'vite-plugin-solid';
export function setupPlugins() {
    return [solid(), icon(), autoImport()];
}

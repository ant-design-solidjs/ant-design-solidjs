import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import { getSrcPath } from '../utils';

export default function autoImport() {
    const srcPath = getSrcPath();
    const typingPath = `${srcPath}/types/icons.d.ts`;
    return AutoImport({
        dts: typingPath,
        resolvers: [
            IconsResolver({
                prefix: 'Icon',
                extension: 'jsx',
                customCollections: ['local'],
            }),
        ],
    });
}

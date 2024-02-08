import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { getSrcPath } from '../utils';

/** 本地svg图标集合名称 */
const collectionName = 'local';
export default function icon() {
    const srcPath = getSrcPath();
    const localIconPath = `${srcPath}/assets/icons/svg`;

    return Icons({
        compiler: 'solid',
        customCollections: {
            [collectionName]: FileSystemIconLoader(localIconPath, svg =>
                svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '),
            ),
        },
    });
}

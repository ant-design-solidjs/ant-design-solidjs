import { warning } from '@ant-design-solidjs/util';
import type { LinterInfo } from './interface';

export function lintWarning(message: string, info: LinterInfo) {
    const { path, parentSelectors } = info;

    warning(
        false,
        `[Ant Design CSS-in-JS] ${path ? `Error in ${path}: ` : ''}${message}${
            parentSelectors.length ? ` Selector: ${parentSelectors.join(' | ')}` : ''
        }`,
    );
}

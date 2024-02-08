import { createEffect, onCleanup, useContext } from 'solid-js';
import { pathKey, type KeyType } from '../Cache';
import StyleContext from '../StyleContext';
import useEffectCleanupRegister from './useEffectCleanupRegister';
import useHMR from './useHMR';

export type ExtractStyle<CacheValue> = (
    cache: CacheValue,
    effectStyles: Record<string, boolean>,
    options?: {
        plain?: boolean;
    },
) => [order: number, styleId: string, style: string] | null;

export default function useGlobalCache<CacheType>(
    prefix: string,
    keyPath: KeyType[],
    cacheFn: () => CacheType,
    onCacheRemove?: (cache: CacheType, fromHMR: boolean) => void,
    // Add additional effect trigger by `useInsertionEffect`
    onCacheEffect?: (cachedValue: CacheType) => void,
): CacheType {
    const { cache: globalCache } = useContext(StyleContext);
    const fullPath = [prefix, ...keyPath];
    const fullPathStr = pathKey(fullPath);

    const register = useEffectCleanupRegister();

    const HMRUpdate = useHMR();

    type UpdaterArgs = [times: number, cache: CacheType];

    const buildCache = (updater?: (data: UpdaterArgs) => UpdaterArgs) => {
        globalCache.opUpdate(fullPathStr, prevCache => {
            const [times = 0, cache] = prevCache || [undefined, undefined];

            // HMR should always ignore cache since developer may change it
            let tmpCache = cache;
            if (process.env.NODE_ENV !== 'production' && cache && HMRUpdate) {
                onCacheRemove?.(tmpCache, HMRUpdate);
                tmpCache = null;
            }

            const mergedCache = tmpCache || cacheFn();

            const data: UpdaterArgs = [times, mergedCache];

            // Call updater if need additional logic
            return updater ? updater(data) : data;
        });
    };

    // Create cache
    createEffect(() => {
        buildCache();
    });

    let cacheEntity = globalCache.opGet(fullPathStr);

    // HMR clean the cache but not trigger `useMemo` again
    // Lets fallback of this
    // ref https://github.com/ant-design/cssinjs/issues/127
    if (process.env.NODE_ENV !== 'production' && !cacheEntity) {
        buildCache();
        cacheEntity = globalCache.opGet(fullPathStr);
    }

    const cacheContent = cacheEntity![1];

    createEffect(() => {
        onCacheEffect?.(cacheContent);

        buildCache(([times, cache]) => {
            return [times + 1, cache];
        });
    });

    onCleanup(() => {
        globalCache.opUpdate(fullPathStr, prevCache => {
            const [times = 0, cache] = prevCache || [];
            const nextCount = times - 1;

            if (nextCount === 0) {
                // Always remove styles in useEffect callback
                register(() => {
                    // With polyfill, registered callback will always be called synchronously
                    // But without polyfill, it will be called in effect clean up,
                    // And by that time this cache is cleaned up.
                    if (!globalCache.opGet(fullPathStr)) {
                        onCacheRemove?.(cache, false);
                    }
                });
                return null;
            }

            return [times - 1, cache];
        });
    });

    return cacheContent;
}

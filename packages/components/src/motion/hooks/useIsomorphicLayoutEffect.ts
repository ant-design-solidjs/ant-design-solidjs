import { canUseDom } from '@ant-design-solidjs/util';
import { createEffect, createRenderEffect } from 'solid-js';

// It's safe to use `useLayoutEffect` but the warning is annoying
const useIsomorphicLayoutEffect = canUseDom() ? createRenderEffect : createEffect;

export default useIsomorphicLayoutEffect;

// import useForceUpdate from '../../_util/hooks/useForceUpdate';
import type { ScreenMap } from '../../_util/responsiveObserver';
import useResponsiveObserver from '../../_util/responsiveObserver';
import { createEffect, onCleanup } from 'solid-js';

function useBreakpoint(refreshOnChange: boolean = true): ScreenMap {
    let screensRef: ScreenMap = {};
    // const forceUpdate = useForceUpdate();
    const responsiveObserver = useResponsiveObserver();

    createEffect(() => {
        const token = responsiveObserver().subscribe(supportScreens => {
            screensRef = supportScreens;
            if (refreshOnChange) {
                // forceUpdate();
            }
        });

        onCleanup(() => responsiveObserver().unsubscribe(token));
    });

    return screensRef;
}

export default useBreakpoint;

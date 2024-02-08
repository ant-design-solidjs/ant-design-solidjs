import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

const routes: RouteDefinition[] = [
    {
        path: '/',
        component: lazy(() => import('@/views/home')),
    },
    {
        path: '/components',
        component: lazy(() => import('@/views/components')),
        children: [
            {
                path: '/affix',
                component: lazy(() => import('@/views/components/affix')),
            },
            {
                path: '/button',
                component: lazy(() => import('@/views/components/button')),
            },
            {
                path: '/divider',
                component: lazy(() => import('@/views/components/divider')),
            },
            {
                path: '/flex',
                component: lazy(() => import('@/views/components/flex')),
            },
        ],
    },
];

export { routes };

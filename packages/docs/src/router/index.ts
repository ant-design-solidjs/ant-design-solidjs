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
                path: '/alert',
                component: lazy(() => import('@/views/components/alert')),
            },
            {
                path: '/anchor',
                component: lazy(() => import('@/views/components/anchor')),
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
            {
                path: '/skeleton',
                component: lazy(() => import('@/views/components/skeleton')),
            },
            {
                path: '/spin',
                component: lazy(() => import('@/views/components/spin')),
            },
            {
                path: '/notification',
                component: lazy(() => import('@/views/components/notification')),
            },
            {
                path: '/form/input',
                component: lazy(() => import('@/views/components/form/input')),
            },
            {
                path: '/watermark',
                component: lazy(() => import('@/views/components/watermark')),
            },
        ],
    },
];

export { routes };

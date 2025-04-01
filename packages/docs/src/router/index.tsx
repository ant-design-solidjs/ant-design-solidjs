import type { RouteDefinition } from "@solidjs/router"
import { lazy } from "solid-js"

export const routes: RouteDefinition[] = [
    {
        path: "/",
        component: lazy(() => import("../routes/home/index.tsx")),
    },
    {
        path: "components",
        component: lazy(() => import("../routes/components/index.tsx")),
    },
    {
        path: "components/:id",
        component: lazy(() => import("../routes/components/detail.tsx")),
    },
]

import { Route } from '#/enums/Route';
import FocusLayout from '#/layouts/FocusLayout.vue';
import NavLayout from '#/layouts/NavLayout.vue';
import CreatePlannedSession from '#/views/program/CreatePlannedSession.vue';
import Program from '#/views/program/Program.vue';
import Today from '#/views/Today.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: Route.TODAY,
            component: NavLayout,
            children: [
                { path: Route.TODAY, component: Today },
                { path: Route.PROGRAM, component: Program }
            ]
        },
        {
            path: Route.TODAY,
            component: FocusLayout,
            children: [
                { path: Route.PROGRAM_CREATE_PLANNED_SESSION, component: CreatePlannedSession }
            ]
        },
        {
            path: '/:pathMatch(.*)',
            redirect: Route.TODAY
        }
    ]
});

function getPathDepth(path: string) {
    return path.split('/').filter(Boolean).length;
}

/**
 * Mobile-like navigation: going deeper in the path pushes the new page from the right,
 * going back up pops it. Pages at the same depth (bottom nav tabs) swap instantly.
 */
router.afterEach((to, from, failure) => {
    if (failure) return;

    const isInitialNavigation = from.matched.length === 0;
    const toDepth = getPathDepth(to.path);
    const fromDepth = getPathDepth(from.path);

    if (isInitialNavigation || toDepth === fromDepth) {
        to.meta.transition = undefined;
    } else {
        to.meta.transition = toDepth > fromDepth ? 'slide-push' : 'slide-pop';
    }
});

export default router;

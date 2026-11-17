import { Route } from '#/enums/Route';
import AppLayout from '#/layouts/AppLayout.vue';
import Program from '#/views/Program.vue';
import Today from '#/views/Today.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: Route.TODAY,
            alias: '/',
            component: Today,
            meta: {
                layout: AppLayout
            }
        },
        {
            path: Route.PROGRAM,
            alias: '/',
            component: Program,
            meta: {
                layout: AppLayout
            }
        },
        {
            path: '/:pathMatch(.*)',
            redirect: Route.TODAY
        }
    ]
});

router.beforeEach(async (to, from) => {
    return true;
});

export default router;

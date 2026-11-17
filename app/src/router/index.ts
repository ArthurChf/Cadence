import { Route } from '#/enums/Route';
import AppLayout from '#/layouts/AppLayout.vue';
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
            path: '/:pathMatch(.*)',
            redirect: Route.TODAY
        }
    ]
});

router.beforeEach(async (to, from) => {
    return true;
});

export default router;

import { createRouter, createWebHashHistory } from 'vue-router';
import homeInfo from '../../components/home/index.vue';

const routes = [
    {
        path: '/',
        component: homeInfo
    }
];
export const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;

import { PATH, ROUTE_NAME } from "@/constant/route-constant";
import { getLocalStorage } from "@/utils/appConfig";
import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";

import AppRoutes from "./app-route";

Vue.use(VueRouter);

let config: RouterOptions = {
    routes: [...AppRoutes],
    linkActiveClass: "active"
};
const router: VueRouter = new VueRouter(config);

// Check Authenticate before enter route
router.beforeEach((to, from, next) => {
    // Each route required authenticate
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let user = getLocalStorage('auth');
        if (!user) {
            next({
                path: PATH.LOGIN,
                params: { nextUrl: to.fullPath }
            })
        } else {
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.email === 'trianh@gmail.com') {
                    next()
                }
                else {
                    next({ path: PATH.ADMIN, })
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) { // Each route required Guest
        let user = getLocalStorage('auth');
        if (user) {
            next({ name: ROUTE_NAME.LIST_POST, query: { categoryId: 'e78c78b7-80d1-4f3b-3014-08d91e5e4dfa' } })
        }
        else {
            next();
        }
    } else { // Other
        next();
    }
})

export default router;

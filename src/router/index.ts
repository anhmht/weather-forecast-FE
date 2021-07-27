import { DTH_CATEGORY, KTTV_CATEGORY, PATH, ROUTE_NAME, SUPER_CATEGORY } from "@/constant/route-constant";
import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";

import AppRoutes from "./app-route";
import userTypesStore from "@/store/user/user-types.store";
import store from "@/store";
import { USER_ROLE } from "@/constant/common-constant";

Vue.use(VueRouter);

let config: RouterOptions = {
    routes: [...AppRoutes],
    linkActiveClass: "active"
};
const router: VueRouter = new VueRouter(config);


store.dispatch('user/' + userTypesStore.Set.Auth).then(() => {
    // Check Authenticate before enter route
    router.beforeEach(async (to, from, next) => {
        // Each route required authenticate
        if (to.matched.some(record => record.meta.requiresAuth)) {
            // let user = getLocalStorage('auth');
            let user = store.getters['user/' + userTypesStore.Get.Auth];
            console.log(user);
            if (!user) {
                next({
                    path: PATH.LOGIN,
                    params: { nextUrl: to.fullPath }
                })
            } else {
                const isSuperAmin = !!user.roles.find(r => r === USER_ROLE.SUPER);
                const isDTH = !!user.roles.find(r => r === USER_ROLE.DTH);
                const isKTTV = !!user.roles.find(r => r === USER_ROLE.KTTV);
                const categoryId: string = to.query.categoryId ? to.query.categoryId.toString() : null;
                console.log(isSuperAmin, isDTH, isKTTV, categoryId);

                if (isSuperAmin) {
                    next();
                } else if (to.matched.some(record => record.meta.accept === USER_ROLE.SUPER)
                    || (categoryId && SUPER_CATEGORY.indexOf(categoryId) > 0)) {

                    // list & create user & SUPER_CATEGORY
                    next({ path: PATH.NOT_AUTHORIZED });
                } else {
                    if (!isKTTV &&
                        (to.matched.some(record => record.meta.accept === USER_ROLE.KTTV) || (categoryId && KTTV_CATEGORY.indexOf(categoryId) > 0))) {
                        // not KTTV
                        next({ path: PATH.NOT_AUTHORIZED });
                    } else if (!isDTH &&
                        (to.matched.some(record => record.meta.accept === USER_ROLE.DTH) || (categoryId && DTH_CATEGORY.indexOf(categoryId) > 0))) {
                        // not DTH
                        next({ path: PATH.NOT_AUTHORIZED });
                    } else {
                        next();
                    }
                }
            }
        } else if (to.matched.some(record => record.meta.guest)) { // Each route required Guest
            let user = store.getters['user/' + userTypesStore.Get.Auth];
            if (user) {
                const isSuperAmin = !!user.roles.find(r => r === USER_ROLE.SUPER);
                const isKTTV = !!user.roles.find(r => r === USER_ROLE.KTTV);

                if (isSuperAmin) {
                    next({ path: PATH.ADMIN, params: { role: 'admin' } });
                } else if (isKTTV) {
                    next({ name: ROUTE_NAME.LIST_POST, query: { categoryId: KTTV_CATEGORY[0] } })
                } else {
                    next({ name: ROUTE_NAME.LIST_DOCUMENT })
                }
            }
            else {
                next();
            }
        } else { // Other
            next();
        }
    })
})

export default router;
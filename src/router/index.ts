import { DTH_CATEGORY, KTTV_CATEGORY, PATH, ROUTE_NAME, SUPER_CATEGORY } from "@/constant/route-constant";
import { getLocalStorage, removeLocalStorage, setAxiosHeader, setLocalStorage } from "@/utils/appConfig";
import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";

import AppRoutes from "./app-route";
import userTypesStore from "@/store/user/user-types.store";
import userConstant from "@/constant/uri/user-constant";
import axios from "axios";
import store from "@/store";
import { USER_ROLE } from "@/constant/common-constant";

Vue.use(VueRouter);

let config: RouterOptions = {
    routes: [...AppRoutes],
    linkActiveClass: "active"
};
const router: VueRouter = new VueRouter(config);

// Check Authenticate before enter route
router.beforeEach(async (to, from, next) => {
    const authConfig = getLocalStorage('auth');
    if (authConfig && authConfig.token) {
        const config = {
            headers: {"Authorization" : `Bearer ${authConfig.token}`}
        };
        const url = userConstant.getUserInfo;
        await axios.get(url, config).then((response) => {
            let auth = response.status === 200 ? response.data : null;
            if (auth) {
                auth.token = authConfig.token;
                setLocalStorage('auth', auth);
                setAxiosHeader(auth.token);
            } else {
                removeLocalStorage('auth');
            }
            store.commit('user/'+ userTypesStore.Set.Auth, auth);
        }).catch(err => {
            console.log(err);
            removeLocalStorage('auth');
            store.commit('user/'+ userTypesStore.Set.Auth, null);
        });
    } else {
        removeLocalStorage('auth');
        store.commit('user/'+ userTypesStore.Set.Auth, null);
    }

    // Each route required authenticate
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // let user = getLocalStorage('auth');
        let user = store.getters['user/'+ userTypesStore.Get.Auth];
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

            if (isSuperAmin) {
                next();
            } else if (to.matched.some(record => record.meta.accept === USER_ROLE.SUPER)
                || (categoryId && SUPER_CATEGORY.indexOf(categoryId) > 0)) {

                // list & create user & SUPER_CATEGORY
                next({ path: PATH.NOT_AUTHORIZED });
            } else {
                if (!isKTTV && 
                    ( to.matched.some(record => record.meta.accept === USER_ROLE.KTTV) || (categoryId && KTTV_CATEGORY.indexOf(categoryId) > 0))) {
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
        let user = store.getters['user/'+ userTypesStore.Get.Auth];
        if (user) {
            const isSuperAmin = !!user.roles.find(r => r === USER_ROLE.SUPER);
            const isKTTV = !!user.roles.find(r => r === USER_ROLE.KTTV);

            if (isSuperAmin) {
                next({ path: PATH.LIST_USER, params: { role: 'admin' } });
            } else if(isKTTV) {
                next({ name: ROUTE_NAME.LIST_POST, query: { categoryId: KTTV_CATEGORY[0] } })
            } else {
                next({ name: ROUTE_NAME.LIST_DOCUMENT})
            }
        }
        else {
            next();
        }
    } else { // Other
        next();
    }
})

export default router;

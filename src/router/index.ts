import { PATH, ROUTE_NAME } from "@/constant/route-constant";
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
            if (user.roles.find(r => r === USER_ROLE.SUPER)) {
                next();
            } else if (to.matched.some(record => record.meta.level === 1)) {
                next({ path: PATH.NOT_AUTHORIZED });
            } else {
                next();
            }
            // if (to.matched.some(record => record.meta.is_admin)) {
            //     if (user.email === 'trianh@gmail.com') {
            //         next()
            //     }
            //     else {
            //         next({ path: PATH.ADMIN, })
            //     }
            // } else {
            //     next()
            // }
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

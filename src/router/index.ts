import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";

import AppRoutes from "./app-route";

Vue.use(VueRouter);

let config: RouterOptions = {
    routes: [...AppRoutes],
    linkActiveClass: "active"
};
const router: VueRouter = new VueRouter(config);

export default router;

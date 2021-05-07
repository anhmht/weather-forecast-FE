import ROUTER from "../constant/route-constant";

const HomePageComponent = () => import("../page/home/HomePageComponent.vue");

export default [
    {
        path: "/",
        name: ROUTER.HOME,
        component: HomePageComponent,
        props: {}
    }
];

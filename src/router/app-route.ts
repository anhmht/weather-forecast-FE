import ROUTER from "../constant/route-constant";

const MapRadarComponent = () => import("../page/map-radar/MapRadarComponent.vue");
const InfoPageComponent = () => import("../page/info/InfoPageComponent.vue");
const DataPageComponent = () => import("../page/data/DataPageComponent.vue");
const TimePageComponent = () => import("../page/time/TimePageComponent.vue");
const IconPageComponent = () => import("../page/icon/IconPageComponent.vue");
const SocialPageComponent = () => import("../page/social/SocialPageComponent.vue");
const PageNotFoundComponent = () => import("../page/not-found/PageNotFoundComponent.vue");

export default [
    { path: "/", redirect: { path: "/info" } },
    {
        path: "/radar",
        name: ROUTER.RADAR,
        component: MapRadarComponent,
        props: {}
    },
    {
        path: "/info",
        name: ROUTER.INFO,
        component: InfoPageComponent,
        props: {}
    },
    {
        path: "/data",
        name: ROUTER.DATA,
        component: DataPageComponent,
        props: {}
    },
    {
        path: "/time",
        name: ROUTER.TIME,
        component: TimePageComponent,
        props: {}
    },
    {
        path: "/icon",
        name: ROUTER.ICON,
        component: IconPageComponent,
        props: {}
    },
    {
        path: "/social",
        name: ROUTER.SOCIAL,
        component: SocialPageComponent,
        props: {}
    },

    //#page not found
    {
        path: "*",
        name: ROUTER.NOT_FOUND,
        component: PageNotFoundComponent
    }
];

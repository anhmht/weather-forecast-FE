import { ROUTE_NAME, PATH } from "../constant/route-constant";

const MapRadarComponent = () => import("../page/map-radar/MapRadarComponent.vue");
const InfoPageComponent = () => import("../page/info/InfoPageComponent.vue");
const InfoDetailPageComponent = () => import("../page/info-detail/InfoDetailPageComponent.vue");
const WarningPageComponent = () => import("../page/warning/WarningPageComponent.vue");
const DataPageComponent = () => import("../page/data/DataPageComponent.vue");
const TimePageComponent = () => import("../page/time/TimePageComponent.vue");
const IconPageComponent = () => import("../page/icon/IconPageComponent.vue");
const SocialPageComponent = () => import("../page/social/SocialPageComponent.vue");
const LoginPageComponent = () => import("../page/login/LoginPageComponent.vue");
const PageNotFoundComponent = () => import("../page/not-found/PageNotFoundComponent.vue");

const UserProfileComponent = () => import("../page/user-profile/UserProfileComponent.vue");
const UserInfoComponent = () => import("../page/user-profile/components/user-info/UserInfoComponent.vue");
const SocialPostComponent = () => import("../page/user-profile/components/social-post/SocialPostComponent.vue");
const ChangePasswordComponent = () => import("../page/user-profile/components/change-password/ChangePasswordComponent.vue");

const AdminComponent = () => import("../page/cms/CMSComponent.vue");
const ListPostComponent = () => import("../page/cms/components/list-posts/ListPostComponent.vue")
const CreatePostComponent = () => import("../page/cms/components/create-post/CreatePostComponent.vue")
const EditPostComponent = () => import("../page/cms/components/edit-post/EditPostComponent.vue")
const ListIconComponent = () => import("../page/cms/components/list-icon/ListIconComponent.vue")
const ListDataComponent = () => import("../page/cms/components/list-data/ListDataComponent.vue")

const ListUserComponent = () => import("../page/cms/components/list-user/ListUserComponent.vue")


const homeRoutes = [
    { path: "/", redirect: { path: PATH.INFO } },
    {
        path: PATH.RADAR,
        name: ROUTE_NAME.RADAR,
        component: MapRadarComponent,
        props: {}
    },
    {
        path: PATH.INFO,
        name: ROUTE_NAME.INFO,
        component: InfoPageComponent,
        props: {}
    },
    {
        path: PATH.INFO_DETAIL,
        name: ROUTE_NAME.INFO_DETAIL,
        component: InfoDetailPageComponent,
        props: {}
    },
    {
        path: PATH.WARNING,
        name: ROUTE_NAME.WARNING,
        component: WarningPageComponent,
        props: {}
    },
    {
        path: PATH.DATA,
        name: ROUTE_NAME.DATA,
        component: DataPageComponent,
        props: {}
    },
    {
        path: PATH.TIME,
        name: ROUTE_NAME.TIME,
        component: TimePageComponent,
        props: {}
    },
    {
        path: PATH.ICON,
        name: ROUTE_NAME.ICON,
        component: IconPageComponent,
        props: {}
    },
    {
        path: PATH.SOCIAL,
        name: ROUTE_NAME.SOCIAL,
        component: SocialPageComponent,
        props: {}
    },
    {
        path: PATH.LOGIN,
        name: ROUTE_NAME.LOGIN,
        component: LoginPageComponent,
        props: {},
        meta: {
            guest: true
        }
    },

    //#page not found
    {
        path: "*",
        name: ROUTE_NAME.NOT_FOUND,
        component: PageNotFoundComponent
    }
];

const userProfileRoutes = [
    {
        path: PATH.USER_PROFILE,
        name: ROUTE_NAME.USER_PROFILE,
        component: UserProfileComponent,
        props: {},
        meta: {
            requiresAuth: true
        },
        children: [
            { path: PATH.USER_PROFILE, redirect: { path: PATH.USER_INFO } },
            {
                path: PATH.USER_INFO,
                name: ROUTE_NAME.USER_INFO,
                component: UserInfoComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
            {
                path: PATH.SOCIAL_POST,
                name: ROUTE_NAME.SOCIAL_POST,
                component: SocialPostComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
            {
                path: PATH.CHANGE_PASSWORD,
                name: ROUTE_NAME.CHANGE_PASSWORD,
                component: ChangePasswordComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
        ]
    },
]

const adminRoutes = [
    {
        path: PATH.ADMIN,
        name: ROUTE_NAME.MANAGEMENT,
        component: AdminComponent,
        props: {},
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: PATH.LIST_POST,
                name: ROUTE_NAME.LIST_POST,
                component: ListPostComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
            { path: "/admin", redirect: { path: PATH.LIST_USER, params: { role: 'admin' } } },
            {
                path: PATH.CREATE_POST,
                name: ROUTE_NAME.CREATE_POST,
                component: CreatePostComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
            {
                path: PATH.EDIT_POST,
                name: ROUTE_NAME.EDIT_POST,
                component: EditPostComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
            {
                path: PATH.LIST_ICON,
                name: ROUTE_NAME.LIST_ICON,
                component: ListIconComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
            {
                path: PATH.LIST_DATA,
                name: ROUTE_NAME.LIST_DATA,
                component: ListDataComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            },
            {
                path: PATH.LIST_USER,
                name: ROUTE_NAME.LIST_USER,
                component: ListUserComponent,
                meta: {
                    requiresAuth: true
                },
                props: {}
            }
        ]
    },
]

export default [
    ...homeRoutes,
    ...adminRoutes,
    ...userProfileRoutes
]

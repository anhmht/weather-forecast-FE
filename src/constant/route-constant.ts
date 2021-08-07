export const ROUTE_NAME = {
    HOME: 'home',
    RADAR: 'radar',
    INFO: 'info',
    INFO_DETAIL: 'info-detail',
    WARNING: 'warning',
    DATA: 'data',
    TIME: 'time',
    ICON: 'icon',
    SOCIAL: 'social',
    USER_PROFILE: 'user-profile',
    NOT_FOUND: 'not-found',
    NOT_AUTHORIZED: 'not-authorized',
    LOGIN: 'login',
    MANAGEMENT: 'management',
    LIST_POST: 'listPost',
    CREATE_POST: 'createPost',
    EDIT_POST: 'editPost',
    DELETE_POST: 'deletePost',
    LIST_ICON: 'listIcon',
    LIST_DATA: 'listData',
    USER_INFO: 'user-info',
    SOCIAL_POST: 'social-post',
    CHANGE_PASSWORD: 'change-password',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    REGISTER: 'register',
    LIST_USER: 'list-user',
    CREATE_USER: 'createUser',
    EDIT_USER: 'edit-user',
    LIST_DOCUMENT: 'list-document',
    CREATE_DOCUMENT: 'create-document',
    LIST_LOCAL: "list-local",
    EDIT_DOCUMENT: 'edit-document',
    EDIT_LOCAL: 'edit-local',
    VERIFYING_EMAIL: 'confirm-email',
    COMMUNITY_LIST: 'community-list'
}

export const PATH = {
    RADAR: '/radar',
    INFO: '/info',
    INFO_DETAIL: '/info/:id',
    WARNING: '/warning/:categoryId/:statusId',
    DATA: '/data',
    TIME: '/time',
    ICON: '/icon',
    SOCIAL: '/social',
    NOT_FOUND: '/not-found',
    NOT_AUTHORIZED: '/not-authorized',
    USER_PROFILE: '/user-profile',
    USER_INFO: '/user-info',
    SOCIAL_POST: '/social-post',
    CHANGE_PASSWORD: '/change-password',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    REGISTER: '/register',
    LOGIN: '/login',
    MANAGEMENT: '/management',
    ADMIN: '/admin',
    LIST_POST: 'list-post/:category',
    CREATE_POST: 'create-post/:category',
    EDIT_POST: 'edit-post/:category/:id',
    DELETE_POST: 'delete-post/:id',
    LIST_ICON: 'list-icon',
    LIST_DATA: 'list-data',
    LIST_USER: 'list-user/:role',
    CREATE_USER: 'create-user/:role',
    EDIT_USER: 'edit-user/:role/:userId',
    LIST_DOCUMENT: 'list-document',
    CREATE_DOCUMENT: 'create-document/:category',
    LIST_LOCAL: "list-local",
    EDIT_DOCUMENT: 'edit-document/:category/:id',
    EDIT_LOCAL: 'edit-local/:id',
    VERIFYING_EMAIL: '/confirm-email',
    COMMUNITY_LIST: 'community-list'
}


export const CATEGORY_NAMES = {
    LIST_POST_WEATHER_NEWS: 'news',
    LIST_POST_WEATHER_MAP: 'maps',
    LIST_POST_CANH_BAO_THIEN_TAI: 'disaster-warning',
    LIST_POST_THONG_TIN_KHUYEN_CAO: 'recommended-information',
    LIST_POST_KT_VH_XH: 'sociocultural-engineering',
    LIST_POST_THOI_TIET_DU_LICH: 'travel',
    LIST_POST_THOI_TIET_NONG_VU: 'agricultural',
    LIST_POST_THOI_TIET_GIAO_THONG: 'traffic',
    LIST_POST_THOI_TIET_NGUY_HIEM: 'dangerous',
    LIST_POST_THUY_VAN: 'hydrological',
    LIST_POST_TRANG_THAI_THOI_TIET: 'states',
    LIST_POST_DIEU_HANH_SAN_XUAT: 'executive-producer',
    LIST_POST_PHONG_CHONG_THIEN_TAI: 'disaster-prevention',
}

export const CATEGORY_IDS = {
    LIST_POST_WEATHER_NEWS: '8a7ca394-930a-4381-2ed0-08d94344e5e0',
    LIST_POST_WEATHER_MAP: '944dc7ef-f9a6-4f5c-2ed1-08d94344e5e0',
    LIST_POST_CANH_BAO_THIEN_TAI: 'e78c78b7-80d1-4f3b-3014-08d91e5e4dfa',
    LIST_POST_THONG_TIN_KHUYEN_CAO: '580ffb36-2c72-4642-cb46-08d91fa2c701',
    LIST_POST_KT_VH_XH: 'eededf06-2e83-458d-9e0e-08d92ce117ec',
    LIST_POST_THOI_TIET_DU_LICH: 'd34d4116-51f8-4539-5d1d-08d942e67599',
    LIST_POST_THOI_TIET_NONG_VU: '2815e0a9-d15f-4d16-5d1e-08d942e67599',
    LIST_POST_THOI_TIET_GIAO_THONG: 'fdb895d3-a2e3-49f3-5d1f-08d942e67599',
    LIST_POST_THOI_TIET_NGUY_HIEM: '031d1a69-900e-4b63-5d20-08d942e67599',
    LIST_POST_THUY_VAN: '92fb2fa2-12e1-4871-2ecf-08d94344e5e0',
    LIST_POST_TRANG_THAI_THOI_TIET: 'a54d6936-8789-42e4-6515-08d944a940ef',
    LIST_POST_DIEU_HANH_SAN_XUAT: '4c14b202-72bf-4209-ffd1-08d9486010c7',
    LIST_POST_PHONG_CHONG_THIEN_TAI: 'e95d0a6f-73a4-4cb8-ffd2-08d9486010c7',
}

export const SUPER_CATEGORY_NAME = [
    CATEGORY_NAMES.LIST_POST_WEATHER_NEWS,
    CATEGORY_NAMES.LIST_POST_WEATHER_MAP
];

export const KTTV_CATEGORY_NAME = [
    CATEGORY_NAMES.LIST_POST_CANH_BAO_THIEN_TAI,
    CATEGORY_NAMES.LIST_POST_THONG_TIN_KHUYEN_CAO,
    CATEGORY_NAMES.LIST_POST_KT_VH_XH,
    CATEGORY_NAMES.LIST_POST_THOI_TIET_DU_LICH,
    CATEGORY_NAMES.LIST_POST_THOI_TIET_NONG_VU,
    CATEGORY_NAMES.LIST_POST_THOI_TIET_GIAO_THONG,
    CATEGORY_NAMES.LIST_POST_THOI_TIET_NGUY_HIEM,
    CATEGORY_NAMES.LIST_POST_THUY_VAN,
    CATEGORY_NAMES.LIST_POST_TRANG_THAI_THOI_TIET,
];

export const DTH_CATEGORY = [
];

export const NOT_FOUND = "Không tìm thấy trang";
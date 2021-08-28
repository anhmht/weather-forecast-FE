export const BASE_CLOUD_URL = 'https://weatherstoragevn.blob.core.windows.net/';
export const DATE = {
    CURRENT: 0,
    NEXT_DAY: 1,
    NEXT_2_DAY: 2,
    NEXT_3_DAY: 3,
    NEXT_4_DAY: 4,
};
export const STATION_TYPE = {
    RAIN_STATION: 'mua',
    METEOROLOGICAL_STATION: 'khituong',
    HYDROLOGICAL_STATION: 'thuyvan',
};

export const USER_ROLE = {
    SUPER: 'SuperAdmin',
    KTTV: 'Admin',
    DTH: 'DTH',
    NORMAL: 'NormalUser',
}

export const EVENT_STATUS = {
    PRIVATE : 'Private',
    DRAFT : 'Draft',
    PUBLISH : 'Publish',
    PENDING : 'Pending',
    OTHERS: 'Others'
}

export const CMS_MENU = {
    DANH_SACH_QUAN_TRI_VIEN: 'Danh sách quản trị viên',
    DANH_SACH_NGUOI_DUNG: 'Danh sách người dùng',
    LIST_POST_WEATHER_NEWS: 'Bản tin thời tiết',
    LIST_POST_WEATHER_MAP: 'Bản đồ thời tiết',
    LIST_POST_CANH_BAO_THIEN_TAI: 'Cảnh báo thiên tai',
    LIST_POST_THONG_TIN_KHUYEN_CAO: 'Thông tin khuyến cáo',
    LIST_POST_KT_VH_XH: 'Chuyên mục KT-VH-XH',
    LIST_POST_THOI_TIET_DU_LICH: 'Thời tiết du lịch',
    LIST_POST_THOI_TIET_NONG_VU: 'Thời tiết nông vụ',
    LIST_POST_THOI_TIET_GIAO_THONG: 'Thời tiết giao thông',
    LIST_POST_THOI_TIET_NGUY_HIEM: 'Thời tiết nguy hiểm',
    LIST_POST_THUY_VAN: 'Thủy văn',
    KTTV_DATA: 'Dữ liệu KTTV',
    LIST_POST_TRANG_THAI_THOI_TIET: 'Các trạng thái thời tiết',
    THONG_TIN_CHI_DAO: 'Thông tin chỉ đạo',
    HIEN_TUONG_CUC_DOAN: 'Các hiện tượng cực đoan',
    COMMUNITY_LIST: 'Bài viết cộng đồng'
}

// 'Private', 'Blocked', 'Waiting for approval', 'Deleted', 'Public'
// 3,4,1,5,2
export const SOCIAL_POST_STATUS = {
    PRIVATE: 3,
    BLOCKED: 4,
    WAITING: 1,
    DELETED: 5,
    PUBLIC: 2,
}
import { USER_ROLE } from "@/constant/common-constant";
import { CATEGORY, ROUTE_NAME } from "@/constant/route-constant";
import { storeModules } from "@/store";
import userTypesStore from "@/store/user/user-types.store";
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, namespace } from "vuex-class";

const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default,
    components: {
    }
})
export default class MenuCMSComponent extends Vue {

    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

    activeMenu: number = 0;

    get menuList () {
        let list = [
            {
                title: 'Danh sách quản trị viên',
                icon: 'mdi-account-cog',
                name: ROUTE_NAME.LIST_USER,
                param: {role: 'admin'},
                accept: USER_ROLE.SUPER
            },
            {
                title: 'Danh sách người dùng',
                icon: 'mdi-account-group',
                name: ROUTE_NAME.LIST_USER,
                param: { role: 'user' },
                accept: USER_ROLE.SUPER
            },
            {
                title: 'Bản tin thời tiết',
                icon: 'mdi-weather-sunny',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_WEATHER_NEWS },
                accept: USER_ROLE.SUPER
            },
            {
                title: 'Bản đồ thời tiết',
                icon: 'mdi-map-marker-radius',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_WEATHER_MAP },
                accept: USER_ROLE.SUPER
            },
            {
                title: 'Cảnh báo thiên tai',
                icon: 'mdi-alert-outline',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_CANH_BAO_THIEN_TAI },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Thông tin khuyến cáo',
                icon: 'mdi-book-open-page-variant',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_THONG_TIN_KHUYEN_CAO },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Chuyên mục KT-VH-XH',
                icon: 'mdi-newspaper-variant-outline',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_KT_VH_XH },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Thời tiết du lịch',
                icon: 'mdi-wallet-travel',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_THOI_TIET_DU_LICH },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Thời tiết nông vụ',
                icon: 'mdi-pine-tree',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_THOI_TIET_NONG_VU },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Thời tiết giao thông',
                icon: 'mdi-traffic-cone',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_THOI_TIET_GIAO_THONG },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Thời tiết nguy hiểm',
                icon: 'mdi-weather-windy',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_THOI_TIET_NGUY_HIEM },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Thủy văn',
                icon: 'mdi-space-station',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_THUY_VAN },
                accept: USER_ROLE.KTTV
            },
            {
                title: 'Dữ liệu KTTV',
                icon: 'mdi-database-import',
                name: ROUTE_NAME.LIST_DATA,
                accept: USER_ROLE.KTTV
            },
            // {
            //     title: 'Thời tiết - Khí hậu',
            //     icon: 'mdi-weather-hail',
            //     name: ROUTE_NAME.LIST_ICON,
            //     accept: USER_ROLE.KTTV
            // },
            {
                title: 'Các trạng thái thời tiết',
                icon: 'mdi-weather-lightning-rainy',
                name: ROUTE_NAME.LIST_POST,
                query: { categoryId: CATEGORY.LIST_POST_TRANG_THAI_THOI_TIET },
                accept: USER_ROLE.KTTV
            },
            // {
            //     title: 'Cộng đồng',
            //     icon: 'mdi-account-group',
            //     name: PATH.LIST_POST,
            //     accept: USER_ROLE.KTTV
            // },
            {
                title: 'Thông tin chỉ đạo',
                icon: 'mdi-bullhorn',
                name: ROUTE_NAME.LIST_DOCUMENT,
            },
            {
                title: 'Các hiện tượng cực đoan',
                icon: 'mdi-lightning-bolt',
                name: ROUTE_NAME.LIST_LOCAL,
                accept: USER_ROLE.KTTV
            },
        ]

        let isSuperAmin = false;
        let isDTH = false;
        let isKTTV = false;

        if (this.userConfig && this.userConfig["roles"]) {
            isSuperAmin = !!this.userConfig["roles"].find(r => r === USER_ROLE.SUPER);
            isDTH = !!this.userConfig["roles"].find(r => r === USER_ROLE.DTH);
            isKTTV = !!this.userConfig["roles"].find(r => r === USER_ROLE.KTTV);
        }

        if (isSuperAmin) {
            return list;
        } else {
            list = list.filter(p => !(p.accept === USER_ROLE.SUPER ));

            if (!isKTTV) {
                list = list.filter(p => !(p.accept === USER_ROLE.KTTV ));
            }

            if (!isDTH) {
                list = list.filter(p => !(p.accept === USER_ROLE.DTH ));
            }

            return list; 
        }
    }

    handleClick(index) {
        this.activeMenu = index;
        const type = this.menuList[index];
        this.$router.push({
            name: type.name,
            query: type.query || null,
            params: type.param || undefined
        }).catch(err => {
            if (err.name != "NavigationDuplicated") {
                throw err;
            }
        })
    }

    mounted() {
        const index = this.menuList.findIndex(x => x.name === this.$route.name);
        if (this.menuList[index] && this.menuList[index].query) {
            this.activeMenu = this.menuList.findIndex(x => x.query.categoryId === this.$route.query.categoryId);
        } else {
            this.activeMenu = index
        }
    }
}

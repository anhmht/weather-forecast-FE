import { CMS_MENU, USER_ROLE } from "@/constant/common-constant";
import { CATEGORY_NAMES, ROUTE_NAME } from "@/constant/route-constant";
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
                title: CMS_MENU.DANH_SACH_QUAN_TRI_VIEN ,
                icon: 'mdi-account-cog',
                name: ROUTE_NAME.LIST_USER,
                param: {role: 'admin'},
                accept: USER_ROLE.SUPER
            },
            {
                title: CMS_MENU.DANH_SACH_NGUOI_DUNG ,
                icon: 'mdi-account-group',
                name: ROUTE_NAME.LIST_USER,
                param: { role: 'user' },
                accept: USER_ROLE.SUPER
            },
            {
                title: CMS_MENU.LIST_POST_WEATHER_NEWS,
                icon: 'mdi-weather-sunny',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_WEATHER_NEWS },
                accept: USER_ROLE.SUPER
            },
            {
                title: CMS_MENU.LIST_POST_WEATHER_MAP,
                icon: 'mdi-map-marker-radius',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_WEATHER_MAP },
                accept: USER_ROLE.SUPER
            },
            {
                title: CMS_MENU.LIST_POST_CANH_BAO_THIEN_TAI,
                icon: 'mdi-alert-outline',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_CANH_BAO_THIEN_TAI },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_THONG_TIN_KHUYEN_CAO,
                icon: 'mdi-book-open-page-variant',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_THONG_TIN_KHUYEN_CAO },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_KT_VH_XH,
                icon: 'mdi-newspaper-variant-outline',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_KT_VH_XH },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_THOI_TIET_DU_LICH,
                icon: 'mdi-wallet-travel',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_THOI_TIET_DU_LICH },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_THOI_TIET_NONG_VU,
                icon: 'mdi-pine-tree',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_THOI_TIET_NONG_VU },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_THOI_TIET_GIAO_THONG,
                icon: 'mdi-traffic-cone',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_THOI_TIET_GIAO_THONG },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_THOI_TIET_NGUY_HIEM,
                icon: 'mdi-weather-windy',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_THOI_TIET_NGUY_HIEM },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_THUY_VAN,
                icon: 'mdi-space-station',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_THUY_VAN },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.KTTV_DATA,
                icon: 'mdi-database-import',
                name: ROUTE_NAME.LIST_DATA,
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.LIST_POST_TRANG_THAI_THOI_TIET,
                icon: 'mdi-weather-lightning-rainy',
                name: ROUTE_NAME.LIST_POST,
                param: { category: CATEGORY_NAMES.LIST_POST_TRANG_THAI_THOI_TIET },
                accept: USER_ROLE.KTTV
            },
            {
                title: CMS_MENU.COMMUNITY_LIST,
                icon: 'mdi-comment-account-outline',
                name: ROUTE_NAME.COMMUNITY_LIST,
                accept: USER_ROLE.SUPER
            },
            {
                title: CMS_MENU.THONG_TIN_CHI_DAO,
                icon: 'mdi-bullhorn',
                name: ROUTE_NAME.LIST_DOCUMENT,
                accept: USER_ROLE.DTH
            },
            {
                title: CMS_MENU.HIEN_TUONG_CUC_DOAN,
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

            if (!isDTH && !isKTTV) {
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
            params: type.param || undefined
        }).catch(err => {
            if (err.name != "NavigationDuplicated") {
                throw err;
            }
        })
    }

    mounted() {
        const index = this.menuList.findIndex(x => x.name === this.$route.name);
        if (this.menuList[index] && this.menuList[index].param) {
            this.activeMenu = this.menuList.findIndex(x => x.param.category === this.$route.params.category);
        } else {
            this.activeMenu = index
        }
    }
}

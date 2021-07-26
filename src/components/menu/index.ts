// import { getLocalStorage } from '@/utils/appConfig';
import { Watch } from 'vue-property-decorator';
import { KTTV_CATEGORY, PATH, ROUTE_NAME } from "@/constant/route-constant";
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, namespace } from 'vuex-class';
import { storeModules } from '@/store';
import userTypesStore from '@/store/user/user-types.store';
import { USER_ROLE } from '@/constant/common-constant';

const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default
})
export default class MenuComponent extends Vue {
    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

    isActive: Number = 0;
    get menuItems() {
        return [
            {
                name: "GIỚI THIỆU",
                path: PATH.INFO
            },
            {
                name: "DỮ LIỆU KTTV",
                path: PATH.DATA
            },
            {
                name: "THỜI GIAN",
                path: PATH.TIME
            },
            {
                name: "Thời tiết - Khí hậu",
                path: PATH.ICON
            },
            {
                name: "BẢN ĐỒ",
                path: PATH.RADAR
            },
            {
                name: "CỘNG ĐỒNG",
                path: PATH.SOCIAL
            },
            {
                name: "ĐĂNG NHẬP",
                path: PATH.LOGIN
            }
        ];
    }

    get loginInfo() {
        if (!this.userConfig) return null;
        return this.userConfig
    }

    isShowLoginButton(path) {
        if (path === PATH.LOGIN && this.loginInfo) {
            return false;
        }
        return true;
    }

    handleUserProfile() {
        this.$router.push(PATH.USER_PROFILE).catch(err => {
            if (err.name != "NavigationDuplicated") {
                throw err;
            }
        });
    }

    handleClick(index) {
        this.isActive = index;
        const type = this.menuItems[index];
        this.$emit('close-menu');
        if (this.$route.path !== type.path) {
            this.$router.push(type.path).catch(_ => {
                console.log("You have already logged in");
            })
        }
    }

    setActiveMenu() {
        const index = this.menuItems.findIndex(x => this.$route.path.includes(x.path));
        this.isActive = index;
    }

    handleMoveToAdmin() {
        if (this.loginInfo && this.loginInfo["roles"]) {
            if (!!this.loginInfo["roles"].find(r => r === USER_ROLE.SUPER)) {
                this.$router.push(PATH.ADMIN);
                return;
            }
            if (!!this.loginInfo["roles"].find(r => r === USER_ROLE.KTTV)) {
                this.$router.push({ name: ROUTE_NAME.LIST_POST, query: { categoryId: KTTV_CATEGORY[0]} });
                return;
            }
            this.$router.push({ name: ROUTE_NAME.LIST_DOCUMENT });
        }
        
    }

    mounted() {
        // this.loginInfo = getLocalStorage('auth');
        this.setActiveMenu();
    }


    @Watch('$route.path')
    handleRouteChange(val) {
        const index = this.menuItems.findIndex(x => this.$route.path.includes(x.path));
        this.isActive = index;
    }
}

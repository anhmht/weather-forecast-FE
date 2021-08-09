import { removeLocalStorage, setAxiosHeader } from '@/utils/appConfig';
import { Watch } from 'vue-property-decorator';
import { KTTV_CATEGORY_NAME, PATH, ROUTE_NAME } from "@/constant/route-constant";
import Vue from "vue";
import Component from "vue-class-component";
import { Mutation, Getter, namespace } from 'vuex-class';
import { storeModules } from '@/store';
import userTypesStore from '@/store/user/user-types.store';
import { USER_ROLE } from '@/constant/common-constant';
import { DataHelper } from '@/utils/data-helper';

const UserGetter = namespace(storeModules.User, Getter);
const UserMutation = namespace(storeModules.User, Mutation);
@Component({
    template: require("./template.html").default
})
export default class MenuComponent extends Vue {
    @UserGetter(userTypesStore.Get.Auth) userConfig: any;
    @UserMutation setAuth: (auth: any) => Promise<void>;

    isActive: Number = 0;
    isAvatarError: boolean  = false;

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

    get color () {
        let name = this.loginInfo ? this.userConfig.userName : "";
        return DataHelper.generateColorByString(name);
    }

    get avatar () {
        if (this.loginInfo ) {
            return this.loginInfo.avatarUrl;
        }
        return null;
    }

    get isAdmin () {
        if (this.loginInfo && this.loginInfo["roles"]) {
            return !!this.loginInfo["roles"].find(r => r === USER_ROLE.SUPER)
            || !!this.loginInfo["roles"].find(r => r === USER_ROLE.KTTV)
            || !!this.loginInfo["roles"].find(r => r === USER_ROLE.DTH)
        }
        return false;
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

    handleLogout() {
        removeLocalStorage('auth');
        this.setAuth(null);
        setAxiosHeader(null);
        this.$router.push(PATH.INFO);
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
                this.$router.push({ name: ROUTE_NAME.LIST_POST, params: { category: KTTV_CATEGORY_NAME[0]} });
                return;
            }
            this.$router.push({ name: ROUTE_NAME.LIST_DOCUMENT });
        }
        
    }

    onImgError (event) {
        this.isAvatarError = true;
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

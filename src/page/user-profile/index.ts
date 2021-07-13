import { EVENT_BUS } from './../../constant/event-bus-constant';
import { removeLocalStorage } from './../../utils/appConfig';
import { PATH } from '@/constant/route-constant';
import  Vue from 'vue';
import Component from 'vue-class-component';
import EventBus from '@/utils/event-bus';

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
    }
})
export default class UserProfileComponent extends Vue {
    activeTab: number = 0;
    menus:any = [
        {
            name: 'Thông tin tài khoản',
            path: PATH.USER_INFO,
            icon: 'mdi-account'
        },
        {
            name: 'Bài viết cộng đồng',
            path: PATH.SOCIAL_POST,
            icon: 'mdi-post'
        },
        {
            name: 'Đổi mật khẩu',
            path: PATH.CHANGE_PASSWORD,
            icon: 'mdi-lock'
        },
        {
            name: 'Đăng xuất',
            path: null,
            icon: 'mdi-logout'
        },
    ]

    handleClick(menu, index) {
        this.activeTab = index;
        if (menu.path) {
            this.$router.push(menu.path).catch(err => {
                if (err.name != "NavigationDuplicated") {
                    throw err;
                }
            });
        } else {
            removeLocalStorage('auth');
            EventBus.$emit(EVENT_BUS.LOGIN)
            this.$router.push(PATH.INFO);
        }
    }
}

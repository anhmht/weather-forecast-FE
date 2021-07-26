import { EVENT_BUS } from './../../constant/event-bus-constant';
import { UserServices } from './../../service/user-service/user.service';
import Vue from "vue";
import Component from "vue-class-component";
import { PATH } from '@/constant/route-constant';
import { setAxiosHeader, setLocalStorage } from '@/utils/appConfig';
import EventBus from '@/utils/event-bus';
import { ROUTE_NAME } from '@/constant/route-constant';
import { Action, namespace } from 'vuex-class';
import { storeModules } from '@/store';

const UserAction = namespace(storeModules.User, Action);

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class LoginPageComponent extends Vue {

    @UserAction setAuth: (auth: Object) => Promise<void>;

    valid: boolean = true;
    isLoading: boolean = false;
    userService: UserServices = new UserServices();
    data = {
        userName: null,
        password: null
    }
    rules = {
        nameRules: [v => !!v || 'Vui lòng nhập tài khoản'],
        passRules: [v => !!v || 'Vui lòng nhập mật khẩu']
    }

    setAuthenticate(authConfig) {
        setLocalStorage('auth', authConfig);
        setAxiosHeader(authConfig.token);
        this.setAuth(authConfig);
    }

    handleLogin() {
        //@ts-ignore
        this.valid = this.$refs.loginForm.validate();
        const vm = this as any;
        if(this.valid) {
            this.isLoading = true;
            this.userService.checkLogin({
                email: this.data.userName,
                password: this.data.password
            }).then((res: any) => {
                this.isLoading = false;
                this.$toast.success(`Chào mừng, ${res.userName}`);
                this.setAuthenticate(res);
                EventBus.$emit(EVENT_BUS.LOGIN);
                vm.$router.push(PATH.USER_PROFILE);
            }).catch(err => {
                console.log(err);
                this.$toast.error(err.response.data.error);
                this.isLoading = false;
            })
        }
    }

    goToForgotPassword() {
        this.$router.push(ROUTE_NAME.FORGOT_PASSWORD);
    }

    goToRegister() {
        this.$router.push(ROUTE_NAME.REGISTER);
    }
}

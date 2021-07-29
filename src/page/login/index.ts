import { UserServices } from './../../service/user-service/user.service';
import Vue from "vue";
import Component from "vue-class-component";
import { PATH } from '@/constant/route-constant';
import { ROUTE_NAME } from '@/constant/route-constant';
import { Mutation, namespace } from 'vuex-class';
import { storeModules } from '@/store';
import { setAxiosHeader, setLocalStorage } from '@/utils/appConfig';

const UserMutation = namespace(storeModules.User, Mutation);

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class LoginPageComponent extends Vue {

    @UserMutation setAuth: (auth: Object) => Promise<void>;

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
    showPass: boolean = false;

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
                vm.$router.push(PATH.USER_PROFILE);
            }).catch(err => {
                this.$errorMessage(err);
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

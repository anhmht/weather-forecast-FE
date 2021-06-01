import { UserServices } from './../../service/user-service/user.service';
import Vue from "vue";
import Component from "vue-class-component";
import { PATH } from '@/constant/route-constant';
import { setAxiosHeader, setLocalStorage } from '@/utils/appConfig';

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class LoginPageComponent extends Vue {
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
            }).then(res => {
                this.isLoading = false;
                this.setAuthenticate(res);
                vm.$router.push(PATH.ADMIN);
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
            })
        }
    }

}

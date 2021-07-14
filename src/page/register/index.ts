import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "@/constant/route-constant";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class ForgotPasswordPageComponent extends Vue {
    valid: boolean = true;
    isLoading: boolean = false;
    data = {
        email: null,
        password: null,
        confirmPassword: null
    }

    rules = {
        email: [
            v => !!v || 'Vui lòng nhập email',
            v => /.+@.+/.test(v) || 'Địa chỉ email phải hợp lệ',
        ],
        password: [
            v => !!v || 'Vui lòng nhập mật khẩu',
            v => !!v && v.length >= 6 || 'Mật khẩu phải dài ít nhất 6 kí tự',
            v => !!v && /(?=.*[!@#\$%\^&\*])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt',
            v => !!v && /(?=.*[a-z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in thường (a-z)',
            v => !!v && /(?=.*[A-Z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in hoa (A-Z)',
        ],
        confirmPassword: [
            v => !!v || 'Vui lòng nhập lại mật khẩu',
            v => !!v && v.length >= 6 || 'Mật khẩu phải dài ít nhất 6 kí tự',
            v => !!v && /(?=.*[!@#\$%\^&\*])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt',
            v => !!v && /(?=.*[a-z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in thường (a-z)',
            v => !!v && /(?=.*[A-Z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in hoa (A-Z)',
        ]
    }

    handleRegister() {
        //@ts-ignore
        this.valid = this.$refs.registerForm.validate();
        if(this.valid) {
            
        }
    }

    goToLogin() {
        this.$router.push(ROUTE_NAME.LOGIN);
    }
}

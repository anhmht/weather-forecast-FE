import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME, PATH } from "@/constant/route-constant";
import { UserServices } from "@/service/user-service/user.service";
import { IUser, User } from "@/model/user";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class ForgotPasswordPageComponent extends Vue {
    valid: boolean = true;
    isLoading: boolean = false;
    userService: UserServices = new UserServices();
    userModel: IUser = new User({});
    confirmPassword: string = null;

    showPass: boolean = false;
    showConfirmPass: boolean = false;

    rules = {
        userName: [
            v => !!v || 'Vui lòng nhập tên tài khoản',
            v => !!v && v.length >= 6 || 'Tên tài khoản phải dài ít nhất 6 kí tự'
        ],
        firstName: [
            v => !!v || 'Vui lòng nhập họ'
        ],
        lastName: [
            v => !!v || 'Vui lòng nhập tên'
        ],
        email: [
            v => !!v || 'Vui lòng nhập email',
            v => /.+@.+/.test(v) || 'Địa chỉ email phải hợp lệ'
        ],
        password: [
            v => !!v || 'Vui lòng nhập mật khẩu',
            v => !!v && v.length >= 6 || 'Mật khẩu phải dài ít nhất 6 kí tự',
            v => !!v && /(?=.*[!@#\$%\^&\*])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt',
            v => !!v && /(?=.*[a-z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in thường (a-z)',
            v => !!v && /(?=.*[A-Z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in hoa (A-Z)',
            v => !!v && /(?=.*[0-9])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 số (0-9)',
        ],
        confirmPassword: [
            v => !!v || 'Vui lòng nhập mật khẩu',
            v => this.comparePassword(v) 
        ]
    }

    comparePassword(inputPassword) {
        if (inputPassword !== this.userModel.password) {
            return 'Mật khẩu nhập lại không giống mật khẩu';
        }

        return true;
    }

    gotoVerify (email) {
        this.$router.push({ name: ROUTE_NAME.VERIFYING_EMAIL, query: {email: email}});
    }

    handleRegister() {
        //@ts-ignore
        this.valid = this.$refs.registerForm.validate();
        if(this.valid) {
            this.isLoading = true;
            this.userService.register(this.userModel).then(res => {
                this.$toast.success('Đăng kí tài khoản thành công');
                this.isLoading = false;
                this.gotoVerify(this.userModel.email);
            }).catch(err => {
                this.$toast.error('Có lỗi khi đăng kí tài khoản');
                console.log(err);
                // this.$errorMessage(err);
                this.isLoading = false;
            })
        }
    }

    goToLogin() {
        this.$router.push(ROUTE_NAME.LOGIN);
    }
}

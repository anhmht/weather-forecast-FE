import { ROUTE_NAME } from "@/constant/route-constant";
import { IUserMisc, UserMisc } from "@/model/user";
import { UserServices } from "@/service/user-service/user.service";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class ResetPasswordPageComponent extends Vue {
    valid: boolean = true;
    isLoading: boolean = false;
    userService: UserServices = new UserServices();
    userMisc: IUserMisc = new UserMisc({});

    rules = {
        password: [
            v => !!v || 'Vui lòng nhập mật khẩu',
            v => !!v && v.length >= 6 || 'Mật khẩu phải dài ít nhất 6 kí tự',
            v => !!v && /(?=.*[!@#\$%\^&\*])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt',
            v => !!v && /(?=.*[a-z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in thường (a-z)',
            v => !!v && /(?=.*[A-Z])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ in hoa (A-Z)',
            v => !!v && /(?=.*[0-9])/.test(v) || 'Mật khẩu phải chứa ít nhất 1 chữ số (0-9)',
        ],
        confirmPassword: [
            v => !!v || 'Vui lòng nhập mật khẩu',
            v => this.comparePassword(v) 
        ]
    }

    comparePassword(inputPassword) {
        if (inputPassword !== this.userMisc.password) {
            return 'Mật khẩu nhập lại không giống mật khẩu';
        }

        return true;
    }

    handleResetPassword() {
        //@ts-ignore
        this.valid = this.$refs.resetPasswordForm.validate();
        if(this.valid) {
            this.userMisc.userId = this.$route.query.uid as any;
            this.userMisc.code = this.$route.query.code as any;

            this.isLoading = true;
            this.userService.resetPassword(this.userMisc).then(res => {
                this.isLoading = false;
                this.$toast.success('Đặt lại mật khẩu thành công');
                this.$router.push(ROUTE_NAME.LOGIN);
            }).catch(err => {
                this.$toast.error('Có lỗi khi đặt lại mật khẩu');
                console.log(err);
                this.isLoading = false;
            });
        }
    }
}

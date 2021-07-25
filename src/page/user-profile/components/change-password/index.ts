import { IUserMisc, UserMisc } from "@/model/user";
import { UserServices } from "@/service/user-service/user.service";
import { getLocalStorage } from "@/utils/appConfig";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class ForgotPasswordPageComponent extends Vue {
    valid: boolean = true;
    isLoading: boolean = false;
    userService: UserServices = new UserServices();
    userMisc: IUserMisc = new UserMisc({});
    rules = {
        newPassword: [
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
        if (inputPassword !== this.userMisc.newPassword) {
            return 'Mật khẩu nhập lại không giống mật khẩu';
        }

        return true;
    }

    handleChangePassword() {
        //@ts-ignore
        this.valid = this.$refs.changePasswordForm.validate();
        if(this.valid) {
            const authConfig = getLocalStorage('auth');
            this.userMisc.userId = authConfig.id;

            this.userService.changePassword(this.userMisc).then(res => {
                this.$toast.success('Đổi mật khẩu thành công');
            }).catch(err => {
                this.$toast.error('Có lỗi khi đổi mật khẩu');
                console.log(err);
            })
        }
    }

}

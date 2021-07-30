import { UserServices } from "@/service/user-service/user.service";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class ForgotPasswordPageComponent extends Vue {
    valid: boolean = true;
    isLoading: boolean = false;
    email: string = null;
    visibleConfirm: boolean = false;
    userService: UserServices = new UserServices();

    rules = {
        email: [
            v => !!v || 'Vui lòng nhập email',
            v => /.+@.+/.test(v) || 'Địa chỉ email phải hợp lệ',
        ]
    }

    handleSendEmail() {
        //@ts-ignore
        this.valid = this.$refs.forgotPasswordForm.validate();
        if(this.valid) {
            this.isLoading = true;
            this.userService.forgotPassword({
                email: this.email
            }).then(res => {
                this.isLoading = false;
                this.visibleConfirm = true;
            }).catch(err => {
                this.$errorMessage(err);
                this.isLoading = false;
            });
        }
    }

    handleResendEmail() {
        //@ts-ignore
        this.valid = this.$refs.forgotPasswordForm.validate();
        if(this.valid) {
            this.isLoading = true;
            this.userService.resendEmail(this.email).then(res => {
                this.isLoading = false;
                this.visibleConfirm = true;
            }).catch(err => {
                this.$errorMessage(err);
                this.isLoading = false;
            });
        }
    }

}

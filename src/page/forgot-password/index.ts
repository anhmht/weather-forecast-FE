import { ROUTE_NAME } from "@/constant/route-constant";
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
                this.gotoVerify(this.email);
            }).catch(err => {
                this.$errorMessage(err);
                this.isLoading = false;
            });
        }
    }

    gotoVerify (email) {
        this.$router.push({ name: ROUTE_NAME.VERIFYING_EMAIL, query: { "reset-password": email}});
    }

}

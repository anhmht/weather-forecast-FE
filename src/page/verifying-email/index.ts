import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "@/constant/route-constant";
import { UserServices } from "@/service/user-service/user.service";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class VerifyingEmailComponent extends Vue {
    
    email: any = null;
    isResending: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;

    userService: UserServices = new UserServices();

    get isVerifyingEmail () {
        return (this.$route.query.uid && this.$route.query.code);
    }

    resendEmail() {
        if(/.+@.+/.test(this.email)) {
            this.isResending = true;
            if (this.$route.query.email) {
                this.userService.resendEmail(this.email).then(res => {
                    this.isResending = false;
                }).catch(err => {
                    this.$toast.error("Đã có lỗi xảy ra");
                    this.isResending = false;
                });
            } else if (this.$route.query["reset-password"]) {
                this.userService.forgotPassword({
                    email: this.email
                }).then(res => {
                    this.isResending = false;
                }).catch(err => {
                    this.$toast.error("Đã có lỗi xảy ra");
                    this.isResending = false;
                });
            }
            
        } else {
            this.$toast.error("Email không đúng định dạng!");
        }
    }

    gotoLogin () {
        this.$router.push(ROUTE_NAME.LOGIN);
    }

    mounted () {
        debugger
        if (this.$route.query.email) {
            this.email = this.$route.query.email;
        } else if (this.$route.query["reset-password"]){
            this.email = this.$route.query["reset-password"];
        } else if (this.$route.query.uid && this.$route.query.code){
            this.isLoading = true;
            let payload = {
                userId: this.$route.query.uid,
                code: this.$route.query.code
            };
            
            this.userService.confirmEmail(payload).then(res => {
                this.isLoading = false;

                setTimeout(() => {
                    this.gotoLogin();
                }, 3000);
            }).catch(err => {
                this.$toast.error("Đã có lỗi xảy ra");
                this.isLoading = false;
                this.isError = true;

                setTimeout(() => {
                    this.gotoLogin();
                }, 3000);
            });
        } else {
            this.gotoLogin();
        }
    }
}

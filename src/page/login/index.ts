import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class LoginPageComponent extends Vue {
    valid: boolean = true;
    data = {
        userName: null,
        password: null
    }
    rules = {
        nameRules: [v => !!v || 'Vui lòng nhập tài khoản'],
        passRules: [v => !!v || 'Vui lòng nhập mật khẩu']
    }

    handleLogin() {
        //@ts-ignore
        this.valid = this.$refs.loginForm.validate();
        if(this.valid) {
            console.log('thành công');
        } else {
            console.log('fail');
        }
    }

}

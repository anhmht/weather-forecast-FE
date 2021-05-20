import { removeLocalStorage } from './../../utils/appConfig';
import Vue from "vue";
import Component from "vue-class-component";
import { PATH } from '@/constant/route-constant';


@Component({
    template: require("./template.html").default,
    components: {
        "cms-menu": () => import("./components/menu-cms/MenuCMSComponent.vue")
    }
})
export default class CMSComponent extends Vue {
    handleLogout() {
        removeLocalStorage('auth');
        this.$router.push(PATH.INFO);
    }
}

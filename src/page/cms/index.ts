import { EVENT_BUS } from './../../constant/event-bus-constant';
import { removeLocalStorage } from './../../utils/appConfig';
import Vue from "vue";
import Component from "vue-class-component";
import { PATH } from '@/constant/route-constant';
import EventBus from '@/utils/event-bus';


@Component({
    template: require("./template.html").default,
    components: {
        "cms-menu": () => import("./components/menu-cms/MenuCMSComponent.vue")
    }
})
export default class CMSComponent extends Vue {
    handleLogout() {
        removeLocalStorage('auth');
        EventBus.$emit(EVENT_BUS.LOGIN)
        this.$router.push(PATH.INFO);

    }
}

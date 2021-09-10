import { DataHelper } from '@/utils/data-helper';
import { MAP_PROVINCE } from '@/constant/forcast-station-constant';
import { removeLocalStorage, setAxiosHeader } from './../../utils/appConfig';
import Vue from "vue";
import Component from "vue-class-component";
import { PATH } from '@/constant/route-constant';
import { Mutation, namespace } from 'vuex-class';
import { storeModules } from '@/store';

const UserMutation = namespace(storeModules.User, Mutation);
@Component({
    template: require("./template.html").default,
    components: {
        "cms-menu": () => import("./components/menu-cms/MenuCMSComponent.vue")
    }
})
export default class CMSComponent extends Vue {
    @UserMutation setAuth: (auth: any) => Promise<void>;

    get logo() {
        const hostName = window.location.hostname;
        const province = MAP_PROVINCE.find(e => {
            const name = DataHelper.convertToNonAccent(e.name);
            if (hostName.includes(name)) {
                return e
            }
            return false;
        });
        return province ? province.logoAdmin : 'https://weatherstoragevn.blob.core.windows.net/static-photo/logo/logo-admin_vinhlong.png';
    }

    handleLogout() {
        removeLocalStorage('auth');
        setAxiosHeader(null);
        this.setAuth(null);
        this.$router.push(PATH.INFO);

    }
}

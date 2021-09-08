import { DataHelper } from '@/utils/data-helper';
import { MAP_PROVINCE } from '@/constant/forcast-station-constant';
import { PATH } from './../../constant/route-constant';
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "menu-bar": () => import("../menu/MenuComponent.vue")
    }
})
export default class HeaderComponent extends Vue {
    menuClick: boolean = false;

    get logo() {
        const hostName = window.location.hostname;
        const province = MAP_PROVINCE.find(e => {
            let name = DataHelper.convertToNonAccent(e.name);
            if (hostName.includes(name)) {
                return e
            }
            return false;
        });
        console.log("current province", province);

        return province ? province.logo : 'https://weatherstoragevn.blob.core.windows.net/static-photo/logo/logo_vinhlong.png';
    }

    handleClick() {
        this.$router.push(PATH.INFO);
    }

    handleClose() {
        this.menuClick = false
    }
}

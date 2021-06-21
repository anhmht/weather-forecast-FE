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

    handleClick() {
        this.$router.push(PATH.INFO);
    }

    handleClose() {
        this.menuClick = false
    }
}

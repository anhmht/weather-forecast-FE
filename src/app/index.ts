import { PATH } from "@/constant/route-constant";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-header": () => import("../components/header/HeaderComponent.vue"),
        "base-footer": () => import("../components/footer/FooterComponent.vue")
    }
})
export default class App extends Vue {
    get visibleHeaderFooter(): boolean {
        return this.visblepath(this.$route.path);
    }

    visblepath(path: string): boolean {
        switch (path) {
            case PATH.RADAR:
                return false;
            default:
                return true;
        }
    }
}

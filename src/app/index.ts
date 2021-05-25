import { ROUTE_NAME } from "@/constant/route-constant";
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
        return this.visblepath(this.$route.name);
    }

    visblepath(name: string): boolean {
        switch (name) {
            case ROUTE_NAME.RADAR:
            case ROUTE_NAME.EDIT_POST:
            case ROUTE_NAME.LIST_POST:
            case ROUTE_NAME.CREATE_POST:
                return false;
            default:
                return true;
        }
    }
}

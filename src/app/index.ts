import { EVENT_BUS } from './../constant/event-bus-constant';
import { ROUTE_NAME } from "@/constant/route-constant";
import EventBus from "@/utils/event-bus";
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
            case ROUTE_NAME.LIST_ICON:
            case ROUTE_NAME.LIST_DATA:
            case ROUTE_NAME.LIST_USER:
            case ROUTE_NAME.CREATE_USER:
            case ROUTE_NAME.EDIT_USER:
            case ROUTE_NAME.LIST_DOCUMENT:
            case ROUTE_NAME.CREATE_DOCUMENT:
            case ROUTE_NAME.EDIT_DOCUMENT:
            case ROUTE_NAME.EDIT_LOCAL:
            case ROUTE_NAME.LIST_LOCAL:
            case ROUTE_NAME.COMMUNITY_LIST:
                return false;
            default:
                return true;
        }
    }

    mounted() {
        this.$socket.start().then(() => {
            EventBus.$emit(EVENT_BUS.NOTIFICATION.CONNECTED);
        }).catch(err => {
            console.log(err);
        });
    }
}

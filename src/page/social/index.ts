import Vue from "vue";
import Component from "vue-class-component";
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        "menu-social": () => import("./components/menu/SocialMenuComponent.vue"),
        "most-view": () => import("./components/most-view/MostViewComponent.vue"),
        "create-status": () => import("./components/create-status/CreateSatusComponent.vue"),
        "list-status": () => import("./components/list-status/ListStatusComponent.vue")
    }
})
export default class SocialPageComponent extends Vue {
    
}

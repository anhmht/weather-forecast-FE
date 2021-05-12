import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-header": () => import("../header/HeaderComponent.vue"),
        "base-footer": () => import("../footer/FooterComponent.vue")
    }
})
export default class BaseContainerComponent extends Vue {

}

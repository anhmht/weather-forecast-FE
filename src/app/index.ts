import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-header": () => import("../components/header/HeaderComponent.vue"),
        "base-footer": () => import("../components/footer/FooterComponent.vue")
    }
})
export default class App extends Vue {}

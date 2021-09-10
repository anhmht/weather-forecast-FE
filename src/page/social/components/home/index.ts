import Vue from "vue";
import Component from "vue-class-component";


@Component({
    template: require("./template.html").default,
    components: {
        "create-status": () => import("../create-status/CreateSatusComponent.vue"),
        "list-status": () => import("../list-status/ListStatusComponent.vue")
    }
})
export default class SocialHomeComponent extends Vue {
    
}
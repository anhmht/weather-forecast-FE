import Vue from "vue";
import Component from "vue-class-component";
import Carousel from "vue-owl-carousel";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        Carousel
    }
})
export default class InfoPageComponent extends Vue {

}

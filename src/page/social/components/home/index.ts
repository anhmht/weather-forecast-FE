import { storeModules } from "@/store";
import userTypesStore from "@/store/user/user-types.store";
import Vue from "vue";
import Component from "vue-class-component";
import { Getter, namespace } from "vuex-class";

const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "create-status": () => import("../create-status/CreateSatusComponent.vue"),
        "list-status": () => import("../list-status/ListStatusComponent.vue")
    }
})
export default class SocialHomeComponent extends Vue {
    @UserGetter(userTypesStore.Get.Auth) userConfig: any;
}
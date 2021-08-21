import { storeModules } from "@/store";
import { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";
import Vue from "vue";
import Component from "vue-class-component";
import { Action, namespace } from "vuex-class";

const LookupAction = namespace(storeModules.Lookup, Action);
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
    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;
    
    async mounted() {
        const payload = [
            GeneralLookupTypes.REACTION,
        ];
        await this.getGeneralLookup(payload);
    }
}

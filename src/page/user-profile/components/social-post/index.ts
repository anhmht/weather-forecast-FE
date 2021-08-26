import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, namespace } from "vuex-class";
import { storeModules } from "@/store";
import { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";

const LookupAction = namespace(storeModules.Lookup, Action);

@Component({
    template: require("./template.html").default,
    components: {
        "my-post": () => import("./my-post/MyPostComponent.vue"),
        "my-comment": () => import("./my-comment/MyCommentComponent.vue")
    }
})
export default class SocialPostComponent extends Vue {

    activeTab: string = 'my-post';

    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;

    handleChangeTab(name) {
        this.activeTab = name;
    }

    async mounted () {
        const payload = [
            GeneralLookupTypes.REACTION,
            GeneralLookupTypes.POST_STATUS]
        await this.getGeneralLookup(payload);
    }
}

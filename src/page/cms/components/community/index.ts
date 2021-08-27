import Vue from "vue";
import Component from "vue-class-component";
import { Action, Getter, namespace } from "vuex-class";
import { storeModules } from "@/store";
import lookupTypesStore, { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        'post-list-tab': () => import('./PostListComponent'),
        'comment-list-tab': () => import('./CommentListComponent')
    }
})

export default class CommunityComponent extends Vue {
    tab: any = null;
    selectedStatus = null;

    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;
    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    get lookupPostStatus () {
        return this.dtoLookupData[GeneralLookupTypes.POST_STATUS] || [];
    }

    get dtStatusList () {
        const all = {
            valueId: null,
            description: 'Tất cả'
        }
        return [all, ...this.lookupPostStatus];
    }

    get statusForSearch () {
        if (this.selectedStatus == null) {
            return this.lookupPostStatus.map(e => e.valueId)
        } else {
            return [this.selectedStatus];
        }
    }

    async mounted () {
        const payload = [ GeneralLookupTypes.POST_STATUS ]
        await this.getGeneralLookup(payload);
    }
}

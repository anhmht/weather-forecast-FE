import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore, {GeneralLookupTypes} from '@/store/lookup/lookup-types.store';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
    }
})
export default class ListLocalComponent extends Vue {
    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;
    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;
    
    get lookupProvince () {
        return this.dtoLookupData[GeneralLookupTypes.PROVINCE] || [];
    }

    get lookupDistrict () {
        return this.dtoLookupData[GeneralLookupTypes.DISTRICT] || [];
    }

    getExtremePhenomenon () {
        //todo
    }

    async mounted() {
        const payload = [
            GeneralLookupTypes.PROVINCE,
            GeneralLookupTypes.DISTRICT
        ];
        this.getGeneralLookup(payload).then(data => {

        }).catch(err => {
            console.log(err)
        });
    }
}

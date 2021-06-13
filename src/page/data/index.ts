import { namespace, Action, Getter } from 'vuex-class';
import { PROVINCE } from './../../constant/province-constant';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class DataPageComponent extends Vue {
    province = PROVINCE;
    activeTab: number = 0

    @LookupAction getLookupData: (type: string) => Promise<void>
    @LookupGetter(lookupTypesStore.Get.KTTV) stations

    mounted() {
        this.getLookupData(lookupTypesStore.Set.KTTV);
    }
}

import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore, {GeneralLookupTypes} from '@/store/lookup/lookup-types.store';
import { ExtremePhenomenonServices } from '../../../../service/extreme-phenomenon-service/extreme-phenomenon.service';
import { ExtremePhenomenon, IExtremePhenomenon } from '@/model/extreme-phenomenon';
import moment from 'moment';
import { DataHelper } from '@/utils/data-helper';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "confirm-dialog": () => import("../../../../components/confirm-action/ConfirmActionComponent.vue")
    }
})
export default class EditLocalComponent extends Vue {
    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;
    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;
    
    ePService: ExtremePhenomenonServices = new ExtremePhenomenonServices();

    isLoading: boolean = false;
    data: IExtremePhenomenon = new ExtremePhenomenon({});
    searchParams: {
        provinceId: number,
        districtId: string,
        date: string
    } = {
        provinceId: 86,
        districtId: null,
        date: moment().format('YYYY-MM-DD').toString()
    };
    
    get lookupProvince () {
        let list = this.dtoLookupData[GeneralLookupTypes.PROVINCE] || []
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    get lookupDistrict () {
        if (this.selectedProvince == null) return [];

        let list = (this.dtoLookupData[GeneralLookupTypes.DISTRICT] || []).filter(d => d.provinceId === this.selectedProvince);
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    get coList () {
        return this.data.details;
    }

    get selectedProvince () {
        return this.searchParams.provinceId;
    }

    set selectedProvince (value) {
        this.searchParams.provinceId = value;
        this.fetchData();
    }

    get selectedDistrict () {
        return this.searchParams.districtId;
    }

    set selectedDistrict (value) {
        this.searchParams.districtId = value;
        this.fetchData();
    }

    fetchData () {
        this.searchExtremePhenomenonDetail();
        this.$forceUpdate();
    }

    async searchExtremePhenomenonDetail () {
        this.isLoading = true;

        this.ePService.searchExtremePhenomenonDetail(this.searchParams).then((item: any) => {
            this.isLoading = false;
            if (item) {
                this.data = DataHelper.deepClone(item);
            } else {
                this.data = new ExtremePhenomenon({});
            }
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    async mounted() {
        const payload = [
            GeneralLookupTypes.PROVINCE,
            GeneralLookupTypes.DISTRICT
        ];
        await this.getGeneralLookup(payload);
        this.searchParams.districtId = this.lookupDistrict[0] ? this.lookupDistrict[0].id : null;

        this.searchExtremePhenomenonDetail();
    }
}

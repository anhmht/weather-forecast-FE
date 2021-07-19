import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore, {GeneralLookupTypes} from '@/store/lookup/lookup-types.store';
import { ExtremePhenomenonServices } from '../../../../service/extreme-phenomenon-service/extreme-phenomenon.service';
import { ExtremePhenomenon, IExtremePhenomenon } from '@/model/extreme-phenomenon';
import moment from 'moment';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
    }
})
export default class EditLocalComponent extends Vue {
    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;
    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;
    
    ePService: ExtremePhenomenonServices = new ExtremePhenomenonServices();

    isLoading: boolean = false;
    id: string = '';
    data: IExtremePhenomenon = new ExtremePhenomenon({});
    
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
        return [];
    }

    get selectedDate () {
        if (this.data.date) {
            return moment(this.data.date).format('YYYY-MM-DD');
        }
        return null;
    }

    set selectedDate (value) {
    }

    get selectedProvince () {
        return this.data.provinceId;
    }

    set selectedProvince (value) {
        this.data.provinceId = value;
    }

    get selectedDistrict () {
        return this.data.districtId;
    }

    set selectedDistrict (value) {
        this.data.districtId = value;
    }

    get formatSelectedDate () {
        if (this.selectedDate) {
            return moment(this.selectedDate).format('DD/MM/YYYY');
        }
        return null;
    }

    fetchData () {
        this.getExtremePhenomenonDetail();
        this.$forceUpdate();
    }

    getExtremePhenomenonDetail () {
        if (this.id != null) {
            this.isLoading = true;
            this.ePService.getExtremePhenomenonById(this.id).then((data: any) => {
                if (data) {
                    this.data = {...data};
                }
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
            })
        }
    }

    handleBack () {
        this.$router.go(-1);
    }

    handleAddContent () {

    }

    handleEditContent (id: string) {

    }

    handleDeleteContent (id: string) {

    }

    handleFilterDate (value) {
        this.data.date = value;
    }

    handleSave () {
        this.isLoading = true;
        if (this.id == null) {
            // Add new
            this.ePService.createExtremePhenomenon(this.data).then((id: any) => {
                this.$toast.success('Tạo hiện tượng mới thành công');
                this.isLoading = false;
                this.id = id;
                this.fetchData();
            }).catch(err => {
                this.$toast.error('Có lỗi khi tạo mới');
                console.log(err);
                this.isLoading = false;
            })
        } else {
            this.ePService.updateExtremePhenomenon(this.data).then(res => {
                this.$toast.success('Lưu hiện tượng thành công');
                this.isLoading = false;
            }).catch(err => {
                this.$toast.error('Có lỗi khi tạo mới');
                console.log(err);
                this.isLoading = false;
            })
        }
    }

    async mounted() {
        const payload = [
            GeneralLookupTypes.PROVINCE,
            GeneralLookupTypes.DISTRICT
        ];
        await this.getGeneralLookup(payload);
        this.id = this.$route.params.id;

        this.getExtremePhenomenonDetail();
    }
}

import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore, {GeneralLookupTypes} from '@/store/lookup/lookup-types.store';
import { ExtremePhenomenonServices } from '../../../../service/extreme-phenomenon-service/extreme-phenomenon.service';
import { ExtremePhenomenonsSearchParams, IExtremePhenomenon, IExtremePhenomenonsSearchParams } from '@/model/extreme-phenomenon';

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
    
    ePService: ExtremePhenomenonServices = new ExtremePhenomenonServices();
    searchParams: IExtremePhenomenonsSearchParams = new ExtremePhenomenonsSearchParams({});
    extremePhenomenons: IExtremePhenomenon[] = [];

    totalItems: number = 0;
    totalPages: number = 0;
    listPostTitle: string = '';
    limitPerPage: number[] = [5, 10, 15, 20];
    numPostsInPage: number = 0;
    
    get lookupProvince () {
        let list = this.dtoLookupData[GeneralLookupTypes.PROVINCE] || []
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }

    get lookupDistrict () {
        return this.dtoLookupData[GeneralLookupTypes.DISTRICT] || [];
    }

    get coList () {
        return this.extremePhenomenons;
    }

    get selectedDate () {
        return this.searchParams.date;
    }

    set selectedDate (value) {
    }

    get selectedProvince () {
        return this.searchParams.provinceId;
    }

    set selectedProvince (value) {
        this.searchParams.provinceId = value;
        this.fetchData();
    }

    get formatSelectedDate () {
        return this.formatDate(this.selectedDate)
    }

    get totalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    fetchData () {
        this.getAllExtremePhenomenon();
        this.$forceUpdate();
    }

    getAllExtremePhenomenon () {
        this.ePService.getAllExtremePhenomenons(this.searchParams).then((data: any) => {
            // const dummy = {
            //     "currentPage": 1,
            //     "totalItems": 1,
            //     "totalPages": 1,
            //     "extremePhenomenons": [
            //         {
            //         "createBy": "2021-07-17T15:13:17.261Z",
            //         "createDate": "2021-07-17T15:13:17.261Z",
            //         "lastModifiedBy": "2021-07-17T15:13:17.261Z",
            //         "lastModifiedDate": "2021-07-17T15:13:17.261Z",
            //         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            //         "provinceId": 0,
            //         "districtId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            //         "date": "2021-07-17T15:13:17.261Z",
            //         "provinceName": "Vĩnh Long",
            //         "districtName": "Tam Bình"
            //         }
            //     ]
            // }
            this.extremePhenomenons = data && data["extremePhenomenons"] ? data["extremePhenomenons"] : [];
            this.totalItems = data.totalItems;
            this.totalPages = data.totalPages;
        }).catch(err => {
            console.log(err);
        })
    }

    handleAdd () {

    }

    handleEdit (id: string) {

    }

    handleDelete (id: string) {

    }

    handleFilterDate (value) {
        this.searchParams.date = value;
        this.fetchData();
    }

    searchByLimit () {

    }

    searchByPaging () {

    }

    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`;
    }

    async mounted() {
        const payload = [
            GeneralLookupTypes.PROVINCE,
            GeneralLookupTypes.DISTRICT
        ];
        await this.getGeneralLookup(payload);
        this.getAllExtremePhenomenon();
    }
}

import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore, {GeneralLookupTypes} from '@/store/lookup/lookup-types.store';
import { ExtremePhenomenonServices } from '../../../../service/extreme-phenomenon-service/extreme-phenomenon.service';
import { ExtremePhenomenonsSearchParams, IExtremePhenomenon, IExtremePhenomenonsSearchParams } from '@/model/extreme-phenomenon';
import { ROUTE_NAME } from '@/constant/route-constant';
import moment from 'moment';

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

    datePickerMenu: boolean = false;
    visibleConfirm: boolean = false;
    selectedId: string = null;
    
    get lookupProvince () {
        let list = this.dtoLookupData[GeneralLookupTypes.PROVINCE] || []
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    get lookupDistrict () {
        return this.dtoLookupData[GeneralLookupTypes.DISTRICT] || [];
    }

    get coList () {
        return this.extremePhenomenons;
    }

    get selectedDate () {
        if (this.searchParams.date) {
            return moment(this.searchParams.date).format('YYYY-MM-DD');
        }
        return null;
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
        if (this.selectedDate) {
            return moment(this.selectedDate).format('DD/MM/YYYY');
        }
        return null;
    }

    get totalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    async fetchData () {
        await this.getAllExtremePhenomenon();
        this.$forceUpdate();
    }

    async getAllExtremePhenomenon () {
        await this.ePService.getAllExtremePhenomenons(this.searchParams).then((data: any) => {
            this.extremePhenomenons = data && data["extremePhenomenons"] ?  data["extremePhenomenons"] : [];
            this.totalItems = data.totalItems;
            this.totalPages = data.totalPages;
        }).catch(err => {
            console.log(err);
        })
    }

    handleAdd () {
        this.$router.push({
            name: ROUTE_NAME.EDIT_LOCAL,
            params: { id: null }
        });
    }

    handleEdit (id: string) {
        this.$router.push({
            name: ROUTE_NAME.EDIT_LOCAL,
            params: { id: id }
        });
    }

    beforeHandleDelete (id: string) {
        this.selectedId = id;
        this.visibleConfirm = true;
    }

    async handleDelete (id: string) {
        await this.ePService.deleteExtremePhenomenon(this.selectedId);
        if (this.coList.length === 1) {
            this.searchParams.page -= 1;
        }
        this.searchByPaging();
        this.visibleConfirm = false;
        this.$toast.success('Xóa hiện tượng thành công');
    }

    handleFilterDate (value) {
        this.searchParams.date = value;
        this.fetchData();
    }

    async searchByLimit () {
        this.searchParams.page = 1;
        await this.fetchData();
        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    async searchByPaging () {
        await this.fetchData();
        if (this.searchParams.limit * this.searchParams.page <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit * this.searchParams.page;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    async mounted() {
        const payload = [
            GeneralLookupTypes.PROVINCE,
            GeneralLookupTypes.DISTRICT
        ];
        await this.getGeneralLookup(payload);
        await this.getAllExtremePhenomenon();
        
        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }
}

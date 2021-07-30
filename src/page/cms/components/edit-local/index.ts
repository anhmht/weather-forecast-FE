import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore, {GeneralLookupTypes} from '@/store/lookup/lookup-types.store';
import { ExtremePhenomenonServices } from '../../../../service/extreme-phenomenon-service/extreme-phenomenon.service';
import { ExtremePhenomenon, ExtremePhenomenonDetail, IExtremePhenomenon, IExtremePhenomenonDetail } from '@/model/extreme-phenomenon';
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
    id: string = null;
    data: IExtremePhenomenon = new ExtremePhenomenon({});
    originalData: IExtremePhenomenon = new ExtremePhenomenon({});
    confirmingData: IExtremePhenomenon = null;

    currentRow: IExtremePhenomenonDetail = new ExtremePhenomenonDetail({});
    currentRowIndex: number = -1;
    isDisplayDialog: boolean = false;

    visibleConfirm: boolean = false;
    datePickerMenu: boolean = false;
    
    rules = {
        title: [v => !!v || 'Vui lòng nhập nội dung'],
    }
    
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
        this.checkExisted();
    }

    get selectedDistrict () {
        return this.data.districtId;
    }

    set selectedDistrict (value) {
        this.data.districtId = value;
        this.checkExisted();
    }

    get formatSelectedDate () {
        if (this.selectedDate) {
            return moment(this.selectedDate).format('DD/MM/YYYY');
        }
        return null;
    }

    get isListVisible () {
        return this.selectedProvince != null && this.selectedDistrict != null && this.selectedDate != null;
    }

    get isDetailsChanged () {
        return JSON.stringify(this.originalData.details) !== JSON.stringify(this.data.details);
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
                    this.data = DataHelper.deepClone(data);
                    this.originalData = DataHelper.deepClone(data);
                }
                this.isLoading = false;
            }).catch(err => {
                // this.$errorMessage(err);
                this.isLoading = false;
            })
        }
    }

    handleBack () {
        this.$router.go(-1);
    }

    handleAddContent () {
        this.currentRowIndex = -1;
        this.currentRow = new ExtremePhenomenonDetail({});
        this.isDisplayDialog = true;
    }

    addContent () {
        this.isDisplayDialog = false;
        if (this.currentRowIndex === -1) {
            this.data.details.push(this.currentRow);
        } else {
            let row = this.data.details[this.currentRowIndex];
            if (row) {
                row.name = this.currentRow.name;
                row.content = this.currentRow.content;
            }
        }
    }

    handleEditContent (index: number) {
        let row = this.data.details[index];
        if (row) {
            this.currentRowIndex = index;
            this.currentRow = DataHelper.deepClone(row);
            this.isDisplayDialog = true;
        }
    }

    handleDeleteContent (index: number) {
        let row = this.data.details[index];
        if (row) {
            this.data.details.splice(index, 1);
        }
    }

    handleFilterDate (value) {
        this.data.date = value;
        this.checkExisted();
    }

    async handleSave (back:boolean = true) {
        this.isLoading = true;
        if (this.id == null) {
            // Add new
            this.ePService.createExtremePhenomenon(this.data).then((id: any) => {
                this.$toast.success('Tạo hiện tượng mới thành công');
                this.isLoading = false;
                this.id = id;

                back ? this.handleBack() : this.fetchData;
            }).catch(err => {
                this.$toast.error('Có lỗi khi tạo mới');
                // this.$errorMessage(err);
                this.isLoading = false;
            })
        } else {
            this.ePService.updateExtremePhenomenon(this.data).then(res => {
                this.$toast.success('Lưu hiện tượng thành công');
                this.isLoading = false;

                if (back) {
                    this.handleBack();
                }
            }).catch(err => {
                this.$toast.error('Có lỗi khi tạo mới');
                // this.$errorMessage(err);
                this.isLoading = false;
            })
        }
    }

    checkExisted () {
        if (!this.isListVisible) return;
        this.searchExtremePhenomenonDetail();
    }

    async switchData (save?:boolean) {
        if (this.confirmingData) {
            if (save) {
                await this.handleSave(false);
            }

            this.id = this.confirmingData.id;
            this.data = DataHelper.deepClone(this.confirmingData);
            this.originalData = DataHelper.deepClone(this.confirmingData);
            this.confirmingData = null;
            this.$forceUpdate();
        }
        this.visibleConfirm = false;
    }

    searchExtremePhenomenonDetail () {
        this.isLoading = true;

        let payload = {
            provinceId: this.selectedProvince,
            districtId: this.selectedDistrict,
            date: this.selectedDate
        }
        this.ePService.searchExtremePhenomenonDetail(payload).then((item: any) => {
            this.isLoading = false;
            if (item) {
                this.confirmingData = DataHelper.deepClone(item);
            } else {
                let option = {
                    provinceId: this.selectedProvince,
                    districtId: this.selectedDistrict,
                    date: this.selectedDate
                }
                this.confirmingData = new ExtremePhenomenon(option);
            }

            if (this.id != null && this.isDetailsChanged) {
                this.visibleConfirm = true;
            } else {
                this.switchData();
            }
        }).catch(err => {
            // this.$errorMessage(err);
            this.isLoading = false;
        })
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

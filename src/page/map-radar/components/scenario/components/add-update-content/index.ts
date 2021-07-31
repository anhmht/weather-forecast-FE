import { DataHelper } from '@/utils/data-helper';
import { ELEVATION, SCENARIO_ACTION_METHOD_ENUM, SCENARIO_ACTION_ENUM, SCENARIO_ACTION_DETAIL_ENUM, POSITION } from './../../scenario-default';

import { MAP_PROVINCE, MAP_TYPE, REGION } from '@/constant/forcast-station-constant';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IScenarioAction, IScenarioActionDetail, ScenarioAction, ScenarioActionDetail } from '@/model/scenario';
import { Getter, namespace } from 'vuex-class';
import { storeModules } from '@/store';
import lookupTypesStore, { GeneralLookupTypes } from '@/store/lookup/lookup-types.store';
import { ScenarioServices } from '@/service/scenario-service/scenario.service';
import { UploadServices } from '@/service/upload-service/upload.service';

const LookupGetter = namespace(storeModules.Lookup, Getter);

@Component({
    template: require("./template.html").default,
    components: {
        "add-update-textbox": () => import("../add-update-textbox/AddUpdateTextBox.vue"),
        "add-update-title": () => import("../add-update-title/AddUpdateTitle.vue"),
        "add-update-temp-info": () => import("../add-update-temp-info/AddUpdateTempInfoComponent.vue"),
        "confirm-dialog": () => import("../../../../../../components/confirm-action/ConfirmActionComponent.vue")
    }
})
export default class AddUpdateContentComponent extends Vue {
    @Prop({required: true})
    value

    @Prop({type: Object, default: null})
    content

    @Prop({ required: true })
    id

    @Prop({ type: Number, default: 0 })
    order

    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    uploadedDocs: any = null;
    progress: number = 0;
    isUploading: boolean = false;
    uploadservice: UploadServices = new UploadServices();

    durations = [
        { text: '0 giây', value: 0 },
        { text: '1 giây', value: 1000 },
        { text: '2 giây', value: 2000 },
        { text: '3 giây', value: 3000 },
        { text: '4 giây', value: 4000 },
        { text: '5 giây', value: 5000 },
        { text: '6 giây', value: 6000 },
        { text: '7 giây', value: 7000 },
        { text: '8 giây', value: 8000 },
        { text: '9 giây', value: 9000 },
        { text: '10 giây', value: 10000 },
        { text: '11 giây', value: 11000 },
        { text: '12 giây', value: 12000 },
        { text: '13 giây', value: 13000 },
        { text: '14 giây', value: 14000 },
        { text: '15 giây', value: 15000 },
        { text: '16 giây', value: 16000 },
        { text: '17 giây', value: 17000 },
        { text: '18 giây', value: 18000 },
        { text: '19 giây', value: 19000 },
        { text: '20 giây', value: 20000 },
        { text: '25 giây', value: 25000 },
        { text: '30 giây', value: 30000 },
    ]

    positions = POSITION

    valid: boolean = true;

    data: IScenarioAction = new ScenarioAction({});
    scenarioService = new ScenarioServices();
    isLoading: boolean = false;

    rules = {
        actionRules: [v => !!v || 'Vui lòng chọn hàng động'],
        methodRules: [v => !!v || 'Vui lòng chọn khu vực hoặc tỉnh thành'],
        regionRules: [v => !!v || 'Vui lòng chọn khu vực'],
        provinceRules: [v => !!v || 'Vui lòng chọn tỉnh thành'],
        mapTypeRules: [v => !!v || 'Vui lòng chọn loại bản đồ'],
        zoomRules: [v => !!v || 'Vui lòng chọn độ thu phóng bản đồ'],
        elevationRules: [v => !!v || 'Vui lòng chọn độ cao bản đồ'],
    }

    visibleAddTexbox: boolean = false;
    textbox: IScenarioActionDetail = null;
    selectTextBoxIndex: number = 0;

    confirmTitle: string = null;
    confirmAction: string = null;
    visibleConfirm: boolean = false;

    visibleUpdateTitle:boolean = false;
    visibleUpdateTempInfo: boolean = false;

    actionListConstant = SCENARIO_ACTION_ENUM;
    methodConstant = SCENARIO_ACTION_METHOD_ENUM;
    actionDetailConstant = SCENARIO_ACTION_DETAIL_ENUM;

    get actionList() {
        return this.dtoLookupData[GeneralLookupTypes.ACTION_TYPE]
    }

    get regions() {
        const regions = DataHelper.deepClone(REGION) as any;
        regions.push({
            name: "Toàn Quốc",
            zoom: 6,
            placeId: 'TQ',
            paddingBottomRight: [0, 0],
            paddingTopLeft: [0, 0]
        })
        return regions;
    }
    get locations() {
        return MAP_PROVINCE;
    }

    get mapTypes() {
        return MAP_TYPE;
    }

    get visibleAddItem() {
        return this.value;
    }

    set visibleAddItem(value) {
        this.$emit('input', value)
    }

    get zooms() {
        return [7,8,9,10,11,12];
    }

    get elevations() {
        return ELEVATION;
    }

    get coTitle() {
        return this.data.scenarioActionDetails.find(x => x.scenarioActionTypeId === this.actionDetailConstant.TITLE) || {}
    }

    set coTitle(val: IScenarioActionDetail) {
        const index = this.data.scenarioActionDetails.findIndex(x => x.scenarioActionTypeId === this.actionDetailConstant.TITLE);
        if (index > -1) {
            Vue.set(this.data.scenarioActionDetails, index, val);
        } else {
            this.data.scenarioActionDetails.push({
                ...val,
                scenarioActionTypeId: this.actionDetailConstant.TITLE
            })
        }
    }

    get coDisabledEditTitle() {
        return !this.coTitle.isDisplay;
    }

    get isDisPlayTitle() {
        return this.coTitle.isDisplay;
    }

    set isDisPlayTitle(val) {
        const index = this.data.scenarioActionDetails.findIndex(x => x.scenarioActionTypeId === this.actionDetailConstant.TITLE);
        if (index > -1) {
            Vue.set(this.data.scenarioActionDetails, index, { ...this.data.scenarioActionDetails[index], isDisplay: val});
        } else {
            this.data.scenarioActionDetails.push(new ScenarioActionDetail({
                isDisplay: val,
                scenarioActionTypeId: this.actionDetailConstant.TITLE,
            }))
        }
    }

    get coTempInfo() {
        return this.data.scenarioActionDetails.find(x => x.scenarioActionTypeId === this.actionDetailConstant.TEMP_INFO) || {}
    }

    set coTempInfo(val: IScenarioActionDetail) {
        const index = this.data.scenarioActionDetails.findIndex(x => x.scenarioActionTypeId === this.actionDetailConstant.TEMP_INFO);
        if (index > -1) {
            Vue.set(this.data.scenarioActionDetails, index, val);
        } else {
            this.data.scenarioActionDetails.push({
                ...val,
                scenarioActionTypeId: this.actionDetailConstant.TEMP_INFO
            })
        }
    }

    get coDisabledEditTempInfo() {
        return !this.coTempInfo.isDisplay;
    }

    get isDisPlayTempInfo() {
        return this.coTempInfo.isDisplay;
    }

    set isDisPlayTempInfo(val) {
        const index = this.data.scenarioActionDetails.findIndex(x => x.scenarioActionTypeId === this.actionDetailConstant.TEMP_INFO);
        if (index > -1) {
            Vue.set(this.data.scenarioActionDetails, index, { ...this.data.scenarioActionDetails[index], isDisplay: val });
        } else {
            this.data.scenarioActionDetails.push(new ScenarioActionDetail({
                isDisplay: val,
                scenarioActionTypeId: this.actionDetailConstant.TEMP_INFO
            }))
        }
    }

    get coTextBox() {
        return this.data.scenarioActionDetails.filter(x => x.scenarioActionTypeId === this.actionDetailConstant.TEXT_BOX) || []
    }

    set coTextBox(val: IScenarioActionDetail[]) {
        this.data.scenarioActionDetails = this.data.scenarioActionDetails.filter(x => x.scenarioActionTypeId !== this.actionDetailConstant.TEXT_BOX)
        this.data.scenarioActionDetails = this.data.scenarioActionDetails.concat(val);
    }

    handleSaveTitle(data: IScenarioActionDetail) {
        this.coTitle = data;
    }

    handleSaveTempInfo(data: IScenarioActionDetail) {
        this.coTempInfo = data
    }

    handleSaveTextBox(data: IScenarioActionDetail) {
        if (this.textbox) {
            const index = this.data.scenarioActionDetails.findIndex(x => x.id === data.id);
            if (index > -1) {
                Vue.set(this.data.scenarioActionDetails, index, data);
            }
        } else {
            this.data.scenarioActionDetails.push(new ScenarioActionDetail({
                ...data,
                scenarioActionTypeId: this.actionDetailConstant.TEXT_BOX,
                actionId: this.data.id
            }))
        }
    }

    generateKey(index: number) {
        return `${new Date().getTime()}-${index}`
    }

    handleEditTextBox(content: IScenarioActionDetail, index: number) {
        this.selectTextBoxIndex = index;
        this.textbox = new ScenarioActionDetail(content);
        this.visibleAddTexbox = true;
    }
    handleDeleteTextBox(index: number) {
        this.selectTextBoxIndex = index;
        this.confirmTitle = 'Bạn có muốn xoá text box này ?'
        this.confirmAction = 'deleteContent';
        this.visibleConfirm = true;
    }

    handleConfirm() {
        const textBoxArr = DataHelper.deepClone(this.coTextBox) as IScenarioActionDetail[];
        textBoxArr.splice(this.selectTextBoxIndex, 1);
        this.coTextBox = textBoxArr;
        this.visibleConfirm = false;
    }

    handleAddContent() {
        this.textbox = null;
        this.visibleAddTexbox = true;
    }

    handleSave() {
        //@ts-ignore
        this.valid = this.$refs.contentForm.validate();

        if (this.valid) {
            if (this.data.actionTypeId === SCENARIO_ACTION_ENUM.CHANGE_MAP_STATUS) {
                this.data.methodId = SCENARIO_ACTION_METHOD_ENUM.PROVINCE;
            }
            if (this.data.actionTypeId === SCENARIO_ACTION_ENUM.CHANGE_ZOOM_LEVEL) {
                this.data.duration = 1000;
            }
            if (this.data.actionTypeId === SCENARIO_ACTION_ENUM.CHANGE_ELEVATION) {
                this.data.methodId = SCENARIO_ACTION_METHOD_ENUM.LEVEL;
            }
            let requestHolder: Promise<any>;
            let successMessage: string = null;
            let errorMessage: string = null;
            this.isLoading = true;
            if (this.content) {
                requestHolder = this.scenarioService.updateScenarioAction(this.data);
                successMessage = 'Chỉnh sửa nội dung kịch bản thành công';
                errorMessage = 'Có lỗi khi chỉnh sửa nội dung kịch bản';
            } else {
                requestHolder = this.scenarioService.createScenarioAction(this.data);
                successMessage = 'Tạo mới nội dung kịch bản thành công';
                errorMessage = 'Có lỗi khi tạo mới nội dung kịch bản';
            }
            requestHolder.then((res: any) => {
                this.$toast.success(successMessage);
                this.isLoading = false;
                this.$emit('save-success');
                this.visibleAddItem = false
            }).catch(err => {
                this.$toast.error(errorMessage);
                console.log(err);
                this.isLoading = false;
            });
            
        }
    }

    handleChangeAction(value) {
        //@ts-ignore
        this.$refs.contentForm.resetValidation();
    }

    handleChangeMethod(val) {

    }

    onChangeDocuments(pics) {
        if (pics.length > 0) {
            this.processUploadDocuments(pics[0]);
        }
    }

    readVideo(video) {
        var reader = new FileReader();
        const videoSrc = document.querySelector("#video-source") as any;
        const videoTag = document.querySelector("#video-tag") as any;
        reader.onload = function (e) {
            videoSrc.src = e.target.result
            videoTag.load();
        }.bind(this)

        reader.readAsDataURL(video);
    }

    processUploadDocuments(file) {
        this.isUploading = true;
        this.reset();
        this.uploadVideo({
            Data: file,
            FileName: `${new Date().getTime()}_${file.name}`,
        });
    }

    uploadVideo(document) {
        const formData = this.buildUploadDocumentParams(document);
        document.isUploading = true;
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            },
            onUploadProgress: function (progressEvent) {
                var value = (progressEvent.loaded * 100) / progressEvent.total;
                var percent = Math.round(value);
                this.progress = percent;
            }.bind(this)
        };
        this.uploadservice.uploadFile(formData, config).then(response => {
            this.isUploading = false;
            this.progress = 0;
            this.readVideo(document.Data)
            this.data.data = response;
        }).catch(err => {
            this.isUploading = false;
            console.error(err);
        });
    }

    handleClickBrowse() {
        const upload = this.$refs.upload as any;
        upload.click();
    }

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        formData.append('file', document.Data, document.FileName);
        return formData;
    }

    reset() {
        this.uploadedDocs = null;
        this.progress = 0;
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.data = this.content ? new ScenarioAction(this.content) : new ScenarioAction({scenarioId : this.id, order: this.order});
        }
    }
}

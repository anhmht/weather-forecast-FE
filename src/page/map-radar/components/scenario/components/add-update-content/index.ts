import { DataHelper } from '@/utils/data-helper';
import { SCENARIO_ACTION, ELEVATION } from './../../scenario-default';

import { MAP_PROVINCE, MAP_TYPE, REGION } from '@/constant/forcast-station-constant';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {
        "add-update-textbox": () => import("../add-update-textbox/AddUpdateTextBox.vue"),
        "add-update-title": () => import("../add-update-title/AddUpdateTitle.vue"),
        "confirm-dialog": () => import("../../../../../../components/confirm-action/ConfirmActionComponent.vue")
    }
})
export default class AddUpdateContentComponent extends Vue {
    @Prop({required: true})
    value

    @Prop({type: Object, default: null})
    content

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

    positions = [
        { text: 'top', value: 'top' },
        { text: 'top-left', value: 'top-left' },
        { text: 'top-right', value: 'top-right' },
        { text: 'middle', value: 'middle' },
        { text: 'middle-left', value: 'middle-left' },
        { text: 'middle-right', value: 'middle-right' },
        { text: 'bottom', value: 'bottom' },
        { text: 'bottom-left', value: 'bottom-left' },
        { text: 'bottom-right', value: 'bottom-right' },
    ]

    valid: boolean = true;
    actionList = SCENARIO_ACTION

    data = {
        action: null,
        method: null,
        data: null,
        duration: 0,
        textBox: [],
        title: null
    }

    title = {
        isDisplayTitle: false,
        content: null,
        startTime: 0,
        duration: 0,
        position: 'top-right',
        width: 400,
        customPosition: false,
        left: 0,
        top: 0,
    }

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
    textbox: any = null;
    selectTextBoxIndex: number = 0;

    confirmTitle: string = null;
    confirmAction: string = null;
    visibleConfirm: boolean = false;

    visibleUpdateTitle:boolean = false;

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

    coTextBox() {
        if (this.data.textBox) {
            return this.data.textBox
        }
        return [];
    }

    get coTitle() {
        if (!this.title) {
            return {
                isDisplayTitle: false,
                content: null,
                startTime: 0,
                duration: 0,
                position: 'top-right',
                width: 400,
                customPosition: false,
                left: 0,
                top: 0,
            }
        }
        return this.title
    }

    get coDisabledEditTitle() {
        return !this.title.isDisplayTitle;
    }

    get isDisPlayTitle() {
        return this.title.isDisplayTitle;
    }
    set isDisPlayTitle(val) {
        this.title.isDisplayTitle = val;
    }

    handleSaveTitle(data) {
        this.title = DataHelper.deepClone(data);
    }

    handleSaveTextBox(data) {
        if (this.textbox) {
            this.data.textBox[this.selectTextBoxIndex] = DataHelper.deepClone(data);
        } else {
            if (this.data.textBox) {
                this.data.textBox.push(DataHelper.deepClone(data));
            } else {
                this.data.textBox = [];
                Vue.set(this.data, 'textBox', [DataHelper.deepClone(data)])
            }
        }
    }

    generateKey(index) {
        return `${new Date().getTime()}-${index}`
    }

    handleEditTextBox(content, index) {
        this.selectTextBoxIndex = index;
        this.textbox = content;
        this.visibleAddTexbox = true;
    }
    handleDeleteTextBox(index) {
        this.selectTextBoxIndex = index;
        this.confirmTitle = 'Bạn có muốn xoá text box này ?'
        this.confirmAction = 'deleteContent';
        this.visibleConfirm = true;
    }

    handleConfirm() {
        this.data.textBox.splice(this.selectTextBoxIndex, 1);
        this.visibleConfirm = false;
    }

    handleAddContent() {
        this.textbox = null;
        this.visibleAddTexbox = true;
    }

    handleSave() {
        //@ts-ignore
        this.valid = this.$refs.contentForm.validate();

        if(this.valid) {
            if (this.data.action === 'customMapStatusControl') {
                this.data.method = 'handleClick';
            }
            if (this.data.action === 'customZoomControl') {
                this.data.duration = 1000;
            }
            if (this.data.action === 'customLevelControl') {
                this.data.method = 'handleChangeLevel';
            }
            Vue.set(this.data, 'title', DataHelper.deepClone(this.title))
            this.$emit('save', this.data);
            this.visibleAddItem = false
        }
    }

    handleChangeAction(value) {
        this.data = {
            action: value,
            method: null,
            data: null,
            duration: 0,
            textBox: [],
            title: {
                isDisplayTitle: false,
                content: null,
                startTime: 0,
                duration: 0,
                position: 'top-right',
                width: 400,
                customPosition: false,
                left: 0,
                top: 0,
            }
        }

        //@ts-ignore
        this.$refs.contentForm.resetValidation();
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.data = this.content ? DataHelper.deepClone(this.content) : {
                action: null,
                method: null,
                data: null,
                duration: 0,
                textBox: [],
                title: this.title
            }
            if(this.data.title) {
                this.title = DataHelper.deepClone(this.data.title);
            }
        } else {
            this.title = {
                isDisplayTitle: false,
                content: null,
                startTime: 0,
                duration: 0,
                position: 'top-right',
                width: 400,
                customPosition: false,
                left: 0,
                top: 0,
            }
        }
    }
}

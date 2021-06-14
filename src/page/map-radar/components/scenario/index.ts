import { DataHelper } from '@/utils/data-helper';
import { DEFAULT_SCENARIOS, SCENARIO_ACTION, SCENARIO_DURATION, SCENARIO_LOCATION_METHOD, ELEVATION } from './scenario-default';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Sortable from "sortablejs";
import { sleep } from '@/utils/common-utils';
import { MAP_PROVINCE, REGION, MAP_TYPE } from '@/constant/forcast-station-constant';
@Component({
    template: require("./template.html").default,
    components: {
        "add-update-content": () => import("./components/add-update-content/AddUpdateContentComponent.vue")
    }
})
export default class ScenarioComponent extends Vue {
    @Prop({required: true})
    value

    selectedItem = 0;
    content: any = null;
    selectContentIndex: number = null;
    visibleAddItem: boolean = false;
    scenarios = []
    sortedList: any = []
    buttonLoading: boolean = true;

    get drawer() {
        return this.value;
    }

    set drawer(value) {
        this.$emit('input', value)
    }

    get ContentTitle() {
        return this.scenarios[this.selectedItem] ? this.scenarios[this.selectedItem].name : null;
    }

    get Contents() {
        return this.scenarios[this.selectedItem] ? this.scenarios[this.selectedItem].contents : [];
    }

    updateContent(data) {
        if(this.content) {
            this.Contents[this.selectContentIndex] = DataHelper.deepClone(data);
        } else {
            this.Contents.push(DataHelper.deepClone(data));
        }
    }

    generateKey(index) {
        return `${new Date().getTime()}-${index}`
    }

    getDuration(value) {
        return SCENARIO_DURATION[value];
    }

    getAction(value) {
        return SCENARIO_ACTION.find(x => x.value === value).text;
    }

    getMethod(item) {
        if (item.action === 'customLocationControl') {
            return SCENARIO_LOCATION_METHOD.find(x => x.value === item.method).text;
        }
        return null;
    }

    getData(item) {
        if (item.action === 'customLocationControl') {
            if (item.method === SCENARIO_LOCATION_METHOD[0].value) {
                return REGION.find(x => x.placeId === item.data).name
            }
            if (item.method === SCENARIO_LOCATION_METHOD[1].value) {
                return MAP_PROVINCE.find(x => x.placeId === item.data).name
            }
        }
        if (item.action === 'customMapStatusControl') {
            return MAP_TYPE.find(x => x.type === item.data).name;
        }
        if (item.action === 'customLevelControl') {
            return ELEVATION.find(x => x.data === item.data).label;
        }
        return item.data
    }

    handlePreview() {
        this.drawer = false;
        this.$emit('preview', this.Contents)
    }

    handleEditContent(content, index) {
        this.selectContentIndex = index;
        this.content = content;
        this.visibleAddItem = true;
    }

    handleAddContent() {
        this.content = null;
        this.visibleAddItem = true;
    }

    async makeSortAbleList() {
        let clear = {timeout: null};
        await sleep(500, clear);
        const list = document.getElementById('sortAble-list');
        if (list) {
            Sortable.create(list, {
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: ({ newIndex, oldIndex }) => {
                    // sort, shift item
                    const contents = this.sortedList.length > 0 ? DataHelper.deepClone(this.sortedList) : DataHelper.deepClone(this.Contents);
                    DataHelper.insertAndShift(contents, oldIndex, newIndex);
                    this.sortedList = contents
                    Vue.set(this.scenarios[this.selectedItem], 'contents', contents)
                }
            });
        }
    }

    mounted() {
        this.scenarios.push({
            name: 'Kịch bản mặc định',
            id: '0',
            contents: DEFAULT_SCENARIOS
        });
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.makeSortAbleList();
            setTimeout(() => {
                this.buttonLoading = false;
            }, 2000);
        } else {
            this.buttonLoading = true;
        }
    }
}

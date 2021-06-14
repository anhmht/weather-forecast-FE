import { DEFAULT_SCENARIOS, SCENARIO_ACTION, SCENARIO_DURATION, SCENARIO_LOCATION_METHOD } from './scenario-default';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Sortable from "sortablejs";
import { DataHelper } from '@/utils/data-helper';
import { sleep } from '@/utils/common-utils';
import { MAP_PROVINCE, REGION } from '@/constant/forcast-station-constant';
@Component({
    template: require("./template.html").default,
    components: {
        "add-update-content": () => import("./components/add-update-content/AddUpdateContentComponent.vue")
    }
})
export default class ScenarioComponent extends Vue {
    @Prop({required: true})
    value

    selectedItem = 0
    items = [
        { text: 'Kịch bản mặc định', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
    ]
    visibleAddItem: boolean = false;
    scenarios = []
    sortedList: any = []

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
        this.Contents.push(data);
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

    getMethod(value) {
        return SCENARIO_LOCATION_METHOD.find(x => x.value === value).text;
    }

    getData(item) {
        if (item.method === SCENARIO_LOCATION_METHOD[0].value) {
            return REGION.find(x => x.placeId  === item.data).name
        }
        if (item.method === SCENARIO_LOCATION_METHOD[1].value) {
            return MAP_PROVINCE.find(x => x.placeId  === item.data).name
        }
    }

    handlePreview() {
        this.drawer = false;

        this.$emit('preview', this.Contents)
    }

    async makeSortAbleList() {
        await sleep(500);
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

                    // this.scenarios[this.selectedItem].contents = contents;
                    // this.$forceUpdate()
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
        }
    }
}

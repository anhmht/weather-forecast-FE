import { DataHelper } from './../../../../utils/data-helper';
import { ScenarioServices } from './../../../../service/scenario-service/scenario.service';
import { IScenario, ISearchScenarioParameters, SearchScenarioParameters } from './../../../../model/scenario/scenario.model';
import { DEFAULT_SCENARIOS, SCENARIO_ACTION, SCENARIO_DURATION, SCENARIO_LOCATION_METHOD, ELEVATION } from './scenario-default';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Sortable from "sortablejs";
import { sleep } from '@/utils/common-utils';
import { MAP_PROVINCE, REGION, MAP_TYPE } from '@/constant/forcast-station-constant';
@Component({
    template: require("./template.html").default,
    components: {
        "add-update-content": () => import("./components/add-update-content/AddUpdateContentComponent.vue"),
        "add-update-scenario": () => import("./components/add-update-scenario/AddUpdateScenarioComponent.vue"),
        "confirm-dialog": () => import("../../../../components/confirm-action/ConfirmActionComponent.vue")
    }
})
export default class ScenarioComponent extends Vue {
    @Prop({required: true})
    value

    selectedItem = 0;
    content: any = null;
    selectContentIndex: number = null;
    visibleAddItem: boolean = false;
    visibleAddUpdateScenario: boolean = false
    scenarios = []
    buttonLoading: boolean = true;
    visibleConfirm: boolean = false;
    scenario: IScenario = null;
    searchParams: ISearchScenarioParameters = new SearchScenarioParameters({});

    scenarioService = new ScenarioServices();
    scenarioIndex = 0;

    confirmTitle: string = null;
    confirmAction: string = null;

    get drawer() {
        return this.value;
    }

    set drawer(value) {
        this.$emit('input', value)
    }

    get ContentTitle() {
        return this.scenarios[this.selectedItem] ? this.scenarios[this.selectedItem].scenarioName : null;
    }

    get Contents() {
        return this.scenarios[this.selectedItem] ? this.scenarios[this.selectedItem].scenarioContent : [];
    }

    updateScenario(data) {
        if (this.scenario) {

        } else {
            const scenario = DataHelper.deepClone(data) as any;
            scenario.scenarioContent = JSON.parse(scenario.scenarioContent);
            this.scenarios.push(DataHelper.deepClone(scenario))
        }
    }

    updateContent(data) {
        if(this.content) {
            this.Contents[this.selectContentIndex].scenarioContent = DataHelper.deepClone(data);
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

    handleDeleteContent(index) {
        this.selectContentIndex = index;
        this.confirmTitle = 'Bạn có muốn xoá nội dung này ?'
        this.confirmAction = 'deleteContent';
        this.visibleConfirm = true;
    }

    deleteContent() {
        this.Contents.splice(this.selectContentIndex, 1);
        this.visibleConfirm = false;
    }

    handleAddContent() {
        this.content = null;
        this.visibleAddItem = true;
    }

    handleAddScenario() {
        this.scenario = null;
        this.visibleAddUpdateScenario = true;
    }

    handleEditScenario(index) {
        this.scenario = DataHelper.deepClone(this.scenarios[index]);
        this.scenario.scenarioContent = JSON.stringify(this.scenario.scenarioContent);
        this.visibleAddUpdateScenario = true;
    }

    handleDeleteScenario(index) {
        this.scenarioIndex = index;
        this.confirmTitle = 'Bạn có muốn xoá kịch bản này ?'
        this.confirmAction = 'deleteScenario';
        this.visibleConfirm = true;
    }

    deleteScenario() {
        const id = this.scenarios[this.scenarioIndex].scenarioId;
        this.scenarioService.deleteScenario(id).then(res => {
            this.visibleConfirm = false;
        }).catch(err => {
            console.log(err);
        })
    }

    handleConfirm(value) {
        this[value]();
    }

    handleSave() {
        this.buttonLoading = true;
        const saveData = DataHelper.deepClone(this.scenarios[this.selectedItem]) as any;
        saveData.scenarioContent = JSON.stringify(saveData.scenarioContent);
        this.scenarioService.updateScenario(saveData).then(res => {
            this.buttonLoading = false;
        }).catch(err => {
            this.buttonLoading = false;
        })
    }

    handleChangeScenario(index) {
        this.selectedItem = index;
        this.makeSortAbleList();
    }

    async makeSortAbleList() {
        let clear = {timeout: null};
        await sleep(200, clear);
        const list = document.getElementById('sortAble-list');
        if (list) {
            Sortable.create(list, {
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: ({ newIndex, oldIndex }) => {
                    // sort, shift item
                    const contents = DataHelper.deepClone(this.Contents);
                    DataHelper.insertAndShift(contents, oldIndex, newIndex);
                    Vue.set(this.scenarios[this.selectedItem], 'scenarioContent', contents)
                }
            });
        }
    }

    initData() {
        if (this.scenarios.length > 0) return;
        this.scenarios.push({
            scenarioName: 'Kịch bản mặc định',
            scenarioId: '0',
            scenarioContent: DEFAULT_SCENARIOS
        });
        this.scenarioService.getAllScenarios(this.searchParams).then((res: any) => {
            const sceneArray = res.scenarios.map(x => {
                return {
                    ...x,
                    scenarioContent: JSON.parse(x.scenarioContent)
                }
            })
            this.scenarios = this.scenarios.concat(sceneArray);
            this.searchParams.total = res.totalPages
            this.makeSortAbleList();
        }).catch(err => {
            console.log(err);
        })
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.initData()
            setTimeout(() => {
                this.buttonLoading = false;
            }, 2000);
        } else {
            this.buttonLoading = true;
        }
    }

}

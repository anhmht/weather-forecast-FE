import { EVENT_BUS } from './../../../../constant/event-bus-constant';
import { DataHelper } from './../../../../utils/data-helper';
import { ScenarioServices } from './../../../../service/scenario-service/scenario.service';
import { IScenario, IScenarioAction, IScenarioActionOrder, ISearchScenarioParameters, ScenarioActionOrder, SearchScenarioParameters } from './../../../../model/scenario/scenario.model';
import { SCENARIO_ACTION, SCENARIO_DURATION, SCENARIO_LOCATION_METHOD, ELEVATION } from './scenario-default';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Sortable from "sortablejs";
import { sleep } from '@/utils/common-utils';
import { MAP_PROVINCE, REGION, MAP_TYPE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import EventBus from '@/utils/event-bus';
import { Action, Getter, namespace } from 'vuex-class';
import { storeModules } from '@/store';
import lookupTypesStore, { GeneralLookupTypes } from '@/store/lookup/lookup-types.store';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
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

    isLoading: boolean = false;

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
    forcastSearchParam: IForecastSearchParam = new ForecastSearchParam();
    weatherService: WeatherServices = new WeatherServices();

    scenarioService = new ScenarioServices();
    scenarioIndex = 0;

    confirmTitle: string = null;
    confirmAction: string = null;

    scenarioActions: IScenarioAction[] = null;

    remoteScenario: IScenario = null;

    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;
    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

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
        return this.scenarioActions || [];
    }

    get ScenarioId() {
        return this.scenarios[this.selectedItem] ? this.scenarios[this.selectedItem].scenarioId : null;
    }

    getColor(action) {
        return SCENARIO_ACTION.find(x => x.value === action).color;
    }

    async updateScenario(data) {
        await this.fetchNewData();
        if (!this.scenario) {
            this.selectedItem = 0;
            const scenario = this.scenarios[this.selectedItem];
            this.getScenarioDetail(scenario.scenarioId);
        }
        
    }

    async updateContent() {
        let clear = { timeout: null };
        this.isLoading = true;
        await this.getScenarioDetail(this.ScenarioId);
        await sleep(500, clear);
        this.makeSortAbleList();
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
                const region = REGION.find(x => x.placeId === item.data)
                return region ? region.name : 'Toàn Quốc'
            }
            if (item.method === SCENARIO_LOCATION_METHOD[1].value) {
                const province = MAP_PROVINCE.find(x => x.placeId === item.data)
                return province ? province.name : null
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

    handlePreview(isRecord) {
        this.drawer = false;
        if (isRecord) {
            this.$emit('capture', this.Contents);
            return;
        }
        // this.prepareData();
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
        this.isLoading = true;
        const scenarioActionId = this.Contents[this.selectContentIndex].id;
        this.scenarioService.deleteScenarioAction(scenarioActionId).then(async res => {
            this.$toast.success('Xóa nội dung thành công');
            await this.getScenarioDetail(this.ScenarioId);
            this.isLoading = false;
            this.visibleConfirm = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
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
        this.scenarioService.deleteScenario(id).then(async res => {
            await this.fetchNewData();
            this.selectedItem = 0;
            this.$toast.success('Xóa kịch bản thành công');
            this.visibleConfirm = false;
        }).catch(err => {
            this.$toast.error('Có lỗi khi xóa kịch bản');
            console.log(err);
        })
    }

    handleConfirm(value) {
        this[value]();
    }

    handleRemoteStart(message) {
        // const scenario = this.scenarios.find(x => x.scenarioId === message.scenarioId);
        this.scenarioService.getScenarioById(message.scenarioId).then(async (res: any) => {
            this.remoteScenario = res;
            this.$emit('remote', { message, scenario: this.remoteScenario });
        }).catch(err => {
            console.log(err);
        })
        
    }

    handleRemoteMove(message) {
        const step = this.remoteScenario.scenarioActions.find(x => x.order === message.step);
        this.$emit('remote-move', { message, step });
    }

    async handleChangeScenario(index) {
        this.selectedItem = index;
        let clear = {timeout: null};
        this.isLoading = true;
        const id = this.scenarios[index].scenarioId;
        await this.getScenarioDetail(id);

        await sleep(500, clear);
        this.makeSortAbleList();
    }

    async makeSortAbleList() {
        const list = document.getElementById('sortAble-list');
        if (list) {
            Sortable.create(list, {
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: async ({ newIndex, oldIndex }) => {
                    // sort, shift item
                    const contents = DataHelper.deepClone(this.Contents) as any;
                    DataHelper.insertAndShift(contents, oldIndex, newIndex);
                    const newOrders = []
                    contents.forEach((element, index) => {
                        newOrders.push(new ScenarioActionOrder({
                            actionId: element.id,
                            order: index
                        }))
                    });
                    // this.isLoading = true;
                    await this.updateScenarioActionOrder(newOrders);
                    // this.isLoading = false;
                    // Vue.set(this.scenarios[this.selectedItem], 'scenarioContent', contents)
                }
            });
            this.isLoading = false;
        } else {
            this.isLoading = false;
        }
    }

    async initData() {
        const payload = [
            GeneralLookupTypes.ACTION_AREA_TYPE,
            GeneralLookupTypes.ACTION_METHOD,
            GeneralLookupTypes.ACTION_TYPE,
            GeneralLookupTypes.POSITION,
            GeneralLookupTypes.SCENARIO_ACTION_TYPE,
        ];
        await this.getGeneralLookup(payload);
        if (this.scenarios.length > 0) return;
        await this.fetchNewData();
        const scenario = this.scenarios[this.selectedItem];
        this.getScenarioDetail(scenario.scenarioId);
    }

    async getDataBypaging() {
        await this.fetchNewData();
        this.selectedItem = 0;
        const scenario = this.scenarios[this.selectedItem];
        await this.getScenarioDetail(scenario.scenarioId);
        let clear = { timeout: null };
        this.isLoading = true;
        await sleep(500, clear);
        this.makeSortAbleList();
    }

    async updateScenarioActionOrder(payload: IScenarioActionOrder[]) {
        return await this.scenarioService.updateScenarioActionOrder(payload).then(async (res: any) => {
            this.isLoading = true;
            await this.getScenarioDetail(this.ScenarioId);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
        })
    }

    async getScenarioDetail(scenarioId) {
        return await this.scenarioService.getScenarioById(scenarioId).then(async (res: any) => {
            this.scenarioActions = res.scenarioActions;
        }).catch(err => {
            console.log(err);
        })
    }

    async fetchNewData() {
        this.isLoading = true;
        this.scenarios = [];
        return await this.scenarioService.getAllScenarios(this.searchParams).then(async (res: any) => {
            this.scenarios = res.scenarios;
            this.searchParams.total = res.totalPages
            this.isLoading = false
        }).catch(err => {
            console.log(err);
            this.isLoading = false
        })
    }

    mounted() {
        this.initData();
        EventBus.$on(EVENT_BUS.NOTIFICATION.START, this.handleRemoteStart);
        EventBus.$on(EVENT_BUS.NOTIFICATION.MOVE, this.handleRemoteMove);
    }

    @Watch('value')
    async dialogVisible(visible) {
        if (visible) {
            let clear = { timeout: null };
            await sleep(500, clear);
            this.makeSortAbleList();
            setTimeout(() => {
                this.buttonLoading = false;
            }, 2000);
        } else {
            this.buttonLoading = true;
        }
    }

}

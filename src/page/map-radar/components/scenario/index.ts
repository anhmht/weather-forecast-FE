import { EVENT_BUS } from './../../../../constant/event-bus-constant';
import { DataHelper } from './../../../../utils/data-helper';
import { ScenarioServices } from './../../../../service/scenario-service/scenario.service';
import { IScenario, ISearchScenarioParameters, SearchScenarioParameters } from './../../../../model/scenario/scenario.model';
import { DEFAULT_SCENARIOS, SCENARIO_ACTION, SCENARIO_DURATION, SCENARIO_LOCATION_METHOD, ELEVATION } from './scenario-default';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Sortable from "sortablejs";
import { sleep } from '@/utils/common-utils';
import { MAP_PROVINCE, REGION, MAP_TYPE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import EventBus from '@/utils/event-bus';
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

    getColor(action) {
        return SCENARIO_ACTION.find(x => x.value === action).color;
    }

    updateScenario(data) {
        if (this.scenario) {
            const index = this.scenarios.findIndex(x => x.scenarioId === this.scenario.scenarioId);
            Vue.set(this.scenarios[index], 'scenarioName', data.scenarioName);

            this.$forceUpdate();
        } else {
            const scenario = DataHelper.deepClone(data) as any;
            scenario.scenarioContent = JSON.parse(scenario.scenarioContent);
            this.scenarios.push(DataHelper.deepClone(scenario))
        }
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

    // prepareStation() {
    //     let stations = [];
    //     let result = []
    //     stations = this.Contents.filter(x => x.action === 'customLocationControl');
    //     stations.forEach(item => {
    //         if (item.method === SCENARIO_LOCATION_METHOD[0].value) {
    //             const region = REGION.find(x => x.placeId === item.data)
    //             if(region) {
    //                 region.provinceIds.forEach(element => {
    //                     const station = STATION.find(x => x.place_id === element);
    //                     result.push(station);
    //                 });
    //             }
    //         } else {
    //             const province = MAP_PROVINCE.find(x => x.placeId === item.data)
    //             const provinceStation = STATION.find(x => x.id === province.id);
    //             result.push(provinceStation);
    //             if(province.districtIds) {
    //                 province.districtIds.forEach(element => {
    //                     const station = STATION.find(x => x.place_id === element);
    //                     result.push(station);
    //                 });
    //             }
    //         }
    //     });
    //     result = _.uniq(result);

    //     return result;
    // }

    // getDataFromServer(ids) {
    //     let stationId: any = ids;
    //     this.forcastSearchParam = new ForecastSearchParam();
    //     this.forcastSearchParam.stationIds = stationId;
    //     this.forcastSearchParam.fromDate = moment().format("YYYY-MM-DD");
    //     this.forcastSearchParam.toDate = moment().format("YYYY-MM-DD");
    //     this.forcastSearchParam.weatherTypes = [
    //         WEATHER_TYPE.Temperature,
    //         WEATHER_TYPE.Weather
    //     ];

    //     return new Promise((resolve, reject) => {
    //         this.weatherService.getHorizontal(this.forcastSearchParam).then((res: any) => {
    //             let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature);
    //             let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather);

    //             resolve({tempArray, iconArray});
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     })
    // }

    // async prepareData() {
    //     const result = [];
    //     const stations = this.prepareStation();
    //     const data = await this.getDataFromServer(stations.map(x => x.id)) as any;
    //     stations.forEach(element => {
    //         result.push({
    //             ...element,
    //             tempArray: data.tempArray,
    //             iconArray: data.iconArray
    //         })
    //     });
    //     console.log(result);
    // }

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
            this.$toast.success('Xóa kịch bản thành công');
            this.visibleConfirm = false;
            this.fetchNewData();
        }).catch(err => {
            this.$toast.error('Có lỗi khi xóa kịch bản');
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
            this.$toast.success('Lưu kịch bản thành công');
            this.buttonLoading = false;
        }).catch(err => {
            this.$toast.error('Có lỗi khi lưu kịch bản');
            this.buttonLoading = false;
        })
    }

    handleRemoteStart(message) {
        const scenario = this.scenarios.find(x => x.scenarioId === message.scenarioId);
        this.$emit('remote', { message, scenario});
    }

    handleRemoteMove(message) {
        const scenario = this.scenarios.find(x => x.scenarioId === message.scenarioId);
        const step = scenario.scenarioContent[message.step];
        this.$emit('remote-move', { message, step });
    }

    async handleChangeScenario(index) {
        this.selectedItem = index;
        let clear = {timeout: null};
        this.isLoading = true;
        await sleep(500, clear);
        this.makeSortAbleList();
    }

    async makeSortAbleList() {
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
            this.isLoading = false;
        } else {
            this.isLoading = false;
        }
    }

    initData() {
        if (this.scenarios.length > 0) return;
        this.fetchNewData();
    }

    fetchNewData() {
        this.isLoading = true;
        this.scenarios = [];
        this.scenarios.push({
            scenarioName: 'Kịch bản mặc định',
            scenarioId: '0',
            scenarioContent: DEFAULT_SCENARIOS
        });
        this.scenarioService.getAllScenarios(this.searchParams).then(async (res: any) => {
            const sceneArray = res.scenarios.map(x => {
                return {
                    ...x,
                    scenarioContent: JSON.parse(x.scenarioContent)
                }
            })
            this.scenarios = this.scenarios.concat(sceneArray);
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

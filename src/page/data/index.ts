import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import { PROVINCE } from '@/constant/province-constant';
import { MonitoringServices } from '@/service/monitoring-service/monitoring.service';
import { STATION_TYPE } from '@/constant/common-constant';
import moment from 'moment';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class DataPageComponent extends Vue {
    region: string = null;
    allProvinces = PROVINCE;
    province: number = null;
    @LookupAction getLookupData: (type: string) => Promise<void>
    @LookupGetter(lookupTypesStore.Get.KTTV) stations
    monitoringService: MonitoringServices = new MonitoringServices();
    precipitationArray: any = [];
    meteorologicalArray: any = [];
    hydrologicalArray: any = [];
    currentStation: string = null;
    stationConstant = STATION_TYPE;
    fromDateMenu: any = null;
    toDateMenu: any = null;
    fromDate: string = null;
    toDate: string = null;

    allRegions: any = [
        {
            name: "Đông Bắc Bộ",
            value: "DBB"
        },
        {
            name: "Tây Bắc Bộ",
            value: "TBB"
        },
        {
            name: "Đồng bằng sông Hồng",
            value: "DBSH"
        },
        {
            name: "Bắc Trung Bộ",
            value: "BTB"
        },
        {
            name: "Nam Trung Bộ",
            value: "NTB"
        },
        {
            name: "Tây Nguyên",
            value: "TN"
        },
        {
            name: "Đông Nam Bộ",
            value: "DNB"
        },
        {
            name: "Tây Nam Bộ",
            value: "TNB"
        },
    ]

    get ProvincesByRegion() {
        return this.allProvinces.filter(p => p.region === this.region);
    }

    get StationsByProvince() {
        if (!isNaN(Number(this.province)) && this.stations) {
            return this.stations.filter(s => s.zipCode === Number(this.province));
        }
        return [];
    }

    get FormattedFromDate() {
        if (this.fromDate) {
            return moment(this.fromDate).format('DD/MM/YYYY');
        }
        return;
    }

    get FormattedToDate() {
        if (this.toDate) {
            return moment(this.toDate).format('DD/MM/YYYY');
        }
        return;
    }

    getStationData(stationId, stationType) {
        this.currentStation = stationType;

        if (this.fromDate === null) {
            this.fromDate = moment().format('YYYY-MM-DD');
        }

        if (this.toDate === null) {
            this.toDate = moment().format('YYYY-MM-DD');
        }

        if (stationType === this.stationConstant.RAIN_STATION) {
            this.monitoringService.getPrecipitation(10, 1, stationId, this.fromDate, this.toDate)
            .then((res: any) => {
                this.precipitationArray = res.rains;
            }).catch(error => {
                console.log(error);
            })
        } else if (stationType === this.stationConstant.METEOROLOGICAL_STATION) {
            this.monitoringService.getMeteorological(10, 1, stationId, this.fromDate, this.toDate)
            .then((res: any) => {
                this.meteorologicalArray = res.meteorologicals;
            }).catch(error => {
                console.log(error);
            })
        } else if (stationType === this.stationConstant.HYDROLOGICAL_STATION) {
            this.monitoringService.getHydrological(10, 1, stationId, this.fromDate, this.toDate)
            .then((res: any) => {
                this.hydrologicalArray = res.hydrologicals;
            }).catch(error => {
                console.log(error);
            })
        }
    }

    async mounted() {
        this.getLookupData(lookupTypesStore.Set.KTTV);
    }
}

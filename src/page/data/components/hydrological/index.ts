import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import { PROVINCE } from '@/constant/province-constant';
import { MonitoringServices } from '@/service/monitoring-service/monitoring.service';
import { STATION_TYPE } from '@/constant/common-constant';
import moment from 'moment';
import { REGION } from '@/constant/forcast-station-constant';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
    }
})
export default class HydrologicalComponent extends Vue {
    region: string = null;
    allProvinces = PROVINCE;
    province: number = null;
    type: string = null;
    @LookupAction getLookupData: (type: string) => Promise<void>
    @LookupGetter(lookupTypesStore.Get.KTTV) stations
    monitoringService: MonitoringServices = new MonitoringServices();
    precipitationArray: any = [];
    meteorologicalArray: any = [];
    hydrologicalArray: any = [];
    currentStationType: string = null;
    stationConstant = STATION_TYPE;
    fromDateMenu: any = null;
    toDateMenu: any = null;
    fromDate: string = null;
    toDate: string = null;
    totalPages: number = 0;
    page: number = 1;
    currentStationId: any = null;

    activeStation: number = 0;

    types = [
        {
            name: 'Khí tượng',
            value: 0
        },
        {
            name: 'Dự báo thuỷ văn',
            value: 1
        }
    ]
    hydrologicalType: number = 0;

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

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

    stationTypes: any = [
        {
            name: "Tất cả",
            value: null
        },
        {
            name: "Mưa",
            value: STATION_TYPE.RAIN_STATION
        },
        {
            name: "Khí Tượng",
            value: STATION_TYPE.METEOROLOGICAL_STATION
        },
        {
            name: "Thuỷ Văn",
            value: STATION_TYPE.HYDROLOGICAL_STATION
        },
    ]

    get ProvincesByRegion() {
        return this.allProvinces.filter(p => p.region === this.region);
    }

    get StationsByProvince() {
        if (this.region && !this.province) {
            let zipCodes = REGION.find(x => x.placeId === this.region).zipCodes;
            let returnValue: any = [];
            zipCodes.forEach(element => {
                const province = this.stations.filter(s => s.zipCode === Number(element));
                returnValue.push(...province);
            });
            return returnValue;
        }

        if (!isNaN(Number(this.province)) && this.stations) {
            if (this.type !== null) {
                return this.stations.filter(s => s.zipCode === Number(this.province) && s.stationType === this.type);
            }
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

    formatDate(item) {
        return moment(item).format('DD/MM/YYYY');
    }

    handleChangeProvince(value) {
        this.hydrologicalType = 0;
    }

    handleChangeHydrologicalType(value) {
        if(value === 1) {
            this.type = STATION_TYPE.HYDROLOGICAL_STATION;
            this.fromDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
        }
    }

    getStationData(stationId, stationType, index, isPaging) {
        if (!isPaging) {
            this.page = 1;
        }

        this.currentStationId =  stationId;
        this.currentStationType = stationType;
        this.activeStation = index;
        if (this.fromDate === null) {
            this.fromDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
        }

        if (this.toDate === null) {
            this.toDate = moment().format('YYYY-MM-DD');
        }

        if (stationType === this.stationConstant.RAIN_STATION) {
            this.monitoringService.getPrecipitation(10, this.page, stationId, this.fromDate, this.toDate)
            .then((res: any) => {
                this.precipitationArray = res.rains;
                this.totalPages = res.totalPages;
            }).catch(error => {
                console.log(error);
            })
        } else if (stationType === this.stationConstant.METEOROLOGICAL_STATION) {
            this.monitoringService.getMeteorological(10, this.page, stationId, this.fromDate, this.toDate)
            .then((res: any) => {
                this.meteorologicalArray = res.meteorologicals;
                this.totalPages = res.totalPages;
            }).catch(error => {
                console.log(error);
            })
        } else if (stationType === this.stationConstant.HYDROLOGICAL_STATION) {
            if(this.hydrologicalType === 0) {
                this.monitoringService.getHydrological(10, this.page, stationId, this.fromDate, this.toDate)
                    .then((res: any) => {
                        this.hydrologicalArray = res.hydrologicals;
                        this.totalPages = res.totalPages;
                    }).catch(error => {
                        console.log(error);
                    })
            } else {
                this.monitoringService.getHydrologicalForecast(10, this.page, stationId, this.fromDate, this.toDate)
                    .then((res: any) => {
                        this.hydrologicalArray = res.getHydrologicalForecasts[0];
                        this.totalPages = res.totalPages;
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }
    }

    async mounted() {
        this.getLookupData(lookupTypesStore.Set.KTTV);
    }
}

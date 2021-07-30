import { STATION, REGION, WEATHER_TYPE, MAP_PROVINCE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component({
    template: require("./template.html").default,
    components: {
    }
})
export default class WeatherForecastComponent extends Vue {
    @Prop({required: true})
    region

    @Prop({type: Number, default: 500})
    height

    @Prop({type: String, default: null })
    province

    @Prop({ type: Boolean, default: false })
    all

    @Prop({type: Boolean, default: false})
    dummy

    isLoading: boolean = false;
    selectedDateMenu: string = null;
    selectedDate: string = new Date().toISOString().substr(0, 10);

    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();

    data: any = [];

    get title() {
        if(this.all) return 'Tỉnh thành';
        if (this.province) return MAP_PROVINCE.find(x => x.placeId === this.province).name;
        return REGION.find(x => x.placeId === this.region).name;
    }

    get FormattedSelectedDate() {
        if (this.selectedDate) {
            return moment(this.selectedDate).format('DD/MM/YYYY');
        }
        return;
    }

    get CalendarMinDate() {
        return moment().subtract(3, "days").format('YYYY-MM-DD');
    }

    get CalendarMaxDate() {
        return moment().add(3, "days").format('YYYY-MM-DD');
    }

    getRegionStationId() {
        if(this.all) {
            return MAP_PROVINCE.map(x => x.id);
        }
        const regions = REGION.find(x => x.placeId === this.region);
        const stations = [];
        regions.provinceIds.forEach(element => {
            const stationID = MAP_PROVINCE.find(x => x.placeId === element);
            stations.push(stationID.id);
        })
        return stations;
    }

    getProvinceStationId() {
        const province = MAP_PROVINCE.find(x => x.placeId === this.province);
        const stations = [];
        if(!province) {
            return [];
        }
        province.districtIds.forEach(element => {
            const stationID = STATION.find(x => x.place_id === element);
            stations.push(stationID.id);
        });
        return stations;
    }

    transformData(data) {
        // this gives an object with dates as keys
        const groups = data.reduce((groups, station) => {
            const Id = station.stationId
            if (!groups[Id]) {
                groups[Id] = [];
            }
            groups[Id].push(station);
            return groups;
        }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((item) => {
            return {
                id: groups[item][0].stationId,
                data: groups[item]
            };
        });
        const result = []
        this.searchParam.stationIds.forEach((element, index) => {
            const hasData = groupArrays.find(x => x.id === element)
            if(hasData) {
                result.push({
                    StationId: hasData.id,
                    Name: STATION.find(x => x.id === hasData.id).ten,
                    Temprature: {
                        min: hasData.data.find(x => x.weatherType === WEATHER_TYPE.Temperature).minValue,
                        max: hasData.data.find(x => x.weatherType === WEATHER_TYPE.Temperature).maxValue
                    },
                    Humidity: {
                        min: hasData.data.find(x => x.weatherType === WEATHER_TYPE.Humidity).minValue,
                        max: hasData.data.find(x => x.weatherType === WEATHER_TYPE.Humidity).maxValue
                    },
                    WindLevel: {
                        min: hasData.data.find(x => x.weatherType === WEATHER_TYPE.WindLevel).minValue,
                        max: hasData.data.find(x => x.weatherType === WEATHER_TYPE.WindLevel).maxValue
                    },
                    WindSpeed: {
                        min: hasData.data.find(x => x.weatherType === WEATHER_TYPE.WindSpeed).minValue,
                        max: hasData.data.find(x => x.weatherType === WEATHER_TYPE.WindSpeed).maxValue
                    },
                    RainAmount: {
                        min: hasData.data.find(x => x.weatherType === WEATHER_TYPE.RainAmount).minValue,
                        max: hasData.data.find(x => x.weatherType === WEATHER_TYPE.RainAmount).maxValue
                    }
                })
            } else {
                result.push(this.getDummyData(element));
            }
        })
        return result;
    }

    getDummyData(element) {
        return {
            StationId: element,
            Name: MAP_PROVINCE.find(x => x.id === element).name,
            Temprature: {
                min: this.getRandomArbitrary(20, 25),
                max: this.getRandomArbitrary(30, 35),
            },
            Humidity: {
                min: this.getRandomArbitrary(0, 50),
                max: this.getRandomArbitrary(50, 100),
            },
            WindLevel: {
                min: this.getRandomArbitrary(0, 5),
                max: this.getRandomArbitrary(5, 10),
            },
            WindSpeed: {
                min: 0,
                max: this.getRandomArbitrary(0, 5),
            },
            RainAmount: {
                min: 0,
                max: this.getRandomArbitrary(0, 5),
            }
        }
    }

    getRandomArbitrary(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    getDetail() {
        this.isLoading = true;
        if (this.selectedDate) {
            this.searchParam.fromDate = moment(this.selectedDate).format();
            this.searchParam.toDate = moment(this.selectedDate).add(1, 'days').subtract(1, 'minutes').format();
        }

        this.weatherService.getDetail(this.searchParam).then((res: any) => {
            const data = this.transformData(res.weatherInformationByStations);
            this.data = data;
            this.isLoading = false;
        }).catch(err => {
            this.$errorMessage(err);
            this.isLoading = false;
        });
    }

    mounted() {
        if(this.province) {
            this.searchParam.stationIds = this.getProvinceStationId();
        } else {
            this.searchParam.stationIds = this.getRegionStationId();
        }
        this.getDetail();
    }
}

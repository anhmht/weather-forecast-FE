import { STATION, REGION, WEATHER_TYPE, MAP_PROVINCE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';


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

    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();

    data: any = [];

    get title() {
        if (this.province) return MAP_PROVINCE.find(x => x.placeId === this.province).name;
        return REGION.find(x => x.placeId === this.region).name;
    }

    getRegionStationId() {
        const regions = REGION.find(x => x.placeId === this.region);
        const stations = [];
        regions.provinceIds.forEach(element => {
            const stationID = STATION.find(x => x.place_id === element);
            if(stationID) {
                stations.push(stationID.id);
            }
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
            if (stationID) {
                stations.push(stationID.id);
            }
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
        groupArrays.forEach((element, index) => {
            result.push({
                StationId: element.id,
                Name: STATION.find(x => x.id === element.id).ten,
                Temprature: {
                    min: element.data.find(x => x.weatherType === WEATHER_TYPE.Temperature).minValue,
                    max: element.data.find(x => x.weatherType === WEATHER_TYPE.Temperature).maxValue
                },
                Humidity: {
                    min: element.data.find(x => x.weatherType === WEATHER_TYPE.Humidity).minValue,
                    max: element.data.find(x => x.weatherType === WEATHER_TYPE.Humidity).maxValue
                },
                WindLevel: {
                    min: element.data.find(x => x.weatherType === WEATHER_TYPE.WindLevel).minValue,
                    max: element.data.find(x => x.weatherType === WEATHER_TYPE.WindLevel).maxValue
                },
                WindSpeed: {
                    min: element.data.find(x => x.weatherType === WEATHER_TYPE.WindSpeed).minValue,
                    max: element.data.find(x => x.weatherType === WEATHER_TYPE.WindSpeed).maxValue
                },
                RainAmount: {
                    min: element.data.find(x => x.weatherType === WEATHER_TYPE.RainAmount).minValue,
                    max: element.data.find(x => x.weatherType === WEATHER_TYPE.RainAmount).maxValue
                }
            })
        });
        return result;
    }

    getDummyData(all: boolean = false) {
        const regions = REGION.find(x => x.placeId === this.region);
        let stations = [];

        if (all) {
            stations = MAP_PROVINCE;
        } else {
            regions.provinceIds.forEach(element => {
                const dummy = MAP_PROVINCE.find(x => x.placeId === element);
                if (dummy) {
                    stations.push(dummy);
                }
            })
        }

        const result = []
        stations.forEach(element => {
            result.push({
                StationId: element.placeId,
                Name: element.name,
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
            })
        });
        return result;
    }

    getRandomArbitrary(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    mounted() {
        if(this.dummy) {
            this.data = this.getDummyData(this.all);
            return;
        }

        this.isLoading = true;
        if(this.province) {
            this.searchParam.stationIds = this.getProvinceStationId();
        } else {
            this.searchParam.stationIds = this.getRegionStationId();
        }
        if (this.searchParam.stationIds.length === 0) return;
        this.weatherService.getDetail(this.searchParam).then((res: any) => {
            const data = this.transformData(res.weatherInformationByStations);
            this.data = data;
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }
}

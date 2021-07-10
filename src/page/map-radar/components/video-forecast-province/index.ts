import { sleep } from './../../../../utils/common-utils';
import { ICON } from './../../../../constant/icon-constant';
import { DataHelper } from './../../../../utils/data-helper';
import { REGION, STATION, WEATHER_TYPE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import moment from 'moment';
import { Prop } from 'vue-property-decorator';

@Component({
    // template: require("./template.html").default,
    components: {},
    render: function (createElement) {
        if (!this.template) {
            return createElement("span", "Loading...");
        } else {
            return this.template();
        }
    },
    created() {
        switch (this.templateType) {
            case '3-3':
                this.template = Vue.compile(require("./template_3-3.html").default).render;
                break;
            case '4-5':
                this.template = Vue.compile(require("./template_4-5.html").default).render;
                break;
            case '4-4':
                this.template = Vue.compile(require("./template_4-4.html").default).render;
                break;
            case '4-4-5':
                this.template = Vue.compile(require("./template_4-4-5.html").default).render;
                break;
            case 'default':
            default:
                this.template = Vue.compile(require("./template.html").default).render;
                break;
        }
    }
})
export default class VideoForecastComponent extends Vue {
    @Prop({required: true})
    location

    @Prop({ required: true })
    isProvince

    @Prop({ type: String, default: 'default' })
    templateType

    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();
    forecastData: any = []

    getStationIdByRegion(regionCode) {
        const foundRegion = REGION.find(x => x.placeId === regionCode);
        if (foundRegion) {
            const provinceId = foundRegion.provinceIds;
            let stationId: any = [];
            for (let i = 0; i < provinceId.length; i++) {
                const foundStation = STATION.find(x => x.place_id === provinceId[i]);
                if (foundStation) {
                    stationId.push(foundStation.id);
                }
            }
            return stationId;
        }
        return;
    }

    getStationIdByProvince(ids) {
        let stationId: any = [];
        for (const element of ids) {
            const station = STATION.find(x => x.place_id === element);
            if (station) {
                stationId.push(station.id);
            }
        }
        return stationId;
    }

    getHorizontal(stationId) {
        this.searchParam = new ForecastSearchParam();
        if (Array.isArray(stationId)) {
            this.searchParam.stationIds = stationId;
        } else {
            this.searchParam.stationIds = [stationId];
        }
        this.searchParam.fromDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.toDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Weather,
            WEATHER_TYPE.Temperature
        ];

        return new Promise((resolve, reject) => {
            this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
                let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature);
                let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather);

                resolve({ iconArray, tempArray });
            }).catch(err => {
                console.log(err);
            })
        })
    }

    getMinMaxData(inputData) {
        let filteredData: number[] = [];
        let min: number = null;
        let max: number = null;

        for (let i = 0; i < inputData.length; i++) {
            const currentElement = inputData[i];
            let hours = Object.keys(currentElement).filter(x => x.includes('_'));
            hours = hours.sort((a, b) => {
                return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
            });
            for (let j = 0; j < 24; j++) {
                filteredData.push(currentElement[hours[j]]);
            }
        }
        min = Math.min(...filteredData);
        max = Math.max(...filteredData);

        return { min, max };
    }

    getDisplayData(data, date, time) {
        return DataHelper.getDataByDateHour(data, date, time);
    }

    mounted() {
        let ids = this.isProvince ? this.getStationIdByProvince(this.location) : this.getStationIdByRegion(this.location)
        this.getHorizontal(ids).then(async (res: any) => {
            const tempArray = res.tempArray;
            const iconArray = res.iconArray;

            for (const element of ids) {
                const station = STATION.find(x => x.id === element);
                if (station) {
                    const contextTemp = tempArray.find(x => x.stationId === station.id);
                    const contextIcon = iconArray.find(x => x.stationId === station.id);
                    const temp = this.getDisplayData(contextTemp, 0, moment().hour())
                    const icon = this.getDisplayData(contextIcon, 0, moment().hour())
                    const iconUrl = ICON.find(x => x.id === icon)
                    this.forecastData.push({
                        icon: iconUrl.url,
                        desc: iconUrl.description,
                        name: station.ten,
                        temp,
                        tempRange: this.getMinMaxData(contextTemp)
                    })
                    let clear = { timeout: null };
                    await sleep(500, clear);
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

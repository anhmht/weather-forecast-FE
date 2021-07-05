import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { WeatherServices } from '@/service/weather-service/weather.service';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast/forecast.model';
import moment from 'moment';
import { REGION, STATION, WEATHER_TYPE, WIND_DIRECTION } from '@/constant/forcast-station-constant';
import { DataHelper } from '@/utils/data-helper';
import { ICON } from '@/constant/icon-constant';

@Component({
    template: require("./template.html").default,

})
export default class ForecastItemComponent extends Vue {
    @Prop({type: String, default: null})
    title

    @Prop({type: String, default: null})
    desc

    @Prop({type: String, default: null})
    icon

    @Prop({type: String, default: null})
    region

    @Prop({type: String, default: null})
    currentPosition

    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();

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

    getStationIdByPosition(positionName) {
        const foundStation = STATION.find(x => x.ten === positionName);
        if (foundStation) {
            return foundStation.id;
        }

        return;
    }

    getMostFrequentData(inputData, type) {
        if (type === WEATHER_TYPE.Weather) {
            let filteredDayData: string[] = [];
            let filteredNightData: string[] = [];
            let mostFreqDay: string = null;
            let mostFreqNight: string = null;

            for (let i = 0; i < inputData.length; i++) {
                const currentElement = inputData[i];
                let hours = Object.keys(currentElement).filter(x => x.includes('_'));
                hours = hours.sort((a,b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
                for (let j = 0; j < 48; j++) {
                    if ((j >= 6 && j <= 18) || (j >= 30 && j <= 42)) {
                        filteredDayData.push(currentElement[hours[j]]);
                    }
                    else {
                        filteredNightData.push(currentElement[hours[j]]);
                    }
                }
            }
            mostFreqDay = DataHelper.getMostFrequentByHorizontal(filteredDayData);
            mostFreqNight = DataHelper.getMostFrequentByHorizontal(filteredNightData);

            return {mostFreqDay, mostFreqNight};
        } else {
            let filteredData: any = [];
            let mostFreqData: any = null;

            for (let i = 0; i < inputData.length; i++) {
                const currentElement = inputData[i];
                let hours = Object.keys(currentElement).filter(x => x.includes('_'));
                hours = hours.sort((a,b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
                for (let j = 0; j < 48; j++) {
                    filteredData.push(currentElement[hours[j]]);
                }
            }
            mostFreqData = DataHelper.getMostFrequentByHorizontal(filteredData);

            return mostFreqData;
        }
    }

    getMinMaxData(inputData) {
        let filteredData: number[] = [];
        let min: number = null;
        let max: number = null;

        for (let i = 0; i < inputData.length; i++) {
            const currentElement = inputData[i];
            let hours = Object.keys(currentElement).filter(x => x.includes('_'));
            hours = hours.sort((a,b) => {
                return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
            });
            for (let j = 0; j < 48; j++) {
                filteredData.push(currentElement[hours[j]]);
            }
        }
        min = Math.min(...filteredData);
        max = Math.max(...filteredData);

        return {min, max};
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
            WEATHER_TYPE.WindDirection,
            WEATHER_TYPE.WindRank,
            WEATHER_TYPE.Temperature
        ];

        return new Promise((resolve, reject) => {
            this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
                let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather && x.refDate === this.searchParam.fromDate);
                let windDirArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindDirection && x.refDate === this.searchParam.fromDate);
                let windRankArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindRank && x.refDate === this.searchParam.fromDate);
                let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature && x.refDate === this.searchParam.fromDate);

                let mostFreqIcon = this.getMostFrequentData(iconArray, WEATHER_TYPE.Weather);
                let mostFreqWindDir = this.getMostFrequentData(windDirArray, WEATHER_TYPE.WindDirection);
                let mostFreqWindRank = this.getMostFrequentData(windRankArray, WEATHER_TYPE.WindRank);
                let tempRange = this.getMinMaxData(tempArray);

                resolve({mostFreqIcon, mostFreqWindDir, mostFreqWindRank, tempRange});
            }).catch(err => {
                console.log(err);
            })
        })
    }

    mounted() {
        const currentHour = new Date().getHours();
        let iconDay = null;
        let iconNight = null;
        let iconDayUrl = null;
        let iconNightUrl = null;
        let weatherDescDay = null;
        let weatherDescNight = null;
        let windDir = null;
        let stationId = null;

        if (this.region) {
            stationId = this.getStationIdByRegion(this.region);
        } else if (this.currentPosition) {
            stationId = this.getStationIdByPosition(this.currentPosition);
        }

        this.getHorizontal(stationId).then((res: any) => {
            iconDay = ICON.find(x => x.id === res.mostFreqIcon.mostFreqDay);
            if (iconDay) {
                iconDayUrl = iconDay.url;
                weatherDescDay = iconDay.description;
            }

            iconNight = ICON.find(x => x.id === res.mostFreqIcon.mostFreqNight);
            if (iconNight) {
                iconNightUrl = iconNight.url;
                weatherDescNight = iconNight.description;
            }

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.icon = iconDayUrl;
            } else {
                this.icon = iconNightUrl;
            }
            this.desc = weatherDescDay + ". " + weatherDescNight
                + ". Hướng gió " + windDir + ", " + res.mostFreqWindRank + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })
    }
}

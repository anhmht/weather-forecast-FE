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
    template: require("./template.html").default,
    components: {}
})
export default class VideoForecastComponent extends Vue {
    @Prop({required: true})
    location

    @Prop({required: true})
    isProvince

    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();
    forecastData: any = {}

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

    getStationIdByProvince(regionCode) {
        const station = STATION.find(x => x.place_id === regionCode);
        if (station) {
            return station.id;
        }
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
                let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather && x.refDate === this.searchParam.fromDate);
                let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature && x.refDate === this.searchParam.fromDate);
                let mostFreqIcon = {}
                if(!this.isProvince) {
                    mostFreqIcon = this.getMostFrequentData(iconArray, WEATHER_TYPE.Weather);
                }

                let tempRange = this.getMinMaxData(tempArray);

                resolve({ mostFreqIcon, tempRange, iconArray, tempArray });
            }).catch(err => {
                console.log(err);
            })
        })
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
                hours = hours.sort((a, b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
                for (let j = 0; j < 24; j++) {
                    if (j >= 6 && j <= 18) {
                        filteredDayData.push(currentElement[hours[j]]);
                    }
                    else {
                        filteredNightData.push(currentElement[hours[j]]);
                    }
                }
            }
            mostFreqDay = DataHelper.getMostFrequentByHorizontal(filteredDayData);
            mostFreqNight = DataHelper.getMostFrequentByHorizontal(filteredNightData);

            return { mostFreqDay, mostFreqNight };
        }
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
            for (let j = 0; j < 48; j++) {
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
        const currentHour = new Date().getHours();
        let iconDay = null;
        let iconNight = null;
        let iconDayUrl = null;
        let iconNightUrl = null;
        let weatherDescDay = null;
        let weatherDescNight = null;
        console.log(this.location);
        let location = this.isProvince ? this.getStationIdByProvince(this.location) : this.getStationIdByRegion(this.location)
        this.getHorizontal(location).then((res: any) => {
            if(!this.isProvince) {
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

                if (currentHour >= 6 && currentHour <= 18) {
                    this.forecastData = { ...this.forecastData, icon: iconDayUrl };
                } else {
                    this.forecastData = { ...this.forecastData, icon: iconNightUrl };
                }
                this.forecastData = {
                    ...this.forecastData, desc: weatherDescDay + ".<br/> " + weatherDescNight + ".<br/>"
                        + "Nhiệt độ thấp nhất: " + res.tempRange.min + " ℃.<br/>"
                        + "Nhiệt độ cao nhất: " + res.tempRange.max + " ℃.<br/>"
                };
            } else {
                const contextIcon = res.iconArray.find(x => x.stationId === location);
                const icon = this.getDisplayData(contextIcon, 0, moment().hour())
                const iconUrl = ICON.find(x => x.id === icon)
                this.forecastData = {
                    ...this.forecastData,
                    icon: iconUrl.url,
                    desc: iconUrl.description + ".<br/> "
                        + "Nhiệt độ thấp nhất: " + res.tempRange.min + " ℃.<br/>"
                        + "Nhiệt độ cao nhất: " + res.tempRange.max + " ℃.<br/>"
                };
            }


        }).catch(err => {
            console.log(err);
        })
    }
}

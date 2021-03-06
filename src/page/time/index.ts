import Vue from "vue";
import Component from "vue-class-component";
import { displayLocation } from "@/utils/location-helper";
import { DataHelper } from "@/utils/data-helper";
import { STATION } from "../../constant/forcast-station-constant";
import { DATE } from "@/constant/common-constant";
import { ICON } from '@/constant/icon-constant';
import { ForecastServices } from "../../service/forecast-service/forecast.service";
import moment from "moment";
import 'moment/locale/vi';
import { WeatherServices } from '@/service/weather-service/weather.service';
import { WEATHER_TYPE, WIND_DIRECTION } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        "weather-24h": () => import("./components/weather-forcast-24h/WeatherForecast24hComponent.vue")
    }
})
export default class TimePageComponent extends Vue {
    currentPosition: string = "";
    currentPositionCode: string = "";
    currentForecastStationId: string = "";
    currentDay: string = "";
    currentDate: string = "";
    currentTemp: number = 0;
    currentIcon: string = "";
    currentDayMinTemp: number = 0;
    currentDayMaxTemp: number = 0;
    currentDayMinPrecip: number = 0;
    currentDayMaxPrecip: number = 0;
    currentDayMinWindLvl: number = 0;
    currentDayMaxWindLvl: number = 0;
    currentDayMinWindSpd: number = 0;
    currentDayMaxWindSpd: number = 0;
    currentDayWindDir: string = "";
    currentDayMinHumid: number = 0;
    currentDayMaxHumid: number = 0;
    forecastService: ForecastServices = new ForecastServices();
    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();

    weatherByDay: any = [];
    weatherByHour: any = [];
    tempMinMaxByDay: any = [];
    precipMinMaxByDay: any = [];
    windLvlMinMaxByDay: any = [];
    windSpdMinMaxByDay: any = [];
    humidMinMaxByDay: any = [];
    iconByDay: any = [];
    windDirByDay: any = [];
    tempByHour: any = [];
    precipByHour: any = [];
    windLvlByHour: any = [];
    windSpdByHour: any = [];
    windDirByHour: any = [];
    humidByHour: any = [];
    iconByHour: any = [];
    activeTab: number = 1
    // step: number = 0;

    // handleTest() {
    //     const message = {
    //         event: 'START',
    //         scenarioId: 'c2257428-6c24-4957-778e-08d94d39a34a',

    //     }
    //     this.$socket.sendMessage(JSON.stringify(message));
    // }

    // handleMove() {
    //     const message = {
    //         event: 'MOVE',
    //         scenarioId: 'c2257428-6c24-4957-778e-08d94d39a34a',
    //         requestID: '123',
    //         step: this.step
    //     }
    //     this.step += 1;
    //     this.$socket.sendMessage(JSON.stringify(message));
    // }

    handleChangeTab(tab) {
        this.activeTab = tab;
    }

    getHorizontal() {
        this.searchParam = new ForecastSearchParam();
        this.searchParam.stationIds = [this.currentForecastStationId];
        this.searchParam.fromDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.toDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Humidity,
            WEATHER_TYPE.WindLevel,
            WEATHER_TYPE.Temperature,
            WEATHER_TYPE.WindSpeed,
            WEATHER_TYPE.RainAmount,
            WEATHER_TYPE.WindDirection,
            WEATHER_TYPE.Weather
        ];

        this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
            let humidArray = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.Humidity && x.refDate === this.searchParam.fromDate);
            let windLvlArray = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.WindLevel && x.refDate === this.searchParam.fromDate);
            let tempArray = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.Temperature && x.refDate === this.searchParam.fromDate);
            let windSpdArray = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.WindSpeed && x.refDate === this.searchParam.fromDate);
            let rainAmtArray = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.RainAmount && x.refDate === this.searchParam.fromDate);
            let windDirArray = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.WindDirection && x.refDate === this.searchParam.fromDate);
            let iconArray = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.Weather && x.refDate === this.searchParam.fromDate);

            this.currentTemp = DataHelper.getDataByHour(tempArray, 0);
            const dataByHour = DataHelper.getDataByHour(iconArray, 0);
            const icon = ICON.find(x => x.id === dataByHour);
            if (icon) {
                this.currentIcon = icon.url;
            }

            this.getDataByHour(humidArray, this.humidByHour, WEATHER_TYPE.Humidity);
            this.getDataByHour(windLvlArray, this.windLvlByHour, WEATHER_TYPE.WindLevel);
            this.getDataByHour(tempArray, this.tempByHour, WEATHER_TYPE.Temperature);
            this.getDataByHour(windSpdArray, this.windSpdByHour, WEATHER_TYPE.WindSpeed);
            this.getDataByHour(rainAmtArray, this.precipByHour, WEATHER_TYPE.RainAmount);
            this.getDataByHour(windDirArray, this.windDirByHour, WEATHER_TYPE.WindDirection);
            this.getDataByHour(iconArray, this.iconByHour, WEATHER_TYPE.Weather);

            this.displayWeatherByHour();
        }).catch(err => {
            this.$errorMessage(err);
        });
    }

    getDetail() {
        this.searchParam = new ForecastSearchParam();
        this.searchParam.stationIds = [this.currentForecastStationId];
        this.searchParam.fromDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.toDate = moment(this.searchParam.fromDate).add(5, 'days').subtract(1, 'minutes').format();
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Humidity,
            WEATHER_TYPE.WindLevel,
            WEATHER_TYPE.Temperature,
            WEATHER_TYPE.WindSpeed,
            WEATHER_TYPE.RainAmount,
            WEATHER_TYPE.WindDirection,
            WEATHER_TYPE.Weather
        ];

        this.weatherService.getDetail(this.searchParam).then((res: any) => {
            let humidArray = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.Humidity);
            let windLvlArray = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.WindLevel);
            let tempArray = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.Temperature);
            let windSpdArray = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.WindSpeed);
            let rainAmtArray = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.RainAmount);
            let windDirArray = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.WindDirection);
            let iconArray = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.Weather);

            this.getMinMaxByDay(humidArray, this.humidMinMaxByDay);
            this.getMinMaxByDay(windLvlArray, this.windLvlMinMaxByDay);
            this.getMinMaxByDay(tempArray, this.tempMinMaxByDay);
            this.getMinMaxByDay(windSpdArray, this.windSpdMinMaxByDay);
            this.getMinMaxByDay(rainAmtArray, this.precipMinMaxByDay);
            this.getMostFrequentByDay(windDirArray, this.windDirByDay, WEATHER_TYPE.WindDirection);
            this.getMostFrequentByDay(iconArray, this.iconByDay, WEATHER_TYPE.Weather);

            this.displayWeatherByDay();
        }).catch(err => {
            this.$errorMessage(err);
        });
    }

    getMinMaxByDay(data, result) {
        for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
            result.push({
                min: data.weatherInformationByDays[i].minValue,
                max: data.weatherInformationByDays[i].maxValue
            });
        }
    }

    getMostFrequentByDay(data, result, weatherType) {
        for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
            if (data.weatherInformationByDays[i].weatherInformationByHours.length > 0) {
                const mostFrequent = DataHelper.getMostFrequent(data.weatherInformationByDays[i].weatherInformationByHours, weatherType);

                if (weatherType === WEATHER_TYPE.Weather) {
                    const icon = ICON.find(x => x.id === mostFrequent)
                    if (icon) {
                        result.push({
                            data: icon.url
                        });
                    }
                } else {
                    result.push({
                        data: mostFrequent
                    });
                }
            }
        }
    }

    getDataByHour(data, result, weatherType) {
        for (let i = 0; i <= 24; i++) {
            if (weatherType === WEATHER_TYPE.Weather) {
                const dataByHour = DataHelper.getDataByHour(data, i);
                const icon = ICON.find(x => x.id === dataByHour)

                if (icon) {
                    result.push({
                        data: icon.url
                    });
                }
            } else {
                result.push({
                    data: DataHelper.getDataByHour(data, i)
                });
            }
        }
    }

    displayWeatherByDay() {
        this.currentDay = moment().format('dddd');
        this.currentDate = moment().format('L');
        this.currentDayMinHumid = this.humidMinMaxByDay[0].min;
        this.currentDayMaxHumid = this.humidMinMaxByDay[0].max;
        this.currentDayMinWindLvl = this.windLvlMinMaxByDay[0].min;
        this.currentDayMaxWindLvl = this.windLvlMinMaxByDay[0].max;
        this.currentDayMinTemp = this.tempMinMaxByDay[0].min;
        this.currentDayMaxTemp = this.tempMinMaxByDay[0].max;
        this.currentDayMinWindSpd = this.windSpdMinMaxByDay[0].min;
        this.currentDayMaxWindSpd = this.windSpdMinMaxByDay[0].max;
        this.currentDayMinPrecip = this.precipMinMaxByDay[0].min;
        this.currentDayMaxPrecip = this.precipMinMaxByDay[0].max;
        this.currentDayWindDir = WIND_DIRECTION[this.windDirByDay[0].data].abbr;

        for (let i = DATE.NEXT_DAY; i <= DATE.NEXT_4_DAY; i++) {
            if (this.iconByDay[i] !== undefined && this.windDirByDay[i] !== undefined) {
                this.weatherByDay.push({
                    day: moment().add(i, 'days').format('dddd'),
                    icon: this.iconByDay[i].data,
                    temp: this.tempMinMaxByDay[i].min + '??C - ' + this.tempMinMaxByDay[i].max + '??C',
                    precip: this.precipMinMaxByDay[i].min + ' - ' + this.precipMinMaxByDay[i].max + ' mm',
                    windLvl: this.windLvlMinMaxByDay[i].min + ' - ' + this.windLvlMinMaxByDay[i].max + ' m/s',
                    windSpd: this.windSpdMinMaxByDay[i].min + ' - ' + this.windSpdMinMaxByDay[i].max + ' m/s',
                    humid: this.humidMinMaxByDay[i].min + '% - ' + this.humidMinMaxByDay[i].max + '%',
                    windDir: WIND_DIRECTION[this.windDirByDay[i].data].abbr
                });
            }
        }
    }

    displayWeatherByHour() {
        for (let i = 0; i < 24; i++) {
            this.weatherByHour.push({
                time: DataHelper.getDisplayHour(i),
                date: moment().add(i, 'hours').format('DD/MM'),
                icon: this.iconByHour[i].data,
                temp: this.tempByHour[i].data,
                precip: this.precipByHour[i].data,
                windLvl: this.windLvlByHour[i].data,
                windSpd: this.windSpdByHour[i].data,
                humid: this.humidByHour[i].data,
                windDir: WIND_DIRECTION[this.windDirByHour[i].data].abbr,
            });
        }
    }

    async mounted() {
        await displayLocation();
        this.currentPositionCode = JSON.parse(sessionStorage.getItem('position')).regionCode;
        STATION.forEach((element) => {
            if (element.place_id === this.currentPositionCode) {
                this.currentForecastStationId = element.id;
                this.currentPosition = element.ten;
            }
        });

        this.getHorizontal();
        this.getDetail();
    }

}

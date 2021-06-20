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
import { WEATHER_TYPE } from '@/constant/forcast-station-constant';
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
    handleChangeTab(tab) {
        this.activeTab = tab;
    }

    getHorizontal() {
        this.searchParam = new ForecastSearchParam();
        this.searchParam.stationIds = [this.currentForecastStationId];
        this.searchParam.fromDate = moment().format("YYYY-MM-DD");
        this.searchParam.toDate = moment(this.searchParam.fromDate).add(1, 'days').subtract(1, 'minutes').format();
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
            let humidArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Humidity);
            let windLvlArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindLevel);
            let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature);
            let windSpdArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindSpeed);
            let rainAmtArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.RainAmount);
            let windDirArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindDirection);
            let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather);

            this.currentTemp = DataHelper.getDataByHour(tempArray[0], 0);
            const dataByHour = DataHelper.getDataByHour(iconArray[0], 0);
            const icon = ICON.find(x => x.id === dataByHour);
            if (icon) {
                this.currentIcon = icon.url;
            }

            this.getDataByHour(humidArray[0], this.humidByHour, WEATHER_TYPE.Humidity);
            this.getDataByHour(windLvlArray[0], this.windLvlByHour, WEATHER_TYPE.WindLevel);
            this.getDataByHour(tempArray[0], this.tempByHour, WEATHER_TYPE.Temperature);
            this.getDataByHour(windSpdArray[0], this.windSpdByHour, WEATHER_TYPE.WindSpeed);
            this.getDataByHour(rainAmtArray[0], this.precipByHour, WEATHER_TYPE.RainAmount);
            this.getDataByHour(windDirArray[0], this.windDirByHour, WEATHER_TYPE.WindDirection);
            this.getDataByHour(iconArray[0], this.iconByHour, WEATHER_TYPE.Weather);

            this.displayWeatherByHour();
        }).catch(err => {
            console.log(err);
        });
    }

    getDetail() {
        this.searchParam = new ForecastSearchParam();
        this.searchParam.stationIds = [this.currentForecastStationId];
        this.searchParam.fromDate = moment().format("YYYY-MM-DD");
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
            let humidArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.Humidity);
            let windLvlArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.WindLevel);
            let tempArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.Temperature);
            let windSpdArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.WindSpeed);
            let rainAmtArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.RainAmount);
            let windDirArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.WindDirection);
            let iconArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.Weather);

            this.getMinMaxByDay(humidArray[0], this.humidMinMaxByDay);
            this.getMinMaxByDay(windLvlArray[0], this.windLvlMinMaxByDay);
            this.getMinMaxByDay(tempArray[0], this.tempMinMaxByDay);
            this.getMinMaxByDay(windSpdArray[0], this.windSpdMinMaxByDay);
            this.getMinMaxByDay(rainAmtArray[0], this.precipMinMaxByDay);
            this.getMostFrequentByDay(windDirArray[0], this.windDirByDay, WEATHER_TYPE.WindDirection);
            this.getMostFrequentByDay(iconArray[0], this.iconByDay, WEATHER_TYPE.Weather);

            this.displayWeatherByDay();
        }).catch(err => {
            console.log(err);
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
        this.currentDayWindDir = this.windDirByDay[0].data;

        for (let i = DATE.NEXT_DAY; i <= DATE.NEXT_4_DAY; i++) {
            this.weatherByDay.push({
                day: moment().add(i, 'days').format('dddd'),
                icon: this.iconByDay[i].data,
                temp: this.tempMinMaxByDay[i].min + '°C - ' + this.tempMinMaxByDay[i].max + '°C',
                precip: this.precipMinMaxByDay[i].min + ' - ' + this.precipMinMaxByDay[i].max + ' mm',
                windLvl: this.windLvlMinMaxByDay[i].min + ' - ' + this.windLvlMinMaxByDay[i].max,
                windSpd: this.windSpdMinMaxByDay[i].min + ' - ' + this.windSpdMinMaxByDay[i].max + ' m/s',
                humid: this.humidMinMaxByDay[i].min + '% - ' + this.humidMinMaxByDay[i].max + '%',
                windDir: this.windDirByDay[i].data
            });
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
                windDir: this.windDirByHour[i].data,
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

        /* await this.forecastService.getMinMaxTemperatureByStation(this.currentForecastStationId)
        .then((res: any) => {
            this.currentDayMinTemp = res.temperatureByDays[0].temperatureMin;
            this.currentDayMaxTemp = res.temperatureByDays[0].temperatureMax;

            for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
                this.tempMinMaxByDay.push({
                    min: res.temperatureByDays[i].temperatureMin,
                    max: res.temperatureByDays[i].temperatureMax
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        await this.forecastService.getMinMaxPrecipitationByStation(this.currentForecastStationId)
        .then((res: any) => {
            this.currentDayMinPrecip = res.rainAmountByDays[0].rainAmountMin;
            this.currentDayMaxPrecip = res.rainAmountByDays[0].rainAmountMax;

            for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
                this.precipMinMaxByDay.push({
                    min: res.rainAmountByDays[i].rainAmountMin,
                    max: res.rainAmountByDays[i].rainAmountMax
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        await this.forecastService.getMinMaxWindLevelByStation(this.currentForecastStationId)
        .then((res: any) => {
            this.currentDayMinWindLvl = res.windLevelByDays[0].windLevelMin;
            this.currentDayMaxWindLvl = res.windLevelByDays[0].windLevelMax;

            for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
                this.windLvlMinMaxByDay.push({
                    min: res.windLevelByDays[i].windLevelMin,
                    max: res.windLevelByDays[i].windLevelMax
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        await this.forecastService.getMinMaxWindSpeedByStation(this.currentForecastStationId)
        .then((res: any) => {
            this.currentDayMinWindSpd = res.windSpeedByDays[0].windSpeedMin;
            this.currentDayMaxWindSpd = res.windSpeedByDays[0].windSpeedMax;

            for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
                this.windSpdMinMaxByDay.push({
                    min: res.windSpeedByDays[i].windSpeedMin,
                    max: res.windSpeedByDays[i].windSpeedMax
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        await this.forecastService.getMinMaxHumidityByStation(this.currentForecastStationId)
        .then((res: any) => {
            this.currentDayMinHumid = res.humidityByDays[0].humidityMin;
            this.currentDayMaxHumid = res.humidityByDays[0].humidityMax;

            for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
                this.humidMinMaxByDay.push({
                    min: res.humidityByDays[i].humidityMin,
                    max: res.humidityByDays[i].humidityMax
                });
            }
        })
        .catch(error => {
            console.log(error);
        })

        await this.forecastService.getIconWeather(this.currentForecastStationId)
        .then((res: any) => {
            for (let i = DATE.CURRENT; i <= DATE.NEXT_4_DAY; i++) {
                const mostFrequentIcon = DataHelper.getMostFrequentIcon(res, i);
                const icon = ICON.find(x => x.id === mostFrequentIcon)

                if (icon) {
                    this.iconByDay.push({
                        icon: icon.url
                    });
                }
            }

            for (let i = 0; i < 24; i++) {
                const dataByHour = DataHelper.getDataByHour(res, i);
                const icon = ICON.find(x => x.id === dataByHour)

                if (icon) {
                    this.iconByHour.push({
                        icon: icon.url
                    });

                    if (i == 0) {
                        this.currentIcon = icon.url;
                    }
                }
            }
        }).catch(error => {
            console.log(error);
        })

        for (let i = DATE.NEXT_DAY; i <= DATE.NEXT_4_DAY; i++) {
            this.weatherByDay.push({
                day: moment().add(i, 'days').format('dddd'),
                imageUrl: this.iconByDay[i].icon,
                temp: this.tempMinMaxByDay[i].min + '°C - ' + this.tempMinMaxByDay[i].max + '°C',
                precip: this.precipMinMaxByDay[i].min + ' - ' + this.precipMinMaxByDay[i].max + ' mm',
                windLvl: this.windLvlMinMaxByDay[i].min + ' - ' + this.windLvlMinMaxByDay[i].max,
                windSpd: this.windSpdMinMaxByDay[i].min + ' - ' + this.windSpdMinMaxByDay[i].max + ' m/s',
                humid: this.humidMinMaxByDay[i].min + '% - ' + this.humidMinMaxByDay[i].max + '%'
            });
        }

        await this.forecastService.getTemperatureByStation(this.currentForecastStationId)
        .then((res: any) => {
            this.currentTemp = DataHelper.getDataByHour(res, 0);

            for (let i = 0; i < 24; i++) {
                this.tempByHour.push({
                    temp: DataHelper.getDataByHour(res, i)
                });
            }
        }).catch(error => {
            console.log(error);
        })

        await this.forecastService.getPrecipitationByStation(this.currentForecastStationId)
        .then((res: any) => {
            for (let i = 0; i < 24; i++) {
                this.precipByHour.push({
                    precip: DataHelper.getDataByHour(res, i)
                });
            }
        }).catch(error => {
            console.log(error);
        })

        await this.forecastService.getWindLevelByStation(this.currentForecastStationId)
        .then((res: any) => {
            for (let i = 0; i < 24; i++) {
                this.windLvlByHour.push({
                    windLvl: DataHelper.getDataByHour(res, i)
                });
            }
        }).catch(error => {
            console.log(error);
        })

        await this.forecastService.getWindSpeedByStation(this.currentForecastStationId)
        .then((res: any) => {
            for (let i = 0; i < 24; i++) {
                this.windSpdByHour.push({
                    windSpd: DataHelper.getDataByHour(res, i)
                });
            }
        }).catch(error => {
            console.log(error);
        })

        await this.forecastService.getHumidityByStation(this.currentForecastStationId)
        .then((res: any) => {
            for (let i = 0; i < 24; i++) {
                this.humidByHour.push({
                    humid: DataHelper.getDataByHour(res, i)
                });
            }
        }).catch(error => {
            console.log(error);
        })

        for (let i = 0; i < 24; i++) {
            this.weatherByHour.push({
                time: DataHelper.getDisplayHour(i),
                date: moment().add(i, 'hours').format('DD/MM'),
                imageUrl: this.iconByHour[i].icon,
                temp: this.tempByHour[i].temp,
                precip: this.precipByHour[i].precip,
                windLvl: this.windLvlByHour[i].windLvl,
                windSpd: this.windSpdByHour[i].windSpd,
                humid: this.humidByHour[i].humid,
            });
        } */
    }
}

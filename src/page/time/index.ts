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

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
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
    currentDayMinWindDir: string = "";
    currentDayMinHumid: number = 0;
    currentDayMaxHumid: number = 0;
    forecastService: ForecastServices = new ForecastServices();

    weatherByDay: any = [];
    weatherByTime: any = [];
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

    async mounted() {
        await displayLocation();
        this.currentPositionCode = JSON.parse(sessionStorage.getItem('position')).regionCode;
        STATION.forEach((element) => {
            if (element.place_id === this.currentPositionCode) {
                this.currentForecastStationId = element.id;
                this.currentPosition = element.ten;
            }
        });

        moment.locale('vi');
        this.currentDay = moment().format('dddd');
        this.currentDate = moment().format('L');

        await this.forecastService.getMinMaxTemperatureByStation(this.currentForecastStationId)
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
            this.weatherByTime.push({
                time: DataHelper.getDisplayHour(i),
                date: moment().add(i, 'hours').format('DD/MM'),
                imageUrl: this.iconByHour[i].icon,
                temp: this.tempByHour[i].temp,
                precip: this.precipByHour[i].precip,
                windLvl: this.windLvlByHour[i].windLvl,
                windSpd: this.windSpdByHour[i].windSpd,
                humid: this.humidByHour[i].humid,
            });
        }
    }
}

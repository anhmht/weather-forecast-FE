import Vue from "vue";
import Component from "vue-class-component";
import icon from '../../../static/img/icon/day_partial_cloud.png';
import { displayLocation } from "@/utils/location-helper";
import { DataHelper } from "@/utils/data-helper";
import { STATION } from "../../constant/forcast-station-constant";
import { DATE } from "@/constant/common-constant";
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
    currentDayMinTemp: number = 0;
    currentDayMaxTemp: number = 0;
    currentDayMinPrecip: number = 0;
    currentDayMaxPrecip: number = 0;
    currentDayMinWindLvl: string = "";
    currentDayMaxWindLvl: string = "";
    currentDayMinHumid: number = 0;
    currentDayMaxHumid: number = 0;
    forecastService: ForecastServices = new ForecastServices();

    weatherByDay: any = [];
    weatherByTime: any = [];
    tempMinMaxByDay: any = [];
    precipMinMaxByDay: any = [];
    windLvlMinMaxByDay: any = [];
    humidMinMaxByDay: any = [];
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

        for (let i = DATE.NEXT_DAY; i <= DATE.NEXT_4_DAY; i++) {
            this.weatherByDay.push({
                day: moment().add(i, 'days').format('dddd'),
                imageUrl: icon,
                temp: this.tempMinMaxByDay[i].min + '°C - ' + this.tempMinMaxByDay[i].max + '°C',
                precip: this.precipMinMaxByDay[i].min + ' - ' + this.precipMinMaxByDay[i].max + ' mm',
                windLvl: this.windLvlMinMaxByDay[i].min + ' - ' + this.windLvlMinMaxByDay[i].max,
                humid: this.humidMinMaxByDay[i].min + '% - ' + this.humidMinMaxByDay[i].max + '%'
            });
        }

        await this.forecastService.getTemperatureByStation(this.currentForecastStationId)
        .then((res: any) => {
            this.currentTemp = DataHelper.getTempByHour(res, 0);

            for (let i = 0; i < 24; i++) {
                this.weatherByTime.push({
                    time: DataHelper.getDisplayHour(i),
                    date: moment().add(i, 'hours').format('DD/MM'),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, i)
                });
            }
        }).catch(error => {
            console.log(error);
        })
    }
}

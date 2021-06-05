import Vue from "vue";
import Component from "vue-class-component";
import icon from '../../../static/img/icon/day_partial_cloud.png';
import { displayLocation } from "@/utils/location-helper";
import { DataHelper } from "@/utils/data-helper";
import { STATION } from "../../constant/forcast-station-constant";
import { DATE } from "@/constant/common-constant";
import { ForecastServices } from "../../service/forecast-service/forecast.service";
import moment from "moment";

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
    currentTemp: number = 0;
    currentDayMinTemp: number = 0;
    currentDayMaxTemp: number = 0;
    forecastService: ForecastServices = new ForecastServices();

    weatherByDay: any = [];
    weatherByTime: any = [];
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

        await this.forecastService.getTemperatureByStation(this.currentForecastStationId).then((res: any) => {
            const minMaxTempCurrentDate = DataHelper.getMinMaxTemp(res, DATE.CURRENT);

            this.currentTemp = DataHelper.getTempByHour(res, 0);
            this.currentDayMinTemp = minMaxTempCurrentDate.min;
            this.currentDayMaxTemp = minMaxTempCurrentDate.max;

            for (let i = DATE.NEXT_DAY; i <= DATE.NEXT_4_DAY; i++) {
                this.weatherByDay.push({
                    day: moment().add(i, 'days').format('dddd'),
                    imageUrl: icon,
                    temp: DataHelper.getMinMaxTemp(res, i).min + '°C - ' + DataHelper.getMinMaxTemp(res, i).max + '°C'
                });
            }

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

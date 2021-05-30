import Vue from "vue";
import Component from "vue-class-component";
import icon from '../../../static/img/icon/day_partial_cloud.png';
import { displayLocation } from "@/utils/location-helper";
import { DataHelper } from "@/utils/data-helper";
import { STATION } from "../../constant/forcast-station-constant";
import { DATE, HOUR } from "@/constant/common-constant";
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
            const minMaxTempNextDate = DataHelper.getMinMaxTemp(res, DATE.NEXT_DAY);
            const minMaxTempNext2Date = DataHelper.getMinMaxTemp(res, DATE.NEXT_2_DAY);
            const minMaxTempNext3Date = DataHelper.getMinMaxTemp(res, DATE.NEXT_3_DAY);
            const minMaxTempNext4Date = DataHelper.getMinMaxTemp(res, DATE.NEXT_4_DAY);

            this.currentTemp = DataHelper.getCurrentDayTempByHour(res, new Date().getHours());
            this.currentDayMinTemp = minMaxTempCurrentDate.min;
            this.currentDayMaxTemp = minMaxTempCurrentDate.max;

            this.weatherByDay = [
                {
                    day: moment().add(DATE.NEXT_DAY, 'days').format('dddd'),
                    imageUrl: icon,
                    temp: minMaxTempNextDate.min + '°C - ' + minMaxTempNextDate.max + '°C'
                },
                {
                    day: moment().add(DATE.NEXT_2_DAY, 'days').format('dddd'),
                    imageUrl: icon,
                    temp: minMaxTempNext2Date.min + '°C - ' + minMaxTempNext2Date.max + '°C'
                },
                {
                    day: moment().add(DATE.NEXT_3_DAY, 'days').format('dddd'),
                    imageUrl: icon,
                    temp: minMaxTempNext3Date.min + '°C - ' + minMaxTempNext3Date.max + '°C'
                },
                {
                    day: moment().add(DATE.NEXT_4_DAY, 'days').format('dddd'),
                    imageUrl: icon,
                    temp: minMaxTempNext4Date.min + '°C - ' + minMaxTempNext4Date.max + '°C'
                },
            ];

            this.weatherByTime = [
                {
                    time: HOUR._1AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._1AM)
                },
                {
                    time: HOUR._2AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._2AM)
                },
                {
                    time: HOUR._3AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._3AM)
                },
                {
                    time: HOUR._4AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._4AM)
                },
                {
                    time: HOUR._5AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._5AM)
                },
                {
                    time: HOUR._6AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._6AM)
                },
                {
                    time: HOUR._7AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._7AM)
                },
                {
                    time: HOUR._8AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._8AM)
                },
                {
                    time: HOUR._9AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._9AM)
                },
                {
                    time: HOUR._10AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._10AM)
                },
                {
                    time: HOUR._11AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._11AM)
                },
                {
                    time: HOUR._12AM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._12AM)
                },
                {
                    time: HOUR._1PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._1PM)
                },
                {
                    time: HOUR._2PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._2PM)
                },
                {
                    time: HOUR._3PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._3PM)
                },
                {
                    time: HOUR._4PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._4PM)
                },
                {
                    time: HOUR._5PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._5PM)
                },
                {
                    time: HOUR._6PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._6PM)
                },
                {
                    time: HOUR._7PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._7PM)
                },
                {
                    time: HOUR._8PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._8PM)
                },
                {
                    time: HOUR._9PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._9PM)
                },
                {
                    time: HOUR._10PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._10PM)
                },
                {
                    time: HOUR._11PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._11PM)
                },
                {
                    time: HOUR._12PM + ':00',
                    imageUrl: icon,
                    temp: DataHelper.getCurrentDayTempByHour(res, HOUR._12PM)
                },
            ];
        }).catch(error => {
            console.log(error);
        })
    }
}

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
            const minMaxTempNextDate = DataHelper.getMinMaxTemp(res, DATE.NEXT_DAY);
            const minMaxTempNext2Date = DataHelper.getMinMaxTemp(res, DATE.NEXT_2_DAY);
            const minMaxTempNext3Date = DataHelper.getMinMaxTemp(res, DATE.NEXT_3_DAY);
            const minMaxTempNext4Date = DataHelper.getMinMaxTemp(res, DATE.NEXT_4_DAY);

            this.currentTemp = DataHelper.getTempByHour(res, 0);
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
                    time: DataHelper.getDisplayHour(0),
                    imageUrl: icon,
                    temp: this.currentTemp
                },
                {
                    time: DataHelper.getDisplayHour(1),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 1)
                },
                {
                    time: DataHelper.getDisplayHour(2),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 2)
                },
                {
                    time: DataHelper.getDisplayHour(3),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 3)
                },
                {
                    time: DataHelper.getDisplayHour(4),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 4)
                },
                {
                    time: DataHelper.getDisplayHour(5),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 5)
                },
                {
                    time: DataHelper.getDisplayHour(6),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 6)
                },
                {
                    time: DataHelper.getDisplayHour(7),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 7)
                },
                {
                    time: DataHelper.getDisplayHour(8),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 8)
                },
                {
                    time: DataHelper.getDisplayHour(9),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 9)
                },
                {
                    time: DataHelper.getDisplayHour(10),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 10)
                },
                {
                    time: DataHelper.getDisplayHour(11),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 11)
                },
                {
                    time: DataHelper.getDisplayHour(12),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 12)
                },
                {
                    time: DataHelper.getDisplayHour(13),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 13)
                },
                {
                    time: DataHelper.getDisplayHour(14),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 14)
                },
                {
                    time: DataHelper.getDisplayHour(15),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 15)
                },
                {
                    time: DataHelper.getDisplayHour(16),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 16)
                },
                {
                    time: DataHelper.getDisplayHour(17),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 17)
                },
                {
                    time: DataHelper.getDisplayHour(18),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 18)
                },
                {
                    time: DataHelper.getDisplayHour(19),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 19)
                },
                {
                    time: DataHelper.getDisplayHour(20),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 20)
                },
                {
                    time: DataHelper.getDisplayHour(21),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 21)
                },
                {
                    time: DataHelper.getDisplayHour(22),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 22)
                },
                {
                    time: DataHelper.getDisplayHour(23),
                    imageUrl: icon,
                    temp: DataHelper.getTempByHour(res, 23)
                },
            ];
        }).catch(error => {
            console.log(error);
        })
    }
}

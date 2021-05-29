import Vue from "vue";
import Component from "vue-class-component";
import icon from '../../../static/img/icon/day_partial_cloud.png';
import { displayLocation } from "@/utils/location-helper";
import { STATION } from "../../constant/forcast-station-constant";
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
    forecastService: ForecastServices = new ForecastServices();

    weatherByDay: any = [];
    /* weatherByDay: any = [
        {
            day: 'Thứ Năm',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            day: 'Thứ Sáu',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            day: 'Thứ Bảy',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            day: 'Chủ Nhật',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            day: 'Thứ Hai',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            day: 'Thứ Ba',
            imageUrl: icon,
            temp: '27° - 32°'
        }
    ]; */

    weatherByTime: any = [
        {
            time: '1:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '2:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '3:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '4:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '5:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '6:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '7:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '8:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '9:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '10:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '11:00 AM',
            imageUrl: icon,
            temp: '27° - 32°'
        },
        {
            time: '12:00 PM',
            imageUrl: icon,
            temp: '27° - 32°'
        }
    ];
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

        this.forecastService.getTemperatureByStation(this.currentForecastStationId).then((res: any) => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })

        moment.locale('vi');
        this.currentDay = moment().format('dddd');
        console.log(moment().add(1, 'days').format('dddd'));
        console.log(moment().add(2, 'days').format('dddd'));
        console.log(moment().add(3, 'days').format('dddd'));
        console.log(moment().add(4, 'days').format('dddd'));
    }
}

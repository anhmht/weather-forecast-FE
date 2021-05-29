import Vue from "vue";
import Component from "vue-class-component";
import icon from '../../../static/img/icon/day_partial_cloud.png';
import { displayLocation } from "@/utils/location-helper";
import { STATION } from "../../constant/forcast-station-constant";

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

    weatherByDay: any = [
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
    ];

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
        const data = await displayLocation() as any;

        this.currentPosition = data.region;
        this.currentPositionCode = data.regionCode;
        STATION.forEach((element) => {
            if (element.place_id === this.currentPositionCode) {
                this.currentForecastStationId = element.id;
            }
        });
    }
}

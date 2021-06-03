import { DATE } from '@/constant/common-constant';
import moment from 'moment';
import Vue from "vue";
import Component from "vue-class-component";


@Component({
    template: require("./template.html").default,
    components: {
        "forecast-result": () => import("../forecast-result/ForecastResultComponent.vue")
    }
})
export default class WeatherToolComponent extends Vue {
    selectedDate: number = 0;
    selectedHours: number = null;
    currentDay: string = null;

    items = [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
    ]

    get forecastDates() {
        const dates = [];
        moment.locale('vi');
        for (let index = 0; index < DATE.NEXT_4_DAY; index++) {
            dates.push({
                title: moment().add(index, 'days').format('dddd, DD/MM/YYYY'),
                value: index
            })
        }
        return dates;
    }

    get forecastHours() {
        const hours = [];
        for (let index = 0; index < 24; index++) {
            hours.push({
                title: index + ':00',
                value: index
            })
        }
        return hours;
    }

    async mounted() {
        moment.locale('vi');
        this.currentDay = moment().format('dddd, DD/MM/YYYY');
    }
}

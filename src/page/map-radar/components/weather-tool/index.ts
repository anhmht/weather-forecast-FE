import { DATE } from '@/constant/common-constant';
import { ForecastServices } from '@/service/forecast-service/forecast.service';
import { DataHelper } from '@/utils/data-helper';
import moment from 'moment';
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from 'vue-property-decorator';


@Component({
    template: require("./template.html").default,
    components: {
        "forecast-result": () => import("../forecast-result/ForecastResultComponent.vue")
    }
})
export default class WeatherToolComponent extends Vue {
    @Prop({required: true})
    stationInfo

    isLoading: boolean = false;
    selectedDate: number = 0;
    selectedHours: number = null;
    currentDay: string = null;
    forecastService: ForecastServices = new ForecastServices();
    dataResult: any = null;

    context:any = {
        data: null,
        date: 0,
        time: 0
    }

    get coDate() {
        return this.forecastDates[this.context.date].title
    }

    get coTime() {
        return this.forecastHours[this.context.time].title
    }

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
        let start = 0
        if(this.context.date === 0) {
            start = moment().hour();
        }
        for (let index = 0; start < 24; index++) {
            hours.push({
                title: start + ':00',
                value: index
            })
            start++;
        }
        return hours;
    }

    handlePickDate(date) {
        this.context.time = 0
        this.prepareResult(this.context.data, date.value, this.context.time);

    }

    handlePickHour(time) {
        this.prepareResult(this.context.data, this.context.date, time.value);
    }

    prepareResult(data, date = 0, time = 0) {
        this.context.date = date;
        this.context.time = time;
        const minMaxTempCurrentDate = DataHelper.getMinMaxTemp(data, date);
        this.dataResult = {
            currentDay: moment().add(date, 'days').format('dddd, DD/MM/YYYY'),
            currentPosition: this.stationInfo.ten,
            currentTemp: this.getDisplaytemp(data, date, time),
            currentDayMinTemp: minMaxTempCurrentDate.min,
            currentDayMaxTemp: minMaxTempCurrentDate.max
        }
    }

    getDisplaytemp(data, date, time) {
        const realtime = this.forecastHours.find(x => x.value === time);
        const hour = realtime.title.split(':')[0];
        console.log(hour);

        return DataHelper.getTempByDateHour(data, date, Number(hour));
    }

    async getTemprature() {
        this.isLoading = true;
        await this.forecastService.getTemperatureByStation(this.stationInfo.id).then((res: any) => {
            this.prepareResult(res, this.context.date, this.context.time);
            this.context.data = res;
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    async mounted() {
        moment.locale('vi');
        this.currentDay = moment().format('dddd, DD/MM/YYYY');
        this.getTemprature();
    }

    @Watch('stationInfo')
    handleChangeStationInfo(val, old) {
        this.getTemprature();
    }
}

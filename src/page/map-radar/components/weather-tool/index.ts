import { DATE } from '@/constant/common-constant';
import { ForecastServices } from '@/service/forecast-service/forecast.service';
import { DataHelper } from '@/utils/data-helper';
import moment from 'moment';
import 'moment/locale/vi';
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
        icon: null,
        temp: null,
        date: 0,
        time: 0,
        minMaxTemp: null,
        minMaxRain: null,
        minMaxHumidity: null,
        minMaxWindLevel: null,
        minMaxWindSpeed: null
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
        this.prepareResult(this.context.temp, date.value, this.context.time);
        this.prepareIconResult(this.context.icon, date.value, this.context.time);
        this.prepareMinMaxTempResult(this.context.minMaxTemp, date.value);
        this.prepareMinMaxRainResult(this.context.minMaxRain, date.value);
        this.prepareMinMaxHumdityResult(this.context.minMaxHumidity, date.value);
        this.prepareMinMaxWindLevelResult(this.context.minMaxWindLevel, date.value);
        this.prepareMinMaxWindSpeedResult(this.context.minMaxWindSpeed, date.value);
        this.handleEmitData()
    }

    handlePickHour(time) {
        this.prepareResult(this.context.temp, this.context.date, time.value);
        this.prepareIconResult(this.context.icon, this.context.date, time.value);
        this.handleEmitData()
    }

    handleEmitData() {
        const realtime = this.forecastHours.find(x => x.value === this.context.time);
        const hour = realtime.title.split(':')[0];
        this.$emit('changeTime', { date: this.context.date, time: hour});
    }

    prepareMinMaxWindSpeedResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.windSpeedByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinWindSpeed: refData.windSpeedMin,
            currentDayMaxWindSpeed: refData.windSpeedMax,
        }
    }

    prepareMinMaxWindLevelResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.windLevelByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinWindLevel: refData.windLevelMin,
            currentDayMaxWindLevel: refData.windLevelMax,
        }
    }

    prepareMinMaxHumdityResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.humidityByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinHumidity: refData.humidityMin,
            currentDayMaxHumidity: refData.humidityMax,
        }
    }

    prepareMinMaxRainResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.rainAmountByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinRain: refData.rainAmountMin,
            currentDayMaxRain: refData.rainAmountMax,
        }
    }

    prepareMinMaxTempResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.temperatureByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinTemp: refData.temperatureMin,
            currentDayMaxTemp: refData.temperatureMax,
        }
    }

    prepareResult(data, date = 0, time = 0) {
        this.context.date = date;
        this.context.time = time;
        this.dataResult = {
            ...this.dataResult,
            currentDay: moment().add(date, 'days').format('dddd, DD/MM/YYYY'),
            currentPosition: this.stationInfo.ten,
            currentTemp: this.getDisplayData(data, date, time),
        }
    }

    prepareIconResult(data, date = 0, time = 0) {
        this.dataResult = {
            ...this.dataResult,
            icon: this.getDisplayData(data, date, time)
        }
    }

    getDisplayData(data, date, time) {
        const realtime = this.forecastHours.find(x => x.value === time);
        const hour = realtime.title.split(':')[0];
        return DataHelper.getDataByDateHour(data, date, Number(hour));
    }

    getTemprature() {
        this.isLoading = true;
        this.forecastService.getTemperatureByStation(this.stationInfo.id).then((res: any) => {
            this.prepareResult(res, this.context.date, this.context.time);
            this.context.temp = res;
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    getMinMaxTemprature() {
        this.isLoading = true;
        this.forecastService.getMinMaxTemperatureByStation(this.stationInfo.id).then((res: any) => {
            this.context.minMaxTemp = res;
            this.prepareMinMaxTempResult(res, this.context.date);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    getIcon() {
        this.isLoading = true;
        this.forecastService.getIconWeather(this.stationInfo.id).then((res: any) => {
            this.context.icon = res;
            this.prepareIconResult(res, this.context.date, this.context.time);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    getPrecipitationByStation() {
        this.isLoading = true;
        this.forecastService.getMinMaxPrecipitationByStation(this.stationInfo.id).then((res: any) => {
            this.context.minMaxRain = res;
            this.prepareMinMaxRainResult(res, this.context.date);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    getMinMaxHumidityByStation() {
        this.isLoading = true;
        this.forecastService.getMinMaxHumidityByStation(this.stationInfo.id).then((res: any) => {
            this.context.minMaxHumidity = res;
            this.prepareMinMaxHumdityResult(res, this.context.date);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    getMinMaxWindLevelByStation() {
        this.isLoading = true;
        this.forecastService.getMinMaxWindLevelByStation(this.stationInfo.id).then((res: any) => {
            this.context.minMaxWindLevel = res;
            this.prepareMinMaxWindLevelResult(res, this.context.date);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    getMinMaxWindSpeedByStation() {
        this.isLoading = true;
        this.forecastService.getMinMaxWindSpeedByStation(this.stationInfo.id).then((res: any) => {
            this.context.minMaxWindSpeed = res;
            this.prepareMinMaxWindSpeedResult(res, this.context.date);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    }

    mounted() {
        moment.locale('vi');
        this.currentDay = moment().format('dddd, DD/MM/YYYY');
        this.getTemprature();
        this.getIcon();
        this.getMinMaxTemprature();
        this.getPrecipitationByStation();
        this.getMinMaxHumidityByStation();
        this.getMinMaxWindLevelByStation();
        this.getMinMaxWindSpeedByStation();
    }

    @Watch('stationInfo')
    handleChangeStationInfo(val, old) {
        this.getTemprature();
    }
}

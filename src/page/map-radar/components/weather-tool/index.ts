import { DATE } from '@/constant/common-constant';
import { ForecastServices } from '@/service/forecast-service/forecast.service';
import { WeatherServices } from '@/service/weather-service/weather.service';
import { DataHelper } from '@/utils/data-helper';
import moment from 'moment';
import 'moment/locale/vi';
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from 'vue-property-decorator';
import { WEATHER_TYPE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';

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
    weatherService: WeatherServices = new WeatherServices();
    dataResult: any = null;
    searchParam: IForecastSearchParam = new ForecastSearchParam();

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
        const refData = data.weatherInformationByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinWindSpeed: refData.minValue,
            currentDayMaxWindSpeed: refData.maxValue,
        }
    }

    prepareMinMaxWindLevelResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.weatherInformationByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinWindLevel: refData.minValue,
            currentDayMaxWindLevel: refData.maxValue,
        }
    }

    prepareMinMaxHumdityResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.weatherInformationByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinHumidity: refData.minValue,
            currentDayMaxHumidity: refData.maxValue,
        }
    }

    prepareMinMaxRainResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.weatherInformationByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinRain: refData.minValue,
            currentDayMaxRain: refData.maxValue,
        }
    }

    prepareMinMaxTempResult(data, date) {
        const currentDate = moment(this.forecastDates[date].title, 'dddd, DD/MM/YYYY').date();
        const refData = data.weatherInformationByDays.find(x => moment(x.date).date() === currentDate);
        this.dataResult = {
            ...this.dataResult,
            currentDayMinTemp: refData.minValue,
            currentDayMaxTemp: refData.maxValue,
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

    /* getTemprature() {
        this.isLoading = true;
        this.forecastService.getTemperatureByStation(this.stationInfo.id).then((res: any) => {
            this.prepareResult(res, this.context.date, this.context.time);
            this.context.temp = res;
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        })
    } */

    getHorizontal() {
        this.searchParam = new ForecastSearchParam();
        this.isLoading = true;
        this.searchParam.stationIds = [this.stationInfo.id];
        this.searchParam.fromDate = moment().format("YYYY-MM-DD");
        this.searchParam.toDate = moment(this.searchParam.fromDate).add(1, 'days').subtract(1, 'minutes').format();
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Temperature, 
            WEATHER_TYPE.Weather
        ];

        this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
            let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature);
            let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather);

            this.context.temp = tempArray[0];
            this.context.icon = iconArray[0];
            this.prepareResult(tempArray[0], this.context.date, this.context.time);
            this.prepareIconResult(iconArray[0], this.context.date, this.context.time);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        });
    }

    getDetail() {
        this.searchParam = new ForecastSearchParam();
        this.isLoading = true;
        this.searchParam.stationIds = [this.stationInfo.id];
        this.searchParam.fromDate = moment().format("YYYY-MM-DD");
        this.searchParam.toDate = moment(this.searchParam.fromDate).add(1, 'days').subtract(1, 'minutes').format();
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Humidity, 
            WEATHER_TYPE.WindLevel, 
            WEATHER_TYPE.Temperature, 
            WEATHER_TYPE.WindSpeed, 
            WEATHER_TYPE.RainAmount
        ];

        this.weatherService.getDetail(this.searchParam).then((res: any) => {
            let humidArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.Humidity);
            let windLvlArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.WindLevel);
            let tempArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.Temperature);
            let windSpdArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.WindSpeed);
            let rainAmtArray = res.weatherInformationByStations.filter(x => x.weatherType === WEATHER_TYPE.RainAmount);

            this.context.minMaxHumidity = humidArray[0];
            this.context.minMaxWindLevel = windLvlArray[0];
            this.context.minMaxTemp = tempArray[0];
            this.context.minMaxWindSpeed = windSpdArray[0];
            this.context.minMaxRain = rainAmtArray[0];
            
            this.prepareMinMaxHumdityResult(humidArray[0], this.context.date);
            this.prepareMinMaxWindLevelResult(windLvlArray[0], this.context.date);
            this.prepareMinMaxTempResult(tempArray[0], this.context.date);
            this.prepareMinMaxWindSpeedResult(windSpdArray[0], this.context.date);
            this.prepareMinMaxRainResult(rainAmtArray[0], this.context.date);
            this.isLoading = false;
        }).catch(err => {
            console.log(err);
            this.isLoading = false;
        });
    }

    mounted() {
        moment.locale('vi');
        this.currentDay = moment().format('dddd, DD/MM/YYYY');

        this.getHorizontal();
        this.getDetail();
    }

    @Watch('stationInfo')
    handleChangeStationInfo(val, old) {
        // this.getTemprature();
        this.getHorizontal();
    }
}

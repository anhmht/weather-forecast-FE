import { REGION, STATION, WEATHER_TYPE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';
import { DataHelper } from '@/utils/data-helper';
import { ICON } from '@/constant/icon-constant';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class AddUpdateTextBoxComponent extends Vue {
    @Prop({ required: true })
    visible

    @Prop({ required: true })
    location

    @Prop({ required: true })
    isProvince

    @Prop({ type: Object, default: null })
    editData

    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();
    forecastData: any = {}

    data = {
        content: null,
        time: 0,
        position: 'top-right',
        duration: 3000,
        id: null
    }

    get visbileTextBox() {
        return this.visible;
    }

    set visbileTextBox(value) {
        this.$emit("update:visible", value);
    }

    durations = [
        { text: '0 giây', value: 0 },
        { text: '1 giây', value: 1000 },
        { text: '3 giây', value: 3000 },
        { text: '5 giây', value: 5000 },
        { text: '10 giây', value: 10000 },
        { text: '15 giây', value: 15000 },
        { text: '20 giây', value: 20000 },
        { text: '25 giây', value: 25000 },
        { text: '30 giây', value: 30000 },
    ]

    positions = [
        { text: 'top', value: 'top' },
        { text: 'top-left', value: 'top-left' },
        { text: 'top-right', value: 'top-right' },
        { text: 'middle', value: 'middle' },
        { text: 'middle-left', value: 'middle-left' },
        { text: 'middle-right', value: 'middle-right' },
        { text: 'bottom', value: 'bottom' },
        { text: 'bottom-left', value: 'bottom-left' },
        { text: 'bottom-right', value: 'bottom-right' },
    ]

    handleSaveTextBox() {
        this.$emit('save', this.data);
        this.visbileTextBox = false
    }

    getStationIdByRegion(regionCode) {
        const foundRegion = REGION.find(x => x.placeId === regionCode);
        if (foundRegion) {
            const provinceId = foundRegion.provinceIds;
            let stationId: any = [];
            for (let i = 0; i < provinceId.length; i++) {
                const foundStation = STATION.find(x => x.place_id === provinceId[i]);
                if (foundStation) {
                    stationId.push(foundStation.id);
                }
            }
            return stationId;
        }
        return;
    }

    getStationIdByProvince(regionCode) {
        const station = STATION.find(x => x.place_id === regionCode);
        if (station) {
            return station.id;
        }
    }

    getHorizontal(stationId) {
        this.searchParam = new ForecastSearchParam();
        if (Array.isArray(stationId)) {
            this.searchParam.stationIds = stationId;
        } else {
            this.searchParam.stationIds = [stationId];
        }
        this.searchParam.fromDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.toDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Weather,
            WEATHER_TYPE.Temperature
        ];

        return new Promise((resolve, reject) => {
            this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
                let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather && x.refDate === this.searchParam.fromDate);
                let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature && x.refDate === this.searchParam.fromDate);
                let mostFreqIcon = {}
                if (!this.isProvince) {
                    mostFreqIcon = this.getMostFrequentData(iconArray, WEATHER_TYPE.Weather);
                }

                let tempRange = this.getMinMaxData(tempArray);

                resolve({ mostFreqIcon, tempRange, iconArray, tempArray });
            }).catch(err => {
                console.log(err);
            })
        })
    }

    getMostFrequentData(inputData, type) {

        if (type === WEATHER_TYPE.Weather) {
            let filteredDayData: string[] = [];
            let filteredNightData: string[] = [];
            let mostFreqDay: string = null;
            let mostFreqNight: string = null;

            for (let i = 0; i < inputData.length; i++) {
                const currentElement = inputData[i];
                let hours = Object.keys(currentElement).filter(x => x.includes('_'));
                hours = hours.sort((a, b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
                for (let j = 0; j < 24; j++) {
                    if (j >= 6 && j <= 18) {
                        filteredDayData.push(currentElement[hours[j]]);
                    }
                    else {
                        filteredNightData.push(currentElement[hours[j]]);
                    }
                }
            }
            mostFreqDay = DataHelper.getMostFrequentByHorizontal(filteredDayData);
            mostFreqNight = DataHelper.getMostFrequentByHorizontal(filteredNightData);

            return { mostFreqDay, mostFreqNight };
        }
    }

    getMinMaxData(inputData) {
        let filteredData: number[] = [];
        let min: number = null;
        let max: number = null;

        for (let i = 0; i < inputData.length; i++) {
            const currentElement = inputData[i];
            let hours = Object.keys(currentElement).filter(x => x.includes('_'));
            hours = hours.sort((a, b) => {
                return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
            });
            for (let j = 0; j < 48; j++) {
                filteredData.push(currentElement[hours[j]]);
            }
        }
        min = Math.min(...filteredData);
        max = Math.max(...filteredData);

        return { min, max };
    }

    getDisplayData(data, date, time) {
        return DataHelper.getDataByDateHour(data, date, time);
    }

    fetchData() {
        const currentHour = new Date().getHours();
        let iconDay = null;
        let iconNight = null;
        let iconDayUrl = null;
        let iconNightUrl = null;
        let weatherDescDay = null;
        let weatherDescNight = null;
        let location = this.isProvince ? this.getStationIdByProvince(this.location) : this.getStationIdByRegion(this.location)
        this.getHorizontal(location).then((res: any) => {
            if (!this.isProvince) {
                iconDay = ICON.find(x => x.id === res.mostFreqIcon.mostFreqDay);
                if (iconDay) {
                    iconDayUrl = iconDay.url;
                    weatherDescDay = iconDay.description;
                }
                iconNight = ICON.find(x => x.id === res.mostFreqIcon.mostFreqNight);
                if (iconNight) {
                    iconNightUrl = iconNight.url;
                    weatherDescNight = iconNight.description;
                }

                if (currentHour >= 6 && currentHour <= 18) {
                    this.forecastData = { ...this.forecastData, icon: iconDayUrl };
                } else {
                    this.forecastData = { ...this.forecastData, icon: iconNightUrl };
                }
                this.forecastData = {
                    ...this.forecastData, desc: weatherDescDay + ".<br/> " + weatherDescNight + ".<br/>"
                        + "Nhiệt độ thấp nhất: " + res.tempRange.min + " ℃.<br/>"
                        + "Nhiệt độ cao nhất: " + res.tempRange.max + " ℃.<br/>"
                };
            } else {
                const contextIcon = res.iconArray.find(x => x.stationId === location);
                const icon = this.getDisplayData(contextIcon, 0, moment().hour())
                const iconUrl = ICON.find(x => x.id === icon)
                this.forecastData = {
                    ...this.forecastData,
                    icon: iconUrl.url,
                    desc: iconUrl.description + ".<br/> "
                        + "Nhiệt độ thấp nhất: " + res.tempRange.min + " ℃.<br/>"
                        + "Nhiệt độ cao nhất: " + res.tempRange.max + " ℃.<br/>"
                };
            }
        }).catch(err => {
            console.log(err);
        })
    }

    mounted() {
        
    }

    @Watch('visible')
    dialogVisible(visible) {
        if (visible) {
            this.fetchData();
            this.data = this.editData ? DataHelper.deepClone(this.editData) : {
                content: null,
                time: 0,
                position: 'top-right',
                duration: 3000,
                id: DataHelper.create_UUID()
            }
        }
    }
}
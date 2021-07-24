import { REGION, STATION, WEATHER_TYPE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';
import { DataHelper } from '@/utils/data-helper';
import { ICON } from '@/constant/icon-constant';
import { IScenarioActionDetail, ScenarioActionDetail } from '@/model/scenario';
import { POSITION } from '../../scenario-default';
import NO_IMAGE from '../../../../../../../static/img/no-image/no-image.png';
import { UploadServices } from '@/service/upload-service/upload.service';

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
    uploadedDocs: any = NO_IMAGE;
    progress: number = 0;
    isUploading: boolean = false;
    uploadservice: UploadServices = new UploadServices();

    data: IScenarioActionDetail = new ScenarioActionDetail({});

    get visbileTextBox() {
        return this.visible;
    }

    set visbileTextBox(value) {
        this.$emit("update:visible", value);
    }

    durations = [
        { text: '0 giây', value: 0 },
        { text: '1 giây', value: 1000 },
        { text: '2 giây', value: 2000 },
        { text: '3 giây', value: 3000 },
        { text: '4 giây', value: 4000 },
        { text: '5 giây', value: 5000 },
        { text: '6 giây', value: 6000 },
        { text: '7 giây', value: 7000 },
        { text: '8 giây', value: 8000 },
        { text: '9 giây', value: 9000 },
        { text: '10 giây', value: 10000 },
        { text: '11 giây', value: 11000 },
        { text: '12 giây', value: 12000 },
        { text: '13 giây', value: 13000 },
        { text: '14 giây', value: 14000 },
        { text: '15 giây', value: 15000 },
        { text: '16 giây', value: 16000 },
        { text: '17 giây', value: 17000 },
        { text: '18 giây', value: 18000 },
        { text: '19 giây', value: 19000 },
        { text: '20 giây', value: 20000 },
        { text: '25 giây', value: 25000 },
        { text: '30 giây', value: 30000 },
    ]

    positions = POSITION

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

    handleClickBrowse() {
        const upload = this.$refs.upload as any;
        upload.click();
    }

    reset() {
        this.uploadedDocs = NO_IMAGE;
        this.progress = 0;
    }

    onChangeDocuments(pics) {
        if (pics.length > 0) {
            this.processUploadDocuments(pics[0]);
        }
    }

    processUploadDocuments(file) {
        if (this.validateFileExtention(file.name)) {
            this.isUploading = true;
            this.reset();
            this.uploadIcon({
                Data: file,
                FileName: `${new Date().getTime()}_${file.name}`,
            });
        } else {
            console.log('xxx file name');
        }
    }

    uploadIcon(document) {
        const formData = this.buildUploadDocumentParams(document);
        document.isUploading = true;
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            },
            onUploadProgress: function (progressEvent) {
                var value = (progressEvent.loaded * 100) / progressEvent.total;
                var percent = Math.round(value);
                this.progress = percent;
            }.bind(this)
        };
        this.uploadservice.uploadFile(formData, config).then(response => {
            this.isUploading = false;
            this.toBase64(document.Data);
            this.progress = 0;
            this.data.iconUrls = response;
            if (this.data.iconsList.length > 0) {
                this.data.iconsList[0] = response;
            } else {
                this.data.iconsList.push(response);
            }
            
        }).catch(err => {
            this.isUploading = false;
            console.error(err);
        });
    }

    private toBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.uploadedDocs = reader.result
        };
    }

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        formData.append('file', document.Data, document.FileName);
        return formData;
    }

    validateFileExtention(fileName) {
        let acceptableExtension = "image/*";
        if (acceptableExtension.toLowerCase().includes("image/*"))
            acceptableExtension = "image/png,image/jpg,image/jpeg,image/gif";
        let ext = fileName.match(/\.([^\.]+)$/)[1];
        let accepttypes = acceptableExtension.split(",");
        let isValid = accepttypes.filter(c => c.trim().toLowerCase().includes(ext.toString().trim().toLowerCase())).length > 0;
        return isValid;
    }

    @Watch('visible')
    dialogVisible(visible) {
        if (visible) {
            this.fetchData();
            this.data = this.editData ? new ScenarioActionDetail({ ...this.editData, placeId: this.location }) : new ScenarioActionDetail({ placeId: this.location });
            this.uploadedDocs = this.data.iconUrls ? this.data.iconUrls : NO_IMAGE;
        }
    }
}

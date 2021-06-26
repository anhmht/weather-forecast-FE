import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { WeatherServices } from '@/service/weather-service/weather.service';
import { REGION, STATION, WEATHER_TYPE, WIND_DIRECTION } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast/forecast.model';
import moment from 'moment';
import { DataHelper } from '@/utils/data-helper';
import _ from 'lodash';
import { ICON } from '@/constant/icon-constant';

@Component({
    template: require("./template.html").default,
    components: {
        "forecast-item": () => import("../forecast-item/ForecastItemComponent.vue")
    }
})
export default class WeatherForecast24hComponent extends Vue {
    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();

    @Prop({type: String, default: null})
    position

    activeTab: number = 0;

    forecastData = [
        {
            title: null,
            icon: null,
            desc: null
        },
        {
            title: 'Phía Tây Bắc Bộ',
            icon: null,
            desc: null
        },
        {
            title: 'Phía Đông Bắc Bộ',
            icon: null,
            desc: null
        },
        {
            title: 'Đồng bằng sông Hồng',
            icon: null,
            desc: null
        },
        {
            title: 'Thanh Hoá - Thừa Thiên Huế',
            icon: null,
            desc: null
        },
        {
            title: 'Đà Nẵng đến Bình Thuận',
            icon: null,
            desc: null
        },
        {
            title: 'Tây Nguyên',
            icon: null,
            desc: null
        },
        {
            title: 'Đông Nam Bộ',
            icon: null,
            desc: null
        },
        {
            title: 'Đồng bằng sông Cửu Long',
            icon: null,
            desc: null
        },
    ]

    forcastSea = [
        {
            title: 'Bắc Vịnh Bắc Bộ',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BVBB-NTN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió nam đến tây nam cấp 4-5.`
        },
        {
            title: 'Nam Vịnh Bắc Bộ',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BVBB-NTN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió nam đến tây nam cấp 4-5.`
        },
        {
            title: 'Quảng Trị đến Quãng Ngãi',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/QTQN-TN-Y.jpg',
            desc: `Không mưa.  <br/>
                Tầm nhìn xa : Tầm nhìn xa trên 10km.  <br/>
                Gió tây nam cấp 4-5.`
        },
        {
            title: 'Bình Định đến Ninh Thuận',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BDNT-TN-M.jpg',
            desc: `Có mưa rào và dông vài nơi. Trong mưa dông có khả năng xảy ra lốc xoáy. <br/>
                Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                Gió tây nam cấp 5, có lúc cấp 6, giật cấp 7. Biển động.`
        },
        {
            title: 'Bình Thuận đến Cà Mau',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BTCM-TN-M.jpg',
            desc: `Có mưa rào rải rác và có nơi có dông. Trong mưa dông có khả năng xảy ra lốc xoáy. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 5, có lúc cấp 6, giật cấp 7. Biển động.`
        },
        {
            title: 'Cà Mau đến Kiên Giang',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/CMKG-TN-Y.jpg',
            desc: `Có mưa rào rải rác và có nơi có dông. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa.<br/>
                Gió tây nam cấp 3-4.`
        },
        {
            title: 'Bắc Biển Đông',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BBD-TN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió tây nam cấp 5.`
        },
        {
            title: 'Quần đảo Hoàng Sa',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/HS-TN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió tây nam cấp 5.`
        },
        {
            title: 'Vùng Giữa Biển Đông',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/GBD-TN-Y.jpg',
            desc: `Có mưa rào và dông vài nơi, riêng phía Đông có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa.<br/>
                    Gió tây nam cấp 5.`
        },
        {
            title: 'Vùng Nam Biển Đông',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/NBD-TN-Y.jpg',
            desc: `Có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 5.`
        },
        {
            title: 'Quần đảo Trường Sa',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/TS-TN-M.jpg',
            desc: `Có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 5, riêng phía Tây Bắc có lúc cấp 6, giật cấp 7. Biển động.`
        },
        {
            title: 'Vịnh Thái Lan',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/VTL-TN-Y.jpg',
            desc: `Có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 3-4.`
        },
    ]

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

    getStationIdByPosition(positionName) {
        const foundStation = STATION.find(x => x.ten === positionName);
        if (foundStation) {
            return foundStation.id;
        }

        return;
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
            WEATHER_TYPE.WindDirection,
            WEATHER_TYPE.WindLevel,
            WEATHER_TYPE.Temperature
        ];

        return new Promise((resolve, reject) => {
            this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
                let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather && x.refDate === this.searchParam.fromDate);
                let windDirArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindDirection && x.refDate === this.searchParam.fromDate);
                let windLvlArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindLevel && x.refDate === this.searchParam.fromDate);
                let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature && x.refDate === this.searchParam.fromDate);

                let mostFreqIcon = this.getMostFrequentData(iconArray, WEATHER_TYPE.Weather);
                let mostFreqWindDir = this.getMostFrequentData(windDirArray, WEATHER_TYPE.WindDirection);
                let mostFreqWindLvl = this.getMostFrequentData(windLvlArray, WEATHER_TYPE.WindLevel);
                let tempRange = this.getMinMaxData(tempArray);

                resolve({mostFreqIcon, mostFreqWindDir, mostFreqWindLvl, tempRange});
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
                hours = _.orderBy(hours, [hours], ['asc']);
                for (let j = 0; j < 48; j++) {
                    if ((j >= 6 && j <= 18) || (j >= 30 && j <= 42)) {
                        filteredDayData.push(currentElement[hours[j]]);
                    }
                    else {
                        filteredNightData.push(currentElement[hours[j]]);
                    }
                }
            }
            mostFreqDay = DataHelper.getMostFrequentByHorizontal(filteredDayData);
            mostFreqNight = DataHelper.getMostFrequentByHorizontal(filteredNightData);

            return {mostFreqDay, mostFreqNight};
        } else {
            let filteredData: any = [];
            let mostFreqData: any = null;

            for (let i = 0; i < inputData.length; i++) {
                const currentElement = inputData[i];
                let hours = Object.keys(currentElement).filter(x => x.includes('_'));
                hours = _.orderBy(hours, [hours], ['asc']);
                for (let j = 0; j < 48; j++) {
                    filteredData.push(currentElement[hours[j]]);
                }
            }
            mostFreqData = DataHelper.getMostFrequentByHorizontal(filteredData);

            return mostFreqData;
        }
    }

    getMinMaxData(inputData) {
        let filteredData: number[] = [];
        let min: number = null;
        let max: number = null;

        for (let i = 0; i < inputData.length; i++) {
            const currentElement = inputData[i];
            let hours = Object.keys(currentElement).filter(x => x.includes('_'));
            hours = _.orderBy(hours, [hours], ['asc']);
            for (let j = 0; j < 48; j++) {
                filteredData.push(currentElement[hours[j]]);
            }
        }
        min = Math.min(...filteredData);
        max = Math.max(...filteredData);

        return {min, max};
    }

    handleClick(index) {
        this.activeTab = index;
    }

    mounted() {
        const currentHour = new Date().getHours();
        let iconDay = null;
        let iconNight = null;
        let iconDayUrl = null;
        let iconNightUrl = null;
        let weatherDescDay = null;
        let weatherDescNight = null;
        let windDir = null;

        this.forecastData[0].title = this.position;
        this.getHorizontal(this.getStationIdByPosition(this.position)).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[0].icon = iconDayUrl;
            } else {
                this.forecastData[0].icon = iconNightUrl;
            }
            this.forecastData[0].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("TBB")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[1].icon = iconDayUrl;
            } else {
                this.forecastData[1].icon = iconNightUrl;
            }
            this.forecastData[1].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("DBB")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[2].icon = iconDayUrl;
            } else {
                this.forecastData[2].icon = iconNightUrl;
            }
            this.forecastData[2].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("DBSH")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[3].icon = iconDayUrl;
            } else {
                this.forecastData[3].icon = iconNightUrl;
            }
            this.forecastData[3].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("BTB")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[4].icon = iconDayUrl;
            } else {
                this.forecastData[4].icon = iconNightUrl;
            }
            this.forecastData[4].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("NTB")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[5].icon = iconDayUrl;
            } else {
                this.forecastData[5].icon = iconNightUrl;
            }
            this.forecastData[5].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("TN")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[6].icon = iconDayUrl;
            } else {
                this.forecastData[6].icon = iconNightUrl;
            }
            this.forecastData[6].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("DNB")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[7].icon = iconDayUrl;
            } else {
                this.forecastData[7].icon = iconNightUrl;
            }
            this.forecastData[7].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })

        this.getHorizontal(this.getStationIdByRegion("TNB")).then((res: any) => {
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

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.forecastData[8].icon = iconDayUrl;
            } else {
                this.forecastData[8].icon = iconNightUrl;
            }
            this.forecastData[8].desc = weatherDescDay + ". " + weatherDescNight
                + ". Gió " + windDir + " cấp " + res.mostFreqWindLvl + ".<br/>"
                + "Nhiệt độ thấp nhất: " + res.tempRange.min + ".<br/>"
                + "Nhiệt độ cao nhất: " + res.tempRange.max + ".<br/>";
        }).catch(err => {
            console.log(err);
        })
    }
}

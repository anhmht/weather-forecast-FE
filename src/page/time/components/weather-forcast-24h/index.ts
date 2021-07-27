import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { WeatherServices } from '@/service/weather-service/weather.service';
import { REGION, STATION, WEATHER_TYPE } from '@/constant/forcast-station-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast/forecast.model';
import moment from 'moment';
import { DataHelper } from '@/utils/data-helper';

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

    forecastData: any = [];

    forcastSea = [
        {
            title: 'Bắc Vịnh Bắc Bộ',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BVBB-NTN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió nam đến tây nam cấp 4-5.`,
            tab: 1
        },
        {
            title: 'Nam Vịnh Bắc Bộ',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BVBB-NTN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió nam đến tây nam cấp 4-5.`,
            tab: 1
        },
        {
            title: 'Quảng Trị đến Quãng Ngãi',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/QTQN-TN-Y.jpg',
            desc: `Không mưa.  <br/>
                Tầm nhìn xa : Tầm nhìn xa trên 10km.  <br/>
                Gió tây nam cấp 4-5.`,
            tab: 1
        },
        {
            title: 'Bình Định đến Ninh Thuận',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BDNT-TN-M.jpg',
            desc: `Có mưa rào và dông vài nơi. Trong mưa dông có khả năng xảy ra lốc xoáy. <br/>
                Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                Gió tây nam cấp 5, có lúc cấp 6, giật cấp 7. Biển động.`,
            tab: 1
        },
        {
            title: 'Bình Thuận đến Cà Mau',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BTCM-TN-M.jpg',
            desc: `Có mưa rào rải rác và có nơi có dông. Trong mưa dông có khả năng xảy ra lốc xoáy. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 5, có lúc cấp 6, giật cấp 7. Biển động.`,
            tab: 1
        },
        {
            title: 'Cà Mau đến Kiên Giang',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/CMKG-TN-Y.jpg',
            desc: `Có mưa rào rải rác và có nơi có dông. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa.<br/>
                Gió tây nam cấp 3-4.`,
            tab: 1
        },
        {
            title: 'Bắc Biển Đông',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/BBD-TN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió tây nam cấp 5.`,
            tab: 1
        },
        {
            title: 'Quần đảo Hoàng Sa',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/HS-TN-Y.jpg',
            desc: `Không mưa. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km. <br/>
                    Gió tây nam cấp 5.`,
            tab: 1
        },
        {
            title: 'Vùng Giữa Biển Đông',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/GBD-TN-Y.jpg',
            desc: `Có mưa rào và dông vài nơi, riêng phía Đông có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa.<br/>
                    Gió tây nam cấp 5.`,
            tab: 1
        },
        {
            title: 'Vùng Nam Biển Đông',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/NBD-TN-Y.jpg',
            desc: `Có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 5.`,
            tab: 1
        },
        {
            title: 'Quần đảo Trường Sa',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/TS-TN-M.jpg',
            desc: `Có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 5, riêng phía Tây Bắc có lúc cấp 6, giật cấp 7. Biển động.`,
            tab: 1
        },
        {
            title: 'Vịnh Thái Lan',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/sea-map/VTL-TN-Y.jpg',
            desc: `Có mưa rào và dông rải rác. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. <br/>
                    Tầm nhìn xa : Tầm nhìn xa trên 10km, giảm xuống 4-10 km trong mưa. <br/>
                    Gió tây nam cấp 3-4.`,
            tab: 1
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
                hours = hours.sort((a,b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
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
                hours = hours.sort((a,b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
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
            hours = hours.sort((a,b) => {
                return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
            });
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
        this.forecastData = [
            {
                title: this.position,
                icon: null,
                desc: null,
                region: null,
                currentPosition: this.position,
                tab: 0
            },
            {
                title: 'Phía Tây Bắc Bộ',
                icon: null,
                desc: null,
                region: 'TBB',
                currentPosition: null,
                tab: 0
            },
            {
                title: 'Phía Đông Bắc Bộ',
                icon: null,
                desc: null,
                region: 'DBB',
                currentPosition: null,
                tab: 0
            },
            {
                title: 'Đồng bằng sông Hồng',
                icon: null,
                desc: null,
                region: 'DBSH',
                currentPosition: null,
                tab: 0
            },
            {
                title: 'Thanh Hoá - Thừa Thiên Huế',
                icon: null,
                desc: null,
                region: 'BTB',
                currentPosition: null,
                tab: 0
            },
            {
                title: 'Đà Nẵng đến Bình Thuận',
                icon: null,
                desc: null,
                region: 'NTB',
                currentPosition: null,
                tab: 0
            },
            {
                title: 'Tây Nguyên',
                icon: null,
                desc: null,
                region: 'TN',
                currentPosition: null,
                tab: 0
            },
            {
                title: 'Đông Nam Bộ',
                icon: null,
                desc: null,
                region: 'DNB',
                currentPosition: null,
                tab: 0
            },
            {
                title: 'Tây Nam Bộ',
                icon: null,
                desc: null,
                region: 'TNB',
                currentPosition: null,
                tab: 0
            },
        ]
    }
}

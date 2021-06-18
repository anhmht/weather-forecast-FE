import { namespace, Action, Getter } from 'vuex-class';
import { PROVINCE } from './../../constant/province-constant';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import { WeatherServices } from '@/service/weather-service/weather.service';
import { STATION } from '@/constant/forcast-station-constant';
import moment from 'moment';
import { WEATHER_TYPE } from '@/constant/common-constant';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class DataPageComponent extends Vue {
    province = PROVINCE;
    station = STATION;
    stationIds: string[] = [];
    fromDate: string = null;
    toDate: string = null;
    weatherTypes: number[] = [];
    provinceData: any = [];
    activeTab: number = 0;
    weatherService: WeatherServices = new WeatherServices();

    @LookupAction getLookupData: (type: string) => Promise<void>
    @LookupGetter(lookupTypesStore.Get.KTTV) stations

    wardInfo = [
        {
            name: 'Tp.Vĩnh Long',
        },
        {
            name: 'Huyện Long Hồ',
        },
        {
            name: 'Huyện Mang Thít',
        },
        {
            name: 'Huyện Vũng Liêm',
        },
        {
            name: 'Huyện Tam Bình',
        },
        {
            name: 'Thị Xã Bình Minh',
        },
        {
            name: 'Huyện Trà Ôn',
        },
        {
            name: 'Huyện Bình Tân',
        },
    ]

    riversEstuaries = [
        {
            name: 'Sông Tiền',
        },
        {
            name: 'Sông Hậu',
        },
        {
            name: 'Sông Cổ Chiên',
        },
        {
            name: 'Cửa Tiểu',
        },
        {
            name: 'Cửa Đại',
        },
        {
            name: 'Hàm Luông',
        },
        {
            name: 'Cổ Chiên',
        },
        {
            name: 'Cung Hầu',
        },
        {
            name: 'Định An',
        },
        {
            name: 'Trần Đề',
        },
    ]

    harshStatus = [
        '', 'O'
    ]

    handleChangeTab(tab) {
        this.activeTab = tab;
    }

    getRandomArbitrary(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    getStatus() {
        const num = this.getRandomArbitrary(0, 6);
        return num
    }

    getHarshStatus() {
        const num = this.getRandomArbitrary(0, 2);
        return num
    }

    async mounted() {
        this.getLookupData(lookupTypesStore.Set.KTTV);

        // Get all station id
        this.province.forEach(provinceElement => {
            this.station.filter(stationElement => {
                if (provinceElement.name === stationElement.ten) {
                    this.stationIds.push(stationElement.id);
                }
            });
        });

        this.fromDate = moment().format('YYYY-MM-DD');
        this.toDate = moment().format('YYYY-MM-DD');
        this.weatherTypes.push(WEATHER_TYPE.TEMPERATURE);

        // Get all provinces data
        await this.weatherService.getDetail(this.stationIds, this.fromDate, this.toDate, this.weatherTypes)
        .then((res: any) => {
            this.provinceData.push({
                
            });
        }).catch(error => {
            console.log(error);
        })
    }
}

import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import { WeatherServices } from '@/service/weather-service/weather.service';


const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        "weather-forecast": () => import("./components/weahter-forecast/WeatherForecastComponent.vue"),
        "hydrological": () => import("./components/hydrological/HydrologicalComponent.vue")
    }
})
export default class DataPageComponent extends Vue {
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

    harshStatus = [
        '', 'O'
    ]

    disasters = [
        {
            name: 'Hạn hán',
            value: this.harshStatus[this.getHarshStatus()]
        },
        {
            name: 'Gió',
            value: `${this.getRandomArbitrary(0, 5)} m/s`
        },
        {
            name: 'Bão',
            value: `${this.getRandomArbitrary(0, 5)}`
        },
        {
            name: 'Độ ẩm',
            value: `${this.getRandomArbitrary(50, 80)} %`
        },
        {
            name: 'Sương mù',
            value: `${this.getRandomArbitrary(35, 40)}`
        },
        {
            name: 'Mức độ ô nhiễm không khí',
            value: `${this.getRandomArbitrary(35, 40)}`
        },
        {
            name: 'Nắng Nóng',
            value: this.harshStatus[this.getHarshStatus()]
        },
        {
            name: 'Mưa đá',
            value: this.harshStatus[this.getHarshStatus()]
        },
        {
            name: 'Lốc xoáy',
            value: this.harshStatus[this.getHarshStatus()]
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
        const random_boolean = Math.random() < 0.5
        const num = random_boolean ? 1 : 0;
        return num
    }
}

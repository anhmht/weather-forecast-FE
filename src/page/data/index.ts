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

    disasters = [
        {
            name: 'Hạn hán',
            min: 1,
            max: 3
        },
        {
            name: 'Gió',
            min: 1,
            max: 3
        },
        {
            name: 'Bão',
            min: 1,
            max: 3
        },
        {
            name: 'Độ ẩm',
            min: 1,
            max: 3
        },
        {
            name: 'Sương mù',
            min: 1,
            max: 3
        },
        {
            name: 'Mức độ ô nhiễm không khí',
            min: 1,
            max: 3
        },
        {
            name: 'Nắng Nóng',
            min: 1,
            max: 3
        },
        {
            name: 'Mưa đá',
            min: 1,
            max: 3
        },
        {
            name: 'Lốc xoáy',
            min: 1,
            max: 3
        },
        {
            name: 'Xâm nhập mặn',
            min: 1,
            max: 3
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
}

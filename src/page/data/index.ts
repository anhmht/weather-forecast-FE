import { PROVINCE } from './../../constant/province-constant';
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class DataPageComponent extends Vue {
    province = PROVINCE;
    activeTab: number = 0

    status = [
        'Sương mù', 'Nhiều mây', 'Mưa rào nhẹ', 'Có mây', 'Mưa dông', 'Mưa rải rác', 'Nắng nóng'
    ]

    weatherInfo = [
        {
            name: 'Cấp độ gió',
        },
        {
            name: 'Nhiệt độ',
        },
        {
            name: 'Xâm nhập mặn',
        },
        {
            name: 'Độ ẩm',
        },
        {
            name: 'Thuỷ Văn',
        },
    ]

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
}

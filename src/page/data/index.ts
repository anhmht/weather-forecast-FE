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

    mekongDeltaProvinces = [
        {
            name: 'Tiền Giang',
        },
        {
            name: 'Bến Tre',
        },
        {
            name: 'Trà Vinh',
        },
        {
            name: 'Sóc Trăng',
        },
        {
            name: 'Bạc Liêu',
        },
        {
            name: 'Kiên Giang',
        },
        {
            name: 'Cà Mau',
        },
        {
            name: 'Long An',
        },
        {
            name: 'Đồng Tháp',
        },
        {
            name: 'Vĩnh Long',
        },
        {
            name: 'Cần Thơ',
        },
        {
            name: 'Hậu Giang',
        },
        {
            name: 'An Giang',
        }
    ]

    mainRivers = [
        {
            name: 'Sông Tiền',
        },
        {
            name: 'Sông Hậu',
        },
        {
            name: 'Sông Cổ Chiên',
        }
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
}

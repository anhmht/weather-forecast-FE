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

    northeastRegion = [
        {
            name: 'Hà Giang',
        },
        {
            name: 'Cao Bằng',
        },
        {
            name: 'Bắc Kạn',
        },
        {
            name: 'Lạng Sơn',
        },
        {
            name: 'Tuyên Quang',
        },
        {
            name: 'Thái Nguyên',
        },
        {
            name: 'Bắc Giang',
        },
        {
            name: 'Quảng Ninh',
        },
    ]

    northwestRegion = [
        {
            name: 'Lào Cai',
        },
        {
            name: 'Yên Bái',
        },
        {
            name: 'Phú Thọ',
        },
        {
            name: 'Điện Biên',
        },
        {
            name: 'Lai Châu',
        },
        {
            name: 'Sơn La',
        },
        {
            name: 'Hòa Bình',
        },
    ]

    redRiverDelta = [
        {
            name: 'Hà Nội',
        },
        {
            name: 'Hải Phòng',
        },
        {
            name: 'Bắc Ninh',
        },
        {
            name: 'Hà Nam',
        },
        {
            name: 'Hải Dương',
        },
        {
            name: 'Hưng Yên',
        },
        {
            name: 'Nam Định',
        },
        {
            name: 'Ninh Bình',
        },
        {
            name: 'Thái Bình',
        },
        {
            name: 'Vĩnh Phúc',
        },
    ]

    northCentralCoast = [
        {
            name: 'Thanh Hóa',
        },
        {
            name: 'Nghệ An',
        },
        {
            name: 'Hà Tĩnh',
        },
        {
            name: 'Quảng Bình',
        },
        {
            name: 'Quảng Trị',
        },
        {
            name: 'Thừa Thiên - Huế',
        },
    ]

    southCentralCoast = [
        {
            name: 'Đà Nẵng',
        },
        {
            name: 'Quảng Nam',
        },
        {
            name: 'Quảng Ngãi',
        },
        {
            name: 'Bình Định',
        },
        {
            name: 'Phú Yên',
        },
        {
            name: 'Khánh Hòa',
        },
        {
            name: 'Ninh Thuận',
        },
        {
            name: 'Bình Thuận',
        },
    ]

    centralHighlands = [
        {
            name: 'Kon Tum',
        },
        {
            name: 'Gia Lai',
        },
        {
            name: 'Đắk Lắk',
        },
        {
            name: 'Đắk Nông',
        },
        {
            name: 'Lâm Đồng',
        },
    ]

    southeastRegion = [
        {
            name: 'Bình Phước',
        },
        {
            name: 'Bình Dương',
        },
        {
            name: 'Đồng Nai',
        },
        {
            name: 'Tây Ninh',
        },
        {
            name: 'Bà Rịa - Vũng Tàu',
        },
        {
            name: 'Thành phố Hồ Chí Minh',
        },
    ]

    mekongRiverDelta = [
        {
            name: 'Long An',
        },
        {
            name: 'Đồng Tháp',
        },
        {
            name: 'Tiền Giang',
        },
        {
            name: 'An Giang',
        },
        {
            name: 'Bến Tre',
        },
        {
            name: 'Vĩnh Long',
        },
        {
            name: 'Trà Vinh',
        },
        {
            name: 'Hậu Giang',
        },
        {
            name: 'Kiên Giang',
        },
        {
            name: 'Sóc Trăng',
        },
        {
            name: 'Bạc Liêu',
        },
        {
            name: 'Cà Mau',
        },
        {
            name: 'Thành phố Cần Thơ',
        }
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
}

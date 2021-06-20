import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {
        "forecast-item": () => import("../forecast-item/ForecastItemComponent.vue")
    }
})
export default class WeatherForecast24hComponent extends Vue {
    @Prop({type: String, default: null})
    position

    activeTab: number = 0;

    forecastData = [
        {
            title: null,
            icon:'https://weatherstoragevn.blob.core.windows.net/images/icons/1031-1032.png',
            desc: `Ít mây, đêm không mưa, ngày nắng nóng đặc biệt gay gắt. Gió tây nam đến nam cấp 2-3. <br/>
                Nhiệt độ thấp nhất từ : 29-32 độ. <br/>
                Nhiệt độ cao nhất từ : 39-41 độ.`
        },
        {
            title: 'Phía Tây Bắc Bộ',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1031-1032.png',
            desc: `Có mây, chiều tối và đêm có mưa rào và dông vài nơi, ngày nắng nóng gay gắt và đặc biệt gay gắt. Gió nhẹ. Trong mưa dông có khả năng xảy ra lốc, sét và gió giật mạnh.<br/>
                    Nhiệt độ thấp nhất từ : 27-30 độ, riêng khu Tây Bắc 24-27 độ.<br/>
                    Nhiệt độ cao nhất từ : 38-41 độ, có nơi trên 41 độ; riêng Lai Châu-Điện Biên 32-35 độ.`
        },
        {
            title: 'Phía Đông Bắc Bộ',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1031-1032.png',
            desc: `Ít mây, đêm không mưa, ngày nắng nóng gay gắt và đặc biệt gay gắt. Gió tây nam đến nam cấp 2-3. <br/>
                    Nhiệt độ thấp nhất từ : 28-31 độ, vùng núi có nơi dưới 28 độ. <br/>
                    Nhiệt độ cao nhất từ : 38-41 độ`
        },
        {
            title: 'Thanh Hoá - Thừa Thiên Huế',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1031-1032.png',
            desc: `Ít mây, đêm không mưa, ngày nắng nóng gay gắt và đặc biệt gay gắt. Gió tây nam cấp 2-3.<br/>
                    Nhiệt độ thấp nhất từ : 28-31 độ <br/>
                    Nhiệt độ cao nhất từ : 38-41 độ, có nơi trên 41 độ`
        },
        {
            title: 'Đà Nẵng đến Bình Thuận',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1021-1022.png',
            desc: `Có mây, chiều tối và đêm có mưa rào và dông vài nơi; ngày nắng nóng, riêng phía Bắc có nắng nóng gay gắt và đặc biệt gay gắt. Gió tây nam cấp 2-3. Trong mưa dông có khả năng xảy ra lốc, sét và gió giật mạnh. <br/>
                    Nhiệt độ thấp nhất từ : 26-29 độ. <br/>
                    Nhiệt độ cao nhất từ : Phía Bắc 37-40 độ; phía Nam 33-36 độ.`
        },
        {
            title: 'Tây Nguyên',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4571.png',
            desc: `Có mây, đêm có mưa rào và dông vài nơi; ngày nắng, riêng phía Nam chiều tối và tối mai có mưa rào và dông rải rác. Gió tây nam cấp 2-3. Trong mưa dông có khả năng xảy ra lốc, sét và gió giật mạnh. <br/>
                    Nhiệt độ thấp nhất từ : 19-22 độ. <br/>
                    Nhiệt độ cao nhất từ : 30-33 độ, có nơi trên 33 độ.`
        },
        {
            title: 'Nam Bộ',
            icon: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4571.png',
            desc: `Có mây, đêm có mưa rào và dông vài nơi, ngày nắng, riêng chiều tối và tối mai có mưa rào và dông rải rác. Gió tây nam cấp 2-3. Trong mưa dông có khả năng xảy ra lốc, sét và gió giật mạnh. <br/>
                    Nhiệt độ thấp nhất từ : 24-27 độ. <br/>
                    Nhiệt độ cao nhất từ : 32-35 độ, có nơi trên 35 độ`
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

    handleClick(index) {
        this.activeTab = index;
    }

    mounted() {
        this.forecastData[0].title = this.position;
    }
}

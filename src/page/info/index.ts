import Vue from "vue";
import Component from "vue-class-component";
import polute from '../../../static/img/info-page/polute1.jpg';
import img_2 from '../../../static/img/info-page/2.jpg';
import img_3 from '../../../static/img/info-page/3.jpg';
import img_4 from '../../../static/img/info-page/4.jpg';
import img_5 from '../../../static/img/info-page/5.jpg';
import img_6 from '../../../static/img/info-page/6.png';
import img_7 from '../../../static/img/info-page/7.png';
import img_8 from '../../../static/img/info-page/8.jpg';
import { Carousel, Slide } from 'vue-carousel';
import { ForecastServices } from "@/service/forecast-service/forecast.service";
import { displayLocation } from "@/utils/location-helper";
import { STATION } from "@/constant/forcast-station-constant";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        Carousel,
        Slide
    }
})
export default class InfoPageComponent extends Vue {
    forecastService: ForecastServices = new ForecastServices()
    currentPosition: any = null;
    navigateTo: number = 0;
    timestamp: any = null;
    temparatureData = null;

    recommendPosts: any = [
        {
            imageUrl: img_2,
            title: 'Trung tâm Dự báo Khí tượng Thủy văn Quốc gia nhận định, từ ngày 16-18/5, ngưỡng chỉ số tia cực tím (UV) tại các thành phố ở ngưỡng rất cao.',
            id: 1
        },
        {
            imageUrl: img_3,
            title: 'BẢN TIN CẬP NHẬT VỀ HIỆN TƯỢNG ENSO VÀ NHẬN ĐỊNH XU THẾ KHÍ TƯỢNG THỦY VĂN TỪ THÁNG 6 ĐẾN THÁNG 11 NĂM 2021',
            id: 2
        },
        {
            imageUrl: img_4,
            title: 'DỰ BÁO THỜI TIẾT 10 NGÀY (Từ đêm 17 đến ngày 27/5/2021)',
            id: 3
        },
        {
            imageUrl: img_5,
            title: 'THÔNG TIN CẢNH BÁO CHỈ SỐ CỰC ĐẠI BỨC XẠ TIA CỰC TÍM VÀ TIỀM NĂNG NHIỆT',
            id: 4
        },
        {
            imageUrl: img_6,
            title: 'NHẬN ĐỊNH XU THẾ THỜI TIẾT TỪ NGÀY 11THÁNG 5 ĐẾN NGÀY 10 THÁNG 6 NĂM 2021 CÁC KHU VỰC TRÊN PHẠM',
            id: 5
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 6
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 7
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 8
        },
    ];
    warningPosts: any = [
        {
            imageUrl: img_6,
            title: 'NHẬN ĐỊNH XU THẾ THỜI TIẾT TỪ NGÀY 11THÁNG 5 ĐẾN NGÀY 10 THÁNG 6 NĂM 2021 CÁC KHU VỰC TRÊN PHẠM',
            id: 1
        },
        {
            imageUrl: img_7,
            title: 'Bản đồ cảnh báo nguy cơ lũ quét, sạc lỡ trong 24 giờ tới',
            id: 2
        },
        {
            imageUrl: img_8,
            title: 'Dự báo năm 2021 sẽ có nhiều cơn bão mạnh và đợt mưa lớn cực đoan',
            id: 3
        }
    ];

    get address() {
        return this.currentPosition ? this.currentPosition.data.results[5].formatted_address : null
    }

    get currentTemp() {
        return this.temparatureData ? this.temparatureData.current : null;
    }

    handlePrev() {
        if (this.navigateTo) {
            this.navigateTo -= 1
        }
    }
    handleNext() {
        const totalPage = Math.ceil(this.recommendPosts.length / 4);
        if (this.navigateTo < totalPage) {
            this.navigateTo += 1
        }
    }

    handleViewDetail(postId) {
        this.$router.push('/info/' + postId)
    }

    getNow() {
        const today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        this.timestamp = dateTime;
    }

    async getTemperature() {
        const placeId = this.currentPosition.data.results[7].place_id
        const station = STATION.find(x => x.place_id === placeId);
        if(station) {
            await this.forecastService.getTemperatureByStation(station.id).then((res) => {
                this.temparatureData = {
                    current: res[`_${new Date().getHours()}`]
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            this.temparatureData = {
                current: '32'
            }
        }
    }

    async mounted() {
        setInterval(this.getNow, 1000);
        this.currentPosition = await displayLocation() as any;
        await this.getTemperature();
    }
}

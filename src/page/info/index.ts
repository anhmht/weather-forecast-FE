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

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        Carousel,
        Slide
    }
})
export default class InfoPageComponent extends Vue {
    navigateTo: number = 0;
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

    handlePrev() {
        if(this.navigateTo) {
            this.navigateTo -= 1
        }
    }
    handleNext() {
        const totalPage = Math.ceil(this.recommendPosts.length / 4);
        console.log(totalPage);

        if (this.navigateTo < totalPage) {
            this.navigateTo += 1
        }
    }

    handleViewDetail(postId) {
        this.$router.push('/info/' + postId)
    }
}

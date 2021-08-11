import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {}
})

export default class CommunityComponent extends Vue {
    searchParams: any = {};

    totalItems: number = 0;
    totalPages: number = 0;
    limitPerPage: number[] = [5, 10, 15, 20];
    numPostsInPage: number = 0;
    
    viewDetailDialog: boolean = false;
    currentItem: any = null;
    reveal: boolean = false;

    get totalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    get coList () {
        return [
            // {
            //     Id: '123456',
            //     userName: 'Nguyễn Văn A',
            //     shortName: "LP",
            //     avatarUrl: "https://weatherstoragevn.blob.core.windows.net/users/1627797205057_EEVH-QQUEAMTWKt.jpg",
            //     content: `Ba Trung tâm Hồi sức Tích cực (ICU) Covid-19 tại TP HCM, quy mô 1.500 giường, do ba bệnh viện gồm Việt Đức, Bạch Mai và Trung ương Huế phụ trách, hoạt động từ ngày 7/8.
            //     Trung tâm ICU do Bệnh viện Bạch Mai phụ trách đặt tại Bệnh viện dã chiến số 16 (quận 7). Trung tâm ICU Bệnh viện Trung ương Huế đặt tại Bệnh viện dã chiến số 13 (huyện Bình Chánh). Trung tâm ICU Bệnh viện Việt Đức đặt tại Bệnh viện dã chiến số 14 (TP Thủ Đức). Mỗi trung tâm quy mô 500 giường.
            //     Đây là 3 trong 5 trung tâm ICU bệnh nhân nguy kịch tại TP HCM, do Bộ Y tế cùng thành phố thiết lập, vận hành bởi bệnh viện lớn tuyến trung ương, mục tiêu lớn nhất là giảm số tử vong. Những trung tâm này thuộc tầng 5, tầng cao nhất của tháp 5 tầng mà TP HCM đang triển khai.
            //     Ngoài ba trung tâm ICU, ba bệnh viện dã chiến trên còn thiết lập giường cho bệnh nhân nhẹ và vừa, do các bệnh viện ở TP HCM phụ trách. Cụ thể, Bệnh viện dã chiến số 13 có 2.000 giường do Bệnh viện Bệnh Nhiệt đới TP HCM quản lý. Bệnh viện dã chiến số 14 có 2.000 giường do Bệnh viện Ung bướu TP HCM vận hành. Bệnh viện số 16 có 2.000 giường do Bệnh viện Hùng Vương TP HCM phụ trách.
            //     Tại lễ khánh thành chiều 7/8, Chủ tịch UBND TP HCM Nguyễn Thành Phong cho biết thành phố đang trải qua thời kỳ khó khăn chưa từng có do ảnh hưởng bởi làn sóng Covid-19 lần thứ 4. Hơn ba tháng qua, cả hệ thống chính trị, các lực lượng tuyến đầu cùng toàn thể người dân thành phố, với sự hỗ trợ của Trung ương, các địa phương trên cả nước, ngày đêm chiến đấu với dịch bệnh.
            //     Theo ông Phong, với tinh thần "chống dịch như chống giặc", bảo vệ sức khỏe nhân dân là trên hết và trước hết, từ cuối tháng 6, thành phố đã chủ động thành lập bệnh viện dã chiến thu dung điều trị Covid số 1. Đến nay, đã có 15 bệnh viện dã chiến thu dung điều trị và 42 bệnh viện, cơ sở được thiết lập tại thành phố.
            //     Để đưa các bệnh viện dã chiến số 13, 14 và 16 với các trung tâm hồi sức tích cực vào hoạt động, thành phố đã tích cực xây dựng trong vòng 20 ngày; phối hợp Bộ Y tế thành lập 4 trung tâm hồi sức tích cực cho bệnh nhân Covid-19 trong 7 ngày.
            //     Ông Phong nhấn mạnh, việc đưa vào hoạt động các bệnh viện dã chiến, các trung tâm hồi sức tích cực với đội ngũ y bác sĩ chuyên môn cùng trang thiết bị hiện đại góp phần nâng cao hiệu quả điều trị cho các F0 trên địa bàn, cũng như phát huy hiệu quả các bệnh viện trong hệ thống điều trị của thành phố.`,
            //     imageUrl: "https://weatherstoragevn.blob.core.windows.net/posts/7fa45da0-c2ee-4d03-ad02-f49652f70e0f/feature-Image/087de5cf-a882-4a92-91f6-d616b8284e7b1627089697795_218e16338b467c182557.jpg",
            //     date: '2021-08-04T06:40:22.834',
            //     status: 0,
            // },
            // {
            //     Id: '456789',
            //     userName: 'B Văn C',
            //     shortName: "VT",
            //     content: 'Bản tin thời tiết đài truyền hình Vĩnh Long',
            //     date: '2021-08-04T06:40:22.834',
            //     status: 1,
            // },
            // {
            //     Id: '987654',
            //     userName: 'C Thị D',
            //     shortName: "LP",
            //     content: 'Bão, áp thấp nhiệt đới hoạt động trên khu vực vùng biển phía Tây kinh tuyến 120° Đông, phía...',
            //     imageUrl: "https://weatherstoragevn.blob.core.windows.net/posts/7fa45da0-c2ee-4d03-ad02-f49652f70e0f/feature-Image/087de5cf-a882-4a92-91f6-d616b8284e7b1627089697795_218e16338b467c182557.jpg",
            //     date: '2021-08-04T06:40:22.834',
            //     status: 2,
            // },
        ];
    }

    async fetchData () {
        this.$forceUpdate();
    }


    async searchByLimit () {
        this.searchParams.page = 1;
        await this.fetchData();
        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    async searchByPaging () {
        await this.fetchData();
        if (this.searchParams.limit * this.searchParams.page <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit * this.searchParams.page;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    getColor (str: string) {
        return DataHelper.generateColorByString(str);
    }

    onImgError (item) {
        item.avatarUrl = '';
    }

    getStatus (statusId) {
        switch (statusId) {
            case 0:
                return 'Chờ duyệt';
            case 1:
                return 'Đã duyệt';
            case 2:
                return 'Không duyệt';
            default:
                return '';
        }
    }

    getShortContent (text: string , limit: number = 150) {
        if (text && text.length > limit) {
            return text.substring(0, limit) + '...';
        }

        return text;
    }

    handleViewPost (Id: string) {
        let obj = this.coList.find(e => e.Id === Id);
        if (obj) {
            this.currentItem = obj;
            this.reveal = false;
            this.viewDetailDialog = true;
        }
    }

    async mounted() {
    }
}

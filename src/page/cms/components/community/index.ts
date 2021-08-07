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
    listPostTitle: string = '';
    limitPerPage: number[] = [5, 10, 15, 20];
    numPostsInPage: number = 0;
    

    get totalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    get coList () {
        return [
            // {
            //     Id: '',
            //     userName: 'Nguyễn Văn A',
            //     shortName: "LP",
            //     avatarUrl: "https://weatherstoragevn.blob.core.windows.net/users/1627797205057_EEVH-QQUEAMTWKt.jpg",
            //     content: 'Bão, áp thấp nhiệt đới hoạt động trên khu vực vùng biển phía Tây kinh tuyến 120° Đông, phía...',
            //     imageUrl: "https://weatherstoragevn.blob.core.windows.net/posts/7fa45da0-c2ee-4d03-ad02-f49652f70e0f/feature-Image/087de5cf-a882-4a92-91f6-d616b8284e7b1627089697795_218e16338b467c182557.jpg",
            //     date: '2021-08-04T06:40:22.834',
            //     status: 0,
            // },
            // {
            //     Id: '',
            //     userName: 'B Văn C',
            //     shortName: "VT",
            //     content: 'Bản tin thời tiết đài truyền hình Vĩnh Long',
            //     date: '2021-08-04T06:40:22.834',
            //     status: 1,
            // },
            // {
            //     Id: '',
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

    async mounted() {
    }
}

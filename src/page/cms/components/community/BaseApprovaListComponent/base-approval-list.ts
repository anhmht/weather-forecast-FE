import { ISocialApprovalSearchParam, SocialApprovalSearchParam } from "@/model/social";
import { SocialServices } from "@/service/social-service/social.service";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";

export default class BaseApprovalListComponent extends Vue {
    searchParams: ISocialApprovalSearchParam = new SocialApprovalSearchParam({});

    totalItems: number = 0;
    totalPages: number = 0;
    limitPerPage: number[] = [5, 10, 15, 20];
    numPostsInPage: number = 0;
    
    viewDetailDialog: boolean = false;
    currentItem: any = null;
    reveal: boolean = false;

    socialService: SocialServices = new SocialServices();

    dtSource: any = [];

    get totalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    get coList () {
        return this.dtSource || [];
    }

    async fetchData () {
        // todo
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
        item.creatorAvatarUrl = '';
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
}

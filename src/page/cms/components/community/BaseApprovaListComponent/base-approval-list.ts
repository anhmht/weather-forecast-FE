import { ISocialApprovalSearchParam, SocialApprovalSearchParam } from "@/model/social";
import { SocialServices } from "@/service/social-service/social.service";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import { Prop } from "vue-property-decorator";

export default class BaseApprovalListComponent extends Vue {
    @Prop()
    status: number[];
    
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

    getColor (str: string) {
        return DataHelper.generateColorByString(str);
    }

    onImgError (item) {
        item.creatorAvatarUrl = '';
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

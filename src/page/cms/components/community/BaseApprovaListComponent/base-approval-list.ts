import { ISocialApprovalSearchParam, SocialApprovalSearchParam } from "@/model/social";
import { SocialServices } from "@/service/social-service/social.service";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";
import { storeModules } from "@/store";
import lookupTypesStore, { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";
import { SOCIAL_POST_STATUS } from "@/constant/common-constant";

const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    components: {
        "preview-image": () => import("../../../../../components/preview-image/PreviewImage.vue"),
        "media-layout": () => import("../../../../../components/media-layout/MediaLayoutComponent.vue"),
    },
})
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

    isPreview: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;

    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    get totalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    get coList () {
        return this.dtSource || [];
    }

    get lookupPostStatus () {
        return this.dtoLookupData[GeneralLookupTypes.POST_STATUS] || [];
    }

    checkAprrovalVisible (statusId) {
        const allow = [
            SOCIAL_POST_STATUS.BLOCKED,
            SOCIAL_POST_STATUS.WAITING
        ]
        return allow.includes(statusId);
    }

    checkBlockVisible (statusId) {
        const allow = [
            SOCIAL_POST_STATUS.PUBLIC,
            SOCIAL_POST_STATUS.WAITING
        ]
        return allow.includes(statusId);
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

    handlePreview(data) {
        this.selectedItem = data.medias;
        this.selectedIndex = data.index;
        this.isPreview = true;
    }
}

import ReactionMixin from '@/mixins/reaction';
import { SocialServices } from '@/service/social-service/social.service';
import { storeModules } from '@/store';
import { GeneralLookupTypes } from '@/store/lookup/lookup-types.store';
import userTypesStore from '@/store/user/user-types.store';
import { DataHelper } from '@/utils/data-helper';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter, namespace } from 'vuex-class';

const UserGetter = namespace(storeModules.User, Getter);
const LookupAction = namespace(storeModules.Lookup, Action);

const NOTIFICATION_ACTION = {
    CREATE_POST: 'CreatePost',
    EDIT_POST: 'EditPost',
    CHANGE_POST_STATUS: 'ChangePostStatus',
    CREATE_COMMENT: 'CreateComment',
    EDIT_COMMENT: 'EditComment',
    CHANGE_COMMMENT_STATUS: 'ChangeCommentStatus',
    SHARE_POST: 'SharePost',
    LIKE: 'Like',
    HEART: 'Heart',
    SMILE: 'Smile',
    LAUGH: 'Laugh',
    WOW: 'Wow',
    SAD: 'Sad',
    ANGRY: 'Angry',
    DISLIKE: 'DisLike',
}

const NOTIFICATION_CONTENT = {
    [NOTIFICATION_ACTION.CREATE_POST]: `đã tạo 1 bài viết`,
    [NOTIFICATION_ACTION.EDIT_POST]: `đã chỉnh sửa 1 bài viết`,
    [NOTIFICATION_ACTION.CHANGE_POST_STATUS]: `Bài viết của bạn đã được cập nhật trạng thái`,
    [NOTIFICATION_ACTION.CREATE_COMMENT]: `đã bình luận 1 bài viết`,
    [NOTIFICATION_ACTION.EDIT_COMMENT]: `đã chỉnh sửa 1 bình luận`,
    [NOTIFICATION_ACTION.CHANGE_COMMMENT_STATUS]: `Bình luận của bạn đã được cập nhật trạng thái`,
    [NOTIFICATION_ACTION.SHARE_POST]: `đã share 1 bài viết của bạn`,
    [NOTIFICATION_ACTION.LIKE]: `đã thích 1 {TYPE} của bạn`,
    [NOTIFICATION_ACTION.HEART]: `đã thêm trạng thái cảm xúc vào 1 {TYPE} của bạn`,
    [NOTIFICATION_ACTION.SMILE]: `đã thêm trạng thái cảm xúc vào 1 {TYPE} của bạn`,
    [NOTIFICATION_ACTION.LAUGH]: `đã thêm trạng thái cảm xúc vào 1 {TYPE} của bạn`,
    [NOTIFICATION_ACTION.WOW]: `đã thêm trạng thái cảm xúc vào 1 {TYPE} của bạn`,
    [NOTIFICATION_ACTION.SAD]: `đã thêm trạng thái cảm xúc vào 1 {TYPE} của bạn`,
    [NOTIFICATION_ACTION.ANGRY]: `đã thêm trạng thái cảm xúc vào 1 {TYPE} của bạn`,
    [NOTIFICATION_ACTION.DISLIKE]: `đã thêm trạng thái cảm xúc vào 1 {TYPE} của bạn`,
}

@Component({
    template: require("./template.html").default,
    mixins: [ReactionMixin],
})
export default class NotificationComponent extends Vue {
    @UserGetter(userTypesStore.Get.Auth) userConfig: any;
    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;

    service: SocialServices = new SocialServices();
    searchParam = {
        limit: 10,
        page: 1
    }
    notificationCount: number = 0;
    notification: any = [];
    totalPages: number = 0;

    get transformData() {
        return this.notification.map(x => {
            const content = NOTIFICATION_CONTENT[x.action].replace('{TYPE}', x.commentId ? 'bình luận' : 'bài viết');
            return {
                ...x,
                content
            }
        })
    }

    getIconReaction(action) {
        const vm = this as any;
        switch (action) {
            case NOTIFICATION_ACTION.CREATE_POST:
            case NOTIFICATION_ACTION.EDIT_POST:
            case NOTIFICATION_ACTION.CHANGE_POST_STATUS:
                return vm.$getReactionByName('Post').url
            case NOTIFICATION_ACTION.CREATE_COMMENT:
            case NOTIFICATION_ACTION.EDIT_COMMENT:
            case NOTIFICATION_ACTION.CHANGE_COMMMENT_STATUS:
                return vm.$getReactionByName('Comment').url
            case NOTIFICATION_ACTION.SHARE_POST:
                return vm.$getReactionByName('Share').url
            default:
                return vm.$getReactionByName(action).url
        }
    }

    color(name) {
        return DataHelper.generateColorByString(name);
    }

    handleLoadMoreComment() {
        if (this.searchParam.page < this.totalPages) {
            this.searchParam.page += 1;
            this.fetchData();
        }
    }

    fetchData() {
        this.service.getNotification(this.searchParam).then((res: any) => {
            this.notification = res.items;
            this.totalPages = res.totalPages;
        }).catch(err => {
            console.log(err);
        });

        this.service.getCountNotification().then((res: any) => {
            this.notificationCount = res.count;
        }).catch(err => {
            console.log(err);
        });
    }

    async mounted() {
        this.fetchData();
        const payload = [
            GeneralLookupTypes.REACTION,
        ];
        await this.getGeneralLookup(payload);
    }
}
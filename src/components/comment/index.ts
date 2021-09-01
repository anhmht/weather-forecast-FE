
import { IPostComment } from "@/model/post/social-comment-post.model";
import { SocialServices } from "@/service/social-service/social.service";
import { storeModules } from "@/store";
import userTypesStore from "@/store/user/user-types.store";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";

const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "emoji-picker": () => import("../../components/emoji-picker/EmojiPickerComponent.vue"),
        "reaction": () => import("../reaction/ReactionComponent.vue"),
        "reaction-count": () => import("../reaction-count/ReactionCountComponent.vue"),
        "sub-comment": () => import("../sub-comment/SubCommentComponent.vue")
    }
})
export default class CommentComponent extends Vue {
    @Prop({ required: true }) id;
    @Prop({ type: Boolean, default: false }) subComment;

    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

    newComment: string = '';
    isLoading: boolean = false;
    totalPages: number = 0;
    service: SocialServices = new SocialServices();
    searchParam = {
        limit: 5,
        page: 1
    }

    commentList: IPostComment[] = [];
    isAvatarError: boolean = false;
    isDisplaySubComment: boolean = false;

    get visibleLoadMore() {
        return this.searchParam.page < this.totalPages
    }

    get loginInfo() {
        if (!this.userConfig) return null;
        return this.userConfig
    }

    get avatar() {
        if (this.loginInfo) {
            return this.loginInfo.avatarUrl;
        }
        return null;
    }

    onImgError(event) {
        this.isAvatarError = true;
    }

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    renderText(comment) {
        return comment.length >= 255 ? comment.slice(0, 255) + '...' : comment
    }

    handleClickOnEmoji(val) {
        const vm = this;
        if (vm.$refs.commentTextarea) {
            let cnt = DataHelper.insertCharacterAtCursorPositionOfTextArea(vm.$refs.commentTextarea, val);
            this.newComment = cnt;
        }
    }

    handleLoadMoreComment() {
        if (this.searchParam.page < this.totalPages) {
            this.searchParam.page += 1;
            this.fetchData();
        }
    }

    async handleReaction(data, comment) {
        const isReactionToThisComment = comment.actionIcons.find(x => x.isCurrentUserChecking);
        if (isReactionToThisComment) {
            await this.removeReactionFromComment(comment.id);
            this.addReactionToComment(comment.id, data.valueId);
        } else {
            this.addReactionToComment(comment.id, data.valueId);
        }
    }

    handleLike(currentChecking, commentId) {
        if (currentChecking !== null) {
            this.addReactionToComment(commentId, 1);
        } else {
            this.removeReactionFromComment(commentId);
        }
    }

    addReactionToComment(commentId, iconId) {
        this.service.addReactionToComment(commentId, iconId)
            .then(() => {
                this.updateCommentList(commentId, iconId);
            }).catch(error => {
                this.$errorMessage(error);
            });
    }

    async removeReactionFromComment(commentId) {
        return await this.service.removeReactionFromComment(commentId)
            .then(() => {
                const index = this.commentList.findIndex(x => x.id === commentId);
                const currentActionIndex = this.commentList[index].actionIcons.findIndex(x => x.isCurrentUserChecking);
                if (this.commentList[index].actionIcons[currentActionIndex].count === 1) {
                    this.commentList[index].actionIcons.splice(currentActionIndex, 1);
                    return;
                }
                Vue.set(this.commentList[index].actionIcons[currentActionIndex], 'isCurrentUserChecking', false);
                Vue.set(this.commentList[index].actionIcons[currentActionIndex], 'count', this.commentList[index].actionIcons[currentActionIndex].count - 1);
                console.log(this.commentList[index].actionIcons[currentActionIndex]);
                
            }).catch(error => {
                this.$errorMessage(error);
            });
    }

    updateCommentList(commentId, iconId) {
        const index = this.commentList.findIndex(x => x.id === commentId);
        const iconIndex = this.commentList[index].actionIcons.findIndex(x => x.iconId === iconId);
        if (iconIndex > -1) {
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'iconId', iconId);
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'isCurrentUserChecking', true);
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'count', this.commentList[index].actionIcons[iconIndex].count + 1);
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'fullNames', [...this.commentList[index].actionIcons[iconIndex].fullNames, this.userConfig.firstName]);
        } else {
            this.commentList[index].actionIcons.push({
                count: 1,
                iconId,
                fullNames: [this.userConfig.firstName],
                isCurrentUserChecking: true
            })
        }
    }

    handleLoadSubComment(id) {
        const comment = this.commentList.find(x => x.id === id);
        if (comment && !comment.isShowSubComment) {
            Vue.set(comment, 'isShowSubComment', true)
        }
    }

    fetchData() {
        this.isLoading = true;
        let method = 'getListCommentsByPost';
        if (this.subComment) {
            method = 'getListSubComments'
        }
        this.service[method](this.searchParam.limit, this.searchParam.page, this.id)
            .then((res: any) => {
                this.commentList = this.subComment ? this.commentList.concat(res.items) : this.commentList.concat(res.comments);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            })
    }

    mounted() {
        this.fetchData();
    }
}
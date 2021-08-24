import Component from "vue-class-component";
import Vue from "vue";
import { ISocialPost } from '@/model/post';
import { SocialServices } from "@/service/social-service/social.service";
import { storeModules } from "@/store";
import { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";
import { Action, namespace } from "vuex-class";

const LookupAction = namespace(storeModules.Lookup, Action);

@Component({
    template: require("./template.html").default,
    components: {
        "comment": () => import("../../../../../components/comment/CommentComponent.vue"),
        "reaction": () => import("../../../../../components/reaction/ReactionComponent.vue"),
        "preview-image": () => import("../../../../../components/preview-image/PreviewImage.vue"),
        "media-layout": () => import("../../../../../components/media-layout/MediaLayoutComponent.vue")
    }
})
export default class MyPostComponent extends Vue {
    myPosts: ISocialPost[] = [];
    isPreview: boolean = false;
    isDisplayComment: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;
    searchParam = {
        limit: 2,
        page: 1,
        commentLimit: 0
    }
    attrs: any = {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
    }
    totalPages: number = 0;
    isLoading: boolean = false;
    likeId: number = 1;
    socialService: SocialServices = new SocialServices();

    @LookupAction getGeneralLookup: (payload: number[]) => Promise<void>;

    getStatus(statusId) {
        switch (statusId) {
            case 0:
                return "Chờ duyệt";
            case 1:
                return "Đã duyệt";
            case 2:
                return "Không duyệt";
            default:
                return "";
        }
    }

    displayContent(content) {
        if (content.length >= 255) {
            return `${content.substring(0, 254)}...`;
        }

        return content;
    }

    toggleContent(target, item) {
        if (target.innerText === "Đọc thêm") {
            target.parentElement.firstElementChild.innerText = item.content;
            target.innerText = "Rút gọn";
        } else if (target.innerText === "Rút gọn") {
            target.parentElement.firstElementChild.innerText = this.displayContent(item.content);
            target.innerText = "Đọc thêm";
        }
    }

    toggleComment(target) {
        if (!this.isDisplayComment) {
            target.parentElement.parentElement.nextElementSibling.style.display = 'none';
        } else {
            target.parentElement.parentElement.nextElementSibling.style.display = 'block';
        }
        this.isDisplayComment = !this.isDisplayComment;
    }

    handlePreview(data) {
        this.selectedItem = data.medias;
        this.selectedIndex = data.index;
        this.isPreview = true;
    }

    handleReaction(data, postId) {
        this.addReactionToPost(postId, data.valueId);
    }

    handleLike(currentChecking, postId) {
        if (currentChecking !== null) {
            this.addReactionToPost(postId, this.likeId);
        } else {
            this.removeReactionFromPost(postId);
        }
    }

    addReactionToPost(postId, iconId) {
        this.removeReactionFromPost(postId);
        this.socialService.addReactionToPost(postId, iconId)
            .then((res: any) => {})
            .catch(error => {
                this.$errorMessage(error);
            });
    }

    removeReactionFromPost(postId) {
        this.socialService.removeReactionFromPost(postId)
            .then((res: any) => {})
            .catch(error => {
                this.$errorMessage(error);
            });
    }

    loadMorePost() {
        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5 && !this.isLoading) {
                if (this.searchParam.page < this.totalPages) {
                    this.searchParam.page += 1;
                    this.fetchData();
                }
            }
        }, { passive: true });
    }

    fetchData() {
        this.isLoading = true;
        this.socialService.getListPostsUser(
            this.searchParam.limit,
            this.searchParam.page,
            this.searchParam.commentLimit)
            .then((res: any) => {
                this.myPosts = this.myPosts.concat(res.posts);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            }).catch(error => {
                this.$errorMessage(error);
                this.isLoading = false;
            });
    }

    async mounted() {
        this.fetchData();
        this.loadMorePost();

        const payload = [
            GeneralLookupTypes.REACTION,
        ];
        await this.getGeneralLookup(payload);
    }
}

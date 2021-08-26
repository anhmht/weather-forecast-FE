import Component from "vue-class-component";
import Vue from "vue";
import { ISocialPost } from '@/model/post';
import { SocialServices } from "@/service/social-service/social.service";
import { storeModules } from "@/store";
import lookupTypesStore, { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";
import { Getter, namespace } from "vuex-class";

const LookupGetter = namespace(storeModules.Lookup, Getter);
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
        limit: 5,
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

    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    get lookupPostStatus () {
        return this.dtoLookupData[GeneralLookupTypes.POST_STATUS] || [];
    }

    getStatus (statusId) {
        let status = this.lookupPostStatus.find(e => e.valueId === statusId);
        return status ? status.description : "";
    }

    displayContent(content) {
        if (content.length >= 255) {
            return `${content.substring(0, 254)}...`.split('\n').join('<br/>');
        }

        return content.split('\n').join('<br/>');
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
    }
}

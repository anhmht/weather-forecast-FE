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
        "media-layout": () => import("../../../../../components/media-layout/MediaLayoutComponent.vue"),
        "reaction-count": () => import("../../../../../components/reaction-count/ReactionCountComponent.vue"),
        "edit-status": () => import("../../../../social/components/edit-status/EditStatusComponent.vue"),
    }
})
export default class MyPostComponent extends Vue {
    myPosts: ISocialPost[] = [];
    isPreview: boolean = false;
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

    selectedPostId: string = null;
    viewEditPostDialog: boolean = false;

    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    get lookupPostStatus () {
        return this.dtoLookupData[GeneralLookupTypes.POST_STATUS] || [];
    }

    getStatus (statusId) {
        let status = this.lookupPostStatus.find(e => e.valueId === statusId);
        return status ? status.description : "";
    }

    displayContent(content) {
        if (content.length >= 255 || content.split(/\r\n|\r|\n/).length >= 4) {
            return `${content.substring(0, 254)}...`.split('\n').join('<br/>');
        }

        return content.split('\n').join('<br/>');
    }

    toggleContent(target, item) {
        if (target.innerText === "?????c th??m") {
            target.parentElement.firstElementChild.innerText = item.content;
            target.innerText = "R??t g???n";
        } else if (target.innerText === "R??t g???n") {
            target.parentElement.firstElementChild.innerHTML = this.displayContent(item.content);
            target.innerText = "?????c th??m";
        }
    }

    toggleComment(id) {
        const post = this.myPosts.find(x => x.id === id);
        if (post && !post.isShowComment) {
            Vue.set(post, 'isShowComment', true)
        }
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

    handleSelectPost (id: string) {
        this.selectedPostId = id;
        this.viewEditPostDialog = true;
    }

    handleCloseEditModal() {
        this.selectedPostId = null;
        this.viewEditPostDialog = false;
    }

    async mounted() {
        this.fetchData();
        this.loadMorePost();
    }
}

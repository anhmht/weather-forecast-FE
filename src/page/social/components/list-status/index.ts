import { ISocialPost } from '@/model/post';
import { SocialServices } from '@/service/social-service/social.service';
import { DataHelper } from '@/utils/data-helper';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require("./template.html").default,
    components: {
        "preview-image": () => import("../../../../components/preview-image/PreviewImage.vue"),
        "media-layout": () => import("../../../../components/media-layout/MediaLayoutComponent.vue"),
        "comment": () => import("../../../../components/comment/CommentComponent.vue"),
        "reaction": () => import("../../../../components/reaction/ReactionComponent.vue")
    },
})
export default class ListStatusComponent extends Vue {

    service: SocialServices = new SocialServices();
    searchParam = {
        limit: 5,
        page: 1
    }

    socialPost: ISocialPost[] = []
    isDisplayComment: boolean = false;
    likeId: number = 1;

    isLoading: boolean = false;
    totalPages: number = 0;
    attrs: any = {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
    }

    isPreview: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    handlePreview(data) {
        this.selectedItem = data.medias;
        this.selectedIndex = data.index;
        this.isPreview = true;
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
        this.service.addReactionToPost(postId, iconId)
            .then((res: any) => {})
            .catch(error => {
                this.$errorMessage(error);
            });
    }

    removeReactionFromPost(postId) {
        this.service.removeReactionFromPost(postId)
            .then((res: any) => {})
            .catch(error => {
                this.$errorMessage(error);
            });
    }

    fetchData() {
        this.isLoading = true;
        this.service.getListPosts(this.searchParam.limit, this.searchParam.page, 0)
            .then((res: any) => {
                this.socialPost = this.socialPost.concat(res.posts);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            })
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

    mounted() {
        this.fetchData();
        this.loadMorePost();
    }

}
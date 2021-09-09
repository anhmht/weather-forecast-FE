import { ISocialPost } from '@/model/post';
import { SocialServices } from '@/service/social-service/social.service';
import { storeModules } from '@/store';
import userTypesStore from '@/store/user/user-types.store';
import { DataHelper } from '@/utils/data-helper';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, namespace } from 'vuex-class';

const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "preview-image": () => import("../../../../components/preview-image/PreviewImage.vue"),
        "media-layout": () => import("../../../../components/media-layout/MediaLayoutComponent.vue"),
        "comment": () => import("../../../../components/comment/CommentComponent.vue"),
        "reaction": () => import("../../../../components/reaction/ReactionComponent.vue"),
        "reaction-count": () => import("../../../../components/reaction-count/ReactionCountComponent.vue"),
        "edit-status": () => import("../edit-status/EditStatusComponent.vue"),
    },
})
export default class ListStatusComponent extends Vue {

    service: SocialServices = new SocialServices();
    searchParam = {
        limit: 5,
        page: 1
    }

    socialPost: ISocialPost[] = []
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
    selectedPostId: string = null;

    viewEditPostDialog: boolean = false;

    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

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

    toggleComment(id) {
        const post = this.socialPost.find(x => x.id === id);
        if (post && !post.isShowComment) {
            Vue.set(post, 'isShowComment', true)
        }
    }

    async handleReaction(data, post) {
        const isReactionToThisPost = post.actionIcons.find(x => x.isCurrentUserChecking);
        if (isReactionToThisPost) {
            await this.removeReactionFromPost(post.id);
            this.addReactionToPost(post.id, data.valueId);
        } else {
            this.addReactionToPost(post.id, data.valueId);
        }
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
            .then((res: any) => {
                this.updateSocialPostList(postId, iconId);
            })
            .catch(error => {
                this.$errorMessage(error);
            });
    }

    async removeReactionFromPost(postId) {
        return await this.service.removeReactionFromPost(postId)
            .then((res: any) => {
                const index = this.socialPost.findIndex(x => x.id === postId);
                const currentActionIndex = this.socialPost[index].actionIcons.findIndex(x => x.isCurrentUserChecking);
                if (this.socialPost[index].actionIcons[currentActionIndex].count === 1) {
                    this.socialPost[index].actionIcons.splice(currentActionIndex, 1);
                    return;
                }
                Vue.set(this.socialPost[index].actionIcons[currentActionIndex], 'isCurrentUserChecking', false);
                Vue.set(this.socialPost[index].actionIcons[currentActionIndex], 'count', this.socialPost[index].actionIcons[currentActionIndex].count - 1);
            })
            .catch(error => {
                this.$errorMessage(error);
            });
    }

    updateSocialPostList(postId, iconId) {
        const index = this.socialPost.findIndex(x => x.id === postId);
        const iconIndex = this.socialPost[index].actionIcons.findIndex(x => x.iconId === iconId);
        if (iconIndex > -1) {
            Vue.set(this.socialPost[index].actionIcons[iconIndex], 'iconId', iconId);
            Vue.set(this.socialPost[index].actionIcons[iconIndex], 'isCurrentUserChecking', true);
            Vue.set(this.socialPost[index].actionIcons[iconIndex], 'count', this.socialPost[index].actionIcons[iconIndex].count + 1);
            Vue.set(this.socialPost[index].actionIcons[iconIndex], 'fullNames', [...this.socialPost[index].actionIcons[iconIndex].fullNames, this.userConfig.firstName]);
        } else {
            this.socialPost[index].actionIcons.push({
                count: 1,
                iconId,
                fullNames: [this.userConfig.firstName],
                isCurrentUserChecking: true
            })
        }
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

    isOwner (username: string) {
        if (this.userConfig && this.userConfig.userName) {
            return this.userConfig.userName === username;
        }
        return false;
    }

    handleSelectPost (id: string) {
        this.selectedPostId = id;
        this.viewEditPostDialog = true;
    }

    handleCloseEditModal (id?: string) {
        if (id) {
            let index = this.socialPost.findIndex(e => e.id === id);
            if (index > -1) {
                this.socialPost.splice(index, 1); 
            }
        }
        this.selectedPostId = null;
        this.viewEditPostDialog = false;
    }

    mounted() {
        this.fetchData();
        this.loadMorePost();
    }

}
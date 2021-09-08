import { ISocialPost } from "@/model/post";
import { SocialServices } from "@/service/social-service/social.service";
import { storeModules } from "@/store";
import userTypesStore from "@/store/user/user-types.store";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";

const UserGetter = namespace(storeModules.User, Getter);

@Component({
    template: require("./template.html").default,
    components: {
        "preview-image": () => import("../../../../components/preview-image/PreviewImage.vue"),
        "media-layout": () => import("../../../../components/media-layout/MediaLayoutComponent.vue"),
        "comment": () => import("../../../../components/comment/CommentComponent.vue"),
        "reaction": () => import("../../../../components/reaction/ReactionComponent.vue"),
        "reaction-count": () => import("../../../../components/reaction-count/ReactionCountComponent.vue")
    },
})
export default class SocialDetailComponent extends Vue {
    service: SocialServices = new SocialServices();
    postId: string = null;
    item: ISocialPost = null;
    isLoading: boolean = false;
    attrs: any = {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
    }

    isPreview: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;

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
        Vue.set(this.item, 'isShowComment', true)
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
            this.addReactionToPost(postId, 1);
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
                const currentActionIndex = this.item.actionIcons.findIndex(x => x.isCurrentUserChecking);
                if (this.item.actionIcons[currentActionIndex].count === 1) {
                    this.item.actionIcons.splice(currentActionIndex, 1);
                    return;
                }
                Vue.set(this.item.actionIcons[currentActionIndex], 'isCurrentUserChecking', false);
                Vue.set(this.item.actionIcons[currentActionIndex], 'count', this.item.actionIcons[currentActionIndex].count - 1);
            })
            .catch(error => {
                this.$errorMessage(error);
            });
    }

    updateSocialPostList(postId, iconId) {
        const iconIndex = this.item.actionIcons.findIndex(x => x.iconId === iconId);
        if (iconIndex > -1) {
            Vue.set(this.item.actionIcons[iconIndex], 'iconId', iconId);
            Vue.set(this.item.actionIcons[iconIndex], 'isCurrentUserChecking', true);
            Vue.set(this.item.actionIcons[iconIndex], 'count', this.item.actionIcons[iconIndex].count + 1);
            Vue.set(this.item.actionIcons[iconIndex], 'fullNames', [...this.item.actionIcons[iconIndex].fullNames, this.userConfig.firstName]);
        } else {
            this.item.actionIcons.push({
                count: 1,
                iconId,
                fullNames: [this.userConfig.firstName],
                isCurrentUserChecking: true
            })
        }
    }

    fetchData() {
        this.postId = this.$route.params.postId;
        this.isLoading = true;
        this.service.getPostById(this.postId).then((res: any) => {
            this.item = res;
            this.isLoading = false;;
        }).catch(err => {
            this.isLoading = false;
            this.$router.replace({
                path: '/error'
            })
            this.$errorMessage(err);
        })
    }

    mounted() {
        this.fetchData();
    }

    @Watch("$route.params.postId")
    handleChangeRoute(val) {
        if (val) {
            this.fetchData();
        }
    }
}
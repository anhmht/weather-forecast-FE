import Component from "vue-class-component";
import Vue from "vue";
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
    GET_LIST_POST_ADMIN_LIMIT: number = 10;
    GET_LIST_POST_ADMIN_PAGE: number = 1;
    GET_LIST_POST_ADMIN_COMMENT_LIMIT: number = 10;
    myPosts: any = [];
    isPreview: boolean = false;
    isDisplayComment: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;
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

    async mounted() {
        this.socialService
            .getListPostsUser(
                this.GET_LIST_POST_ADMIN_LIMIT,
                this.GET_LIST_POST_ADMIN_PAGE,
                this.GET_LIST_POST_ADMIN_COMMENT_LIMIT
            )
            .then((res: any) => {
                this.myPosts = res.posts;
                console.log(this.myPosts);
            })
            .catch(error => {
                this.$errorMessage(error);
            });

        const payload = [
            GeneralLookupTypes.REACTION,
        ];
        await this.getGeneralLookup(payload);
    }
}

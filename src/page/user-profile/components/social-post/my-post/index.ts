import Component from "vue-class-component";
import Vue from "vue";
import { SocialServices } from "@/service/social-service/social.service";

@Component({
    template: require("./template.html").default,
    components: {
        "comment": () => import("../../../../social/components/comment/CommentComponent.vue")
    }
})
export default class MyPostComponent extends Vue {
    GET_LIST_POST_ADMIN_LIMIT: number = 10;
    GET_LIST_POST_ADMIN_PAGE: number = 1;
    GET_LIST_POST_ADMIN_COMMENT_LIMIT: number = 10;
    isReadMore: boolean = false;
    isCommentable: boolean = false;
    myPosts: any = [];
    socialService: SocialServices = new SocialServices();

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

    toggleContent(event) {
        this.isReadMore = !this.isReadMore;
    }

    toggleComment() {
        console.log("Comment clicked");
        this.isCommentable = !this.isCommentable;
    }

    mounted() {
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
    }
}

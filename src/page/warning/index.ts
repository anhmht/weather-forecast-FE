import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import IPost from "../../model/post/post.model";
import { Post } from '../../model/post/post.model';
import moment from "moment";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
    }
})
export default class WarningPageComponent extends Vue {
    postService: PostServices = new PostServices();
    postModel: IPost = new Post({});
    warningPosts: any = [];
    GET_MOST_VIEW_LIMIT: number = 7;
    GET_MOST_VIEW_PAGE: number = 1;
    GET_MOST_VIEW_DAY_NUMBER: number = 7;
    GET_MOST_VIEW_STATUS_NAME: string = 'Publish';
    GET_POST_LIMIT: number = 8;
    GET_POST_PAGE: number = 1;

    get firstWarningPost() {
        return this.warningPosts.length > 0 ? this.warningPosts[0] : {}
    }

    mostWatchPosts: any = [];

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL , params: { id: postId } })
    }

    mounted() {
        this.postService.getPostByCategoryAndStatus(this.$route.params.categoryId, this.$route.params.statusId, this.GET_POST_LIMIT, this.GET_POST_PAGE)
        .then((res: any) => {
            moment.locale('vi');

            res.events.forEach( (element) => {
                element.datePosted = moment(element.datePosted).format('L');
            });

            this.warningPosts = res.events;
        }).catch(error => {
            this.$errorMessage(error);
        })

        this.postService.getMostView(this.GET_MOST_VIEW_LIMIT, this.GET_MOST_VIEW_PAGE, this.GET_MOST_VIEW_DAY_NUMBER)
        .then((res: any) => {
            this.mostWatchPosts = res.events.filter(x => x.statusName === this.GET_MOST_VIEW_STATUS_NAME);
        }).catch(error => {
            this.$errorMessage(error);
        })
    }
}

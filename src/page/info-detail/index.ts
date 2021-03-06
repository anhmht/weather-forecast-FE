import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import { CategoryServices } from "@/service/category-service/category.service";
import IPost from "../../model/post/post.model";
import { Post } from '../../model/post/post.model';
import { Watch } from "vue-property-decorator";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
    }
})
export default class InfoDetailPageComponent extends Vue {
    postService: PostServices = new PostServices();
    categoryService: CategoryServices = new CategoryServices();
    postModel: IPost = new Post({});
    relativePosts: any = [];
    pageTitle: string = null;
    GET_POST_LIMIT: number = 11;
    GET_POST_PAGE: number = 1;

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL , params: { id: postId } })
    }

    async fetchData() {
        // Get post
        await this.postService.getPostById(this.$route.params.id)
            .then(res => {
                this.postModel = new Post(res);
            }).catch(err => {
                this.$errorMessage(err);
            });

        // Get relative posts
        await this.postService.getPostByCategoryAndStatus(this.postModel.categoryId, this.postModel.statusId, this.GET_POST_LIMIT, this.GET_POST_PAGE)
            .then((res: any) => {
                this.relativePosts = res.events.filter(x => x.eventId !== this.$route.params.id);
            }).catch(error => {
                this.$errorMessage(error);
            });

        // Get page title
        await this.categoryService.getCategoryById(this.postModel.categoryId)
            .then((res: any) => {
                this.pageTitle = res.name;
            }).catch(error => {
                this.$errorMessage(error);
            });
    }

    async mounted() {
        await this.fetchData();
    }

    @Watch("$route.params.id")
    handleChangeRoute(val) {
        if(val) {
            this.fetchData();
        }
    }
}

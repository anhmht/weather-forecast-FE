import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
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
    postModel: IPost = new Post({});
    relativePosts: any = [];

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL , params: { id: postId } })
    }

    async fetchData() {
        // Get post
        await this.postService.getPostById(this.$route.params.id)
            .then(res => {
                this.postModel = new Post(res);
                console.log(this.postModel.categoryId);
                console.log(this.postModel.statusId);
            }).catch(err => {
                console.log(err);
            });

        // Get relative posts
        await this.postService.getPostByCategoryAndStatus(this.postModel.categoryId, this.postModel.statusId)
            .then((res: any) => {
                this.relativePosts = res.filter(x => x.eventId !== this.$route.params.id);
            }).catch(error => {
                console.log(error);
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
